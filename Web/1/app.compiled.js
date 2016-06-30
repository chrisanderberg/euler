"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).call(this, props));

    _this.state = {};
    var validationResult = _this.props.validate(_this.getDefaultValue());
    _this.state.validationStatus = validationResult.validationStatus;
    _this.state.validationMessage = validationResult.validationMessage;
    if (_this.timer) {
      clearTimeout(_this.timer);
      _this.timer = null;
    }
    _this.timer = null;
    return _this;
  }

  _createClass(TextInput, [{
    key: "getInput",
    value: function getInput() {
      return $("#" + this.props.id).val();
    }
  }, {
    key: "onInput",
    value: function onInput() {
      console.log("input");
      console.log(this);
      console.log(this.props);
      var validationResult = this.props.validate(this.getInput());
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(this.onBlur.bind(this), 1500);
      this.setState(validationResult);
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      console.log("blur");
      console.log(this);
      console.log(this.props);
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      var inputArr = window.hashToArr(window.location.hash);
      inputArr[this.props.hashIndex] = this.getInput();
      window.location.hash = window.arrToHash(inputArr);
    }
  }, {
    key: "getValidationClass",
    value: function getValidationClass() {
      return "has-" + this.state.validationStatus;
    }
  }, {
    key: "getValidationGlyphicon",
    value: function getValidationGlyphicon() {
      switch (this.state.validationStatus) {
        case "error":
          return "glyphicon-remove";
        case "warning":
          return "glyphicon-warning-sign";
        case "success":
          return "glyphicon-ok";
      }
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue() {
      return window.hashToArr(window.location.hash)[this.props.hashIndex];
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      $("#" + this.props.id).val(this.getDefaultValue());
      var validationResult = this.props.validate(this.getDefaultValue());
      this.state.validationStatus = validationResult.validationStatus;
      this.state.validationMessage = validationResult.validationMessage;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = null;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "form-horizontal" },
        React.createElement(
          "div",
          { className: "form-group has-feedback " + this.getValidationClass() },
          React.createElement(
            "label",
            { "for": this.props.id, className: "control-label col-xs-" + this.props.labelCols },
            this.props.label
          ),
          React.createElement(
            "div",
            { className: "col-xs-" + this.props.inputCols },
            React.createElement("input", { type: "text", className: "form-control", id: this.props.id, defaultValue: this.getDefaultValue(), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this) }),
            React.createElement("span", { className: "glyphicon form-control-feedback " + this.getValidationGlyphicon(), "aria-hidden": "true" }),
            React.createElement(
              "span",
              { className: "help-block has-error" },
              this.state.validationMessage
            )
          )
        )
      );
    }
  }]);

  return TextInput;
}(React.Component);

var Answer = function (_React$Component2) {
  _inherits(Answer, _React$Component2);

  function Answer() {
    _classCallCheck(this, Answer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Answer).apply(this, arguments));
  }

  _createClass(Answer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "well" },
          "Answer: ",
          this.props.answer
        )
      );
    }
  }]);

  return Answer;
}(React.Component);

var Solution = function (_React$Component3) {
  _inherits(Solution, _React$Component3);

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
        React.createElement(Answer, { answer: sum }),
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

var SubSolution = function (_React$Component4) {
  _inherits(SubSolution, _React$Component4);

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

var Question = function (_React$Component5) {
  _inherits(Question, _React$Component5);

  function Question() {
    _classCallCheck(this, Question);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Question).apply(this, arguments));
  }

  _createClass(Question, [{
    key: "render",
    value: function render() {
      var factorStr = "";
      for (var i = 1; i < this.props.params.length; i++) {
        if (i == this.props.params.length - 1) {
          factorStr += this.props.params[i];
        } else if (i == this.props.params.length - 2) {
          factorStr += this.props.params[i] + ' or ';
        } else {
          factorStr += this.props.params[i] + ', ';
        }
      }

      return React.createElement(
        "div",
        { className: "well" },
        "If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.",
        React.createElement("br", null),
        React.createElement("br", null),
        "Find the sum of all the multiples of ",
        factorStr,
        " below ",
        this.props.params[0],
        "."
      );
    }
  }]);

  return Question;
}(React.Component);

var LimitInput = function (_React$Component6) {
  _inherits(LimitInput, _React$Component6);

  function LimitInput() {
    _classCallCheck(this, LimitInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LimitInput).apply(this, arguments));
  }

  _createClass(LimitInput, [{
    key: "render",
    value: function render() {
      var validate = function validate(input) {
        var validationMessage = "Limit set to " + input;
        var validationStatus = "success";

        var value = parseInt(input);

        if (isNaN(value) || value <= 0) {
          validationStatus = "error";
          validationMessage = "Must enter a positive integer!";
        } else {
          if (value >= 2000) {
            validationStatus = "warning";
            validationMessage = "App gets slow when using really big numbers.";
          }
        }

        return { validationStatus: validationStatus, validationMessage: validationMessage };
      };

      return React.createElement(TextInput, { id: "limit", validate: validate, hashIndex: 0, label: "Limit", labelCols: "2", inputCols: "4" });
    }
  }]);

  return LimitInput;
}(React.Component);

var FactorInput = function (_React$Component7) {
  _inherits(FactorInput, _React$Component7);

  function FactorInput() {
    _classCallCheck(this, FactorInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FactorInput).apply(this, arguments));
  }

  _createClass(FactorInput, [{
    key: "render",
    value: function render() {
      var validate = function validate(input) {
        var validationMessage = "Factor set to " + input;
        var validationStatus = "success";

        var value = parseInt(input);

        if (isNaN(value) || value <= 0) {
          validationStatus = "error";
          validationMessage = "Must enter a positive integer!";
        }

        return { validationStatus: validationStatus, validationMessage: validationMessage };
      };

      return React.createElement(TextInput, { id: "factor" + this.props.index, validate: validate, hashIndex: this.props.index, label: "Factor " + this.props.index, labelCols: "2", inputCols: "4" });
    }
  }]);

  return FactorInput;
}(React.Component);

var ProblemForm = function (_React$Component8) {
  _inherits(ProblemForm, _React$Component8);

  function ProblemForm() {
    _classCallCheck(this, ProblemForm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProblemForm).apply(this, arguments));
  }

  _createClass(ProblemForm, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(LimitInput, null),
        React.createElement(FactorInput, { index: 1 }),
        React.createElement(FactorInput, { index: 2 })
      );
    }
  }]);

  return ProblemForm;
}(React.Component);

var Problem = function (_React$Component9) {
  _inherits(Problem, _React$Component9);

  function Problem() {
    _classCallCheck(this, Problem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Problem).apply(this, arguments));
  }

  _createClass(Problem, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(Question, { params: this.props.params }),
        React.createElement(ProblemForm, { params: this.props.params })
      );
    }
  }]);

  return Problem;
}(React.Component);

window.components.problem = Problem;
window.components.solution = Solution;
window.defaultHash = "#/1000/3/5/";
