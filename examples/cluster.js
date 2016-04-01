import 'normalize.css';
import Spider from 'rc-spider';
import React from 'react';
import ReactDOM from 'react-dom';

const width = 1280;
const height = 800;
const rx = width / 2;
const ry = height / 2;

const { Node, Circle, Text, Link } = Spider.Shape;

function onClick(d, e) {
  console.log('>> onClick', this);
}

function nodeCreator(data) {
  return (<Node width="3.5" height="3.5"  >
    <Circle onClick={onClick} />
    <Text transform={data.x < 180 ? null: new Spider.Transform().rotate(180)}
          offset={data.x < 180 ? [8, 3] : [-8 , 3]}
          alignment={data.x < 180 ? 'left' : 'right'}>
      {data.name}
    </Text>
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
                            nodeTransform={d => new Spider.Transform().rotate(d.x - 90).translate(d.y)}
                            nodeCreator={nodeCreator}
                            linkCreator={linkCreator}
    />, document.getElementById('__react-content'));
  });

