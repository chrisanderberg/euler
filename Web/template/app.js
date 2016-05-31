class Main extends React.Component {
  render() {
    return this.props.params.length > 0 ?
      <div>{this.props.params.map(str => (<div>{str}</div>))}</div> :
      <p style={{'color': 'red'}}>Empty Parameters</p>;
  }
}

window.Main = Main;
window.defaultParams = [];
