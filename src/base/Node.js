import globalConfig from './global';
import uuid from 'uuid';
const { GLOBAL_NODE_WIDTH, GLOBAL_NODE_HEIGHT, GLOBAL_NODE_MARGIN } = globalConfig;
/**
 * class Node
 *
 * A node has :
 */
class Node {
  constructor(data, spider) {
    Object.assign(this, data);
    this.x = Number(this.x);
    this.y = Number(this.y);
    this.controlPoints(this.x, this.y, 'horizontal');
    this.id = data.id || uuid.v1();
    this.__data = data;
    this.__inDegree = 0;
    this.__outDegree = 0;
    this.__spider = spider;
    // this.render( nodeCreator );
    this.expand = data.expand || true;
    this._display = this.expand;
    this.children = [];
    data.id = data.id || this.id;
    data.expand = (data.expand === undefined || data.expand === null) ? this.expand : data.expand;
  }

  render(nodeCreator) {
    const data = this.__data;
    this._key = uuid.v1();
    this._el = nodeCreator(data, this.__spider);
    this.__width = Number(data.width || this._el.props.width) || GLOBAL_NODE_WIDTH;
    this.__height = Number(data.height || this._el.props.height) || GLOBAL_NODE_HEIGHT;
    this.__margin = Number(this._el.props.margin) || GLOBAL_NODE_MARGIN;
    this.entry_radius = this._el.props.entry_radius || 0;
    this.exit_radius = this._el.props.exit_radius || 0;
    this.expand = (data.expand === undefined || data.expand === null) ? this.expand : data.expand;
    return this._el;
  }

  isRoot() {
    return !this.__inDegree;
  }

  isLeaf() {
    return !this.__outDegree;
  }

  getDegree() {
    return this.__inDegree + this.__outDegree;
  }

  getEntryRadius(direction) {
    return Number(this.entry_radius ||
      (direction === 'vertical' ? this.__height / 2 : this.__width / 2));
  }

  getExitRadius(direction) {
    return Number(this.exit_radius ||
      (direction === 'vertical' ? this.__height / 2 : this.__width / 2));
  }

  show() {
    this._display = true;
  }

  hide() {
    this._display = false;
  }
  controlPoints(x, y, direction) {
    const entryRadius = this.getEntryRadius(direction);
    const exitRadius = this.getExitRadius(direction);

    this.i_x = this.o_x = x;
    this.i_y = this.o_y = y;
    if (direction === 'vertical') {
      if (entryRadius) {
        this.i_x = x;
        this.i_y = y - entryRadius;
      }

      if (exitRadius) {
        this.o_x = x;
        this.o_y = y + exitRadius;
      }
    } else {
      if (entryRadius) {
        this.i_x = x - entryRadius;
        this.i_y = y;
      }

      if (exitRadius) {
        this.o_x = x + exitRadius;
        this.o_y = y;
      }
    }
  }

  _afterLayout(x, y) {
    this.x = x;
    this.y = y;
  }

  _afterChildrenLayout(x, y) {
    this.x = x;
    this.y = y;
  }

  get(key) {
    return this.__data[key];
  }

  set(target) {
    // avoid to modify id of node
    if (target.id) {
      delete target.id;
    }
    Object.assign(this, target);
    this.__spider.update(this.id, this);
  }
}

export default Node;
