const React = require('react');
const { connect } = require('react-redux');
const { default: Frame } = require('../frame/Frame');

export class Stack extends React.Component {
  render() {
    return (
      <div>
      {
        this.props.frames.entries.length
          ? this.props.frames.entries.map((frame, i) => <Frame frame={frame} isActive={i === this.props.frames.current} />)
          : ''
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ frames: state.frames });

export default connect(mapStateToProps, {})(Stack);
