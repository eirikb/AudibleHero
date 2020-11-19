import domdom from '@eirikb/domdom';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: any;
    }
  }
}

const dd = domdom();
export const React = dd.React;
export const init = dd.init;
export const on = dd.on;
export const get = dd.get;
export const set = dd.set;
export const trigger = dd.trigger;
export const unset = dd.unset;
