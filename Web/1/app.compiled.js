"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Define a base class for input, such as text fields
// Manages updates and validation
//
// Classes that extend this one must implement a getInput method that
// returns the current input. Since different controls may have different
// methods for managing state and input, it can not be implemented here.

var DataControl = function (_React$Component) {
  _inherits(DataControl, _React$Component);

  function DataControl(props) {
    _classCallCheck(this, DataControl);

    // do initial validation on the input given through the props

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataControl).call(this, props));

    _this.state = {};
    var validationResult = _this.props.validate(_this.props.input || '');
    _this.state.validationStatus = validationResult.validationStatus;
    _this.state.validationMessage = validationResult.validationMessage;
    return _this;
  }

  // check the input for errors and set the state


  _createClass(DataControl, [{
    key: "checkInput",
    value: function checkInput() {
      var validationResult = this.props.validate(this.getInput());
      this.setState(validationResult);
    }

    // if the input is valid, pass it to the update callback

  }, {
    key: "update",
    value: function update() {
      // check the current input to make sure the current validation state matches
      this.checkInput();

      // update only if the input passes validation with no errors (warnings allowed)
      if (this.state.validationStatus != "error") {
        this.props.update(this.getInput());
      } else {
        //console.log("Input Validation Error, could not update!");
      }
    }

    // Bootstrap has validation classes for styling forms. Useful utility method

  }, {
    key: "getValidationClass",
    value: function getValidationClass() {
      return "has-" + this.state.validationStatus;
    }

    // Bootstrap also has validation glyphcons. Another useful utility method

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
  }]);

  return DataControl;
}(React.Component);

// TextControl components are a type of DataControl that uses text for input.
// They will attempt to update after a short period of inactivity after
// keystrokes stop, or after the text field loses focus. As other data
// controls, they will only successfully update when the validation function
// doesn't return an error when checking input.


var TextControl = function (_DataControl) {
  _inherits(TextControl, _DataControl);

  function TextControl(props) {
    _classCallCheck(this, TextControl);

    // make sure the timer used for updating after typing is cleared

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TextControl).call(this, props));

    _this2.clearTimer();
    return _this2;
  }

  // Every extending class of DataControl must implement this method.
  // Use jQuery to get the current value of the actual text html
  // element as the input to this data control.


  _createClass(TextControl, [{
    key: "getInput",
    value: function getInput() {
      return $("#" + this.props.id + "-control").val();
    }

    // The timer for updating after keystrokes finish is guarunteed to be
    // cleared after running this function.

  }, {
    key: "clearTimer",
    value: function clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    // Reset the keystroke timer. Intended to be called whenever a keystroke
    // occurs.

  }, {
    key: "resetTimer",
    value: function resetTimer() {
      this.clearTimer();
      // onBlur both clears the timer and causes an update, which is what
      // needs to happen on timeout, so call that on timeout.
      this.timer = setTimeout(this.onBlur.bind(this), 1500);
    }

    // To be called whenever the "onInput" event occurs, which for text fields
    // is on keystrokes. This will validate the new input (without updating),
    // and reset the keystroke timer so that an update doesn't occur until
    // after the last keystroke.

  }, {
    key: "onInput",
    value: function onInput() {
      this.checkInput();
      this.resetTimer();
    }

    // To be called when the text field loses focus. This will clear the timer,
    // and attempt to update (success depends on validation).

  }, {
    key: "onBlur",
    value: function onBlur() {
      this.clearTimer();
      this.update();
    }

    // When component is recieving new props, check if there is new input. If so,
    // must reset the value of the text field to match the new input. Also validate
    // the new input, and clear the timer.

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.input && nextProps.input != this.getInput()) {
        $("#" + this.props.id + "-control").val(nextProps.input);
        var validationResult = this.props.validate(nextProps.input);
        this.state.validationStatus = validationResult.validationStatus;
        this.state.validationMessage = validationResult.validationMessage;
      }

      this.clearTimer();
    }

    // In the HTML, the text control takes the form of a form-group with a validation
    // class (Bootstrap). Use the update, validation, and other props to set the
    // correct callbacks on DOM events.

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { id: this.props.id, className: this.props.className },
        React.createElement(
          "div",
          { className: "form-group has-feedback " + this.getValidationClass() },
          React.createElement(
            "label",
            { id: this.props.id + "-label", className: "control-label", "for": this.props.id + "-control" },
            this.props.label,
            " "
          ),
          React.createElement("input", { id: this.props.id + "-control", className: "form-control", type: "text", defaultValue: this.props.input || '', onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this) }),
          React.createElement(
            "span",
            { id: this.props.id + "-help", className: "help-block" },
            this.state.validationMessage,
            " "
          )
        )
      );
    }
  }]);

  return TextControl;
}(DataControl);

// Use an empty span to fill columns with empty space. Makes alignment easier.
// Bootstraps column offset seems to absolutely refer to a specific column, not to
// the previous component in the grid. So at times this may be easier to use.


var FormBlank = function (_React$Component2) {
  _inherits(FormBlank, _React$Component2);

  function FormBlank() {
    _classCallCheck(this, FormBlank);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormBlank).apply(this, arguments));
  }

  _createClass(FormBlank, [{
    key: "render",
    value: function render() {
      return React.createElement("span", { className: this.props.className });
    }
  }]);

  return FormBlank;
}(React.Component);

// ButtonControl components simply place a button in Bootstraps grid system
// and call a callback when the onClick DOM event occurs. Optionally a validation
// state may be passed in the props. However ButtonControl does not extend
// DataControl because it does not have any state that represents any data; it's
// input is simply the triggering of an event.


var ButtonControl = function (_React$Component3) {
  _inherits(ButtonControl, _React$Component3);

  function ButtonControl() {
    _classCallCheck(this, ButtonControl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonControl).apply(this, arguments));
  }

  _createClass(ButtonControl, [{
    key: "getValidationClass",

    // utility method for getting the Bootstrap validation class
    value: function getValidationClass() {
      if (this.props.validation == "success") return "has-success";
      if (this.props.validation == "warning") return "has-warning";
      if (this.props.validation == "error") return "has-error";
      return "";
    }

    // utility method for getting the Bootstrap context class

  }, {
    key: "getTextContext",
    value: function getTextContext() {
      if (this.props.validation == "success") return "text-success";
      if (this.props.validation == "warning") return "text-warning";
      if (this.props.validation == "error") return "text-danger";
      return "";
    }

    // Buttons are placed in a form-group for the purpose of having the validation
    // classes work for Bootstrap. Depending on if the ButtonControl component
    // belongs to the "disabled" class or not, the render function will pick between
    // a button with the disabled prop, and a button without a disabled prop.

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { className: this.props.className },
        React.createElement(
          "div",
          { className: "form-group has-feedback " + this.getValidationClass() },
          React.createElement(
            "label",
            { className: "control-label" },
            this.props.label,
            " "
          ),
          this.props.className.split(' ').includes("disabled") ? React.createElement(
            "button",
            { type: "button", className: "btn btn-default " + this.getTextContext(), disabled: "disabled", style: { width: "100%" }, onClick: this.props.onClick },
            this.props.content
          ) : React.createElement(
            "button",
            { type: "button", className: "btn btn-default " + this.getTextContext(), style: { width: "100%" }, onClick: this.props.onClick },
            this.props.content
          ),
          React.createElement(
            "span",
            { className: "help-block" },
            this.props.message,
            " "
          )
        )
      );
    }
  }]);

  return ButtonControl;
}(React.Component);

// Sometimes it's useful to put text in a form.
// Just like the ButtonControl component, this component can take a
// validation prop to style with Bootstrap's context classes.


var FormText = function (_React$Component4) {
  _inherits(FormText, _React$Component4);

  function FormText() {
    _classCallCheck(this, FormText);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormText).apply(this, arguments));
  }

  _createClass(FormText, [{
    key: "getValidationClass",

    // utility method for getting the Bootstrap validation class
    value: function getValidationClass() {
      if (this.props.validation == "success") return "has-success";
      if (this.props.validation == "warning") return "has-warning";
      if (this.props.validation == "error") return "has-error";
      return "";
    }

    // utility method for getting the Bootstrap context class

  }, {
    key: "getTextContext",
    value: function getTextContext() {
      if (this.props.validation == "success") return "text-success";
      if (this.props.validation == "warning") return "text-warning";
      if (this.props.validation == "error") return "text-danger";
      return "";
    }

    // The content is placed in a form-group for the purpose of having the validation
    // classes work for Bootstrap.

  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { className: this.props.className },
        React.createElement(
          "div",
          { className: "form-group has-feedback " + this.getValidationClass() },
          React.createElement(
            "label",
            { className: "control-label" },
            this.props.label,
            " "
          ),
          React.createElement(
            "strong",
            null,
            React.createElement(
              "p",
              { className: "form-control-static " + this.getTextContext() },
              this.props.content
            )
          ),
          React.createElement(
            "span",
            { className: "help-block" },
            this.props.message,
            " "
          )
        )
      );
    }
  }]);

  return FormText;
}(React.Component);

var Solution = function (_React$Component5) {
  _inherits(Solution, _React$Component5);

  function Solution() {
    _classCallCheck(this, Solution);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Solution).apply(this, arguments));
  }

  _createClass(Solution, [{
    key: "render",
    value: function render() {
      var input = parseInput(this.props.input);
      var _limit$factors = { limit: input.get('limit'), factors: input.get('factors') };
      var limit = _limit$factors.limit;
      var factors = _limit$factors.factors;

      factors = factors.toArray();
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
          "div",
          { className: "container" },
          React.createElement(
            "h3",
            null,
            "Answer"
          ),
          React.createElement(
            "div",
            { className: "well" },
            sum
          )
        ),
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
        )
      );
    }
  }]);

  return Solution;
}(React.Component);

var SubSolution = function (_React$Component6) {
  _inherits(SubSolution, _React$Component6);

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

function parseInput(input) {
  var nums = naturalNumsInStr(input);
  if (nums.length == 0) {
    return Immutable.Map({ limit: undefined, factors: [] });
  } else if (nums.length == 1) {
    return Immutable.Map({ limit: nums[0], factors: [] });
  } else {
    var _Immutable$List;

    var limit = nums[nums.length - 1];
    var factors = (_Immutable$List = Immutable.List).of.apply(_Immutable$List, _toConsumableArray(nums.splice(0, nums.length - 1)));
    return Immutable.Map({ limit: limit, factors: factors });
  }
}

function factorsToStr(factors) {
  var factorStr = "";
  for (var i = 0; i < factors.size; i++) {
    if (i == factors.size - 1) {
      factorStr += factors.get(i);
    } else if (i == factors.size - 2) {
      factorStr += factors.get(i) + ' or ';
    } else {
      factorStr += factors.get(i) + ', ';
    }
  }
  return factorStr;
}

var Question = function (_React$Component7) {
  _inherits(Question, _React$Component7);

  function Question() {
    _classCallCheck(this, Question);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Question).apply(this, arguments));
  }

  _createClass(Question, [{
    key: "render",
    value: function render() {
      var _limit$factors2 = { limit: this.props.input.get('limit'), factors: this.props.input.get('factors') };
      var limit = _limit$factors2.limit;
      var factors = _limit$factors2.factors;


      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h3",
          null,
          "Problem"
        ),
        React.createElement(
          "div",
          { className: "well" },
          "If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.",
          React.createElement("br", null),
          React.createElement("br", null),
          "Find the sum of all the multiples of ",
          factorsToStr(factors),
          " below ",
          limit,
          "."
        )
      );
    }
  }]);

  return Question;
}(React.Component);

var LimitInput = function (_React$Component8) {
  _inherits(LimitInput, _React$Component8);

  function LimitInput() {
    _classCallCheck(this, LimitInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LimitInput).apply(this, arguments));
  }

  _createClass(LimitInput, [{
    key: "update",
    value: function update(input) {
      this.props.update(parseInt(input));
    }
  }, {
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

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "text-center" },
          "Limit"
        ),
        React.createElement(
          "form",
          { className: "container" },
          React.createElement(FormBlank, { className: "col-md-2 col-xs-0" }),
          React.createElement(TextControl, { className: "col-md-8 col-sm-12 col-xs-12", input: '' + this.props.input, id: "limit", label: "Limit", validate: validate, update: this.update.bind(this) }),
          React.createElement(FormBlank, { className: "col-md-2 col-xs-0" })
        )
      );
    }
  }]);

  return LimitInput;
}(React.Component);

var FactorInputs = function (_React$Component9) {
  _inherits(FactorInputs, _React$Component9);

  function FactorInputs() {
    _classCallCheck(this, FactorInputs);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FactorInputs).apply(this, arguments));
  }

  _createClass(FactorInputs, [{
    key: "updateFactor",
    value: function updateFactor(index, value) {
      this.props.update(this.props.input.set(index, value));
    }
  }, {
    key: "insertFactor",
    value: function insertFactor(index, value) {
      if (this.props.input.size > 0) {
        this.props.update(this.props.input.insert(index, value));
      } else {
        this.props.update(Immutable.List([value]));
      }
    }
  }, {
    key: "deleteFactor",
    value: function deleteFactor(index) {
      this.props.update(this.props.input.delete(index));
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

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

      var numFactors = this.props.input.size;
      var factorInputs = [React.createElement(
        "div",
        { className: "row" },
        React.createElement(FormBlank, { className: "col-md-2 hidden-xs hidden-sm" }),
        React.createElement(ButtonControl, { className: "col-md-1 col-xs-2", onClick: function onClick(event) {
            return _this11.insertFactor(0, 2);
          }, label: "Add", content: React.createElement("span", { className: "glyphicon glyphicon-plus" }) }),
        React.createElement(FormBlank, { className: "col-md-9 col-xs-10" })
      )];

      var isDisabled = numFactors == 1 ? " disabled" : "";

      var _loop = function _loop(i) {
        factorInputs.push(React.createElement(
          "div",
          { className: "row" },
          React.createElement(FormBlank, { className: "col-md-2 hidden-xs hidden-sm" }),
          React.createElement(ButtonControl, { label: "Remove", className: "col-md-1 col-xs-2" + isDisabled, onClick: function onClick(event) {
              return _this11.deleteFactor(i);
            }, content: React.createElement("span", { className: "glyphicon glyphicon-minus" }) }),
          React.createElement(TextControl, { className: "col-md-7 col-xs-10", id: "factor" + i, validate: validate, input: _this11.props.input.get(i), label: "Factor " + i, update: function update(value) {
              return _this11.updateFactor(i, value);
            } }),
          React.createElement(FormBlank, { className: "col-md-2 hidden-xs hidden-sm" })
        ));
        factorInputs.push(React.createElement(
          "div",
          { className: "row" },
          React.createElement(FormBlank, { className: "col-md-2 hidden-xs hidden-sm" }),
          React.createElement(ButtonControl, { onClick: function onClick(event) {
              return _this11.insertFactor(i + 1, 2);
            }, label: "Add", className: "col-md-1 col-xs-2", content: React.createElement("span", { className: "glyphicon glyphicon-plus" }) }),
          React.createElement(FormBlank, { className: "col-md-9 col-xs-10" })
        ));
      };

      for (var i = 0; i < numFactors; i++) {
        _loop(i);
      }

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          { className: "text-center" },
          "Factors"
        ),
        React.createElement(
          "form",
          { className: "container" },
          factorInputs
        )
      );
    }
  }]);

  return FactorInputs;
}(React.Component);

var ProblemForm = function (_React$Component10) {
  _inherits(ProblemForm, _React$Component10);

  function ProblemForm() {
    _classCallCheck(this, ProblemForm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProblemForm).apply(this, arguments));
  }

  _createClass(ProblemForm, [{
    key: "updateLimit",
    value: function updateLimit(limit) {
      this.props.update(this.props.input.set('limit', limit));
    }
  }, {
    key: "updateFactors",
    value: function updateFactors(factors) {
      this.props.update(this.props.input.set('factors', factors));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(LimitInput, { input: this.props.input.get('limit'), update: this.updateLimit.bind(this) }),
        React.createElement(FactorInputs, { input: this.props.input.get('factors'), update: this.updateFactors.bind(this) })
      );
    }
  }]);

  return ProblemForm;
}(React.Component);

// return an array of all the natrual numbers found in str


function naturalNumsInStr(str) {
  // check if a character is a valid decimal digit
  function charIsDigit(char) {
    var result = false;
    switch (char) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        result = true;
    }
    return result;
  }

  // get the value of a valid digit character
  function digitValue(char) {
    var result = void 0;
    switch (char) {
      case '0':
        result = 0;
        break;
      case '1':
        result = 1;
        break;
      case '2':
        result = 2;
        break;
      case '3':
        result = 3;
        break;
      case '4':
        result = 4;
        break;
      case '5':
        result = 5;
        break;
      case '6':
        result = 6;
        break;
      case '7':
        result = 7;
        break;
      case '8':
        result = 8;
        break;
      case '9':
        result = 9;
        break;
    }
    return result;
  }

  // always end with a non digit char to make sure final number is pushed on result
  str += '_';

  var curNat = void 0;
  var result = [];
  var prevCharIsDigit = false;
  var curCharIsDigit = void 0;

  // scan string for decimal natural numbers and push onto result
  for (var i = 0; i < str.length; i++) {
    var curChar = str[i];
    curCharIsDigit = charIsDigit(curChar);

    if (curCharIsDigit) {
      // current char is digit, update current natrual number
      if (!prevCharIsDigit) {
        // initialize the current natrual number if this is the first digit in the number
        curNat = 0;
      }

      // update the natrual number
      curNat *= 10;
      curNat += digitValue(curChar);
    } else {
      // cur char is not a digit
      if (prevCharIsDigit) {
        // but the last one was, so push the value of the previous natural number onto result
        result.push(curNat);
      }
    }

    // the current char becomes the previous char at the end of the loop
    prevCharIsDigit = curCharIsDigit;
  }

  return result;
}

var Problem = function (_React$Component11) {
  _inherits(Problem, _React$Component11);

  function Problem() {
    _classCallCheck(this, Problem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Problem).apply(this, arguments));
  }

  _createClass(Problem, [{
    key: "update",
    value: function update(input) {
      var _limit$factors3 = { limit: input.get('limit'), factors: input.get('factors') };
      var limit = _limit$factors3.limit;
      var factors = _limit$factors3.factors;

      var factorsStr = factorsToStr(factors).replace(/\s+/g, '');
      this.props.update("sumMultiplesOf" + factorsStr + "below" + limit);
    }
  }, {
    key: "render",
    value: function render() {
      var input = parseInput(this.props.input);
      return React.createElement(
        "div",
        null,
        React.createElement(Question, { input: input }),
        React.createElement(ProblemForm, { input: input, update: this.update.bind(this) })
      );
    }
  }]);

  return Problem;
}(React.Component);

window.components.problem = Problem;
window.components.solution = Solution;
window.defaultInput = "sumMultiplesOf3or5below1000";
