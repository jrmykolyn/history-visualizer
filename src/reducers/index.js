import { combineReducers } from 'redux';

const INITIAL_STATE = {
  frames: {
    entries: [],
    current: 0,
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
    case 'ADD_FRAME': return { ...state, entries: [action.payload, ...state.entries.filter(e => e.state.count < action.payload.state.count)], current: 0 };
    case 'SELECT_FRAME':
      const entry = state.entries.map((e, i) => ({ ...e, index: i })).filter(e => e.state.count === action.payload)[0];
      return {
        ...state,
        current: entry && typeof entry.index === 'number' ? entry.index : -1,
      };
    default: return state;
  }
};

export const ui = (state = INITIAL_STATE.ui, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER': return { ...state, drawer: { ...state.drawer, isOpen: !state.drawer.isOpen } };
    case 'TOGGLE_MODAL': return { ...state, modal: { ...state.modal, isOpen: !state.modal.isOpen, selectedEntry: action.payload || 0 } };
    default: return state;
  }
};

export default combineReducers({ frames, ui });
