import { it } from 'mocha';
import { expect } from 'chai';

import { Types as ActionTypes, ActionCreators as Actions } from '../../../src/state/actions';

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
describe('Action creators', () => {
  describe('General', () => {
    const dictionary = {
      addFrame: ActionTypes.ADD_FRAME,
      incrementCount: ActionTypes.INCREMENT_COUNT,
      selectFrame: ActionTypes.SELECT_FRAME,
      setCount: ActionTypes.SET_COUNT,
      toggleDrawer: ActionTypes.TOGGLE_DRAWER,
      toggleModal: ActionTypes.TOGGLE_MODAL,
    };

    Object.keys(dictionary).forEach((method) => {
      it(`${method}() should return an action of the correct type`, () => {
        expect(Actions[method]()).to.include({ type: dictionary[method] });
      });
    });
  });

  describe('addFrame()', () => {
    it('should accept a payload', () => {
      expect(Actions.addFrame('__FOO__')).to.include({ payload: '__FOO__' });
    });
  });

  describe('selectFrame()', () => {
    it('should accept a payload', () => {
      expect(Actions.selectFrame('__FOO__')).to.include({ payload: '__FOO__' });
    });
  });

  describe('setCount', () => {
    it('should accept a payload', () => {
      expect(Actions.setCount('__FOO__')).to.include({ payload: '__FOO__' });
    });
  });

  describe('toggleModal', () => {
    it('should accept a payload', () => {
      expect(Actions.toggleModal('__FOO__')).to.include({ payload: '__FOO__' });
    });
  });
});
