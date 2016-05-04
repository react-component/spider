
export function defaultProjection(item) {
  return [item.x, item.y];
}

function normalizeOffset(originOffset = []) {
  const offset = [];
  for (let i = 0; i < 4; i++) {
    offset[i] = Number(originOffset[i]) || 0;
  }
  return offset;
}

export function diagonal(link, projection, offset) {
  const _offset = normalizeOffset(offset);
  projection = projection || defaultProjection;
  const p0 = {
    x: link.source.x + _offset[0],
    y: link.source.y + _offset[1],
  };
  const p3 = {
    x: link.target.x + _offset[2],
    y: link.target.y + _offset[3],
  };
  const mid = (p0.y + p3.y) / 2;
  const points = [p0, { x: p0.x, y: mid }, { x: p3.x, y: mid }, p3].map(projection);
  return {
    points,
    path: `M${points[0]}C${points[1]} ${points[2]} ${points[3]}`,
  };
}

export function separation(left, right) {
  return left.parent === right.parent ? 1 : 2;
}

export function broke(link, projection, offset) {
  const _offset = normalizeOffset(offset);
  projection = projection || defaultProjection;
  const p0 = {
    x: link.source.x + _offset[0],
    y: link.source.y + _offset[1],
  };
  const p3 = {
    x: link.target.x + _offset[2],
    y: link.target.y + _offset[3],
  };

  let points = [];

  if (p0.x !== p3.x && p0.y !== p3.y) {
    points = [p0, {
      x: link.clockwise ? p3.x : p0.x,
      y: link.clockwise ? p0.y : p3.y,
    }, p3].map(projection);
    const midPoint = points[1];
    const nextPoint = points[2];
    const lastPoint = points[0];
    const cx = midPoint[0];
    const cy = midPoint[1];
    const predeltaX = cx === lastPoint[0]
      ? 0
      : Math.ceil((cx - lastPoint[0]) / Math.abs(cx - lastPoint[0]));

    const predeltaY = cy === lastPoint[1]
      ? 0
      : Math.ceil((cy - lastPoint[1]) / Math.abs(cy - lastPoint[1]));

    const nextdeltaX = cx === nextPoint[0]
      ? 0
      : Math.ceil((nextPoint[0] - cx) / Math.abs(nextPoint[0] - cx));

    const nextdeltaY = cy === nextPoint[1]
      ? 0
      : Math.ceil((nextPoint[1] - cy) / Math.abs(nextPoint[1] - cy));

    let clockwise = null;
    if (link.clockwise !== undefined) {
      clockwise = link.clockwise;
    } else {
      clockwise = (nextPoint[0] > lastPoint[0] && nextPoint[1] > lastPoint[1]) ? '0' : '1';
    }
    const r1 = { x: cx - 30 * predeltaX, y: cy - 30 * predeltaY };
    const r2 = { x: cx + 30 * nextdeltaX, y: cy + 30 * nextdeltaY };
    const radius = `L${r1.x} ${r1.y}A 30 30 0 0 ${clockwise} ${r2.x} ${r2.y}`;

    return {
      points: [p0, r1, r2, p3].map(projection),
      path: `M${points[0]}${radius}L${points[2]}`,
    };
  }
  if (link.source === link.target) {
    // connect to itself
    const revert = link.revert ? 15 : -30;
    const tx = p0.x;
    const ty = p0.y + revert;
    const path = `M${tx - 20} ${ty}A 24 24 0 1 ${link.revert ? 0 : 1} ${tx + 20} ${ty}`;
    points = [{ x: p0.x - 20, y: p0.y }, { x: p0.x + 20, y: p0.y }].map(projection);
    return {
      points,
      path,
    };
  }
  points = [p0, p3].map(projection);
  return {
    points,
    path: `M${points[0]}L${points[1]}`,
  };
}

export function hierarchyVisitAfter(node, callback) {
  const nodes = [node];
  const nodes2 = [];

  while (nodes.length) {
    const currentNode = nodes.pop();
    currentNode.__level__ = currentNode.parent ? currentNode.parent.__level__ + 1 : 0;
    nodes2.push(currentNode);
    if (currentNode.children && currentNode.children.length) {
      for (let i = 0; i < currentNode.children.length; i++) {
        currentNode.children[i].parent = currentNode;
        nodes.push(currentNode.children[i]);
      }
    }
  }
  while (nodes2.length) {
    callback(nodes2.pop());
  }
}
