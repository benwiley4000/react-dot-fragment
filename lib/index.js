'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof require === 'function') {
  var React = require('react');
}

var Fragment = React.Fragment || function (_React$Component) {
  _inherits(_Fragment, _React$Component);

  function _Fragment(props) {
    _classCallCheck(this, _Fragment);

    var _this = _possibleConstructorReturn(this, (_Fragment.__proto__ || Object.getPrototypeOf(_Fragment)).call(this, props));

    _this.refFn = _this.refFn.bind(_this);
    _this.orphans = [];
    return _this;
  }

  _createClass(_Fragment, [{
    key: 'refFn',
    value: function refFn(div) {
      this.div = div;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unwrapChildren();
      this.div.style.display = 'none';
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.rewrapChildren();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.unwrapChildren();
    }
  }, {
    key: 'unwrapChildren',
    value: function unwrapChildren() {
      var _this2 = this;

      // defer first to style calculation to ensure CSS transitions can happen:
      // https://stackoverflow.com/a/24195559/4956731
      setTimeout(function () {
        // plain js rocks!
        // https://plainjs.com/javascript/manipulation/unwrap-a-dom-element-35/
        if (!_this2.div.parentNode) {
          return;
        }
        _this2.orphans = [];
        while (_this2.div.firstChild) {
          _this2.orphans.push(_this2.div.firstChild);
          _this2.div.parentNode.insertBefore(_this2.div.firstChild, _this2.div);
        }
      });
    }
  }, {
    key: 'rewrapChildren',
    value: function rewrapChildren() {
      if (!this.div.parentNode) {
        return;
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.orphans[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var orphan = _step.value;

          this.div.appendChild(orphan);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { ref: this.refFn }, this.props.children);
    }
  }]);

  return _Fragment;
}(React.Component);

if (typeof module !== 'undefined' && module) {
  module.exports = Fragment;
}
