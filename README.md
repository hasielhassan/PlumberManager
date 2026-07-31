<p align="center">
    <img src="public/favicon.svg" width="128"/>
</p>

<h1 align="center">Plumber Manager</h1>

<p align="center">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/hasielhassan/PlumberManager" />
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/hasielhassan/PlumberManager" />
    <img alt="License" src="https://img.shields.io/github/license/hasielhassan/PlumberManager" />
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/hasielhassan/PlumberManager" />
    <a href="https://buymeacoffee.com/hasielhassan" target="_blank">
        <img alt="Buy Me A Coffee" src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black" />
    </a>
</p>

A modern web-based node editor and visualization tool designed specifically for planning, documenting, and managing CG Pipeline data flows and DCC connection structures.

---

## Why Plumber Manager?

At its core, a CG Pipeline is about the flow of data. Its primary building blocks are processes with inputs and outputs (e.g., publishing assets in Maya, loading sequences in Nuke). 

**Plumber Manager** provides a dedicated, highly interactive node graph editor configured with CG pipeline concepts:
* **Node Graph Editor**: Interactive canvas designed with visual standards familiar to CG artists and TD professionals.
* **Format-Aware Inputs & Outputs**: Integrated data type registers (USD, Alembic, EXR, Maya, etc.) to visualize plugs, sockets, and connection requirements.
* **Automatic Compound Layout**: Integrated hierarchy routing to automatically align complex node networks, keeping notes adjacent to their processes and nested elements grouped inside backdrops.
* **Documentation First**: Rich Markdown descriptions with WYSIWYG tools on each node to build a live documentation hub of your pipeline assets.
* **Embeddable Widget**: Build and bundle the canvas as a self-contained shadow DOM custom element (`<plumber-viewer>`) to drop pipeline charts directly into corporate wikis, Nuke panels, or web portals.

---

## Key Features

* **Interactive Canvas**: Smooth mouse-wheel centered zooming, panning, marquee box multi-node selection, and mini-map navigation.
* **Backdrop Group Boxes**: Create compound backdrop boxes with dynamic bottom-right resize grabbers. Moving a backdrop automatically moves all nested nodes, and auto-layout organizes them inside the group.
* **Rich Markdown Notes**: Place yellow sticky notes on the canvas that render formatted markdown elements (headers, bullets, bold text) with dynamic YIQ contrast coloring to ensure legibility.
* **Format Type Manager**: Custom creation and registry of custom format files with unique color codings and SVG file type icons.
* **Format Path Badges**: Connection paths dynamically center formatted type badges (e.g. `USD`, `MA`, `EXR`) in both the canvas editor and exported vectors.
* **Robust Exports**: Export diagrams as high-resolution PNGs, clean vector SVGs (with embedded formats and notes), or multi-page PDF documents.
* **100% Backward Compatible**: Parsers support importing legacy PyQt `.gph` diagrams.
* **Full Undo/Redo History**: Command history stack tracks node creations, attribute swaps, drag-resizes, coloring, and markdown descriptions.

---

## Technology Stack

The application is built on modern web-native architectures:
* **Frontend Framework**: [React 18](https://react.dev/)
* **Build System**: [Vite](https://vite.dev/)
* **Layout Engine**: [dagre](https://github.com/dagrejs/dagre)
* **Styling**: Pure CSS variables and custom design system themes
* **Rendering**: Native HTML5 2D Canvas API

---

## Development & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* npm (v9+)

### Installation
Clone the repository and install the project dependencies:
```bash
git clone https://github.com/hasielhassan/PlumberManager.git
cd PlumberManager
npm install
```

### Running Locally
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build
Build the optimized web application:
```bash
npm run build
```
Build outputs are generated in the `/dist` directory.

### Build Standalone Widget
To compile the standalone embeddable custom element viewer widget:
```bash
npm run build:widget
```
This generates `dist/widget/plumber-viewer.umd.js` and `dist/widget/plumber-viewer.es.js`.

---

## Embedding the Viewer Widget

Once built, you can embed Plumber diagrams inside any HTML page, wiki, or pipeline dashboard.

An interactive showcase of the widget embedding features, control APIs, and event handling is available in [public/embed-example.html](public/embed-example.html). To preview it, start the local development server and navigate to `http://localhost:5173/embed-example.html`.

Here is a quick example showing how to embed the widget in any page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pipeline Docs</title>
  <!-- Load the Widget Script -->
  <script src="./dist/widget/plumber-viewer.umd.js"></script>
</head>
<body>
  <h1>Asset Publish Flow</h1>

  <!-- Embedded Custom Element Viewer -->
  <plumber-viewer 
    src="/path/to/my_pipeline.gph" 
    style="width: 100%; height: 600px; border: 1px solid #2d3748; display: block;"
  ></plumber-viewer>
</body>
</html>
```

---

## 🤖 AI & Craftsmanship Disclaimer

Plumber Manager was built with love, hands-on CG pipeline engineering experience, and lots of coffee ☕ — developed with the interactive pair-programming assistance of **Claude** (Anthropic) and **Gemini** (Google DeepMind).

If you find Plumber Manager helpful for your studio or personal workflows, consider supporting its development:

<p align="center">
    <a href="https://buymeacoffee.com/hasielhassan" target="_blank">
        <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20Development-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" height="42" />
    </a>
</p>

---

> [!NOTE]
> Looking for the legacy desktop client? The previous Qt/Python desktop application is archived on the [v0.0.3.0 tag](https://github.com/hasielhassan/PlumberManager/tree/v0.0.3.0) and available for download on the [v0.0.3.0 releases page](https://github.com/hasielhassan/PlumberManager/releases/tag/v0.0.3.0).

---

## License
Licensed under the GNU General Public License v3.0.  
Copyright © 2019-2026 Hasiel Alvarez.
