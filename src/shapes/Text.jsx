import React from 'react';
import Shape from './Shape.jsx';
import ReactART from 'react-art';
const Transform = ReactART.Transform;
const ArtText = ReactART.Text;

class Text extends Shape {
  render() {
    const { offset, children, color, transform, textAnchor } = this.props;
    const textTransform = transform || new Transform().translate(offset[0], offset[1]);
    return (<ArtText transform={textTransform} fill={color}
      style={{ textAnchor: textAnchor || 'start' }}
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
