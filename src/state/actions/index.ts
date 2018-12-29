import { Action } from 'redux';
import { State } from '..';
import * as ActionCreators from './creators';
import Types from './types';

namespace Actions {
  export namespace Frames {
    export interface AddFrame extends Action {
      payload: State.Frame;
    }

    export interface SelectFrame extends Action {
      payload: number;
    }

    export interface SetCount extends Action {
      payload: number;
    }
  }

  export namespace Ui {
    export interface ToggleModal extends Action {
      payload: number;
    }
  }
}

export type FrameActions = Actions.Frames.AddFrame
  | Actions.Frames.SelectFrame
  | Actions.Frames.SetCount;

export type UiActions = Actions.Ui.ToggleModal;

export { Actions, ActionCreators, Types };
