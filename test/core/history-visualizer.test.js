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

    describe('init()', () => {
      let addEventListener;
      let initUiStub;

      beforeEach(() => {
        addEventListener = sinon.stub();
        initUiStub = sinon.stub();
        instance.initUi = initUiStub;
        global.window = { addEventListener };
      });

      it('should register a `popstate` listener', () => {
        instance.init();

        expect(addEventListener).to.be.calledWith('popstate');
      });

      it('should invoke `patchApi()`', () => {
        // eslint-disable-next-line no-shadow
        const api = { foo: 'bar' };
        const patchApi = sinon.stub();
        instance.options = { api };
        instance.patchApi = patchApi;

        instance.init();

        expect(patchApi).to.be.calledWith(api);
      });

      it('should invoke `initUi()`', () => {
        instance.init();

        expect(initUiStub).to.be.called;
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

    describe('pushState()', () => {
      let dispatch;
      let addFrameStub;
      let incrementCountStub;
      let countStub;

      beforeEach(() => {
        dispatch = sinon.spy();
        addFrameStub = sinon.stub(State.ActionCreators, 'addFrame');
        incrementCountStub = sinon.stub(State.ActionCreators, 'incrementCount')
          .returns({ type: 'foo' });
        countStub = sinon.stub(State.Selectors, 'count');
        instance.store = {
          dispatch,
          getState: () => null,
        };
        instance.originalMethods = {
          pushState: sinon.spy(),
        };
      });

      afterEach(() => {
        addFrameStub.restore();
        incrementCountStub.restore();
        countStub.restore();
      });

      it('should dispatch an increment count action', () => {
        instance.pushState();

        expect(incrementCountStub).to.be.called;
        expect(dispatch).to.be.calledWith({ type: 'foo' });
      });

      it('should invoke the original `pushState` method with the enhanced state', () => {
        const count = 1;
        const state = { foo: 'bar' };
        const title = '';
        const url = '/foo';
        countStub.returns(count);

        instance.pushState(state, title, url);

        expect(instance.originalMethods.pushState).to.be.calledWithExactly({ foo: 'bar', __count__: count }, title, url);
      });

      it('should dispatch an add frame action', () => {
        const count = 1;
        const state = { foo: 'bar' };
        const title = '';
        const url = '/far';
        countStub.returns(count);

        instance.pushState(state, title, url);

        expect(addFrameStub).to.be.calledWithExactly({ title, url, state: { ...state, __count__: count } });
      });
    });

    describe('replaceState()', () => {
      it('should enhance the state and invoke the original `replaceState` method', () => {
        const count = 1;
        const state = { foo: 'bar' };
        const title = '';
        const url = '/foo';
        const replaceState = sinon.stub();
        const countStub = sinon.stub(State.Selectors, 'count').returns(count);
        instance.originalMethods = { replaceState };
        instance.store = { getState: () => null };

        instance.replaceState(state, title, url);

        expect(replaceState).to.be.calledWithExactly({ ...state, __count__: count }, title, url);

        countStub.restore();
      });
    });
  });

  describe('Instance properties', () => {
  });
});
