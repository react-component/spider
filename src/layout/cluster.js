import { hierarchyVisitAfter, separation } from '../base/Util';
import _ from 'lodash';
import LayoutBase from './base';

function clusterX(children) {
  return children.reduce((x, child) => x + child.x, 0) / children.length;
}

function clusterY(children) {
  return 1 + _.max(children.map(child => child.y));
}

function clusterLeft(node) {
  const children = node.children;
  return children && children.length ? clusterLeft(children[0]) : node;
}

function clusterRight(node) {
  const children = node.children;
  return children && children.length ? clusterRight(children[children.length - 1]) : node;
}

class Cluster extends LayoutBase {
  data(root) {
    let previousNode;
    let x = 0;
    const size = this.size;
    const projectionFunc = this.projectionFunc;

    hierarchyVisitAfter(root, (node) => {
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
    hierarchyVisitAfter(root, (node) => {
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
}

export default Cluster;
