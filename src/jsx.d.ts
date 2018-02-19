/**
 * This is exists because currently TypeScript doesn't understand JSX due to this issue:
 * https://github.com/infernojs/inferno/issues/686
 */

/* eslint-disable no-undef */

import { VNode } from 'inferno';

interface InfernoJSXElement<P> extends VNode {}

declare global {
  namespace JSX {
    interface Element extends InfernoJSXElement<any> {}

    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}
