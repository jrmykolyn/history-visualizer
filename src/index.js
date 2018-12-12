import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import * as Actions from './actions';
import App from './app';
import rootReducer from './reducers';

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
    // Inject styles
    const styleElem = document.createElement('style');
    const styles = `
    .ui {
      width: 90%;
      max-width: 360px;
      height: 100%;
      display: block;
      color: #444;
      box-shadow: 3px 0px 30px 5px rgba(0, 0, 0, 0.15);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
      transform: translateX(-100%);
      transition: transform 0.15s;
      font-family: Helvetica, sans-serif;
      font-size: 14px;
      font-weight: 500;
    }

    .ui,
    .ui *,
    .ui *::before,
    .ui *::after {
      box-sizing: border-box;
    }

    .ui.is-active {
      transform: translateX(0);
    }

    .ui a {
      color: #0984e3;
    }

    .ui button {
      width: 50px;
      height: 50px;
      background: #fff;
      border: none;
      padding: 0;
      box-shadow: 0 3px 20px -5px rgba(0, 0, 0, 0.05);
      position: absolute;
      top: 20px;
      left: 100%;
    }

    .ui button span {
      width: 60%;
      height: 4px;
      background: #2ed573;
      position: absolute;
      top: 50%;
      left: 20%;
      transform: translateY(-50%);
    }

    .ui button span::before,
    .ui button span::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background: inherit;
      position: absolute;
      left: 0;
    }

    .ui button span::before {
      top: -250%;
    }

    .ui button span::after {
      bottom: -250%;
    }

    .ui .stack {
      width: 100%;
      height: 100%;
      padding: 12px;
      background: #fff;
      box-shadow: 3px 0px 20px 2px rgba(0, 0, 0, 0.05);
      position: absolute;
      top: 0;
      left: 0;
      overflow: auto;
      z-index: 1;
    }

    .ui .frame {
      padding: 15px;
      border-left: 6px solid transparent;
      background: #fff;
      box-shadow: 0 3px 20px -5px rgba(0, 0, 0, 0.25);
    }

    .ui .frame:not(:last-child) {
      margin-bottom: 10px;
    }

    .ui .frame.is-active {
      border-left-color: #2ed573;
    }

    .frame__meta {
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .frame__meta p {
      margin: 0;
    }

    .frame__meta p:not(:last-child) {
      margin-right: 20px;
    }

    .frame__payload {
      color: #aaa;
      background: rgba(0, 0, 0, 0.03);
      border: solid 1px #aaa;
      padding: 10px;
      padding-bottom: 8px;
      margin: 0;
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .frame__payload:not(:last-child) {
      margin-bottom: 10px;
    }

    .frame.is-active .frame__payload {
      color: #2ed573;
      border-color: #2ed573;
      background-color: rgba(46, 213, 115, 0.2);
    }
    `;

    styleElem.innerHTML = styles;
    document.head.appendChild(styleElem);

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
    __.store.dispatch(Actions.selectFrame(e.state.count));
    __.count = e.state.count;
  };

  __.pushState = function pushState(state, title, url) {
    // Bump count.
    __.count += 1;

    // Enhance state.
    const enhancedState = { ...state, count: __.count };

    // Invoke `pushState`.
    __.originalPushState.apply(window.history, [enhancedState, title, url]);

    __.store.dispatch(Actions.addFrame({ title, url, state: enhancedState }));
  };

  __.replaceState = function replaceState(state, title, url) {
    const enhancedState = { ...state, count: __.count };
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
  __.init();
})(window);
