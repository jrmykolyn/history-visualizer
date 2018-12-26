import { ROOT_CLASS } from '../config';

export class HistoryVisualizerUtils {
  constructor(options = {}) {
    this.document = options.document;
    this.window = options.window;
  }

  getClassAsSelector(className) {
    return `.${className}`;
  }

  getOrCreateRootElem(elems) {
    if (!elems.rootElem) {
      const node = this.document.createElement('section');
      node.classList.add(this.getRootClass());
      this.document.body.appendChild(node);
      elems.rootElem = node;
    }

    return elems.rootElem;
  }

  getRootClass(asSelector) {
    const identifier = ROOT_CLASS;
    return asSelector
      ? this.getClassAsSelector(identifier)
      : identifier;
  }
}

export default HistoryVisualizerUtils;
