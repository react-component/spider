import Spider from 'rc-spider';
import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import _ from 'lodash';

const width = 1280;
const height = 800;
const viewerWidth = window.innerWidth;
const viewerHeight = window.innerHeight;

const { Node, Circle, Text, Link } = Spider.Shape;
window.GLOBAL_LINK_STROKE = '#ccc';

function getNode(name) {
  return {
    id: uuid.v1(),
    name: name || 'New Node',
    children: []
  }
}



function centerNode() {

}

class MindNode extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      transform: null,
      scale: 1,
    }
  }
  nodeClick(data) {
    if (data.children) {
      data._children = data.children;
      data.children = null;
    } else {
      data.children = data._children;
      data._children = null;
    }
    this.setState({
      data: this.state.data,
      transform: this.spiderTransform(data),
    });
  }
  nodeCreator(data) {
    return (<Node width="4" height="4" onClick={this.nodeClick.bind(this)}>
      <Circle stroke="#4682B4" strokeWidth="1.5"/>
      <Text offset={[5, -4]}>
        {data.name}
      </Text>
    </Node>);
  }
  /**
   * move spider to center
   * @param root
   */
  spiderTransform(root) {
    const scale = this.state.scale;
    let x = -root.x;
    let y = -root.y;
    y += viewerWidth / 2;
    x += viewerHeight / 2;
    return new Spider.Transform().translate(y, x);
  }
  /**
   * load data...
   */
  componentDidMount() {
    const data = new Request('./tree.json');
    fetch(data).then(response => response.json())
      .then(response => {
        this.setState({
          data: response
        });
      });
  }
  render() {
    const root = this.state.data;
    let transform = this.state.transform;
    if (!root) {
      return <div> loading... </div>;
    }

    // compute the new height of tree
    const levelWidth = [1];
    function childCount(node, level = 0) {
      if (node.children && node.children.length > 0) {
        if (levelWidth.length <= level + 1) levelWidth.push(0);
        levelWidth[level + 1] += node.children.length;
        node.children.forEach(child => childCount(child, level + 1));
      }
    }
    childCount(root);
    const newHeight = _.max(levelWidth) * 25;

    const tree = Spider.layout.tree().size([newHeight, viewerWidth]);
    const data = tree.data(root);

    if (!transform) {
      transform = this.spiderTransform(root);
    }
    return <Spider width={viewerWidth} height={viewerHeight}
                   projection={ n => [n.y, n.x]}
                   transform={transform}
                   nodeCreator={this.nodeCreator.bind(this)}
                   dataSource={data}
                   moveable />;
  }
}

export default MindNode;
