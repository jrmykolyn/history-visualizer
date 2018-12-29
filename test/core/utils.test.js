import { it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import { HistoryVisualizerUtils } from '../../src/core/utils';

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
describe('HistoryVisualizerUtils', () => {
  describe('General', () => {
    it('should be constructable', () => {
      const opts = {
        api: {},
      };

      expect(new HistoryVisualizerUtils(opts)).to.be.an.instanceof(HistoryVisualizerUtils);
    });
  });

  describe('Instance methods', () => {
    let utils;

    beforeEach(() => {
      utils = new HistoryVisualizerUtils({ api: {} });
    });

    describe('getClassAsSelector', () => {
      it('should return a class name as a CSS selector', () => {
        expect(utils.getClassAsSelector('foo')).to.eq('.foo');
      });
    });

    describe('getOrCreateRootElem', () => {
      it('should return the root element from the cache', () => {
        const elem = { foo: 'bar' };
        expect(utils.getOrCreateRootElem({ rootElem: elem })).to.eq(elem);
      });

      it('should create and append the root element', () => {
        const appendChild = sinon.spy();
        const add = sinon.spy();
        const node = {
          classList: {
            add,
          },
        };
        const createElement = sinon.spy(() => node);
        const elems = {};
        utils.document = { body: { appendChild }, createElement };

        utils.getOrCreateRootElem(elems);

        expect(createElement.called).to.eq(true);
        expect(add.called).to.eq(true);
        expect(appendChild.called).to.eq(true);
        expect(elems).to.eql({ rootElem: node });
      });
    });

    describe('getRootClass', () => {
      it('should return the root class name', () => {
        expect(utils.getRootClass()).to.eq('root');
      });

      it('should return the root class name as a CSS selector', () => {
        expect(utils.getRootClass(true)).to.eq('.root');
      });
    });
  });

  describe('Instance properties', () => {
    it('should expose the `window` and `document` properties', () => {
      const win = {};
      const doc = {};

      const utils = new HistoryVisualizerUtils({ window: win, document: doc });

      expect(utils.window).to.eq(win);
      expect(utils.document).to.eq(doc);
    });
  });
});
