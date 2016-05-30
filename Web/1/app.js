class Main extends React.Component {
  render() {
    return (
      <Solution limit={1000} factors={[3,5]} />
    );
  }
}

class Solution extends React.Component {
  render() {
    let factorHeaders = this.props.factors.map(factor => <th>Divisible by {factor}</th>);

    let subSolutions = [];

    let sum = 0;
    for(var i = 1; i < this.props.limit; i++) {
      let divisibilities = this.props.factors.map(factor => i % factor == 0);
      let isDivisible = divisibilities.reduce((prev, cur, index, arr) => (prev || cur), false);
      sum += isDivisible ? i : 0;
      subSolutions.push({num: i, divisibilities, isDivisible, sum});
    }

    return(
      <table className="solution" style={{width: "100%"}}>
        <tr>
          <th>Number</th>
          <th>New Sum</th>
          {factorHeaders}
        </tr>
        {subSolutions.map(subSolution => <SubSolution num={subSolution.num} sum={subSolution.sum} divisibilities={subSolution.divisibilities} isDivisible={subSolution.isDivisible} />)}
      </table>
    );
  }
}

class SubSolution extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.num}</td>
        <td style={this.props.isDivisible ? {'background-color': '#ffffff', 'color':'#008800'} : {'background-color': '#aaaaaa', 'color': '#aa0000'}}>{this.props.isDivisible ? this.props.sum : 'not divisible by any factor'}</td>
        {this.props.divisibilities.map(divisibility => <td style={{'background-color': divisibility ? "#aaffaa" : "#ffaaaa"}}>{divisibility ? "true" : "false"}</td>)}
      </tr>
    );
  }
}

window.Main = Main;
