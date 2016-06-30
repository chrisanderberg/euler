class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    let validationResult = this.props.validate(this.getDefaultValue());
    this.state.validationStatus = validationResult.validationStatus;
    this.state.validationMessage = validationResult.validationMessage;
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = null;
  }

  getInput() {
    return $("#" + this.props.id).val();
  }

  onInput() {
    console.log("input");
    console.log(this);
    console.log(this.props);
    let validationResult = this.props.validate(this.getInput());
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(this.onBlur.bind(this), 1500);
    this.setState(validationResult);
  }

  onBlur() {
    console.log("blur");
    console.log(this);
    console.log(this.props);
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    let inputArr = window.hashToArr(window.location.hash);
    inputArr[this.props.hashIndex] = this.getInput();
    window.location.hash = window.arrToHash(inputArr);
  }

  getValidationClass() {
    return "has-" + this.state.validationStatus;
  }

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

  getDefaultValue() {
    return window.hashToArr(window.location.hash)[this.props.hashIndex];
  }

  componentWillReceiveProps(nextProps) {
    $("#" + this.props.id).val(this.getDefaultValue());
    let validationResult = this.props.validate(this.getDefaultValue());
    this.state.validationStatus = validationResult.validationStatus;
    this.state.validationMessage = validationResult.validationMessage;
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = null;
  }

  render() {
    return(
      <div className="form-horizontal">
        <div className={"form-group has-feedback " + this.getValidationClass()}>
          <label for={this.props.id} className={"control-label col-xs-" + this.props.labelCols}>{this.props.label}</label>
          <div className={"col-xs-" + this.props.inputCols}>
            <input type="text" className="form-control" id={this.props.id} defaultValue={this.getDefaultValue()} onBlur={this.onBlur.bind(this)} onInput={this.onInput.bind(this)} />
            <span className={"glyphicon form-control-feedback " + this.getValidationGlyphicon()} aria-hidden="true"></span>
            <span className="help-block has-error">{this.state.validationMessage}</span>
          </div>
        </div>
      </div>
    );
  }
}

class Answer extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="well">
          Answer: {this.props.answer}
        </div>
      </div>
    );
  }
}

class Solution extends React.Component {
  render() {
    let limit = parseInt(this.props.params[0]);
    let factors = this.props.params.slice(1).map(x => parseInt(x));
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
        <Answer answer={sum} />
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
        <a href={"#/" + (limit + 50) + factors.reduce((factorsUrl, factor) => factorsUrl + factor + '/', '/')}><button type="button" className="btn btn-primary">Next 50</button></a>
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

class Question extends React.Component {
  render() {
    let factorStr = "";
    for(let i = 1; i < this.props.params.length; i++) {
      if(i == this.props.params.length - 1) {
        factorStr += this.props.params[i];
      } else if(i == this.props.params.length - 2) {
        factorStr += this.props.params[i] + ' or ';
      } else {
        factorStr += this.props.params[i] + ', ';
      }
    }

    return(
      <div className="well">
        If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
        <br />
        <br />
        Find the sum of all the multiples of {factorStr} below {this.props.params[0]}.
      </div>
    );
  }
}

class LimitInput extends React.Component {
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
      <TextInput id="limit" validate={validate} hashIndex={0} label="Limit" labelCols="2" inputCols="4" />
    );
  }
}

class FactorInput extends React.Component {
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

    return(
      <TextInput id={"factor" + this.props.index} validate={validate} hashIndex={this.props.index} label={"Factor " + this.props.index} labelCols="2" inputCols="4" />
    );
  }
}

class ProblemForm extends React.Component {
  render() {
    return(
      <div>
        <LimitInput />
        <FactorInput index={1} />
        <FactorInput index={2} />
      </div>
    );
  }
}

class Problem extends React.Component {
  render() {
    return(
      <div className="container">
        <Question params={this.props.params} />
        <ProblemForm params={this.props.params} />
      </div>
    );
  }
}

window.components.problem = Problem;
window.components.solution = Solution;
window.defaultHash = "#/1000/3/5/";
