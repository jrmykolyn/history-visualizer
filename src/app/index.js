const React = require('react');
const { connect } = require('react-redux');
const { addFrame, selectFrame } = require('../actions');
const { default: Stack } = require('./components/stack/Stack');

export class App extends React.Component {
  render() {
    return (<Stack api={ this.props.api } />);
  }
}

const mapStateToProps = (state) => ({ frames: state.frames });

const mapDispatchToProps = () => ({ addFrame, selectFrame });

export default connect(mapStateToProps, mapDispatchToProps)(App);
