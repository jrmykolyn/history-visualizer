const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const redux = require('redux');

const { default: App } = require('./app');
const { default: rootReducer } = require('./reducers');
const Actions = require('./actions');

((window) => {
  const __ = window.__HISTORY_VISUALIZER__ = window.__HISTORY_VISUALIZER__ || {};
  __.count = 0;
  __.originalBack = window.history.back;
  __.originalForward = window.history.forward;
  __.originalGo = window.history.go;
  __.originalPushState = window.history.pushState;
  __.originalReplaceState = window.history.replaceState;
  __.store = redux.createStore(rootReducer);
  __.elems = {};
  __.utils = {};

  // --------------------------------------------------
  // DECLARE FUNCTIONS
  // --------------------------------------------------
  __.init = function init() {
    // Inject styles
    const styleElem = document.createElement('style');
    const styles = `
    .stack {
      width: 90%;
      max-width: 500px;
      height: 100%;
      display: block;
      padding: 20px;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      box-shadow: 0 3px 20px -5px rgba(0, 0, 0, 0.15);
      z-index: 999999;
    }

    pre {
      color: #aaa;
      background: rgba(0, 0, 0, 0.03);
      border: solid 1px #aaa;
      padding: 10px;
      margin: 0;
    }

    pre:not(:last-child) {
      margin-bottom: 10px;
    }

    pre.is-active {
      color: limegreen;
      background: rgba(50, 205, 50, 0.1);
      border-color: limegreen;
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
      this.utils.getOrCreateStackElem()
    );
  }

  __.back = function back() {
    __.originalBack.call(window.history);
  }

  __.forward = function forward() {
    __.originalForward.call(window.history);
  }

  __.go = function go(n) {
    __.originalGo.call(window.history, n);
  }

  __.onPop = function onPop(e) {
    __.store.dispatch(Actions.selectFrame(e.state.count));
    __.count = e.state.count;
  }

  __.pushState = function pushState(state, title, url) {
    // Bump count.
    __.count++;

    // Enhance state.
    const enhancedState = { ...state, count: __.count };

    // Invoke `pushState`.
    __.originalPushState.apply(window.history, [enhancedState, title, url]);

    __.store.dispatch(Actions.addFrame(enhancedState));
  }

  __.replaceState = function replaceState(state, title, url) {
    const enhancedState = { ...state, count: __.count };
    __.originalReplaceState.apply(window.history, [enhancedState, title, url]);
  }

  __.utils.getClassAsSelector = function(className) {
    return `.${className}`;
  }

  __.utils.getOrCreateStackElem = function getOrCreateStackElem() {
    if (!__.elems.stackElem) {
      const node = document.createElement('section');
      node.classList.add(__.utils.getStackClass());
      document.body.appendChild(node);
      __.elems.stackElem = node;
    }

    return __.elems.stackElem;
  }

  __.utils.getStackClass = function getStackClass(asSelector) {
    const identifier = 'stack';
    return asSelector
      ? __.utils.getClassAsSelector(identifier)
      : identifier;
  }


  // --------------------------------------------------
  // INIT
  // --------------------------------------------------
  __.init();
})(window);
