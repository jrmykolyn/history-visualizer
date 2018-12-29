import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Frame } from '..';
import './index.css';
import { Historyish } from '../../../core';
import { ActionCreators, State } from '../../../state';

export class Stack extends React.Component<Stack.Props> {
  constructor(props: Stack.Props) {
    super(props);

    this.onFrameClick = this.onFrameClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
  }

  render() {
    return (
      <div className={ this.props.drawer.isOpen ? 'ui is-active' : 'ui' }>
        <div className="stack">
        {
          this.props.frames.entries.length
            ? this.props.frames.entries.map((frame: State.Frame, i: number) => <Frame frame={frame} isActive={i === this.props.frames.current} onClick={ e => this.onFrameClick(e, i) } onEntryClick={ () => this.props.toggleModal(i) } />)
            : ''
        }
        </div>
        <button onClick={ this.onToggleClick }>
          <span></span>
        </button>
      </div>
    );
  }

  onFrameClick(e: React.MouseEvent<HTMLAnchorElement>, n: number) {
    e.preventDefault();
    this.props.api.go(this.props.frames.current - n);
  }

  onToggleClick(e: React.MouseEvent) {
    e.preventDefault();
    this.props.toggleDrawer();
  }
}

const mapStateToProps = (state: { frames: State.Frames; ui: State.Ui }) => ({ frames: state.frames, drawer: state.ui.drawer });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // TODO: Figure out why returning a plain object does not dispatch.
  toggleDrawer: () => dispatch(ActionCreators.toggleDrawer()),
  toggleModal: (i: number) => dispatch(ActionCreators.toggleModal(i)),
});

export namespace Stack {
  export interface Props {
    api: Historyish;
    drawer: State.Drawer;
    frames: State.Frames;
    toggleDrawer: () => void;
    toggleModal: (i: number) => void;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
