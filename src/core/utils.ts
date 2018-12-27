import { ROOT_CLASS } from '../config';
import {
  Elems,
  HistoryVisualizerOptions,
} from '.';

export class HistoryVisualizerUtils {
  document: Document;
  window: Window;

  constructor(options: HistoryVisualizerOptions) {
    this.document = options.document;
    this.window = options.window;
  }

  getClassAsSelector(className: string) {
    return `.${className}`;
  }

  getOrCreateRootElem(elems: Elems) {
    if (!elems.rootElem) {
      const node = this.document.createElement('section');
      node.classList.add(this.getRootClass());
      this.document.body.appendChild(node);
      elems.rootElem = node;
    }

    return elems.rootElem;
  }

  getRootClass(asSelector?: boolean) {
    const identifier = ROOT_CLASS;
    return asSelector
      ? this.getClassAsSelector(identifier)
      : identifier;
  }
}

export default HistoryVisualizerUtils;
