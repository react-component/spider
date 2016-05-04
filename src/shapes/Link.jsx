import React, { Component, PropTypes } from 'react';
import ReactART from 'react-art';
const Group = ReactART.Group;
import Text from './Text.jsx';
const Shape = ReactART.Shape;
const Transform = ReactART.Transform;
import { diagonal, broke } from '../base/Util';

class Link extends Component {
  render() {
    const { projection } = this.props;

    const { data, text, stroke, strokeWidth, offset, arrow } = this.props;
    const { source, target } = data;
    // default theme style
    const pathId = `link-path-${source.id}-${target.id}`;
    const path = this.props.type === 'broke'
      ? broke(data, projection, offset)
      : diagonal(data, projection, offset);
    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgPath.setAttribute('d', path.path);
    const midPoint = svgPath.getPointAtLength(Math.ceil(svgPath.getTotalLength() / 2));
    svgPath.remove();
    const points = path.points;
    const movePoint = points[points.length - 1];
    const lastPoint = points[points.length - 2];
    let alpha = Math.atan(
        (movePoint[1] - lastPoint[1]) / (movePoint[0] - lastPoint[0])
     ) / Math.PI * 2;
    alpha = isNaN(alpha) ? 0 : (alpha + 1) * (movePoint[0] > lastPoint[0] ? 90 : -90);
    const transform = new Transform().translate(movePoint[0], movePoint[1]).rotate(alpha);
    return (<Group key={pathId} >
      <Shape d={path.path} stroke={stroke} strokeWidth={strokeWidth} />
      {arrow ? <Shape d="M-4.5,10L0.5,0L5.5,10" fill={stroke} transform={transform} /> : null}
      <Text color={stroke} offset={[midPoint.x, midPoint.y]} alignment="middle">
        {text}
      </Text>
    </Group>);
  }
}

Link.propTypes = {
  projection: PropTypes.func,
  data: PropTypes.object,
  offset: PropTypes.array,
  text: PropTypes.string,
  stroke: PropTypes.string,
  arrow: PropTypes.boolean,
  strokeWidth: PropTypes.string,
  type: PropTypes.string,
};

export default Link;
