import { hierarchyVisitAfter, separation } from '../base/Util';
import _ from 'lodash';

function clusterX(children) {
  return children.reduce((x, child) => x + child.x, 0) / children.length;
}

function clusterLeft(node) {
  const children = node.children;
  return children && children.length ? clusterLeft(children[0]) : node;
}

function clusterRight(node) {
  const children = node.children;
  return children && children.length ? clusterRight(children[children.length - 1]) : node;
}

export default function () {
  function tree(root) {
    let previousNode;
    let x = 0;
    let maxDeep = 0;
    const size = tree.size;
    const projectionFunc = tree.projectionFunc;

    hierarchyVisitAfter(root, node => {
      const children = node.children;
      if (children && children.length) {
        node.x = clusterX(children);
        node.y = node.__level__ * 1;
        maxDeep = _.max([maxDeep, node.__level__ + 1]);
        console.log('>> maxDeep', node);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = node.__level__ * 1;
        previousNode = node;
      }
    });
    const left = clusterLeft(root);
    const right = clusterRight(root);
    const x0 = left.x - separation(left, right) / 2;
    const x1 = right.x + separation(right, left) / 2;
    hierarchyVisitAfter(root, (node) => {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = (node.y ? node.y / maxDeep : 0) * size[1];

      // projection ..
      if (projectionFunc) {
        const projectioned = projectionFunc(node);
        node.x = projectioned[0];
        node.y = projectioned[1];
      }
    });
    return root;
  }

  tree.size = function size(sizeArray) {
    tree.size = sizeArray;
    return tree;
  };

  tree.projection = function (projectionFunc) {
    this.projectionFunc = projectionFunc;
    return tree;
  };
  tree.data = tree;
  return tree;
}
