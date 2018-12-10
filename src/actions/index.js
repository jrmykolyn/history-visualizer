export const Actions = {
  ADD_FRAME: 'ADD_FRAME',
  SELECT_FRAME: 'SELECT_FRAME',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
};

export const addFrame = (frame) => ({ type: Actions.ADD_FRAME, payload: frame });

export const selectFrame = (n) => ({ type: Actions.SELECT_FRAME, payload: n });

export const toggleDrawer = () => ({ type: Actions.TOGGLE_DRAWER });
