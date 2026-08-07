import { ensureGlobals } from './widget-polyfills';
ensureGlobals();

import { GraphModel } from '../core/graph-model';
import { deserializeGraph } from '../core/graph-serializer';
import { layoutGraph } from '../core/graph-layout';
import { buildIsolatedGraph } from '../core/isolation-builder';
import { ViewerCanvas } from './viewer-canvas';
import { marked } from 'marked';
import styles from './viewer-styles.css?raw';

export class PlumberViewer {
  static create(target, options) {
    const container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) {
      console.error(`Container not found: ${target}`);
      return null;
    }
    return new PlumberViewer(container, options);
  }

  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      theme: 'dark',
      autoLayout: true,
      fitOnLoad: true,
      isolation: true,
      documentation: true,
      selectNode: null,
      ...options
    };

    this.listeners = new Map();
    this.graph = new GraphModel();
    this.selectedNodeName = null;

    this.initShadow();
    this.initDom();
    this.initCanvas();
    
    // Load source
    if (this.options.src) {
      this.loadFromUrl(this.options.src);
    } else if (this.options.data) {
      this.loadGraph(this.options.data);
    }
  }

  initShadow() {
    this.shadow = this.container.attachShadow({ mode: 'open' });
    
    // Inject Scoped Stylesheet
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    this.shadow.appendChild(styleTag);
  }

  initDom() {
    this.root = document.createElement('div');
    this.root.className = `plumber-viewer-root plumber-theme-${this.options.theme}`;
    
    // Build canvas container
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.className = 'plumber-canvas-container';
    
    this.canvasEl = document.createElement('canvas');
    this.canvasEl.className = 'plumber-canvas';
    this.canvasContainer.appendChild(this.canvasEl);

    // Build optional toolbar
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'plumber-toolbar';
    
    const fitBtn = document.createElement('button');
    fitBtn.className = 'plumber-btn';
    fitBtn.innerHTML = '🔍 Fit View';
    fitBtn.onclick = () => this.viewerCanvas.fitToView();
    this.toolbar.appendChild(fitBtn);

    if (this.options.isolation) {
      const isoBtn = document.createElement('button');
      isoBtn.className = 'plumber-btn';
      isoBtn.innerHTML = '👁️ Isolate Node';
      isoBtn.onclick = () => {
        if (this.selectedNodeName) {
          this.showIsolation(this.selectedNodeName);
        } else {
          alert('Click a node first to isolate.');
        }
      };
      this.toolbar.appendChild(isoBtn);
    }

    this.canvasContainer.appendChild(this.toolbar);
    this.root.appendChild(this.canvasContainer);

    // Build optional documentation sidebar
    if (this.options.documentation) {
      this.sidebar = document.createElement('aside');
      this.sidebar.className = 'plumber-docs-panel';
      this.sidebar.innerHTML = `
        <h3>Process Details</h3>
        <div class="plumber-docs-content">
          <div class="plumber-docs-empty">Click a node to inspect its pipeline documentation.</div>
        </div>
      `;
      this.root.appendChild(this.sidebar);
    }

    this.shadow.appendChild(this.root);

    // Handle auto-resizing
    const resizeObserver = new ResizeObserver(() => this.resize());
    resizeObserver.observe(this.container);
  }

  initCanvas() {
    this.viewerCanvas = new ViewerCanvas(this.canvasEl, this.graph, (nodeName) => {
      this.handleNodeClick(nodeName);
    });
  }

  resize() {
    const width = this.canvasContainer.clientWidth;
    const height = this.canvasContainer.clientHeight;
    this.canvasEl.width = width;
    this.canvasEl.height = height;
    
    if (this.viewerCanvas) {
      this.viewerCanvas.render();
    }
  }

  handleNodeClick(nodeName) {
    this.selectedNodeName = nodeName || null;
    if (this.viewerCanvas) {
      this.viewerCanvas.setSelectedNode(this.selectedNodeName);
    }
    this.emit('node:click', nodeName);

    if (this.options.documentation && this.sidebar) {
      const node = this.graph.nodes.get(nodeName);
      const docsContent = this.sidebar.querySelector('.plumber-docs-content');
      if (node && docsContent) {
        const details = node.metadata?.process_details || '*No description provided.*';
        
        const inputs = node.attributes.filter(a => a.socket).map(a => `<li>${a.name} (<code>${a.dataType}</code>)</li>`).join('');
        const outputs = node.attributes.filter(a => a.plug).map(a => `<li>${a.name} (<code>${a.dataType}</code>)</li>`).join('');

        docsContent.innerHTML = `
          <h4 style="margin: 0 0 8px 0; font-size: 15px;">${node.name}</h4>
          <div style="font-size: 12px; margin-bottom: 12px;">
            ${inputs ? `<strong>Inputs:</strong> <ul style="margin: 4px 0; padding-left: 16px;">${inputs}</ul>` : ''}
            ${outputs ? `<strong>Outputs:</strong> <ul style="margin: 4px 0; padding-left: 16px;">${outputs}</ul>` : ''}
          </div>
          <div style="border-top: 1px solid var(--plumber-border); padding-top: 12px;">
            ${marked.parse(details)}
          </div>
        `;
      }
    }
  }

  loadGraph(data) {
    const success = deserializeGraph(data, this.graph);
    if (success) {
      if (this.options.autoLayout) {
        layoutGraph(this.graph, { animate: false });
      }
      this.resize();
      if (this.options.selectNode) {
        this.selectNode(this.options.selectNode);
      }
      if (this.options.fitOnLoad) {
        setTimeout(() => this.viewerCanvas.fitToView(), 50);
      }
      this.emit('graph:loaded', data);
    }
  }

  selectNode(nodeName) {
    if (nodeName) {
      this.handleNodeClick(nodeName);
    } else {
      this.selectedNodeName = null;
      if (this.viewerCanvas) {
        this.viewerCanvas.setSelectedNode(null);
      }
      if (this.options.documentation && this.sidebar) {
        const docsContent = this.sidebar.querySelector('.plumber-docs-content');
        if (docsContent) {
          docsContent.innerHTML = '<div class="plumber-docs-empty">Click a node to inspect its pipeline documentation.</div>';
        }
      }
    }
  }

  async loadFromUrl(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.loadGraph(json);
    } catch (err) {
      console.error(`Failed to fetch graph from URL: ${url}`, err);
    }
  }

  focusNode(nodeName) {
    if (this.viewerCanvas) {
      if (nodeName) {
        this.viewerCanvas.focusNode(nodeName);
        this.handleNodeClick(nodeName);
      } else {
        this.selectedNodeName = null;
        this.viewerCanvas.fitToView();
        if (this.options.documentation && this.sidebar) {
          const docsContent = this.sidebar.querySelector('.plumber-docs-content');
          if (docsContent) {
            docsContent.innerHTML = '<div class="plumber-docs-empty">Click a node to inspect its pipeline documentation.</div>';
          }
        }
      }
    }
  }

  showIsolation(nodeName) {
    // Remove existing isolation overlay if present
    const existingOverlay = this.root.querySelector('.plumber-iso-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    if (!nodeName) {
      this.emit('isolation:close', null);
      return;
    }

    const mainNode = this.graph.nodes.get(nodeName);
    if (!mainNode) {
      console.warn(`Cannot isolate unknown node: ${nodeName}`);
      return;
    }

    // Render an isolated overlay inside the Shadow DOM
    const overlay = document.createElement('div');
    overlay.className = 'plumber-iso-overlay';
    
    overlay.innerHTML = `
      <div class="plumber-iso-modal">
        <div class="plumber-iso-header">
          <h3 class="plumber-iso-title">Isolated View: ${nodeName}</h3>
          <button class="plumber-btn plumber-close-iso">✕ Close</button>
        </div>
        <div class="plumber-iso-canvas-container">
          <canvas class="plumber-canvas"></canvas>
        </div>
      </div>
    `;

    this.root.appendChild(overlay);

    const closeBtn = overlay.querySelector('.plumber-close-iso');
    closeBtn.onclick = () => {
      overlay.remove();
      this.emit('isolation:close', null);
    };

    const isoCanvas = overlay.querySelector('.plumber-canvas');
    const container = overlay.querySelector('.plumber-iso-canvas-container');
    
    // Fit canvas
    isoCanvas.width = container.clientWidth;
    isoCanvas.height = container.clientHeight;

    const isoG = buildIsolatedGraph(this.graph, nodeName);
    if (isoG) {
      const canvasController = new ViewerCanvas(isoCanvas, isoG, () => {});
      canvasController.fitToView();
    }

    this.emit('isolation:open', nodeName);
  }

  // Event Emitter
  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(handler);
    }
  }

  emit(event, payload) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(payload));
    }
  }

  destroy() {
    this.container.innerHTML = '';
    this.listeners.clear();
  }
}

// HTML Web Component Custom Element Registration
export class PlumberViewerElement extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const src = this.getAttribute('src');
    const theme = this.getAttribute('theme') || 'dark';
    const autoLayout = this.getAttribute('auto-layout') !== 'false';
    const fitOnLoad = this.getAttribute('fit-on-load') !== 'false';
    const isolation = this.getAttribute('isolation') !== 'false';
    const documentation = this.getAttribute('documentation') !== 'false';
    const selectNode = this.getAttribute('select-node');

    this.viewer = new PlumberViewer(this, {
      src,
      theme,
      autoLayout,
      fitOnLoad,
      isolation,
      documentation,
      selectNode
    });
  }

  disconnectedCallback() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }

  selectNode(nodeName) {
    if (this.viewer) this.viewer.selectNode(nodeName);
  }

  focusNode(nodeName) {
    if (this.viewer) this.viewer.focusNode(nodeName);
  }

  showIsolation(nodeName) {
    if (this.viewer) this.viewer.showIsolation(nodeName);
  }

  loadGraph(data) {
    if (this.viewer) this.viewer.loadGraph(data);
  }

  loadFromUrl(url) {
    if (this.viewer) this.viewer.loadFromUrl(url);
  }
}

if (typeof window !== 'undefined') {
  window.PlumberViewer = PlumberViewer;
  if (typeof customElements !== 'undefined' && !customElements.get('plumber-viewer')) {
    customElements.define('plumber-viewer', PlumberViewerElement);
  }
}

