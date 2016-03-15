import _ from 'lodash';

export default function flat2Tree(nodes, key = 'parent') {

  let newNodes = _.cloneDeep(nodes);

  var nodeById = {};

  // Index the nodes by id, in case they come out of order.
  newNodes.forEach(function(d) {
    nodeById[d.id] = d;
  });

  // Lazily compute children.
  newNodes.forEach(function(d) {
    if (key in d) {
      let parent = nodeById[d[key]];
      const childrenKey = parent.collapse ? '_children' : 'children';
      if (parent[childrenKey]) parent[childrenKey].push(d);
      else parent[childrenKey] = [d];
    }
  });

  return newNodes[0];
}
