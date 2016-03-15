
import React, { Component, PropTypes } from 'react';
import Shape from './Shape.jsx';

class Text extends Shape {
  constructor(props) {
    super(props);
  }

  render() {
    const { offset , children } = this.props;
    return <text transform={`translate(${offset[0]},${offset[1]})`}>{children}</text>
  }
}

Text.defaultProps = {
  offset : [0, 0]
}
export default Text;
