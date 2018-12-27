import { COUNT_KEY } from '../../../config';
import { Actions, Types as ActionTypes, FrameActions } from '../../actions';
import { INITIAL_STATE, State } from '..';

export const frames = (state: State.Frames = INITIAL_STATE.frames, action: FrameActions) => {
  switch (action.type) {
    case ActionTypes.ADD_FRAME: return addFrame(state, <Actions.Frames.AddFrame>action);
    case ActionTypes.INCREMENT_COUNT: return incrementCount(state);
    case ActionTypes.SELECT_FRAME: return selectFrame(state, <Actions.Frames.SelectFrame>action);
    case ActionTypes.SET_COUNT: return setCount(state, <Actions.Frames.SetCount>action);
    default: return state;
  }
};

export const addFrame = (state: State.Frames, action: Actions.Frames.AddFrame) => ({
  ...state,
  entries: [action.payload, ...state.entries.filter((e: State.Frame) => e.state[COUNT_KEY] < action.payload.state[COUNT_KEY])],
  current: 0,
});

export const incrementCount = (state: State.Frames) =>
  ({ ...state, count: state.count + 1 });

export const selectFrame = (state: State.Frames, action: Actions.Frames.SelectFrame) => {
  const entry = state.entries
    .map((e: State.Frame, i: number) => ({ ...e, index: i }))
    .filter((e: State.Frame) => e.state[COUNT_KEY] === action.payload)[0];

  return {
    ...state,
    current: entry && typeof entry.index === 'number' ? entry.index : -1,
  };
};

export const setCount = (state: State.Frames, action: Actions.Frames.SetCount) =>
  ({ ...state, count: action.payload });

export default frames;
