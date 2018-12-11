const React = require('react');
const { connect } = require('react-redux');
const { default: Stack } = require('./components/stack/Stack');

export class App extends React.Component {
  render() {
    return (<Stack api={ this.props.api } />);
  }
}

export default connect()(App);
