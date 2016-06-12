"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Solution = function (_React$Component) {
  _inherits(Solution, _React$Component);

  function Solution() {
    _classCallCheck(this, Solution);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Solution).apply(this, arguments));
  }

  _createClass(Solution, [{
    key: "render",
    value: function render() {
      var limit = parseInt(this.props.params[0]);
      var factors = this.props.params.slice(1).map(function (x) {
        return parseInt(x);
      });
      var factorHeaders = factors.map(function (factor, index) {
        return React.createElement(
          "th",
          { key: index },
          "Multiple of ",
          factor
        );
      });
      var subSolutions = [];

      var sum = 0;
      for (var i = 1; i < limit; i++) {
        var divisibilities = factors.map(function (factor) {
          return i % factor == 0;
        });
        var isDivisible = divisibilities.reduce(function (prev, cur, index, arr) {
          return prev || cur;
        }, false);
        sum += isDivisible ? i : 0;
        subSolutions.push({ num: i, divisibilities: divisibilities, isDivisible: isDivisible, sum: sum });
      }

      return React.createElement(
        "div",
        null,
        React.createElement(
          "table",
          { className: "solution table table-striped table-bordered", style: { width: "100%" } },
          React.createElement(
            "thead",
            null,
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
                "Cumulative Sum"
              ),
              factorHeaders
            )
          ),
          React.createElement(
            "tbody",
            null,
            subSolutions.map(function (subSolution) {
              return React.createElement(SubSolution, { key: subSolution.num, num: subSolution.num, sum: subSolution.sum, divisibilities: subSolution.divisibilities, isDivisible: subSolution.isDivisible });
            })
          )
        ),
        React.createElement(
          "a",
          { href: "#/" + (limit + 50) + factors.reduce(function (factorsUrl, factor) {
              return factorsUrl + factor + '/';
            }, '/') },
          React.createElement(
            "button",
            { type: "button", className: "btn btn-primary" },
            "Next 50"
          )
        )
      );
    }
  }]);

  return Solution;
}(React.Component);

var SubSolution = function (_React$Component2) {
  _inherits(SubSolution, _React$Component2);

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
          { className: this.props.isDivisible ? "text-info" : "" },
          this.props.sum
        ),
        this.props.divisibilities.map(function (divisibility, index) {
          return divisibility ? React.createElement(
            "td",
            { key: index, className: "text-success" },
            "Yes"
          ) : React.createElement(
            "td",
            { key: index },
            "No"
          );
        })
      );
    }
  }]);

  return SubSolution;
}(React.Component);

var Problem = function (_React$Component3) {
  _inherits(Problem, _React$Component3);

  function Problem() {
    _classCallCheck(this, Problem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Problem).apply(this, arguments));
  }

  _createClass(Problem, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "This is the problem 1 problem."
      );
    }
  }]);

  return Problem;
}(React.Component);

window.components.problem = Problem;
window.components.solution = Solution;
window.defaultHash = "#/1000/3/5/";
