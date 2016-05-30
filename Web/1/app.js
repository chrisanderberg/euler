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
        <table className="solution" style={{width: "100%"}}>
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
        <a href={"#/" + (this.props.limit + 50) + this.props.factors.reduce((factors, factor) => factors + factor + '/', '/')}>Next 50</a>
      </div>
    );
  }
}

class SubSolution extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.num}</td>
        <td style={this.props.isDivisible ? {'backgroundColor': '#aaaaff', 'color':'#000088'} : {}}>{this.props.sum}</td>
        {this.props.divisibilities.map((divisibility, index) => <td key={index} style={{'backgroundColor': divisibility ? "#aaffaa" : "#ffaaaa"}}>{divisibility ? "Yes" : "No"}</td>)}
      </tr>
    );
  }
}

window.Main = Main;
window.defaultParams = ['1000', '3', '5'];
