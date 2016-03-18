import EventEmitter from 'events';
class Base extends EventEmitter {
  constructor(attrs) {
    super();
    this.__attrs = {};
    this.__attrs = Object.assign(this.__attrs, attrs);
  }

  /**
   * get
   * @param key
   * @returns {*}
     */
  get(key) {
    return this.__attrs[key];
  }

  /**
   * set
   * @param key
   * @param value
   * @returns {*}
     */
  set(key, value) {
    this.__attrs[key] = value;
    this.emit('change', this);
    return this;
  }

  on(eventName, callback) {
    return this.addListener(eventName, callback);
  }

}

export default Base;
