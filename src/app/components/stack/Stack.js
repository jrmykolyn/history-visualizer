import React from 'react';
import { connect } from 'react-redux';
import { Frame } from '../frame/Frame';
import {
  toggleDrawer,
  toggleModal,
} from '../../../actions';

export class Stack extends React.Component {
  constructor() {
    super();

    this.onFrameClick = this.onFrameClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
  }

  render() {
    return (
      <div className={ this.props.drawer.isOpen ? 'ui is-active' : 'ui' }>
        <div className="stack">
        {
          this.props.frames.entries.length
            ? this.props.frames.entries.map((frame, i) => <Frame frame={frame} isActive={i === this.props.frames.current} onClick={ (e) => this.onFrameClick(e, i) } onEntryClick={ () => this.props.toggleModal(i) } />)
            : ''
        }
        </div>
        <button onClick={ this.onToggleClick }>
          <span></span>
        </button>
      </div>
    );
  }

  onFrameClick(e, n) {
    e.preventDefault();
    this.props.api.go(this.props.frames.current - n);
  }

  onToggleClick(e) {
    e.preventDefault();
    this.props.toggleDrawer();
  }
}

const mapStateToProps = state => ({ frames: state.frames, drawer: state.ui.drawer });

const mapDispatchToProps = dispatch => ({
  // TODO: Figure out why returning a plain object does not dispatch.
  toggleDrawer: (...args) => dispatch(toggleDrawer(...args)),
  toggleModal: (...args) => dispatch(toggleModal(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
