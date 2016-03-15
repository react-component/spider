// use jsx to render html, do not modify simple.html

import 'rc-spider/assets/index.less';
import Spider from 'rc-spider';
import React from 'react';
import ReactDOM from 'react-dom';

const width = 1280;
const height = 800;
const rx = width / 2;
const ry = height / 2;

const { Node, Circle, Text, Link} = Spider.Shape;

function nodeCreator(data) {
  return (<Node width="20" height="20">
    <Circle />
    <Text offset={[8, 3]}
          textAnthor={data.x < 180 ? 'start' : 'end'}
          transform={data.x < 180 ? null : 'rotate(180)' }
    >{data.name}</Text>
  </Node>);
}

function projection (d) {
  return [d.y, d.x / 180 * Math.PI]
}
function radial (data) {
  var d = projection.apply(this, arguments), r = d[0], a = d[1] - Math.PI / 2;
  return [ r * Math.cos(a), r * Math.sin(a) ];
}

function linkCreator (data) {
  return <Link projection={radial} data={data}/>;
}

const data = new Request('./flare.json');
fetch(data).then(response => response.json())
  .then(response => {
    const tree = response;
    const cluster = Spider.layout.cluster().size([360, ry - 120]);
    const data = cluster.data(tree);
    ReactDOM.render(<Spider width={width} height={height} dataSource={data}
                            offset={[rx, ry]}
                            transform={d=> `rotate(${d.x - 90})translate(${d.y})`}
                            nodeCreator={nodeCreator}
                            linkCreator={linkCreator}
    />, document.getElementById('__react-content'));
  });

