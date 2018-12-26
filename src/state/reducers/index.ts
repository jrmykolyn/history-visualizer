import { combineReducers } from 'redux';
import { Actions } from '../actions';
import { COUNT_KEY } from '../../config';


const INITIAL_STATE = {
  frames: {
    count: 0,
    current: 0,
    entries: [],
  },
  ui: {
    drawer: {
      isOpen: false,
    },
    modal: {
      isOpen: false,
      selectedEntry: 0,
    },
  },
};

export const frames = (state = INITIAL_STATE.frames, action) => {
  switch (action.type) {
    case Actions.ADD_FRAME: return { ...state, entries: [action.payload, ...state.entries.filter(e => e.state[COUNT_KEY] < action.payload.state[COUNT_KEY])], current: 0 };
    case Actions.INCREMENT_COUNT: return { ...state, count: state.count + 1 };
    case Actions.SELECT_FRAME:
      const entry = state.entries.map((e, i) => ({ ...e, index: i })).filter(e => e.state[COUNT_KEY] === action.payload)[0];
      return {
        ...state,
        current: entry && typeof entry.index === 'number' ? entry.index : -1,
      };
    case Actions.SET_COUNT: return { ...state, count: action.payload };
    default: return state;
  }
};

export const ui = (state = INITIAL_STATE.ui, action) => {
  switch (action.type) {
    case Actions.TOGGLE_DRAWER: return { ...state, drawer: { ...state.drawer, isOpen: !state.drawer.isOpen } };
    case Actions.TOGGLE_MODAL: return { ...state, modal: { ...state.modal, isOpen: !state.modal.isOpen, selectedEntry: action.payload || 0 } };
    default: return state;
  }
};

export default combineReducers({ frames, ui });
