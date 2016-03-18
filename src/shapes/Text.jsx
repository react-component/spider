import React, { Component, PropTypes } from 'react';
import Shape from './Shape.jsx';
import ReactART from 'react-art';
import Rectangle from 'react-art/lib/Rectangle.art';
const Transform = ReactART.Transform;
const ArtText = ReactART.Text;

class Text extends Shape {
  render() {
    const { offset, children, transform, color } = this.props;
    const textTransform = new Transform().translate(offset[0], offset[1]);
    return (<ArtText transform={textTransform} fill={color}
      font={{ fontSize: 10, fontWeight: 100 }}
    >
      {children}
    </ArtText>);
  }
}

Text.defaultProps = {
  offset: [0, 0],
};
export default Text;
