import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import {
  ActionCreators,
  rootReducer,
  Selectors,
  State,
} from '../state/index';
import App from '../tags/app/App';
import {
  API_METHODS,
  COUNT_KEY,
} from '../config/index';
import { HistoryVisualizerUtils } from './utils';

export interface HistoryVisualizerOptions {
  api: History;
  document: Document;
  window: Window;
}

export interface Historyish {
  back: () => void;
  forward: () => void;
  go: (n: number) => void;
  pushState: (state: State.FrameState, title: string, url: string) => void;
  replaceState: (state: State.FrameState, title: string, url: string) => void;
}

export interface Elems {
  [key: string]: HTMLElement;
}

export class HistoryVisualizer {
  [key: string]: any;
  api: Historyish = {} as Historyish;
  document: Document;
  elems: Elems;
  options: HistoryVisualizerOptions;
  originalMethods: Historyish;
  store: Store;
  utils: HistoryVisualizerUtils;
  window: Window;

  constructor(options: HistoryVisualizerOptions) {
    this.elems = this.initElems();
    this.store = this.initStore();
    this.options = options;
    this.document = options.document;
    this.window = options.window;
    this.originalMethods = this.ingestApi(options.api);
    this.utils = new HistoryVisualizerUtils(options);
  }

  back() {
    this.originalMethods.back.call(this.window.history);
  }

  forward() {
    this.originalMethods.forward.call(this.window.history);
  }

  go(n: number) {
    this.originalMethods.go.call(this.window.history, n);
  }

  /**
   * Initialize the HistoryVisualizer instance by:
   * - registering relevant listeners.
   * - monkey-patching the API.
   * - injecting the application component.
   */
  init() {
    // Register listeners
    window.addEventListener('popstate', this.onPop.bind(this));

    this.patchApi(this.options.api);

    // Mount
    this.initUi();
  }

  initElems(elems = {}) {
    return elems;
  }

  /**
   * Create and return the application store.
   */
  initStore() {
    return createStore(rootReducer);
  }

  /**
   * Initialize the application component.
   */
  initUi() {
    ReactDOM.render(
      <Provider store={this.store}>
        <App api={ this.api }/>
      </Provider>,
      this.utils.getOrCreateRootElem(this.elems),
    );
  }

  /**
   * Copy and return the target API.
   */
  ingestApi(api: History & { [key: string]: any }) {
    return API_METHODS.reduce((acc, method) => ({ ...acc, [method]: api[method] }), {} as Historyish);
  }

  onPop(e: PopStateEvent) {
    this.store.dispatch(ActionCreators.setCount(e.state[COUNT_KEY]));
    this.store.dispatch(ActionCreators.selectFrame(Selectors.count(this.store.getState())));
  }

  /**
   * Monkey-patch the target API.
   */
  patchApi(api: History & { [key: string]: any }) {
    // Monkey-patch
    this.api = API_METHODS.reduce(
      (acc, method) => {
        acc[method] = (...args: any[]) => this[method](...args);
        return acc;
      },
      api);
  }

  pushState(state: State.FrameState, title: string, url: string) {
    // Bump count.
    this.store.dispatch(ActionCreators.incrementCount());

    // Enhance state.
    const enhancedState = { ...state, [COUNT_KEY]: Selectors.count(this.store.getState()) };

    // Invoke `pushState`.
    this.originalMethods.pushState.apply(this.window.history, [enhancedState, title, url]);

    this.store.dispatch(ActionCreators.addFrame({ title, url, state: enhancedState }));
  }

  replaceState(state: State.FrameState, title: string, url: string) {
    const enhancedState = { ...state, [COUNT_KEY]: Selectors.count(this.store.getState()) };
    this.originalMethods.replaceState.apply(this.window.history, [enhancedState, title, url]);
  }
}

export default HistoryVisualizer;
