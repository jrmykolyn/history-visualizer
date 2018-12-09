const redux = require('redux');

const INITIAL_STATE = {
  entries: [],
  current: 0,
};

export const frames = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_FRAME': return { ...state, entries: [action.payload, ...state.entries.filter(entry => entry.count < action.payload.count)], current: 0 };
    case 'SELECT_FRAME':
      const entry = state.entries.map((e, i) => ({ ...e, index: i })).filter(e => e.count === action.payload)[0];
      return {
        ...state,
        current: entry && typeof entry.index === 'number' ? entry.index : -1,
      }
    default: return state;
  }
};

export default redux.combineReducers({ frames });
