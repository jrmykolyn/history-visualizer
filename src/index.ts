import HistoryVisualizer from './core/index';

((window, document) => {
  const historyVisualizer = window.__HISTORY_VISUALIZER__
    || (window.__HISTORY_VISUALIZER__ = new HistoryVisualizer({ document, window, api: window.history }));

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      historyVisualizer.init();
    });
  } else {
    historyVisualizer.init();
  }
})(window, document);
