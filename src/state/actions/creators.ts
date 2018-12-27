import { State } from '..';
import { Types as ActionTypes } from '.';

export const addFrame = (frame: State.Frame) => ({ type: ActionTypes.ADD_FRAME, payload: frame });

export const incrementCount = () => ({ type: ActionTypes.INCREMENT_COUNT });

export const selectFrame = (n: number) => ({ type: ActionTypes.SELECT_FRAME, payload: n });

export const setCount = (n: number) => ({ type: ActionTypes.SET_COUNT, payload: n });

export const toggleDrawer = () => ({ type: ActionTypes.TOGGLE_DRAWER });

export const toggleModal = (n?: number) => ({ type: ActionTypes.TOGGLE_MODAL, payload: n });
