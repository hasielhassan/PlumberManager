# PlumberManager Embeddable Widget

A lightweight, framework-agnostic JavaScript widget to embed interactive, read-only PlumberManager graph diagrams directly into other HTML pages.

## Features

- **No Framework Dependency**: Written in vanilla JavaScript with Shadow DOM for style encapsulation.
- **Interactive Navigation**: Supports mouse panning and zooming out of the box.
- **Format Icons**: Circular format icons are rendered on connection lines.
- **Collapsible Sidebar**: Automatically shows detailed process metadata and markdown-rendered descriptions when a node is clicked.
- **Node Isolation View**: Focuses on a single selected node and its direct inputs and outputs.
- **Customizable Theming**: Themeable through CSS Custom Properties.

## Installation

### Script Tag (UMD)
Load the script from the CDN and initialize:

```html
<!-- Load Widget Bundle -->
<script src="https://plumber-manager.pages.dev/widget/plumber-viewer.umd.js"></script>

<!-- Container Element -->
<div id="pipeline-viewer" style="width: 100%; height: 500px; border-radius: 8px;"></div>

<script>
  PlumberViewer.create('#pipeline-viewer', {
    src: 'https://example.com/my-pipeline.gph', // URL to fetch graph JSON
    theme: 'dark', // 'dark' | 'light'
    isolation: true, // Enable isolated modal view on double click / button click
    documentation: true, // Enable sidebar markdown rendering
    autoLayout: true, // Compute dagre layout
    fitOnLoad: true // Fit graph to container bounding box on start
  });
</script>
```

### ES Module (Bundlers)
```javascript
import { PlumberViewer } from './widget/plumber-viewer.es.js';

const viewer = PlumberViewer.create('#container', {
  data: myGraphData,
  theme: 'light'
});
```

## Options Configuration

| Property | Type | Default | Description |
|---|---|---|---|
| `src` | `String` | `null` | URL of the `.gph` file to fetch and render. |
| `data` | `Object` | `null` | Inline JSON data object representing the graph. |
| `theme` | `String` | `'dark'` | The color palette theme (`'dark'` or `'light'`). |
| `isolation` | `Boolean` | `true` | Allows users to open a modal view isolating single nodes. |
| `documentation` | `Boolean` | `true` | Renders a collapsible sidebar with markdown descriptions of clicked nodes. |
| `autoLayout` | `Boolean` | `true` | Runs the layout calculation on startup. |
| `fitOnLoad` | `Boolean` | `true` | Fits all nodes into the canvas boundaries. |

## Programmatic API

```javascript
const viewer = PlumberViewer.create('#viewer', { src: '/data.gph' });

// Center on a specific node
viewer.focusNode('Lighting');

// Open isolated modal for a node
viewer.showIsolation('Animation');

// Re-scale canvas to fit container
viewer.resize();

// Destroy instance and clean listeners
viewer.destroy();
```

## Styling Theme Overrides

Override CSS properties on the container selector to match your parent website theme:

```css
#pipeline-viewer {
  --plumber-bg: #0f172a;       /* Slate 900 */
  --plumber-bg-sidebar: #1e293b; /* Slate 800 */
  --plumber-border: #334155;    /* Slate 700 */
  --plumber-accent: #38bdf8;    /* Sky 400 */
  --plumber-text: #f8fafc;      /* Slate 50 */
}
```
