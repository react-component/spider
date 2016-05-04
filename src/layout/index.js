const layout = {};

['cluster', 'tree'].forEach(item => {
  const LayoutClass = require(`./${item}`);
  layout[item] = () => new LayoutClass();
});

export default layout;
