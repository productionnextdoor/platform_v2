import { IProductGraphState, IProductGraphStep } from './pm-product-graph.shared';

declare global {
  interface HTMLElementEventMap {
    'addState': CustomEvent<IProductGraphState>;
    'editStep': CustomEvent<IProductGraphStep>;
    'stateClick': CustomEvent<IProductGraphState>;
    'stateLeftClick': CustomEvent<IProductGraphState>;
    'stateRightClick': CustomEvent<IProductGraphState>;
    'infoClick': CustomEvent<IProductGraphStep>;
  }
}
