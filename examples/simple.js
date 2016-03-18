webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(216);


/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _rcSpider = __webpack_require__(3);
	
	var _rcSpider2 = _interopRequireDefault(_rcSpider);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(215);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var width = 960;
	var height = 2200;
	var _Spider$Shape = _rcSpider2.default.Shape;
	var Node = _Spider$Shape.Node;
	var Circle = _Spider$Shape.Circle;
	var Text = _Spider$Shape.Text;
	
	
	var nodeCreator = function nodeCreator(data) {
	  return _react2.default.createElement(
	    Node,
	    { width: '4.5', height: '4.5' },
	    _react2.default.createElement(Circle, null),
	    _react2.default.createElement(
	      Text,
	      { offset: [8, 3], color: 'red' },
	      data.name
	    )
	  );
	};
	
	var data = new Request('./flare.json');
	fetch(data).then(function (response) {
	  return response.json();
	}).then(function (response) {
	  var tree = response;
	  var cluster = _rcSpider2.default.layout.cluster().size([height, width - 160]);
	  var data = cluster.data(tree);
	  _reactDom2.default.render(_react2.default.createElement(_rcSpider2.default, { width: width, height: height, dataSource: data,
	    offset: [40, 0],
	    projection: function projection(d) {
	      return [d.y, d.x];
	    },
	    nodeCreator: nodeCreator
	  }), document.getElementById('__react-content'));
	});

/***/ }

});
//# sourceMappingURL=simple.js.map