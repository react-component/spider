import React, { Component, PropTypes } from 'react';
import Shape from './Shape';

function noop() {}

class Rect extends Shape {
  constructor(props) {
    super(props);
  }
  handleClick(data) {
    console.log("data", data);
  }

  //onDoubleClick
  handleDblClick(data) {
      console.log("dbl data", data);
  }

  render() {
    const { data, text, type} = this.props;
    const onClick = this.props.onClick || noop;
    const blueStyle = {
      fill:'#37A7D0',
      stroke:'#1B8EB7',
      strokeWidth: 2,
    };

    const redStyle = {
      fill:'#F36D18',
      stroke:'#DA5400',
      strokeWidth: 2,
    };

    const textStyle = {
      style: {
        fontSize: '13px',
      },
      dy: '.35em',
      fill: '#ffffff',
      textAnchor: 'middle',
    };
    return <g onClick={onClick.bind(this, data)}>
      <rect
        width="170"
          height="40"
          style={type === 'blue' ?  blueStyle : redStyle }
      />
      <text transform={'translate(' + 170 / 2 + ',' + 20 + ')'} {...textStyle}>{text}</text>
      {this.props.children}
    </g>
  }
}

export default Rect;

