import { hierarchyVisitAfter } from '../base/Util';
import _ from 'lodash';
import LayoutBase from './base';

class Tree extends LayoutBase {
  constructor() {
    super();
    this.levelIndexes = [];
    this.maxDeep = 0;
    this.minX = 0;
    this.maxX = 0;
  }
  walkLevel(node, level = 0) {
    if (this.levelIndexes.length < level + 1) {
      this.levelIndexes.push([]);
    }

    const indexes = this.levelIndexes[level];
    indexes.push(node);
    if (!node.children || node.children.length === 0) {
      node.__depth = 1;
    } else {
      node.children.forEach(child => this.walkLevel(child, level + 1));
      node.__depth = _.max(node.children.map(child => child.__depth)) + 1;
    }
    this.maxDeep = Math.max(node.__depth, this.maxDeep);
    node.__left_bound = new Float32Array(node.__depth);
    node.__right_bound = new Float32Array(node.__depth);
  }
  walkRelative() {
    for (let level = this.levelIndexes.length - 1; level >= 0; level --) {
      const nodes = this.levelIndexes[level];
      nodes.forEach(node => {
        if (node.__depth === 1) {
          node.__left_bound[0] = -1;
          node.__right_bound[0] = 1;
        } else {
          this.move(node.children, node);
        }
      });
    }
  }

  move(children, node) {
    let activeNode = children[0];
    const firstNode = children[0];
    let mLevel;
    let cLevel;
    let leftBounds;
    let rightBounds;

    const firstNodeLeftBound = firstNode.__left_bound;
    const firstNodeRightBound = firstNode.__right_bound;
    const len = children.length - 1;

    const _len = node.__depth - 1;
    const left = new Float32Array(_len);
    const right = new Float32Array(_len);

    let maxR;
    let tmp;

    left.fill(0xfffffff0);

    firstNode.x = 0;

    for (let j = 0; j < firstNode.__depth; j++) {
      right[j] = firstNodeRightBound[j];
      left[j] = firstNodeLeftBound[j];
    }

    mLevel = firstNode.__depth;

    for (let i = 0; i <= len; i++) {
      activeNode = children[i];
      cLevel = mLevel > activeNode.__depth ? activeNode.__depth : mLevel;
      mLevel = mLevel > activeNode.__depth ? mLevel : activeNode.__depth;

      leftBounds = activeNode.__left_bound;
      rightBounds = activeNode.__right_bound;
      maxR = 0;

      for (let j = 0; j < cLevel; j++) {
        tmp = right[j] - leftBounds[j];
        if (maxR < tmp) {
          maxR = tmp;
        }
      }

      activeNode.x = maxR;

      for (let j = 0; j < activeNode.__depth; j++) {
        right[j] = maxR + rightBounds[j];
        tmp = maxR + leftBounds[j];
        if (tmp < left[j]) {
          left[j] = tmp;
        }
      }
    }

    const center = (children[len].x + children[0].x) / 2;
    children.forEach(child => child.x -= center);

    const currentRightBounds = node.__right_bound;
    const currentLeftBounds = node.__left_bound;
    currentLeftBounds[0] = -1;
    currentRightBounds[0] = 1;
    for (let j = 1; j < node.__depth; j++) {
      currentRightBounds[j] = right[j - 1] - center;
      currentLeftBounds[j] = left[j - 1] - center;
    }
  }

  walkAbsolute(ele, px) {
    const children = ele.children;
    if (children && children.length) {
      children.forEach(child => {
        let x = child.x || 0;
        x = x + px;
        child.x = x;
        this.minX = Math.min(this.minX, x);
        this.maxX = Math.max(this.maxX, x);
        if (child.children && child.children.length) {
          this.walkAbsolute(child, x);
        }
      });
    }
  }

  data(root) {
    const size = this.size;
    const projectionFunc = this.projectionFunc;

    root.x = 0;
    root.y = 0;

    this.walkLevel(root);
    this.walkRelative();
    this.walkAbsolute(root, 0);

    const x0 = this.minX - 1;
    const x1 = this.maxX + 1;
    hierarchyVisitAfter(root, (node) => {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = (node.__level__ ? node.__level__ / this.maxDeep : 0) * size[1];

      if (projectionFunc) {
        const projectioned = projectionFunc(node);
        node.x = projectioned[0];
        node.y = projectioned[1];
      }
    });
    return root;
  }
}

export default Tree;
