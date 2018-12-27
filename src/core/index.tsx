import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {
  ActionCreators,
  rootReducer,
  Selectors,
} from '../state/index';
import App from '../tags/app/App';
import {
  API_METHODS,
  COUNT_KEY,
} from '../config/index';
import { HistoryVisualizerUtils } from './utils';

export class HistoryVisualizer {
  constructor(options = {}) {
    this.initElems();
    this.initStore();
    this.options = options;
    this.document = options.document;
    this.window = options.window;
    this.ingestApi(options.api);
    this.utils = new HistoryVisualizerUtils(options);
  }

  back() {
    this.originalMethods.back.call(this.window.history);
  }

  forward() {
    this.originalMethods.forward.call(this.window.history);
  }

  go(n) {
    this.originalMethods.go.call(this.window.history, n);
  }

  init() {
    // Register listeners
    window.addEventListener('popstate', this.onPop.bind(this));

    this.patchApi(this.options.api);

    // Mount
    this.initUi();
  }

  initElems(elems = {}) {
    this.elems = elems;
  }

  initStore() {
    this.store = createStore(rootReducer);
  }

  initUi() {
    ReactDOM.render(
      <Provider store={this.store}>
        <App api={ this.api }/>
      </Provider>,
      this.utils.getOrCreateRootElem(this.elems),
    );
  }

  ingestApi(api = {}) {
    this.originalMethods = API_METHODS.reduce((acc, method) => ({ ...acc, [method]: api[method] }), {});
  }

  onPop(e) {
    this.store.dispatch(ActionCreators.setCount(e.state[COUNT_KEY]));
    this.store.dispatch(ActionCreators.selectFrame(Selectors.count(this.store.getState())));
  }

  patchApi(api = {}) {
    // Monkey-patch
    this.api = API_METHODS.reduce((acc, method) => {
      acc[method] = (...args) => this[method](...args);
      return acc;
    }, api);
  }

  pushState(state, title, url) {
    // Bump count.
    this.store.dispatch(ActionCreators.incrementCount());

    // Enhance state.
    const enhancedState = { ...state, [COUNT_KEY]: Selectors.count(this.store.getState()) };

    // Invoke `pushState`.
    this.originalMethods.pushState.apply(this.window.history, [enhancedState, title, url]);

    this.store.dispatch(ActionCreators.addFrame({ title, url, state: enhancedState }));
  }

  replaceState(state, title, url) {
    const enhancedState = { ...state, [COUNT_KEY]: Selectors.count(this.store.getState()) };
    this.originalMethods.replaceState.apply(this.window.history, [enhancedState, title, url]);
  }
}

export default HistoryVisualizer;
