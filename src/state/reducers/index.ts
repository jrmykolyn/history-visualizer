import { combineReducers } from 'redux';
import frames from './frames';
import ui from './ui';

export const INITIAL_STATE = {
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

export namespace State {
  export interface Frame {
    title: string;
    url: string;
    state: State.FrameState;
  }

  export interface Frames {
    count: number;
    current: number;
    entries: State.Frame[];
  }

  export interface FrameState {
    [key: string]: any;
    __count__: number;
  }

  export interface Ui {
    drawer: State.Drawer;
    modal: State.Modal;
  }

  export interface Drawer {
    isOpen: boolean;
  }

  export interface Modal {
    isOpen: boolean;
    selectedEntry: number;
  }
}

export { frames, ui };

export default combineReducers({ frames, ui });
