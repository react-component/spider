import React from 'react';
import Shape from './Shape';
import ArtCircle from 'react-art/lib/Circle.art';

class Circle extends Shape {
  render() {
    const { radius, fill, stroke, onClick } = this.props;
    return (<ArtCircle radius={Number(radius)} fill={fill} stroke={stroke} onClick={onClick}/>);
  }
}

export default Circle;
