const redux = require('redux');

const INITIAL_STATE = {
  frames: {
    entries: [],
    current: 0,
  },
  ui: {
    isOpen: false,
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
      }
    default: return state;
  }
};

export const ui = (state = INITIAL_STATE.ui, action) => {
  console.log(action); // TEMP
  switch (action.type) {
    case 'TOGGLE_DRAWER': return { ...state, isOpen: !state.isOpen };
    default: return state;
  }
};

export default redux.combineReducers({ frames, ui });
