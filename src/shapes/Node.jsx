import React, { Component, PropTypes } from 'react';
import Shape from './Shape';

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
      key: child.key || index,
      width: child.width || props.width,
      height: child.height || props.height,
    };
    return React.cloneElement(child, cloneProps);
  }
  render() {
    const { data, children, key} = this.props;
    return (<g className="node">
      {React.Children.map(children, this.renderTreeNode, this)}
    </g>);
  }
}

Node.propTypes = {
  width: React.PropTypes.any.isRequired,
  height: React.PropTypes.any.isRequired,
  margin: React.PropTypes.any.isRequired,
}

export default Node;
