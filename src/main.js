(() => {
  window.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------
    // DECLARE VARS
    // --------------------------------------------------
    const btnElem = document.querySelector('#btn');
    const stackElem = document.querySelector('#stack');

    // --------------------------------------------------
    // DECLARE FUNCTIONS
    // --------------------------------------------------
    function addStackFrame(state) {
      const elem = document.createElement('pre');
      elem.innerText = JSON.stringify(state);
      elem.dataset.frameId = window.__COUNT__;
      elem.classList.add(getActiveClass());

      if (!stack.childElementCount) {
        stackElem.appendChild(elem)
      } else {
        stackElem.insertBefore(elem, stackElem.children[0]);
      }
    }

    function clearStackFrames(n) {
      const elems = [];
      let elem;

      while (elem = document.querySelector(getFrameSelector(n))) {
        elems.push(elem);
        n++;
      }

      elems.forEach(elem => elem.parentNode.removeChild(elem));
    }

    function getActiveClass(asSelector) {
        const identifier = 'is-active';
        return asSelector ? `.${identifier}` : identifier;
    }

    function getFrameSelector(n) {
        return `[data-frame-id="${n}"]`;
    }

    function preAddStackFrame() {
      [ ...(document.querySelectorAll(getActiveClass(true)) || [])]
        .forEach(elem => elem.classList.remove(getActiveClass()));
    }

    function pushState(state, title, url) {
      // Bump count.
      window.__COUNT__++;

      // Enhance state.
      const enhancedState = { ...state, count: window.__COUNT__ };

      // Invoke `pushState`.
      window.__ORIGINAL_PUSH_STATE__.apply(window.history, [enhancedState, title, url]);

      // Handle frames.
      clearStackFrames(window.__COUNT__ );
      preAddStackFrame();
      addStackFrame(enhancedState);
    }

    function onClick() {
      const ts = new Date().getTime();
      const state = { updatedAt: ts };
      window.history.pushState(state, '', ts);
    }

    function onPop(e) {
      preAddStackFrame();
      document.querySelector(getFrameSelector(e.state.count))
        .classList.add(getActiveClass());
      window.__COUNT__ = e.state.count;
    }

    // --------------------------------------------------
    // REGISTER EVENTS
    // --------------------------------------------------
    btnElem.addEventListener('click', onClick);

    window.addEventListener('popstate', onPop);

    // --------------------------------------------------
    // INIT
    // --------------------------------------------------
    window.__COUNT__ = 0;
    window.__ORIGINAL_PUSH_STATE__ = window.history.pushState;
    window.history.pushState = pushState;
    window.history.pushState({ updatedAt: new Date().getTime() }, '', window.location.pathname);
  });
})();
