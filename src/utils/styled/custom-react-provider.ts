import { Component } from 'inferno';
import { createElement } from 'inferno-create-element';

/**
 * HACK:
 * becuase inferno doesn't have a build in `createElement` method,
 * so we need to provide a fake inferno instance.
 * due to `create-emotion-styled` only use `Component` and `createElement`
 * of the view libray, so we can just simply create an object.
 */

export const customReact = {
  Component,
  createElement,
};
