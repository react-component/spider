import React, { Component, PropTypes } from 'react';
import Shape from './Shape';

class Circle extends Shape {
  constructor(props) {
    super(props);
  }
  render() {
    const { data , key} = this.props;
    return (<circle r='4.5' />)
  }
}

export default Circle;
