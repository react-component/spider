import React, { Component, PropTypes } from 'react';
import {diagonal, projection} from '../lib/Util';
import _ from 'lodash';
import Shape from './Shape';

class Link extends Component {
  render() {
    const { type, projection } = this.props;
    const rectW = 170,
    rectH = 40;

    const theme = {
      line: {
        fill: 'none',
        stroke: '#ABABAB',
        strokeWidth: '1px',
      },
      text: {
        x: Math.sqrt(Math.pow((this.props.data.target.i_y - this.props.data.source.o_y) / 2, 2) + Math.pow((this.props.data.target.i_x - this.props.data.source.o_x) / 2, 2)),
        fontFamily: 'Arial, Helvetica, sans-serif',
        fill: '#ABABAB',
        fontSize: '12',
        dy: '-.35em',
      },
    };

    const { data, text } = this.props;
    // default theme style
    const pathId = _.uniqueId('link_path_');
    return <g key={pathId} >
      <path className='link' id={pathId} d={diagonal(data, projection)}
        {...theme.line} />
      <text {...theme.text} textAnchor="middle">
        <textPath xlinkHref={'#' + pathId }>{text}</textPath>
      </text>
    </g>
  }
}

Link.propTypes = {
  projection: PropTypes.func,
}

export default Link;
