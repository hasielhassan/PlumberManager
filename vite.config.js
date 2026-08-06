import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

/**
 * Automatically regenerates src/embed/inline-icons.js whenever Vite starts or builds.
 */
function autoGenerateInlineIconsPlugin() {
  return {
    name: 'auto-generate-inline-icons',
    buildStart() {
      try {
        execSync('node scripts/generate-inline-icons.cjs', { stdio: 'inherit' });
      } catch (err) {
        console.error('Failed to generate inline icons:', err);
      }
    }
  };
}

/**
 * Vite plugin that replaces graphlib/dagre internal lodash shim files at load
 * time.  Both libraries ship a `lib/lodash.js` that tries individual
 * `require("lodash/constant")` calls, then falls back to `window._`.  Inside a
 * UMD bundle neither path works reliably — the individual sub-modules aren't
 * resolved and `window._` is undefined during module-factory evaluation.
 *
 * This plugin intercepts the resolved file paths and returns ESM code that
 * imports the full lodash bundle and re-exports the needed subset.
 */
function graphLibLodashShim() {
  // Normalise to forward-slash for cross-platform matching.
  const normalise = (p) => p.replace(/\\/g, '/');

  const GRAPHLIB_LODASH = 'graphlib/lib/lodash.js';
  const DAGRE_LODASH   = 'dagre/lib/lodash.js';

  const graphlibShim = `
import lodash from 'lodash';
var _ = lodash;
module.exports = {
  clone: _.clone, constant: _.constant, each: _.each,
  filter: _.filter, has: _.has, isArray: _.isArray,
  isEmpty: _.isEmpty, isFunction: _.isFunction,
  isUndefined: _.isUndefined, keys: _.keys, map: _.map,
  reduce: _.reduce, size: _.size, transform: _.transform,
  union: _.union, values: _.values
};`;

  const dagreShim = `
import lodash from 'lodash';
var _ = lodash;
module.exports = {
  cloneDeep: _.cloneDeep, constant: _.constant, defaults: _.defaults,
  each: _.each, filter: _.filter, find: _.find, flatten: _.flatten,
  forEach: _.forEach, forIn: _.forIn, has: _.has,
  isUndefined: _.isUndefined, last: _.last, map: _.map,
  mapValues: _.mapValues, max: _.max, merge: _.merge, min: _.min,
  minBy: _.minBy, now: _.now, pick: _.pick, range: _.range,
  reduce: _.reduce, sortBy: _.sortBy, uniqueId: _.uniqueId,
  values: _.values, zipObject: _.zipObject
};`;

  return {
    name: 'graph-lib-lodash-shim',
    enforce: 'pre',
    load(id) {
      const n = normalise(id);
      if (n.endsWith(GRAPHLIB_LODASH)) return graphlibShim;
      if (n.endsWith(DAGRE_LODASH))    return dagreShim;
      return null;
    }
  };
}

export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget' || process.env.BUILD_TARGET === 'widget';
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const appVersion = packageJson.version;

  if (isWidget) {
    return {
      plugins: [autoGenerateInlineIconsPlugin(), graphLibLodashShim()],
      define: {
        __APP_VERSION__: JSON.stringify(appVersion)
      },
      build: {
        outDir: 'dist/widget',
        lib: {
          entry: 'src/embed/plumber-viewer.js',
          name: 'PlumberViewer',
          fileName: (format) => `plumber-viewer.${format}.js`,
          formats: ['umd', 'es']
        },
        cssCodeSplit: false,
        emptyOutDir: true,
        rollupOptions: {
          output: {
            codeSplitting: false
          }
        }
      }
    };
  }

  // Default App Build Configuration
  return {
    base: '/PlumberManager/',
    plugins: [autoGenerateInlineIconsPlugin(), graphLibLodashShim(), react()],
    define: {
      __APP_VERSION__: JSON.stringify(appVersion)
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('scheduler') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('milkdown') || id.includes('@milkdown')) {
                return 'vendor-milkdown';
              }
              if (id.includes('jspdf') || id.includes('svg2pdf.js') || id.includes('fflate')) {
                return 'vendor-pdf';
              }
              if (id.includes('marked')) {
                return 'vendor-marked';
              }
              return 'vendor-others';
            }
          }
        }
      }
    }
  };
});
