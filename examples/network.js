webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(227);


/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _rcSpider = __webpack_require__(3);
	
	var _rcSpider2 = _interopRequireDefault(_rcSpider);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(163);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var width = 960;
	var height = 2200;
	var _Spider$Shape = _rcSpider2["default"].Shape;
	var Node = _Spider$Shape.Node;
	var Circle = _Spider$Shape.Circle;
	var Text = _Spider$Shape.Text;
	var Link = _Spider$Shape.Link;
	var Rect = _Spider$Shape.Rect;
	var darken = _rcSpider2["default"].Color.darken;
	
	
	var nodeCreator = function nodeCreator(data) {
	  var nodeWidth = Number(data.width) || 120;
	  return _react2["default"].createElement(
	    Node,
	    { width: nodeWidth, height: 32, offset: [-nodeWidth / 2, -24] },
	    _react2["default"].createElement(Rect, { color: data.color, radius: 16, strokeWidth: 2, stroke: darken(data.color, 0.2) }),
	    _react2["default"].createElement(
	      Text,
	      { offset: [nodeWidth / 2, 12], color: data.textColor || 'white', alignment: 'middle' },
	      data.text
	    )
	  );
	};
	
	var linkCreator = function linkCreator(link) {
	  var offset = link.offset ? link.offset.split(' ') : [0, 0, 0, 0];
	  return _react2["default"].createElement(Link, { data: link, stroke: link.color || 'red', offset: offset, text: link.text, type: 'broke', strokeRadius: 5, arrow: true });
	};
	
	window.GLOBAL_LINK_STROKE = '#ccc';
	
	var data = new Request('./network.json');
	fetch(data).then(function (response) {
	  return response.json();
	}).then(function (response) {
	  // const tree = response;
	  // const network = Spider.layout.network().size([height, width - 160]);
	  // const data = network.data(response);
	  _reactDom2["default"].render(_react2["default"].createElement(_rcSpider2["default"], { width: width, height: height, dataSource: response,
	    offset: [40, 0],
	    nodeCreator: nodeCreator,
	    linkCreator: linkCreator
	  }), document.getElementById('__react-content'));
	});

/***/ }

});
//# sourceMappingURL=network.js.map