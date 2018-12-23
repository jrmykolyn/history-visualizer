import { it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as redux from 'redux';

import * as State from '../../src/state';
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

    describe('ingestApi()', () => {
      it('should capture the target API methods as `originalMethods`', () => {
        delete instance.originalMethods;
        const noop = () => null;
        const targetMethods = {
          back: noop,
          forward: noop,
          go: noop,
          pushState: noop,
          replaceState: noop,
        };
        const additionalMethods = {
          foo: noop,
          bar: noop,
        };
        // eslint-disable-next-line no-shadow
        const api = {
          ...targetMethods,
          ...additionalMethods,
        };

        instance.ingestApi(api);

        expect(instance.originalMethods).to.eql(targetMethods);
      });
    });

    describe('onPop()', () => {
      let setCountStub;
      let selectFrameStub;
      let countStub;
      let dispatch;

      beforeEach(() => {
        setCountStub = sinon.stub(State.ActionCreators, 'setCount');
        selectFrameStub = sinon.stub(State.ActionCreators, 'selectFrame');
        countStub = sinon.stub(State.Selectors, 'count');
        dispatch = sinon.spy();
        instance.store = {
          dispatch,
          getState: () => null,
        };
      });

      afterEach(() => {
        setCountStub.restore();
        selectFrameStub.restore();
        countStub.restore();
      });

      it('should dispatch the set count action with the correct payload', () => {
        const count = 1;
        const e = { state: { __count__: count } };
        setCountStub.withArgs(count).returns({ type: 'foo', payload: count });

        instance.onPop(e)

        expect(setCountStub).to.be.calledWith(count);
        expect(dispatch).to.be.calledWith({ type: 'foo', payload: count });
      });

      it('should dispatch the select frame action with the correct payload', () => {
        const count = 1;
        const e = { state: { __count__: count } };
        countStub.returns(count);
        selectFrameStub.withArgs(count).returns({ type: 'bar', payload: count });

        instance.onPop(e)

        expect(selectFrameStub).to.be.calledWith(count);
        expect(dispatch).to.be.calledWith({ type: 'bar', payload: count });
      });
    });

    describe('patchApi()', () => {
      it('should monkey patch the target API methods', () => {
        const noop = () => null;
        const targetMethods = {
          back: noop,
          forward: noop,
          go: noop,
          pushState: noop,
          replaceState: noop,
        };
        const additionalMethods = {
          foo: noop,
          bar: noop,
        };
        // eslint-disable-next-line no-shadow
        const api = {
          ...targetMethods,
          ...additionalMethods,
        };

        instance.patchApi(api);

        expect(api).to.include(additionalMethods);
        expect(api).to.not.include(targetMethods);
      });
    });
  });

  describe('Instance properties', () => {
  });
});
