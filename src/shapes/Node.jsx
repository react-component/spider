import React, { PropTypes } from 'react';
import Shape from './Shape';
import ReactART from 'react-art';
const Group = ReactART.Group;

class Node extends Shape {
  constructor(props) {
    super(props);
    if (isNaN(Number(props.width))) {
      console.warn('Warning: 必须给 Node 指定一个有效的 width , 否则自动布局可能会出问题.');
    }
    if (isNaN(Number(props.height))) {
      console.warn('Warning: 必须给 Node 指定一个有效的 height , 否则自动布局可能会出问题.');
    }
    // if (isNaN(Number(props.margin))) {
    //   console.warn(`Warning: 必须给 Node 指定一个有效的 margin , 否则自动布局可能会出问题.
    //   Spider 会使用一个默认的 margin (Max(width, height) / 5) 来进行自动布局.
    //   您可以通过 Spider.setGlobalConfig("GLOBAL_MARGIN", "数值") 来指定全局的默认 margin`);
    // }
  }
  renderTreeNode(child, index) {
    const props = this.props;
    const cloneProps = {
      key: child.props.key || index,
      width: child.props.width || props.width,
      height: child.props.height || props.height,
      fill: child.props.fill || props.fill || window.NODE_DEFAULT_FILL,
      stroke: child.props.stroke || props.stroke || window.NODE_DEFAULT_STROKE,
      strokeWidth: child.props.strokeWidth || props.strokeWidth || window.NODE_DEFAULT_STROKE_WIDTH,
    };
    if (child.type.name === 'Circle') {
      cloneProps.radius = child.props.radius || Math.min(cloneProps.width, cloneProps.height);
    }
    if (child.type.name === 'Text') {
      cloneProps.color = child.props.color || props.fill || window.TEXT_DEFAULT_COLOR;
    }

    return React.cloneElement(child, cloneProps);
  }
  render() {
    const { children } = this.props;
    return (<Group className="node">
      {React.Children.map(children, this.renderTreeNode, this)}
    </Group>);
  }
}

Node.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  margin: PropTypes.any.isRequired,
};

export default Node;
