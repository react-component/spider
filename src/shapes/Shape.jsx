import React from 'react';


class Shape extends React.Component {
  constructor(props) {
    super(props);
  }

  getNode() {
    return this.node;
  }

  getFrame() {
    return this.node.frame();
  }

  render() {

  }
}


export default Shape;
