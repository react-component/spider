import React from 'react';
import dataLoader from '../dataLoader';

class SpiderBase extends React.Component {
  getTreeRoot() {
    if (this.__root) {
      return this.__root;
    }
    const data = this.__data;
    return data.nodes.find(node => node.__inDegree === 0);
  }
  /**
   *  updateNode will always make spider relayout..
   *  otherwise manual set `relayout` attribute of attributes to `false`
   * @param targetNode
   * @param attributes
   */
  updateNode(targetNode, attributes) {
    const data = this.__data;
    const nodes = this.__data.nodes;
    const nodeToUpdate = nodes.get(targetNode.id);
    Object.assign(nodeToUpdate.__data, attributes);
    nodeToUpdate.render(this.props.nodeCreator);
    const updatedNodes = this.__data.nodes.set(targetNode.id, nodeToUpdate);
    this.__data.nodes = updatedNodes;
    return updatedNodes;
  }

  data(rawData) {
    this.__rawData = rawData;
    this.__data = dataLoader(rawData, this);
    return this.__data;
  }

  nodes(data, nodeCreator) {
    if (!this.__data) {
      this.data(data, nodeCreator);
    }
    return this.__data.nodes;
  }

  layout() {
    const root = this.getTreeRoot();
    this.normalizeNodes();
  }

  normalizeNodes() {
    const data = this.__data;
    const root = this.getTreeRoot();
    const rootX = root.x;
    const rootY = root.y;
    const boundWidth = root.rect.width;
    const boundHeight = root.rect.height;
    this.__data.nodes = data.nodes.map(node => {
      const x = (node.x - rootX) / boundWidth * this.props.width;
      const y = (node.y - rootY) / boundHeight * this.props.height + this.props.height / 2;
      node._afterLayout(x, y);
      node.controlPoints(x, y, 'horizontal');
      return node;
    });
  }

  links() {
    return this.__data.links;
  }
}

SpiderBase.propTypes = {
  nodeCreator: React.PropTypes.func,
  width: React.PropTypes.any,
  height: React.PropTypes.any,
};

export default SpiderBase;
