import React, { Component, PropTypes } from 'react';
import Shape from './Shape';
import ArtCircle from 'react-art/lib/Circle.art';

class Circle extends Shape {
  render() {
    const { data, key, radius, fill, stroke } = this.props;
    return (<ArtCircle radius={Number(radius)} fill={fill} stroke={stroke} />);
  }
}

export default Circle;
