const React = require('react');
const { connect } = require('react-redux');
const { toggleModal } = require('../../../actions');

export class Modal extends React.Component {
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

const mapDispatchToProps = (dispatch) => ({
  toggleModal: () => dispatch(toggleModal()),
});

const mapStateToProps = (state) => {
  return ({
    selected: state.frames.entries[state.ui.modalSelectedEntry],
    isOpen: state.ui.modalIsOpen,
    index: state.ui.modalSelectedEntry,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
