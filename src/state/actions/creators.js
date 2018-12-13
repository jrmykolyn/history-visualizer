import { Actions } from '.';

export const addFrame = frame => ({ type: Actions.ADD_FRAME, payload: frame });

export const selectFrame = n => ({ type: Actions.SELECT_FRAME, payload: n });

export const toggleDrawer = () => ({ type: Actions.TOGGLE_DRAWER });

export const toggleModal = n => ({ type: Actions.TOGGLE_MODAL, payload: n });
