import 'normalize.css';
import Spider from 'rc-spider';
import React from 'react';
import ReactDOM from 'react-dom';

const width = 1200;
const height = 3000;
const { Node, Circle, Text} = Spider.Shape;

const nodeCreator = function (data) {
  return (<Node width="4.5" height="4.5">
    <Circle stroke="#4682B4" strokeWidth="1.5"/>
    <Text offset={[8, -5]} color="black" >{data.name}</Text>
  </Node>);
}

window.GLOBAL_LINK_STROKE = '#ccc';

const data = new Request('https://raw.githubusercontent.com/unruledboy/WebFrontEndStack/master/ux/WebFrontEndStack.json');
fetch(data).then(response => response.json())
  .then(response => {
    const tree = response;
    const cluster = Spider.layout.tree().size([height, width - 160]);
    const data = cluster.data(tree);
    ReactDOM.render(<Spider width={width} height={height} dataSource={data}
                            offset={[40, 0]}
                            projection={d=> [d.y, d.x]}
                            nodeCreator={nodeCreator}
    />, document.getElementById('__react-content'));
});

