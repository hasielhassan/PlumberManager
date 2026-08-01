# Technical Architecture & File Directory Map

This document outlines the codebase structure, layer boundaries, and specific file locations of the PlumberManager project to guide agents in finding files quickly.

---

## 1. Core Logic & Data Modeling (`src/core/`)

Responsible for graph state, serialization/deserialization, layouts, and historical transaction tracking.

* **[graph-model.js](../src/core/graph-model.js)**: 
  * The main event-driven database model. 
  * Manages the lists of nodes, attributes, and connection definitions.
  * *Note*: All modifications require emitting the `node:moved` event to trigger re-renders on the canvas.
* **[graph-serializer.js](../src/core/graph-serializer.js)**:
  * JSON parser and exporter.
  * Handles compatibility with legacy Python/Qt `.gph` format files.
  * *Note*: Emits `graph:loaded` upon successful imports.
* **[graph-layout.js](../src/core/graph-layout.js)**:
  * Computes relative nodes placement using `dagre` compound subgraphs.
  * Handles crossing-line minimization by reordering input/output attributes according to neighboring coordinates.
* **[command-history.js](../src/core/command-history.js)**:
  * Transaction-based command history manager providing standard Undo and Redo actions.
* **[data-types.js](../src/core/data-types.js)**:
  * Global format registry. Caches file type names (USD, EXR, MA) and pre-loads their SVG icon graphics.

---

## 2. Canvas & Rendering Pipeline (`src/canvas/`)

Calculates hit testing and draws nodes, grids, connections, and badges on the 2D HTML5 canvas.

* **[NodeEditorCanvas.jsx](../src/canvas/NodeEditorCanvas.jsx)**:
  * Canvas container, mouse & touch event handlers (1-finger note selection & node drag, 2-finger pinch zoom), and keyboard shortcut listeners (F2, Fit F, Spawn Ctrl+Arrow, Paste Ctrl+V).
  * Manages the canvas interaction state machine (`DRAG_NODE`, `DRAW_CONNECTION`, `DRAG_RESIZE_BACKDROP`, `SELECTION`, `DRAG_VIEW`).
* **[node-renderer.js](../src/canvas/node-renderer.js)**:
  * Custom drawings of node shapes.
  * Special rendering rules: note block inline markdown parsing, YIQ luminance text contrasts, backdrop group boxes, and bottom-right resize handles.
* **[connection-renderer.js](../src/canvas/connection-renderer.js)**:
  * Draws cubic Bezier connections with centered format code badges.
* **[grid-renderer.js](../src/canvas/grid-renderer.js)**:
  * Draws secondary and major coordinate lines linked to pan and zoom multipliers.
* **[hit-testing.js](../src/canvas/hit-testing.js)**:
  * Bounds checks for mouse pointer positions on nodes, sockets/plugs, backdrop resize handles, and connection paths.
* **[minimap.js](../src/canvas/minimap.js)**:
  * Compact overlay viewport helper.

---

## 3. UI Features & Sidebars (`src/features/`)

React user interfaces, property sheets, and popup control panels.

* **[PropertiesPanel.jsx](../src/features/PropertiesPanel.jsx)**:
  * Properties Panel template. Features note-specific textareas, backdrop highlights, and process inputs/outputs configurations.
* **[SlotList.jsx](../src/features/SlotList.jsx)**:
  * Grid rows containing the custom dropdown combobox `FormatSelect` displaying type icons.
* **[DataTypeManager.jsx](../src/features/DataTypeManager.jsx)**:
  * Layout modal manager for registering and deleting custom DCC formats/extensions.
* **[IsolatedView.jsx](../src/features/IsolatedView.jsx)**:
  * Sub-viewport rendering isolated subgraphs and neighboring dependencies with touch pan and pinch zoom handlers.
* **[WelcomeScreen.jsx](../src/features/WelcomeScreen.jsx)**:
  * Centered landing dashboard containing quick buttons, template graph loaders, and recent files paths.
* **[dialogs/](../src/features/dialogs/)**:
  * Contains `ConfirmDialog`, `InputDialog`, and `AboutDialog` modal overlays.

---

## 4. Diagram Export Engines (`src/export/`)

Calculates scales, ranges, and formats diagrams into downloadable file formats.

* **[export-svg.js](../src/export/export-svg.js)**: Generates responsive vector exports, including note markdowns, format badges, and rounded clipping definitions.
* **[export-png.js](../src/export/export-png.js)**: High-resolution raster images generator using HTML5 Canvas cache.
* **[export-pdf.js](../src/export/export-pdf.js)**: Document compiler generating print reports.

---

## 5. Embeddable Shadow DOM Widget (`src/embed/`)

* **[plumber-viewer.js](../src/embed/plumber-viewer.js)**: Standalone UMD/ES component encapsulating the 2D viewer canvas inside a shadow DOM root, ensuring style isolation from host web applications.
* **[viewer-canvas.js](../src/embed/viewer-canvas.js)**: 2D Canvas viewport renderer with mouse & touch gesture handling (1-finger pan/node click, 2-finger pinch zoom).

