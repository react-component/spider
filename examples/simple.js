// use jsx to render html, do not modify simple.html

import 'rc-spider/assets/index.less';
import Spider from 'rc-spider';
import React from 'react';
import ReactDOM from 'react-dom';

const width = 960;
const height = 2200;

const { Node, Circle, Text} = Spider.Shape;

const nodeCreator = function (data) {
  return (<Node width="20" height="20">
    <Circle />
    <Text offset={[8, 3]}>{data.name}</Text>
  </Node>);
}

const data = new Request('./flare.json');
fetch(data).then(response => response.json())
  .then(response => {
    const tree = response;
    const cluster = Spider.layout.cluster().size([height, width - 160]);
    const data = cluster.data(tree);
    ReactDOM.render(<Spider width={width} height={height} dataSource={data}
                            offset={[40, 0]}
                            projection={d=> [d.y, d.x]}
                            nodeCreator={nodeCreator}
    />, document.getElementById('__react-content'));
});

