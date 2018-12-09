const React = require('react');
const { connect } = require('react-redux');
const { addFrame, selectFrame } = require('../actions');
const { default: Frame } = require('./components/frame/Frame');

export class App extends React.Component {
  render() {
   return (<div>{this.props.frames.entries.length ? this.props.frames.entries.map((frame, i) => <Frame frame={frame} isActive={i === this.props.frames.current} />) : ''}</div>);
  }
}

const mapStateToProps = (state) => ({ frames: state.frames });

const mapDispatchToProps = () => ({ addFrame, selectFrame });

export default connect(mapStateToProps, mapDispatchToProps)(App);
