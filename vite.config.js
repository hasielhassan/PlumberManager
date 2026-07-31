import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget' || process.env.BUILD_TARGET === 'widget';
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const appVersion = packageJson.version;

  if (isWidget) {
    return {
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
    plugins: [react()],
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
