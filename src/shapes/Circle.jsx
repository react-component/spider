import React from 'react';
import Shape from './Shape';
import ArtCircle from 'react-art/lib/Circle.art';

class Circle extends Shape {
  render() {
    const { radius, fill, stroke, strokeWidth, onClick } = this.props;
    return (<ArtCircle radius={Number(radius)} fill={fill}
      stroke={stroke} strokeWidth={strokeWidth}
      onClick={onClick}
    />);
  }
}

export default Circle;
