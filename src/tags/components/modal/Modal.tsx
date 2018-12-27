import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import './index.css';
import { ActionCreators, State } from '../../../state';

export class Modal extends React.Component<Modal.Props> {
  render() {
    return (
      <div className={ this.props.isOpen ? 'modal-wrapper is-active' : 'modal-wrapper' }>
        <div className="modal-overlay" onClick={ this.props.toggleModal }></div>
        <div className="modal">
          <pre>{ JSON.stringify(this.props.selected, null, 2) }</pre>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  toggleModal: () => dispatch(ActionCreators.toggleModal()),
});

const mapStateToProps = (state: { frames: State.Frames; ui: State.Ui }) => {
  return ({
    selected: state.frames.entries[state.ui.modal.selectedEntry],
    isOpen: state.ui.modal.isOpen,
    index: state.ui.modal.selectedEntry,
  });
}

export namespace Modal {
  export interface Props {
    isOpen: boolean;
    toggleModal: () => void;
    selected: State.Frame;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
