"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
  }

  _createClass(Main, [{
    key: "render",
    value: function render() {
      return React.createElement(Solution, { limit: 1000, factors: [3, 5] });
    }
  }]);

  return Main;
}(React.Component);

var Solution = function (_React$Component2) {
  _inherits(Solution, _React$Component2);

  function Solution() {
    _classCallCheck(this, Solution);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Solution).apply(this, arguments));
  }

  _createClass(Solution, [{
    key: "render",
    value: function render() {
      var factorHeaders = this.props.factors.map(function (factor) {
        return React.createElement(
          "th",
          null,
          "Divisible by ",
          factor
        );
      });

      var subSolutions = [];

      var sum = 0;
      for (var i = 1; i < this.props.limit; i++) {
        var divisibilities = this.props.factors.map(function (factor) {
          return i % factor == 0;
        });
        var isDivisible = divisibilities.reduce(function (prev, cur, index, arr) {
          return prev || cur;
        }, false);
        sum += isDivisible ? i : 0;
        subSolutions.push({ num: i, divisibilities: divisibilities, isDivisible: isDivisible, sum: sum });
      }

      return React.createElement(
        "table",
        { className: "solution", style: { width: "100%" } },
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Number"
          ),
          React.createElement(
            "th",
            null,
            "New Sum"
          ),
          factorHeaders
        ),
        subSolutions.map(function (subSolution) {
          return React.createElement(SubSolution, { num: subSolution.num, sum: subSolution.sum, divisibilities: subSolution.divisibilities, isDivisible: subSolution.isDivisible });
        })
      );
    }
  }]);

  return Solution;
}(React.Component);

var SubSolution = function (_React$Component3) {
  _inherits(SubSolution, _React$Component3);

  function SubSolution() {
    _classCallCheck(this, SubSolution);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SubSolution).apply(this, arguments));
  }

  _createClass(SubSolution, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.num
        ),
        React.createElement(
          "td",
          { style: this.props.isDivisible ? { 'background-color': '#ffffff', 'color': '#008800' } : { 'background-color': '#aaaaaa', 'color': '#aa0000' } },
          this.props.isDivisible ? this.props.sum : 'not divisible by any factor'
        ),
        this.props.divisibilities.map(function (divisibility) {
          return React.createElement(
            "td",
            { style: { 'background-color': divisibility ? "#aaffaa" : "#ffaaaa" } },
            divisibility ? "true" : "false"
          );
        })
      );
    }
  }]);

  return SubSolution;
}(React.Component);

window.Main = Main;
