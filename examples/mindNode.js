webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(225);


/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(163);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _index = __webpack_require__(226);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	_reactDom2["default"].render(_react2["default"].createElement(_index2["default"], null), document.getElementById('__react-content'));

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rcSpider = __webpack_require__(3);
	
	var _rcSpider2 = _interopRequireDefault(_rcSpider);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(163);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _uuid = __webpack_require__(169);
	
	var _uuid2 = _interopRequireDefault(_uuid);
	
	var _lodash = __webpack_require__(222);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var width = 1280;
	var height = 800;
	var viewerWidth = window.innerWidth;
	var viewerHeight = window.innerHeight;
	
	var _Spider$Shape = _rcSpider2["default"].Shape;
	var Node = _Spider$Shape.Node;
	var Circle = _Spider$Shape.Circle;
	var Text = _Spider$Shape.Text;
	var Link = _Spider$Shape.Link;
	
	window.GLOBAL_LINK_STROKE = '#ccc';
	
	function getNode(name) {
	  return {
	    id: _uuid2["default"].v1(),
	    name: name || 'New Node',
	    children: []
	  };
	}
	
	function centerNode() {}
	
	var MindNode = function (_React$Component) {
	  _inherits(MindNode, _React$Component);
	
	  function MindNode() {
	    _classCallCheck(this, MindNode);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MindNode).call(this));
	
	    _this.state = {
	      data: null,
	      transform: null,
	      scale: 1
	    };
	    return _this;
	  }
	
	  _createClass(MindNode, [{
	    key: 'nodeClick',
	    value: function nodeClick(data) {
	      if (data.children) {
	        data._children = data.children;
	        data.children = null;
	      } else {
	        data.children = data._children;
	        data._children = null;
	      }
	      this.setState({
	        data: this.state.data,
	        transform: this.spiderTransform(data)
	      });
	    }
	  }, {
	    key: 'nodeCreator',
	    value: function nodeCreator(data) {
	      return _react2["default"].createElement(
	        Node,
	        { width: '4', height: '4', onClick: this.nodeClick.bind(this) },
	        _react2["default"].createElement(Circle, { stroke: '#4682B4', strokeWidth: '1.5' }),
	        _react2["default"].createElement(
	          Text,
	          { offset: [5, -4] },
	          data.name
	        )
	      );
	    }
	    /**
	     * move spider to center
	     * @param root
	     */
	
	  }, {
	    key: 'spiderTransform',
	    value: function spiderTransform(root) {
	      var scale = this.state.scale;
	      var x = -root.x;
	      var y = -root.y;
	      y += viewerWidth / 2;
	      x += viewerHeight / 2;
	      return new _rcSpider2["default"].Transform().translate(y, x);
	    }
	    /**
	     * load data...
	     */
	
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      var data = new Request('./tree.json');
	      fetch(data).then(function (response) {
	        return response.json();
	      }).then(function (response) {
	        _this2.setState({
	          data: response
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var root = this.state.data;
	      var transform = this.state.transform;
	      if (!root) {
	        return _react2["default"].createElement(
	          'div',
	          null,
	          ' loading... '
	        );
	      }
	
	      // compute the new height of tree
	      var levelWidth = [1];
	      function childCount(node) {
	        var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        if (node.children && node.children.length > 0) {
	          if (levelWidth.length <= level + 1) levelWidth.push(0);
	          levelWidth[level + 1] += node.children.length;
	          node.children.forEach(function (child) {
	            return childCount(child, level + 1);
	          });
	        }
	      }
	      childCount(root);
	      var newHeight = _lodash2["default"].max(levelWidth) * 25;
	
	      var tree = _rcSpider2["default"].layout.tree().size([newHeight, viewerWidth]);
	      var data = tree.data(root);
	
	      if (!transform) {
	        transform = this.spiderTransform(root);
	      }
	      return _react2["default"].createElement(_rcSpider2["default"], { width: viewerWidth, height: viewerHeight,
	        projection: function projection(n) {
	          return [n.y, n.x];
	        },
	        transform: transform,
	        nodeCreator: this.nodeCreator.bind(this),
	        dataSource: data,
	        moveable: true });
	    }
	  }]);
	
	  return MindNode;
	}(_react2["default"].Component);
	
	exports["default"] = MindNode;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=mindNode.js.map