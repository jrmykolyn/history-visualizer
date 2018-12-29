import { it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ReactDOM from 'react-dom';
import * as redux from 'redux';

import * as State from '../../src/state';
import { HistoryVisualizer } from '../../src/core';
import { HistoryVisualizerUtils } from '../../src/core/utils';

chai.use(sinonChai);

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
describe('HistoryVisualizer', () => {
  describe('General', () => {
    it('should be constructable', () => {
      const opts = {
        api: {},
      };

      expect(new HistoryVisualizer(opts)).to.be.an.instanceof(HistoryVisualizer);
    });
  });

  describe('constructor', () => {
    let instance;
    let initElems;
    let initStore;
    let ingestApi;
    let originalInitElems;
    let originalInitStore;
    let originalIngestApi;

    beforeEach(() => {
      instance = null;
      initElems = sinon.spy(() => ({}));
      initStore = sinon.spy(() => ({}));
      ingestApi = sinon.spy();
      originalInitElems = HistoryVisualizer.prototype.initElems;
      originalInitStore = HistoryVisualizer.prototype.initStore;
      originalIngestApi = HistoryVisualizer.prototype.ingestApi;
      HistoryVisualizer.prototype.initElems = initElems;
      HistoryVisualizer.prototype.initStore = initStore;
      HistoryVisualizer.prototype.ingestApi = ingestApi;
    });

    afterEach(() => {
      HistoryVisualizer.prototype.initElems = originalInitElems;
      HistoryVisualizer.prototype.initStore = originalInitStore;
      HistoryVisualizer.prototype.ingestApi = originalIngestApi;
    });

    it('should assign the options, window, and document', () => {
      const win = {};
      const doc = {};
      const opts = { window: win, document: doc };

      instance = new HistoryVisualizer(opts);

      expect(instance.options).to.eq(opts);
      expect(instance.window).to.eq(win);
      expect(instance.document).to.eq(doc);
    });

    it('should invoke `initElems()` and `initStore()`', () => {
      const opts = {
        api: {},
      };

      instance = new HistoryVisualizer(opts);

      expect(initElems).to.be.called;
      expect(initStore).to.be.called;
      expect(instance.elems).to.eql({});
      expect(instance.store).to.eql({});
    });

    it('should ingest the API', () => {
      const api = {};
      const opts = { api };

      new HistoryVisualizer(opts);

      expect(ingestApi).to.be.calledWithExactly(api);
    });

    it('should setup the utilities', () => {
      const opts = {
        api: {},
      };

      instance = new HistoryVisualizer(opts);

      expect(instance.utils).to.be.an.instanceof(HistoryVisualizerUtils);
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
      instance = new HistoryVisualizer({ api, window: win });
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
        const originalBind = HistoryVisualizer.prototype.onPop.bind;
        const bind = sinon.spy();
        HistoryVisualizer.prototype.onPop.bind = bind;

        instance.init();

        expect(addEventListener).to.be.calledWith('popstate');
        expect(bind).to.be.called;

        HistoryVisualizer.prototype.onPop.bind = originalBind;
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

    describe('initUi()', () => {
      it('should invoke `ReactDOM.render()`', () => {
        const elems = { foo: 'bar' };
        const getOrCreateRootElem = sinon.stub();
        const renderStub = sinon.stub(ReactDOM, 'render');
        instance.utils = { getOrCreateRootElem };
        instance.elems = elems;

        instance.initUi();

        expect(getOrCreateRootElem).to.be.calledWithExactly(elems);
        expect(renderStub).to.be.called;

        renderStub.restore();
      });
    });

    describe('ingestApi()', () => {
      it('should capture and return the `originalMethods`', () => {
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

        expect(instance.ingestApi(api)).to.eql(targetMethods);
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

        instance.onPop(e);

        expect(setCountStub).to.be.calledWith(count);
        expect(dispatch).to.be.calledWith({ type: 'foo', payload: count });
      });

      it('should dispatch the select frame action with the correct payload', () => {
        const count = 1;
        const e = { state: { __count__: count } };
        countStub.returns(count);
        selectFrameStub.withArgs(count).returns({ type: 'bar', payload: count });

        instance.onPop(e);

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
});
