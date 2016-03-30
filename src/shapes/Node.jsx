import React, { PropTypes } from 'react';
import Shape from './Shape';
import ReactART from 'react-art';
const Group = ReactART.Group;

class Node extends Shape {
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
    const { children, onClick } = this.props;
    return (<Group className="node" onClick={onClick}>
      {React.Children.map(children, this.renderTreeNode, this)}
    </Group>);
  }
}

Node.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
};

export default Node;
