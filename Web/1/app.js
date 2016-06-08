class Main extends React.Component {
  render() {
    return (
      <Solution limit={parseInt(this.props.params[0])} factors={this.props.params.slice(1).map(x => parseInt(x))} />
    );
  }
}

class Solution extends React.Component {
  render() {
    let factorHeaders = this.props.factors.map((factor, index) => <th key={index}>Multiple of {factor}</th>);

    let subSolutions = [];

    let sum = 0;
    for(var i = 1; i < this.props.limit; i++) {
      let divisibilities = this.props.factors.map(factor => i % factor == 0);
      let isDivisible = divisibilities.reduce((prev, cur, index, arr) => (prev || cur), false);
      sum += isDivisible ? i : 0;
      subSolutions.push({num: i, divisibilities, isDivisible, sum});
    }

    return(
      <div>
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
        <a href={"#/" + (this.props.limit + 50) + this.props.factors.reduce((factors, factor) => factors + factor + '/', '/')}><button type="button" className="btn btn-primary">Next 50</button></a>
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

window.Main = Main;
window.defaultParams = ['1000', '3', '5'];
