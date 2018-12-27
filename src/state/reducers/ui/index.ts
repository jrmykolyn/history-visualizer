import { Actions, Types as ActionTypes, UiActions } from '../../actions';
import { INITIAL_STATE, State } from '..';

export const ui = (state: State.Ui = INITIAL_STATE.ui, action: UiActions) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_DRAWER: return toggleDrawer(state);
    case ActionTypes.TOGGLE_MODAL: return toggleModal(state, <Actions.Ui.ToggleModal>action);
    default: return state;
  }
};

export const toggleDrawer = (state: State.Ui) =>
  ({ ...state, drawer: { ...state.drawer, isOpen: !state.drawer.isOpen } });

export const toggleModal = (state: State.Ui, action: Actions.Ui.ToggleModal) =>
  ({ ...state, modal: { ...state.modal, isOpen: !state.modal.isOpen, selectedEntry: action.payload || 0 } });

export default ui;
