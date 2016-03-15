import { hierarchyVisitAfter, separation} from '../lib/Util';
import { Map } from 'immutable';
import _ from 'lodash';
import uuid from 'uuid';

function dataLoader(data) {
  if (Array.isArray(data)) {
    return loadArrayData(data);
  }
  return loadStructuralData(data);
}


/**
 * loadArrayData
 * 加载数组形式的数据
 * @param data
 * @returns {{nodes: *, links: *}}
 */
function loadArrayData(data) {
  const nodeMap = {};
  const linkMap = {};
  // 把所有节点放置到map里
  data.forEach(d => {
    nodeMap[d.id] = Object.assign(d, {
      __inDegree: 0,
      __outDegree: 0,
      id: uuid.v1(),
    });
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
function loadStructuralData(data) {
  const nodeMap = {};
  const linkMap = {};
  let currentData = data;
  let parentNode = null;

  readNode(currentData, parentNode);

  function readNode(data, parent) {
    const node = Object.assign(data, {
      id: uuid.v1(),
      __inDegree: 0,
      __outDegree: 0,
    });
    node.parent = parent;

    nodeMap[node.id] = node;

    if (parent) {
      if (!linkMap[parent.id]) {
        linkMap[parent.id] = [];
      }
      linkMap[parent.id].push({
        source: parent,
        target: node,
      });
      parent.__outDegree +=1;
      parent.children.push(node);
      node.__inDegree = 1;
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

export default function () {
  function cluster(root) {
    let previousNode;
    let x = 0;
    const size = cluster.size;
    const projectionFunc = cluster.projectionFunc;

    hierarchyVisitAfter(root, function (node)  {
      const children = node.children;
      if (children && children.length) {
        node.x = clusterX(children);
        node.y = clusterY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    const left = clusterLeft(root);
    const right = clusterRight(root);
    const x0 = left.x - separation(left, right) / 2;
    const x1 = right.x + separation(right, left) / 2;
    hierarchyVisitAfter(root, function (node){
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];

      // projection ..
      if (projectionFunc) {
        const projectioned = projectionFunc(node);
        node.x = projectioned[0];
        node.y = projectioned[1];
      }
    });
    return root;
  }

  cluster.size = function size(sizeArray) {
    cluster.size = sizeArray;
    return cluster;
  };

  cluster.projection = function (projectionFunc) {
    this.projectionFunc = projectionFunc;
    return cluster;
  };
  cluster.data = cluster;
  return cluster;
}

function clusterX(children) {
  return children.reduce(function(x, child) {
      return x + child.x;
    }, 0) / children.length;
}

function clusterY(children) {
  return 1 + _.max(children.map(function(child) {
    return child.y;
  }));
}

function clusterLeft(node) {
  const children = node.children;
  return children && children.length ? clusterLeft(children[0]) : node;
}

function clusterRight(node) {
  const children = node.children;
  return children && children.length ? clusterRight(children[children.length - 1]) : node;
}
