import { it } from 'mocha';
import { expect } from 'chai';

import { Actions as Types, ActionCreators as Actions } from '../../../src/state/actions';

// -------------------------------------------------- 
// DEFINE TESTS
// -------------------------------------------------- 
describe('Action creators', () => {
  describe('addFrame()', () => {
    it('should return an action of the correct type', () => {
      expect(Actions.addFrame()).to.eql({ type: Types.ADD_FRAME, payload: undefined });
    });

    it('should accept a payload', () => {
      expect(Actions.addFrame('__FOO__')).to.eql({ type: Types.ADD_FRAME, payload: '__FOO__' });
    });
  });
});
