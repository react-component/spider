import React from 'react';
import ReactART from 'react-art';
import Rectangle from 'react-art/lib/Rectangle.art';
const Group = ReactART.Group;
import Shape from './Shape';


class Rect extends Shape {
  render() {
    const blueStyle = {
      fill: '#37A7D0',
      stroke: '#1B8EB7',
      strokeWidth: 2,
    };

    return (<Group>
      <Rectangle
        width="170"
        height="40"
        fill={blueStyle.fill}
      />
      {this.props.children}
    </Group>);
  }
}

export default Rect;
