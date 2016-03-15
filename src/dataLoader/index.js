import { Map } from 'immutable';
import Node from '../lib/Node';
import uuid from 'uuid';

/**
 * dataLoader
 * @param data
 */
export default function dataLoader(data, spider) {
  if (Array.isArray(data)) {
    return loadArrayData(data, spider);
  }
  return loadStructuralData(data, spider);
}

/**
 * loadArrayData
 * 加载数组形式的数据
 * @param data
 * @returns {{nodes: *, links: *}}
 */
function loadArrayData(data, spider) {
  const nodeMap = {};
  const linkMap = {};
  // 把所有节点放置到map里
  data.forEach(d => {
    nodeMap[d.id] = new Node(d, spider);
  });

  data.forEach(d => {
    const currentNode = nodeMap[d.id];
    if (nodeMap[d.id] && nodeMap[d.parent]) {
      const parentNode = nodeMap[d.parent];

      if (!linkMap[d.parent]) {
        linkMap[d.parent] = [];
      }
      linkMap[d.parent].push({
        source: parentNode,
        target: currentNode,
      });
      parentNode.__outDegree += 1
      parentNode.children.push(currentNode);
      currentNode.__inDegree += 1;
    }
  });
  return {
    nodes: Map(nodeMap),
    links: Map(linkMap),
  };
}

/**
 * loadStructuralData
 * 加载结构化的数据
 * @param data
 * @returns {*}
 */
function loadStructuralData(data, spider) {
  const nodeMap = {};
  const linkMap = {};
  let currentData = data;
  let parentNode = null;

  readNode(currentData, parentNode);

  function readNode(data, parent) {
    const node = new Node(data, spider);

    nodeMap[node.id] = node;

    if (parent) {
      if (!linkMap[parent.id]) {
        linkMap[parent.id] = [];
      }
      linkMap[parent.id].push({
        source:parent,
        target: node,

      });
      parent.__outDegree +=1;
      parent.children.push(node);
      node.__inDegree += 1;
    }

    if (data.children && data.children.length) {
      data.children.forEach( d => {
        readNode(d, node);
      });
    }
  }
  return {
    nodes: Map(nodeMap),
    links: Map(linkMap),
  };
}


