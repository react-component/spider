import React from 'react';

class Shape extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

  }
}

Shape.defaultProps = {
  offset: [0, 0],
  stroke: null,
  strokeWidth: 1,
};


export default Shape;
