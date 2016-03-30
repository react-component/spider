webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _rcSpider = __webpack_require__(3);
	
	var _rcSpider2 = _interopRequireDefault(_rcSpider);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(218);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var width = 1280;
	var height = 800;
	var rx = width / 2;
	var ry = height / 2;
	
	var _Spider$Shape = _rcSpider2["default"].Shape;
	var Node = _Spider$Shape.Node;
	var Circle = _Spider$Shape.Circle;
	var Text = _Spider$Shape.Text;
	var Link = _Spider$Shape.Link;
	
	
	function onClick(d, e) {
	  console.log('>> onClick', this);
	}
	
	function nodeCreator(data) {
	  return _react2["default"].createElement(
	    Node,
	    { width: '4.5', height: '4.5' },
	    _react2["default"].createElement(Circle, { onClick: onClick }),
	    _react2["default"].createElement(
	      Text,
	      { offset: [8, 3] },
	      data.name
	    )
	  );
	}
	
	function projection(d) {
	  return [d.y, d.x / 180 * Math.PI];
	}
	function radial(data) {
	  var d = projection.apply(this, arguments),
	      r = d[0],
	      a = d[1] - Math.PI / 2;
	  return [r * Math.cos(a), r * Math.sin(a)];
	}
	
	function linkCreator(data) {
	  return _react2["default"].createElement(Link, { projection: radial, data: data });
	}
	
	var data = new Request('./flare.json');
	fetch(data).then(function (response) {
	  return response.json();
	}).then(function (response) {
	  var tree = response;
	  var cluster = _rcSpider2["default"].layout.cluster().size([360, ry - 120]);
	  var data = cluster.data(tree);
	  _reactDom2["default"].render(_react2["default"].createElement(_rcSpider2["default"], { width: width, height: height, dataSource: data,
	    offset: [rx, ry],
	    transform: function transform(d) {
	      return new _rcSpider2["default"].Transform().rotate(d.x - 90).translate(d.y);
	    },
	    nodeCreator: nodeCreator,
	    linkCreator: linkCreator
	  }), document.getElementById('__react-content'));
	});

/***/ }
]);
//# sourceMappingURL=cluster.js.map