import _ from 'lodash';
import graphlib from 'graphlib';

export function ensureGlobals() {
  if (typeof window !== 'undefined') {
    if (!window._) {
      window._ = _;
    }
    if (!window.graphlib) {
      window.graphlib = graphlib;
    }
  }
  return { _, graphlib };
}

// Execute immediately upon module load
ensureGlobals();
