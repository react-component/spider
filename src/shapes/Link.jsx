import React, { Component, PropTypes } from 'react';
import ReactART from 'react-art';
const Group = ReactART.Group;
const Text = ReactART.Text;
const Shape = ReactART.Shape;
import { diagonal } from '../base/Util';
import _ from 'lodash';

class Link extends Component {
  render() {
    const { projection } = this.props;

    const theme = {
      line: {
        fill: 'none',
        stroke: '#ABABAB',
        strokeWidth: '1px',
      },
    };

    const { data, text, stroke, strokeWidth } = this.props;
    // default theme style
    const pathId = _.uniqueId('link_path_');
    const path = diagonal(data, projection);
    return (<Group key={pathId} >
      <Shape d={path} stroke={stroke} strokeWidth={strokeWidth} />
      <Text {...theme.text} textAnchor="middle" path={path}>
        {text}
      </Text>
    </Group>);
  }
}

Link.propTypes = {
  projection: PropTypes.func,
  data: PropTypes.object,
  text: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
};

export default Link;
