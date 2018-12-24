import { it } from 'mocha';
import { expect } from 'chai';

import { Actions } from '../../../src/state/actions';
import { frames, ui } from '../../../src/state/reducers';

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
describe('Reducers', () => {
  describe('frames()', () => {
    it('should return the initial state', () => {
      expect(frames(undefined, {})).to.eql({
        count: 0,
        current: 0,
        entries: [],
      });
    });

    it('should add a frame and reset the current value', () => {
      const state = { entries: [] };
      const frame = {
        state: {
          __count__: 0,
        },
      };
      expect(frames(state, { type: Actions.ADD_FRAME, payload: frame })).to.eql({
        current: 0,
        entries: [frame],
      });
    });

    it('should trim the frames', () => {
      const state = {
        entries: [
          { state: { __count__: 0 } },
          { state: { __count__: 1 } },
          { state: { __count__: 2 } },
        ],
      };
      const frame = {
        state: {
          __count__: 1,
        },
      };

      expect(frames(state, { type: Actions.ADD_FRAME, payload: frame })).to.eql({
        current: 0,
        entries: [
          { state: { __count__: 1 } },
          { state: { __count__: 0 } },
        ],
      });
    });

    it('should incremement the count', () => {
      const state = { count: 0 };

      expect(frames(state, { type: Actions.INCREMENT_COUNT })).to.eql({ count: 1 });
    });

    it('should select the frame', () => {
      const entry = { state: { __count__: 0 } };
      const state = {
        entries: [entry],
        current: 1,
      };

      expect(frames(state, { type: Actions.SELECT_FRAME, payload: 0 })).to.eql({
        entries: [entry],
        current: 0,
      });
    });

    it('should set the count', () => {
      const state = { count: 0 };

      expect(frames(state, { type: Actions.SET_COUNT, payload: 1 })).to.eql({ count: 1 });
    });

    it('should return the state', () => {
      const state = { foo: 'bar' };

      expect(frames(state, { type: 'AN_INVALID_ACTION' })).to.eq(state);
    });
  });

  describe('ui()', () => {
    it('should return the initial state', () => {
      expect(ui(undefined, {})).to.eql({
        drawer: {
          isOpen: false,
        },
        modal: {
          isOpen: false,
          selectedEntry: 0,
        },
      });
    });

    it('should toggle the drawer', () => {
      const state = {
        drawer: {
          isOpen: false,
        },
      };

      expect(ui(state, { type: Actions.TOGGLE_DRAWER })).to.eql({ drawer: { isOpen: true } });
    });

    it('should toggle the modal', () => {
      const state = {
        modal: {
          isOpen: false,
          selectedEntry: 42,
        },
      };

      expect(ui(state, { type: Actions.TOGGLE_MODAL, payload: 1 })).to.eql({
        modal: {
          isOpen: true,
          selectedEntry: 1,
        },
      });
    });

    it('should return the state', () => {
      const state = { foo: 'bar' };

      expect(ui(state, { type: 'AN_INVALID_ACTION' })).to.eq(state);
    });
  });
});
