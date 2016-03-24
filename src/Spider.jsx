import React, { PropTypes } from 'react';
import SpiderBase from './base/SpiderBase.jsx';
import Shape, { Link, Node, Circle } from './shapes';
import ReactART from 'react-art';
const Group = ReactART.Group;
const Transform = ReactART.Transform;
const Surface = ReactART.Surface;

import layout from './layout';
import _ from 'lodash';

function defaultNodeCreator(data) {
  return (<Node margin="10" width="20" height="20" data={data}>
    <Circle />
  </Node>);
}

function defaultLinkCreator(link) {
  return (<Link data={link} />);
}

function defaultProjection(element) {
  return [element.x, element.y];
}

function defaultTransform(element) {
  return new Transform().translate(element.x, element.y);
}

class Spider extends SpiderBase {
  constructor(props) {
    super(props);
    const { nodes, links } = this.loadDataSource(
      props.dataSource,
      props.nodeCreator,
      props.linkCreator);
    this.state = {
      dataSource: props.dataSource,
      nodes,
      links,
      dragging: false,
      lastX: 0,
      lastY: 0,
      left: 0,
      top: 0,
    };
  }

  loadDataSource(dataSource, nodeCreator, linkCreator) {
    if (Object.keys(dataSource).length === 0) {
      return {
        nodes: [],
        links: [],
      };
    }
    const treeDataSource = _.cloneDeep(dataSource);
    const nodes = this.nodes(treeDataSource);
    const links = this.links(linkCreator);

    return {
      nodes,
      links,
    };
  }

  update(id, newNode) {
    const { nodes } = this.state;
    const updatedNodes = nodes.set(id, newNode);
    this.setState({
      nodes: updatedNodes,
    });
  }
  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    const { nodes, links } = this.loadDataSource(
      dataSource,
      nextProps.nodeCreator,
      nextProps.linkCreator);
    this.setState({
      dataSource,
      nodes,
      links,
    });
  }
  enableDrag(ev) {
    const position = (ev.targetTouches && ev.targetTouches[0]) || ev;

    this.setState({
      dragging: true,
      lastX: position.clientX,
      lastY: position.clientY,
    });
  }

  handleMouseMove(ev) {
    const position = (ev.targetTouches && ev.targetTouches[0]) || ev;
    if (!this.state.dragging) {
      return;
    }
    const deltaX = position.clientX - this.state.lastX;
    const deltaY = position.clientY - this.state.lastY;
    const currentX = this.state.left + deltaX;
    const currentY = this.state.top + deltaY;
    this.setState({
      lastX: position.clientX,
      lastY: position.clientY,
      left: currentX,
      top: currentY,
    });
  }

  handleDragStop() {
    this.setState({
      dragging: false,
      lastX: 0,
      lastY: 0,
    });
  }

  componentDidMount() {
    if (this.props.moveable) {
      window.addEventListener('mousedown', this.enableDrag.bind(this));
      window.addEventListener('mousemove', this.handleMouseMove.bind(this));
      window.addEventListener('mouseup', this.handleDragStop.bind(this));
    }
  }

  toggleChild(node) {
    return () => {
      const nodes = this.updateNode(node, {
        expand: !node.expand,
      });
      this.layout();
      const links = this.links(this.props.linkCreator);
      this.setState({
        nodes,
        links,
      });
    };
  }

  renderNodes() {
    const nodes = this.state.nodes;
    const { nodeCreator, projection, transform } = this.props;
    return nodes.map((node, idx) => {
      const projectedNode = projection(node);
      let groupTransform;
      if (transform) {
        groupTransform = transform({
          x: projectedNode[0],
          y: projectedNode[1],
        });
      } else {
        groupTransform = new Transform().translate(projectedNode[0], projectedNode[1]);
      }
      return (<Group className="node" key={`node-${idx}`} transform={groupTransform} >
        { node._display ? nodeCreator(node) : null }
      </Group>);
    });
  }
  renderLinks() {
    const links = this.state.links;
    const { linkCreator } = this.props;
    return links.map((linkArray, idx) =>
      <Group key={`link-${idx}`} >
        {React.Children.map(linkArray.map(link =>
          linkCreator(link)
        ), this.passProjection, this)}
      </Group>
    );
  }
  passProjection(child) {
    const { props } = child;
    const cloneProps = {
      data: props.data,
      projection: props.projection || this.props.projection,
      stroke: child.stroke || this.props.stroke || window.GLOBAL_LINK_STROKE,
      strokeWidth: child.strokeWidth || this.props.strokeWidth || window.GLOBAL_LINK_STROKE_WIDTH,
    };
    return React.cloneElement(child, cloneProps);
  }
  render() {
    const { width, height, offset } = this.props;
    const { left, top } = this.state;

    const offsetLeft = offset && offset[0] || 0;
    const offsetTop = offset && offset[1] || 0;
    const nodes = this.renderNodes();
    const links = this.renderLinks();

    const groupTransform = new Transform().translate(left + offsetLeft, top + offsetTop);
    // node width
    return (<Surface width={width} height={height} ref="canvas">
      <Group transform={groupTransform}>
        {React.Children.map(links, this.passProjection, this)}
        {nodes}
      </Group>
    </Surface>);
  }
}

Spider.propTypes = {
  offset: PropTypes.array, // 整个图的偏移
  transform: PropTypes.func, // 指定 node 的 transform
  projection: PropTypes.func, // 指定一个 node 和 link 的映射函数
  startX: PropTypes.number,
  startY: PropTypes.number,
  enableDrag: PropTypes.bool,
  enableWheel: PropTypes.bool,
  direction: PropTypes.string,
  lineType: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  dataSource: PropTypes.object.isRequired,
  nodeCreator: PropTypes.func,
  linkCreator: PropTypes.func,
};

Spider.defaultProps = {
  projection: defaultProjection,
  transform: defaultTransform,
  nodeCreator: defaultNodeCreator,
  linkCreator: defaultLinkCreator,
};

Spider.Shape = Shape;
Spider.layout = layout;
Spider.Transform = Transform;

export default Spider;
