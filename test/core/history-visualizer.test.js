import { it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as redux from 'redux';

import { HistoryVisualizer } from '../../src/core';

chai.use(sinonChai);

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
describe('HistoryVisualizer', () => {
  describe('General', () => {
    it('should be constructable', () => {
      expect(new HistoryVisualizer()).to.be.an.instanceof(HistoryVisualizer);
    });
  });

  describe('Instance methods', () => {
    let instance;
    let api;
    let back;
    let forward;
    let go;
    let win;

    beforeEach(() => {
      back = sinon.spy();
      forward = sinon.spy();
      go = sinon.spy();
      win = { history: {} };
      api = { back, forward, go };
      instance = new HistoryVisualizer();
      instance.window = win;
      instance.originalMethods = api;
    });

    describe('back()', () => {
      it('should invoke the original `back` method', () => {
        instance.back();

        expect(back).to.be.calledOn(win.history);
      });
    });

    describe('forward()', () => {
      it('should invoke the original `forward` method', () => {
        instance.forward();

        expect(forward).to.be.calledOn(win.history);
      });
    });

    describe('go()', () => {
      it('should invoke the original `go` method', () => {
        instance.go(2);

        expect(go).to.be.calledOn(win.history);
        expect(go).to.be.calledWith(2);
      });
    });

    describe('initElems()', () => {
      beforeEach(() => {
        // Since `initElems()` has already been invoked, we must delete this property.
        delete instance.elems;
      });

      it('should set the `elems` property to the default value', () => {
        instance.initElems();

        expect(instance.elems).to.eql({});
      });

      it('should set the `elems` property to the value provided', () => {
        const elems = { foo: 'bar' };

        instance.initElems(elems);

        expect(instance.elems).to.eq(elems);
      });
    });

    describe('initStore()', () => {
      it('should create a new application store', () => {
        sinon.stub(redux, 'createStore').returns({ foo: 'bar' });
        delete instance.store;

        instance.initStore();

        expect(instance.store).to.eql({ foo: 'bar' });
      });
    });
  });

  describe('Instance properties', () => {
  });
});
