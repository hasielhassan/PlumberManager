# PlumberManager Embeddable Widget

A lightweight, self-contained, framework-agnostic JavaScript widget to embed interactive, read-only PlumberManager graph diagrams directly into HTML pages, wikis, or pipeline dashboards.

## Features

- **No Framework Dependency**: Written in vanilla JavaScript with Shadow DOM encapsulation.
- **Pre-bundled Inline Icons**: All 41+ format icons (`EXR`, `USD`, `MA`, `ABC`, `JPG`, etc.) are pre-bundled inline as SVG Data URIs — works CORS-free on `file://` protocols and external domains without network fetches.
- **Interactive Canvas & Dragging**: Mouse wheel zooming, canvas panning, touch gestures (1-finger pan/selection, 2-finger pinch-to-zoom), and interactive node dragging (including backdrop group drag-along).
- **Pre-selected Nodes**: Automatically select and highlight a target node on startup (`selectNode` option or `select-node` attribute) to display its documentation immediately.
- **Collapsible Sidebar**: Shows detailed process metadata, format requirements, and markdown-rendered pipeline documentation when a node is clicked.
- **Node & Backdrop Isolation View**: Isolate single process/note nodes with their direct inputs/outputs, or isolate backdrop group boxes with all their internal nodes and internal connections.
- **Custom Element & Object API**: Available as both a standard JS class (`PlumberViewer.create()`) and a Web Component (`<plumber-viewer>`).

## Installation & Usage

### 1. Web Component (`<plumber-viewer>`)
```html
<script src="https://hasielhassan.github.io/PlumberManager/widget/plumber-viewer.umd.js"></script>

<plumber-viewer 
  src="/path/to/diagram.gph" 
  select-node="Pipeline Overview"
  theme="dark"
  style="width: 100%; height: 600px; display: block;"
></plumber-viewer>
```

### 2. JavaScript Factory API (`PlumberViewer.create`)
```html
<!-- Container Element -->
<div id="pipeline-viewer" style="width: 100%; height: 600px;"></div>

<script src="https://hasielhassan.github.io/PlumberManager/widget/plumber-viewer.umd.js"></script>
<script>
  const viewer = PlumberViewer.create('#pipeline-viewer', {
    src: 'https://example.com/my-pipeline.gph', // URL to fetch graph JSON
    selectNode: 'Pipeline Overview', // Pre-select a node on load
    theme: 'dark', // 'dark' | 'light'
    isolation: true, // Enable isolated modal view on button click
    documentation: true, // Enable sidebar markdown rendering
    autoLayout: true, // Compute dagre hierarchy layout
    fitOnLoad: true // Fit graph to container bounding box on start
  });
</script>
```

### 3. ES Module (Bundlers)
```javascript
import { PlumberViewer } from './widget/plumber-viewer.es.js';

const viewer = PlumberViewer.create('#container', {
  data: myGraphDataObject,
  selectNode: 'Rigging',
  theme: 'dark'
});
```

## Options Configuration

| Property | Web Component Attribute | Type | Default | Description |
|---|---|---|---|---|
| `src` | `src` | `String` | `null` | URL of the `.gph` file to fetch and render. |
| `data` | — | `Object` | `null` | Inline JSON data object representing the graph. |
| `selectNode` | `select-node` | `String` | `null` | Name of the node to pre-select on load (highlights node and opens documentation). |
| `theme` | `theme` | `String` | `'dark'` | The color palette theme (`'dark'` or `'light'`). |
| `isolation` | `isolation` | `Boolean` | `true` | Allows users to open a modal view isolating single nodes or backdrop groups. |
| `fullscreen` | `fullscreen` | `Boolean` | `true` | Displays a Full Screen toggle button in the toolbar overlay. |
| `documentation` | `documentation` | `Boolean` | `true` | Renders a sidebar with markdown descriptions and socket/plug attributes. |
| `autoLayout` | `auto-layout` | `Boolean` | `true` | Runs hierarchy layout calculation on startup. |
| `fitOnLoad` | `fit-on-load` | `Boolean` | `true` | Fits all nodes into the canvas boundaries on startup. |

## Programmatic API

```javascript
const viewer = PlumberViewer.create('#viewer', { src: '/data.gph' });

// Select a node and load its documentation in the sidebar
viewer.selectNode('Pipeline Overview');

// Zoom and center camera on a specific node
viewer.focusNode('Lighting');

// Open isolated modal for a node or backdrop group
viewer.showIsolation('Assets & Animation');

// Toggle full screen mode programmatically
viewer.toggleFullScreen();

// Re-scale canvas to container bounding box
viewer.resize();

// Destroy instance and clean event listeners
viewer.destroy();
```

## Styling Theme Overrides

Override CSS Custom Properties on the container element to match host app design systems:

```css
#pipeline-viewer {
  --plumber-bg: #0f172a;          /* Main canvas background */
  --plumber-bg-sidebar: #1e293b;  /* Sidebar background */
  --plumber-border: #334155;      /* Panel border color */
  --plumber-accent: #38bdf8;      /* Primary accent color */
  --plumber-text: #f8fafc;        /* Foreground typography */
}
```
