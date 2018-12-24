import { it } from 'mocha';
import { expect } from 'chai';

import * as Selectors from '../../../src/state/selectors';

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
describe('Selectors', () => {
  describe('count()', () => {
    it('should return the count', () => {
      const state = { frames: { count: 0 } };

      expect(Selectors.count(state)).to.eql(0);
    });
  });
});
