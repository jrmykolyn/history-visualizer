import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { ActionCreators } from './state/actions';
import App from './tags/app';
import { COUNT_KEY } from './config';
import rootReducer from './state/reducers';

((window) => {
  // eslint-disable-next-line
  const __ = window.__HISTORY_VISUALIZER__ = window.__HISTORY_VISUALIZER__ || {};
  __.count = 0;
  __.originalBack = window.history.back;
  __.originalForward = window.history.forward;
  __.originalGo = window.history.go;
  __.originalPushState = window.history.pushState;
  __.originalReplaceState = window.history.replaceState;
  __.store = createStore(rootReducer);
  __.elems = {};
  __.utils = {};

  // --------------------------------------------------
  // DECLARE FUNCTIONS
  // --------------------------------------------------
  __.init = function init() {
    // Register listeners
    window.addEventListener('popstate', __.onPop);

    // Monkey-patch
    window.history.back = __.back;
    window.history.forward = __.forward;
    window.history.go = __.go;
    window.history.pushState = __.pushState;
    window.history.replaceState = __.replaceState;

    // Mount
    ReactDOM.render(
      <Provider store={__.store}>
        <App api={ __ }/>
      </Provider>,
      this.utils.getOrCreateRootElem(),
    );
  };

  __.back = function back() {
    __.originalBack.call(window.history);
  };

  __.forward = function forward() {
    __.originalForward.call(window.history);
  };

  __.go = function go(n) {
    __.originalGo.call(window.history, n);
  };

  __.onPop = function onPop(e) {
    const count = e.state[COUNT_KEY];
    __.store.dispatch(ActionCreators.selectFrame(count));
    __.count = count;
  };

  __.pushState = function pushState(state, title, url) {
    // Bump count.
    __.count += 1;

    // Enhance state.
    const enhancedState = { ...state, [COUNT_KEY]: __.count };

    // Invoke `pushState`.
    __.originalPushState.apply(window.history, [enhancedState, title, url]);

    __.store.dispatch(ActionCreators.addFrame({ title, url, state: enhancedState }));
  };

  __.replaceState = function replaceState(state, title, url) {
    const enhancedState = { ...state, [COUNT_KEY]: __.count };
    __.originalReplaceState.apply(window.history, [enhancedState, title, url]);
  };

  __.utils.getClassAsSelector = function getClassAsSelector(className) {
    return `.${className}`;
  };

  __.utils.getOrCreateRootElem = function getOrCreateRootElem() {
    if (!__.elems.rootElem) {
      const node = document.createElement('section');
      node.classList.add(__.utils.getRootClass());
      document.body.appendChild(node);
      __.elems.rootElem = node;
    }

    return __.elems.rootElem;
  };

  __.utils.getRootClass = function getRootClass(asSelector) {
    const identifier = 'root';
    return asSelector
      ? __.utils.getClassAsSelector(identifier)
      : identifier;
  };


  // --------------------------------------------------
  // INIT
  // --------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    __.init();
  });
})(window);
