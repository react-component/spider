import { Map } from 'immutable';
import Node from '../lib/Node';
/**
 * loadArrayData
 * @param data
 * @returns {{nodes: *, links: *}}
 */
function loadArrayData(arr, spider) {
  const nodeMap = {};
  const linkMap = {};
  // 把所有节点放置到map里
  arr.forEach(data => {
    nodeMap[data.id] = new Node(data, spider);
  });

  arr.forEach(data => {
    const currentNode = nodeMap[data.id];
    if (nodeMap[data.id] && nodeMap[data.parent]) {
      const parentNode = nodeMap[data.parent];

      if (!linkMap[data.parent]) {
        linkMap[data.parent] = [];
      }
      linkMap[data.parent].push({
        source: parentNode,
        target: currentNode,
      });
      parentNode.__outDegree += 1;
      parentNode.children.push(currentNode);
      currentNode.__inDegree += 1;
    }
  });
  return {
    nodes: new Map(nodeMap),
    links: new Map(linkMap),
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
  const currentData = data;

  function readNode(nodeData, parent) {
    const node = new Node(nodeData, spider);

    nodeMap[node.id] = node;

    if (parent) {
      if (!linkMap[parent.id]) {
        linkMap[parent.id] = [];
      }
      linkMap[parent.id].push({
        source: parent,
        target: node,
      });
      parent.__outDegree += 1;
      parent.children.push(node);
      node.__inDegree += 1;
    }

    if (nodeData.children && nodeData.children.length) {
      nodeData.children.forEach(child => {
        readNode(child, nodeData);
      });
    }
  }

  readNode(currentData);
  return {
    nodes: new Map(nodeMap),
    links: new Map(linkMap),
  };
}
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
