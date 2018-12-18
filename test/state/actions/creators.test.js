import { it } from 'mocha';
import { expect } from 'chai';

import { Actions as Types, ActionCreators as Actions } from '../../../src/state/actions';

// -------------------------------------------------- 
// DEFINE TESTS
// -------------------------------------------------- 
describe('Action creators', () => {
  describe('General', () => {
    const dictionary = {
      'addFrame': Types.ADD_FRAME,
      'incrementCount': Types.INCREMENT_COUNT,
      'selectFrame': Types.SELECT_FRAME,
      'setCount': Types.SET_COUNT,
      'toggleDrawer': Types.TOGGLE_DRAWER,
      'toggleModal': Types.TOGGLE_MODAL,
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
