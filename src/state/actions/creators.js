import { Actions } from '.';

export const addFrame = frame => ({ type: Actions.ADD_FRAME, payload: frame });

export const incrementCount = () => ({ type: Actions.INCREMENT_COUNT });

export const selectFrame = n => ({ type: Actions.SELECT_FRAME, payload: n });

export const setCount = n => ({ type: Actions.SET_COUNT, payload: n });

export const toggleDrawer = () => ({ type: Actions.TOGGLE_DRAWER });

export const toggleModal = n => ({ type: Actions.TOGGLE_MODAL, payload: n });
