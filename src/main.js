((window) => {
  const __ = window.__HISTORY_VISUALIZER__ = window.__HISTORY_VISUALIZER__ || {};
  __.count = 0;
  __.originalPushState = window.history.pushState;
  __.elems = {};
  __.utils = {};

  // --------------------------------------------------
  // DECLARE FUNCTIONS
  // --------------------------------------------------
  __.addStackFrame = function addStackFrame(state) {
    const stackElem = __.utils.getOrCreateStackElem();
    const elem = document.createElement('pre');
    elem.innerText = JSON.stringify(state);
    elem.dataset.frameId = __.count;
    elem.classList.add(__.utils.getActiveClass());

    if (!stackElem.childElementCount) {
      stackElem.appendChild(elem)
    } else {
      stackElem.insertBefore(elem, stackElem.children[0]);
    }
  }

  __.clearStackFrames = function clearStackFrames(n) {
    const elems = [];
    let elem;

    while (elem = document.querySelector(__.utils.getFrameSelector(n))) {
      elems.push(elem);
      n++;
    }

    elems.forEach(elem => elem.parentNode.removeChild(elem));
  }

  __.onPop = function onPop(e) {
    __.preAddStackFrame();
    document.querySelector(__.utils.getFrameSelector(e.state.count))
      .classList.add(__.utils.getActiveClass());
    __.count = e.state.count;
  }

  __.preAddStackFrame = function preAddStackFrame() {
    [ ...(document.querySelectorAll(__.utils.getActiveClass(true)) || [])]
      .forEach(elem => elem.classList.remove(__.utils.getActiveClass()));
  }

  __.pushState = function pushState(state, title, url) {
    // Bump count.
    __.count++;

    // Enhance state.
    const enhancedState = { ...state, count: __.count };

    // Invoke `pushState`.
    __.originalPushState.apply(window.history, [enhancedState, title, url]);

    // Handle frames.
    __.clearStackFrames(__.count);
    __.preAddStackFrame();
    __.addStackFrame(enhancedState);
  }

  __.utils.getActiveClass = function getActiveClass(asSelector) {
    const identifier = 'is-active';
    return asSelector
      ? __.utils.getClassAsSelector(identifier)
      : identifier;
  }

  __.utils.getClassAsSelector = function(className) {
    return `.${className}`;
  }

  __.utils.getOrCreateStackElem = function getActiveClass(asSelector) {
    if (!__.elems.stackElem) {
      const node = document.createElement('section');
      node.classList.add(__.utils.getStackClass());
      document.body.appendChild(node);
      __.elems.stackElem = node;
    }

    return __.elems.stackElem;
  }

  __.utils.getFrameSelector = function getFrameSelector(n) {
    return `[data-frame-id="${n}"]`;
  }

  __.utils.getStackClass = function getFrameSelector(asSelector) {
    const identifier = 'stack';
    return asSelector
      ? __.utils.getClassAsSelector(identifier)
      : identifier;
  }

  // --------------------------------------------------
  // INIT
  // --------------------------------------------------
  window.addEventListener('popstate', __.onPop);
  window.history.pushState = __.pushState;
})(window);
