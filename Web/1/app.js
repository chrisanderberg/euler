// Define a base class for input, such as text fields
// Manages updates and validation
//
// Classes that extend this one must implement a getInput method that
// returns the current input. Since different controls may have different
// methods for managing state and input, it can not be implemented here.
class DataControl extends React.Component {
  constructor(props) {
    super(props);

    // do initial validation on the input given through the props
    this.state = {};
    let validationResult = this.props.validate(this.props.input || '');
    this.state.validationStatus = validationResult.validationStatus;
    this.state.validationMessage = validationResult.validationMessage;
  }

  // check the input for errors and set the state
  checkInput() {
    let validationResult = this.props.validate(this.getInput());
    this.setState(validationResult);
  }

  // if the input is valid, pass it to the update callback
  update() {
    // check the current input to make sure the current validation state matches
    this.checkInput();

    // update only if the input passes validation with no errors (warnings allowed)
    if(this.state.validationStatus != "error") {
      this.props.update(this.getInput());
    } else {
      //console.log("Input Validation Error, could not update!");
    }
  }

  // Bootstrap has validation classes for styling forms. Useful utility method
  getValidationClass() {
    return "has-" + this.state.validationStatus;
  }

  // Bootstrap also has validation glyphcons. Another useful utility method
  getValidationGlyphicon() {
    switch(this.state.validationStatus) {
      case "error":
        return "glyphicon-remove";
      case "warning":
        return "glyphicon-warning-sign";
      case "success":
        return "glyphicon-ok";
    }
  }
}

// TextControl components are a type of DataControl that uses text for input.
// They will attempt to update after a short period of inactivity after
// keystrokes stop, or after the text field loses focus. As other data
// controls, they will only successfully update when the validation function
// doesn't return an error when checking input.
class TextControl extends DataControl {
  constructor(props) {
    super(props);
    // make sure the timer used for updating after typing is cleared
    this.clearTimer();
  }

  // Every extending class of DataControl must implement this method.
  // Use jQuery to get the current value of the actual text html
  // element as the input to this data control.
  getInput() {
    return $("#" + this.props.id + "-control").val();
  }

  // The timer for updating after keystrokes finish is guarunteed to be
  // cleared after running this function.
  clearTimer() {
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // Reset the keystroke timer. Intended to be called whenever a keystroke
  // occurs.
  resetTimer() {
    this.clearTimer();
    // onBlur both clears the timer and causes an update, which is what
    // needs to happen on timeout, so call that on timeout.
    this.timer = setTimeout(this.onBlur.bind(this), 1500);
  }

  // To be called whenever the "onInput" event occurs, which for text fields
  // is on keystrokes. This will validate the new input (without updating),
  // and reset the keystroke timer so that an update doesn't occur until
  // after the last keystroke.
  onInput() {
    this.checkInput();
    this.resetTimer();
  }

  // To be called when the text field loses focus. This will clear the timer,
  // and attempt to update (success depends on validation).
  onBlur() {
    this.clearTimer();
    this.update();
  }

  // When component is recieving new props, check if there is new input. If so,
  // must reset the value of the text field to match the new input. Also validate
  // the new input, and clear the timer.
  componentWillReceiveProps(nextProps) {
    if(nextProps.input && nextProps.input != this.getInput()) {
      $("#" + this.props.id + "-control").val(nextProps.input);
      let validationResult = this.props.validate(nextProps.input);
      this.state.validationStatus = validationResult.validationStatus;
      this.state.validationMessage = validationResult.validationMessage;
    }

    this.clearTimer();
  }

  // In the HTML, the text control takes the form of a form-group with a validation
  // class (Bootstrap). Use the update, validation, and other props to set the
  // correct callbacks on DOM events.
  render() {
    return(
      <span id={this.props.id} className={this.props.className}>
        <div className={"form-group has-feedback " + this.getValidationClass()}>
          <label id={this.props.id + "-label"} className="control-label" for={this.props.id + "-control"}>{this.props.label}&nbsp;</label>
          <input id={this.props.id + "-control"} className="form-control" type="text" defaultValue={this.props.input || ''} onBlur={this.onBlur.bind(this)} onInput={this.onInput.bind(this)}></input>
          <span id={this.props.id + "-help"} className="help-block">{this.state.validationMessage}&nbsp;</span>
        </div>
      </span>
    );
  }
}

// Use an empty span to fill columns with empty space. Makes alignment easier.
// Bootstraps column offset seems to absolutely refer to a specific column, not to
// the previous component in the grid. So at times this may be easier to use.
class FormBlank extends React.Component {
  render() {
    return(
      <span className={this.props.className}></span>
    );
  }
}

// ButtonControl components simply place a button in Bootstraps grid system
// and call a callback when the onClick DOM event occurs. Optionally a validation
// state may be passed in the props. However ButtonControl does not extend
// DataControl because it does not have any state that represents any data; it's
// input is simply the triggering of an event.
class ButtonControl extends React.Component {
  // utility method for getting the Bootstrap validation class
  getValidationClass() {
    if(this.props.validation == "success") return "has-success";
    if(this.props.validation == "warning") return "has-warning";
    if(this.props.validation == "error") return "has-error";
    return "";
  }

  // utility method for getting the Bootstrap context class
  getTextContext() {
    if(this.props.validation == "success") return "text-success";
    if(this.props.validation == "warning") return "text-warning";
    if(this.props.validation == "error") return "text-danger";
    return "";
  }

  // Buttons are placed in a form-group for the purpose of having the validation
  // classes work for Bootstrap. Depending on if the ButtonControl component
  // belongs to the "disabled" class or not, the render function will pick between
  // a button with the disabled prop, and a button without a disabled prop.
  render() {
    return(
      <span className={this.props.className}>
        <div className={"form-group has-feedback " + this.getValidationClass()}>
          <label className="control-label">{this.props.label}&nbsp;</label>
          {this.props.className.split(' ').includes("disabled") ?
            <button type="button" className={"btn btn-default " + this.getTextContext()} disabled="disabled" style={{width: "100%"}} onClick={this.props.onClick}>{this.props.content}</button>
            : <button type="button" className={"btn btn-default " + this.getTextContext()} style={{width: "100%"}} onClick={this.props.onClick}>{this.props.content}</button>
          }
          <span className="help-block">{this.props.message}&nbsp;</span>
        </div>
      </span>
    );
  }
}

// Sometimes it's useful to put text in a form.
// Just like the ButtonControl component, this component can take a
// validation prop to style with Bootstrap's context classes.
class FormText extends React.Component {
  // utility method for getting the Bootstrap validation class
  getValidationClass() {
    if(this.props.validation == "success") return "has-success";
    if(this.props.validation == "warning") return "has-warning";
    if(this.props.validation == "error") return "has-error";
    return "";
  }

  // utility method for getting the Bootstrap context class
  getTextContext() {
    if(this.props.validation == "success") return "text-success";
    if(this.props.validation == "warning") return "text-warning";
    if(this.props.validation == "error") return "text-danger";
    return "";
  }

  // The content is placed in a form-group for the purpose of having the validation
  // classes work for Bootstrap.
  render() {
    return(
      <span className={this.props.className}>
        <div className={"form-group has-feedback " + this.getValidationClass()}>
          <label className="control-label">{this.props.label}&nbsp;</label>
          <strong><p className={"form-control-static "+ this.getTextContext()} >{this.props.content}</p></strong>
          <span className="help-block">{this.props.message}&nbsp;</span>
        </div>
      </span>
    );
  }
}

class Solution extends React.Component {
  render() {
    let input = parseInput(this.props.input);
    let {limit, factors} = {limit: input.get('limit'), factors: input.get('factors')};
    factors = factors.toArray();
    let factorHeaders = factors.map((factor, index) => <th key={index}>Multiple of {factor}</th>);
    let subSolutions = [];

    let sum = 0;
    for(var i = 1; i < limit; i++) {
      let divisibilities = factors.map(factor => i % factor == 0);
      let isDivisible = divisibilities.reduce((prev, cur, index, arr) => (prev || cur), false);
      sum += isDivisible ? i : 0;
      subSolutions.push({num: i, divisibilities, isDivisible, sum});
    }

    return(
      <div>
        <div className="container">
          <h3>Answer</h3>
          <div className="well">
            {sum}
          </div>
        </div>
        <table className="solution table table-striped table-bordered" style={{width: "100%"}}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Cumulative Sum</th>
              {factorHeaders}
            </tr>
          </thead>
          <tbody>
            {subSolutions.map(subSolution =>
              <SubSolution key={subSolution.num} num={subSolution.num} sum={subSolution.sum} divisibilities={subSolution.divisibilities} isDivisible={subSolution.isDivisible} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

class SubSolution extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.num}</td>
        <td className={this.props.isDivisible ? "text-info" : ""}>{this.props.sum}</td>
        {this.props.divisibilities.map((divisibility, index) => divisibility ? <td key={index} className="text-success">Yes</td> : <td key={index}>No</td>)}
      </tr>
    );
  }
}

function parseInput(input) {
  let nums = naturalNumsInStr(input);
  if(nums.length == 0) {
    return Immutable.Map({limit: undefined, factors: []});
  } else if(nums.length == 1) {
    return Immutable.Map({limit: nums[0], factors: []});
  } else {
    let limit = nums[nums.length - 1];
    let factors = Immutable.List.of(...nums.splice(0, nums.length - 1));
    return Immutable.Map({limit, factors});
  }
}

function factorsToStr(factors) {
  let factorStr = "";
  for(let i = 0; i < factors.size; i++) {
    if(i == factors.size - 1) {
      factorStr += factors.get(i);
    } else if(i == factors.size - 2) {
      factorStr += factors.get(i) + ' or ';
    } else {
      factorStr += factors.get(i) + ', ';
    }
  }
  return factorStr;
}

class Question extends React.Component {
  render() {
    let {limit, factors} = {limit: this.props.input.get('limit'), factors: this.props.input.get('factors')};

    return(
      <div className="container">
        <h3>Problem</h3>
        <div className="well">
          If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
          <br />
          <br />
          Find the sum of all the multiples of {factorsToStr(factors)} below {limit}.
        </div>
      </div>
    );
  }
}

class LimitInput extends React.Component {
  update(input) {
    this.props.update(parseInt(input));
  }

  render() {
    let validate = function(input) {
      let validationMessage = "Limit set to " + input;
      let validationStatus = "success";

      let value =  parseInt(input);

      if(isNaN(value) || value <= 0) {
        validationStatus = "error";
        validationMessage = "Must enter a positive integer!";
      } else {
        if(value >= 2000) {
          validationStatus = "warning";
          validationMessage = "App gets slow when using really big numbers.";
        }
      }

      return {validationStatus, validationMessage};
    }

    return(
      <div>
        <h2 className="text-center">Limit</h2>
        <form className="container">
          <FormBlank className="col-md-2 col-xs-0" />
          <TextControl className="col-md-8 col-sm-12 col-xs-12" input={'' + this.props.input} id="limit" label="Limit" validate={validate} update={this.update.bind(this)} />
          <FormBlank className="col-md-2 col-xs-0" />
        </form>
      </div>
    );
  }
}

class FactorInputs extends React.Component {
  updateFactor(index, value) {
    this.props.update(this.props.input.set(index, value));
  }

  insertFactor(index, value) {
    if(this.props.input.size > 0) {
      this.props.update(this.props.input.insert(index, value));
    } else {
      this.props.update(Immutable.List([value]));
    }
  }

  deleteFactor(index) {
    this.props.update(this.props.input.delete(index));
  }

  render() {
    let validate = function(input) {
      let validationMessage = "Factor set to " + input;
      let validationStatus = "success";

      let value =  parseInt(input);

      if(isNaN(value) || value <= 0) {
        validationStatus = "error";
        validationMessage = "Must enter a positive integer!";
      }

      return {validationStatus, validationMessage};
    }

    let numFactors = this.props.input.size;
    let factorInputs = [
      <div className="row">
        <FormBlank className="col-md-2 hidden-xs hidden-sm" />
        <ButtonControl className="col-md-1 col-xs-2" onClick={(event) => this.insertFactor(0, 2)} label="Add" content={<span className="glyphicon glyphicon-plus"></span>} />
        <FormBlank className="col-md-9 col-xs-10" />
      </div>
    ];

    let isDisabled = (numFactors == 1 ? " disabled" : "");

    for(let i=0; i < numFactors; i++) {
      factorInputs.push(
        <div className="row">
          <FormBlank className="col-md-2 hidden-xs hidden-sm" />
          <ButtonControl label="Remove" className={"col-md-1 col-xs-2" + isDisabled} onClick={event => this.deleteFactor(i)} content={<span className="glyphicon glyphicon-minus"></span>} />
          <TextControl className="col-md-7 col-xs-10" id={"factor" + i} validate={validate} input={this.props.input.get(i)} label={"Factor " + i} update={value => this.updateFactor(i, value)} />
          <FormBlank className="col-md-2 hidden-xs hidden-sm" />
        </div>
      );
      factorInputs.push(
        <div className="row">
          <FormBlank className="col-md-2 hidden-xs hidden-sm" />
          <ButtonControl onClick={(event) => this.insertFactor(i+1, 2)} label="Add" className="col-md-1 col-xs-2" content={<span className="glyphicon glyphicon-plus"></span>} />
          <FormBlank className="col-md-9 col-xs-10" />
        </div>
      );
    }

    return(
      <div>
        <h2 className="text-center">Factors</h2>
        <form className="container">
          {factorInputs}
        </form>
      </div>
    );
  }
}

class ProblemForm extends React.Component {
  updateLimit(limit) {
    this.props.update(this.props.input.set('limit', limit))
  }

  updateFactors(factors) {
    this.props.update(this.props.input.set('factors', factors));
  }

  render() {
    return(
      <div>
        <LimitInput input={this.props.input.get('limit')} update={this.updateLimit.bind(this)} />
        <FactorInputs input={this.props.input.get('factors')} update={this.updateFactors.bind(this)}/>
      </div>
    );
  }
}

// return an array of all the natrual numbers found in str
function naturalNumsInStr(str) {
  // check if a character is a valid decimal digit
  function charIsDigit(char) {
    let result = false;
    switch(char) {
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
    let result;
    switch(char) {
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

  let curNat;
  let result = [];
  let prevCharIsDigit = false;
  let curCharIsDigit;

  // scan string for decimal natural numbers and push onto result
  for(let i=0; i<str.length; i++) {
    let curChar = str[i];
    curCharIsDigit = charIsDigit(curChar);

    if(curCharIsDigit) {
      // current char is digit, update current natrual number
      if(!prevCharIsDigit) {
        // initialize the current natrual number if this is the first digit in the number
        curNat = 0;
      }

      // update the natrual number
      curNat *= 10;
      curNat += digitValue(curChar);
    } else {
      // cur char is not a digit
      if(prevCharIsDigit) {
        // but the last one was, so push the value of the previous natural number onto result
        result.push(curNat);
      }
    }

    // the current char becomes the previous char at the end of the loop
    prevCharIsDigit = curCharIsDigit
  }

  return result;
}

class Problem extends React.Component {
  update(input) {
    let {limit, factors} = {limit: input.get('limit'), factors: input.get('factors')};
    let factorsStr = factorsToStr(factors).replace(/\s+/g, '');
    this.props.update("sumMultiplesOf" + factorsStr + "below" + limit);
  }

  render() {
    let input = parseInput(this.props.input);
    return(
      <div>
        <Question input={input} />
        <ProblemForm input={input} update={this.update.bind(this)} />
      </div>
    );
  }
}

window.components.problem = Problem;
window.components.solution = Solution;
window.defaultInput = "sumMultiplesOf3or5below1000";
