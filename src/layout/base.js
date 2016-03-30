class Layout {
  constructor() {

  }
  size(sizeArray) {
    this.size = sizeArray;
    return this;
  }
  projection(projectionFunc) {
    this.projectionFunc = projectionFunc;
    return this;
  }
}

export default Layout;
