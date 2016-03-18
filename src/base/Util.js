export function defaultProjection(item) {
  return [item.x, item.y];
}

export function diagonal(link, projection) {
  projection = projection || defaultProjection;
  const p0 = {
    x: link.source.x,
    y: link.source.y,
  };
  const p3 = {
    x: link.target.x,
    y: link.target.y,
  };
  const mid = (p0.y + p3.y) / 2;
  const points = [p0, { x: p0.x, y: mid }, { x: p3.x, y: mid }, p3].map(projection);
  return `M${points[0]}C${points[1]} ${points[2]} ${points[3]}`;
}

export function separation(left, right) {
  if (!left.parent || !right.parent) {
    return 2;
  }
  return left.parent.id === right.parent.id ? 1 : 2;
}

export function hierarchyVisitAfter(node, callback) {
  const nodes = [node];
  const nodes2 = [];

  while (nodes.length) {
    const currentNode = nodes.pop();
    nodes2.push(currentNode);
    if (currentNode.children && currentNode.children.length) {
      for (let i = 0; i < currentNode.children.length; i++) {
        nodes.push(currentNode.children[i]);
      }
    }
  }
  while (nodes2.length) {
    callback(nodes2.pop());
  }
}
