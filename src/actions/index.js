export const Actions = {
  ADD_FRAME: 'ADD_FRAME',
  SELECT_FRAME: 'SELECT_FRAME',
};

export const addFrame = (frame) => ({ type: Actions.ADD_FRAME, payload: frame });

export const selectFrame = (n) => ({ type: Actions.SELECT_FRAME, payload: n });
