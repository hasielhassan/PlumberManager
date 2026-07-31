import React from 'react';

export const getTourSteps = ({
  onLoadSample,
  setIsSidebarCollapsed,
  setSidebarTab,
  setSelection,
  setActiveModal,
  graph
}) => [
  {
    target: 'body',
    placement: 'center',
    title: '👋 Welcome to Plumber Manager',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          <strong>Plumber Manager</strong> is a modern CG Pipeline visualization tool designed to map, document, and manage DCC data flows and asset handoffs.
        </p>
        <p className="text-xs text-muted">
          Let’s take a quick guided tour of all UI options, features, and dialog options!
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="menu-bar"]',
    placement: 'bottom-start',
    title: '📁 Main Menu Bar',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          Use the main menu bar to manage your pipeline diagram files:
        </p>
        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>New / Open / Save</strong>: Wipes workspace or loads/downloads <code>.gph</code> files.</li>
          <li><strong>Export</strong>: Render to PNG, SVG, or multi-page PDF documents.</li>
          <li><strong>Formats</strong>: Manage DCC file extensions & custom format registries.</li>
          <li><strong>Help & About</strong>: View keyboard shortcuts and version specs.</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="search-palette-trigger"]',
    placement: 'bottom-end',
    title: '🔍 Quick Search Palette (Ctrl+K)',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          Press <code>Ctrl + K</code> anywhere in the app to open the quick search palette.
        </p>
        <p className="text-xs text-muted">
          Instantly jump to any process node, filter by format slots, or execute menu actions without leaving your keyboard.
        </p>
      </div>
    )
  },
  {
    target: '[data-tour="toolbar"]',
    placement: 'bottom-start',
    title: '⚡ Canvas Toolbar',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          Quickly manipulate the active diagram layout and history:
        </p>
        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>+ Create Process</strong>: Spawn a new process node (or press <code>Ctrl+P</code>).</li>
          <li><strong>⚡ Auto Layout</strong>: Execute Dagre compound layout graph positioning.</li>
          <li><strong>🔍 Isolate Selected</strong>: Open sub-viewport focused on dependencies.</li>
          <li><strong>↶ / ↷ History</strong>: Command transaction undo and redo (<code>Ctrl+Z</code> / <code>Ctrl+Y</code>).</li>
          <li><strong>🗺️ Minimap</strong>: Toggle spatial viewport navigator.</li>
        </ul>
      </div>
    )
  },
  {
    target: '[data-tour="canvas-container"]',
    placement: 'right',
    title: '🎨 Interactive HTML5 Canvas Viewport',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          The canvas provides hardware-accelerated 2D diagram rendering:
        </p>
        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>Pan & Zoom</strong>: Middle-mouse drag or wheel scroll. Press <code>F</code> to fit view.</li>
          <li><strong>Box Selection</strong>: Drag marquee box across multiple nodes.</li>
          <li><strong>Backdrop Groups</strong>: Group processes together inside backdrop boxes with resize handles.</li>
          <li><strong>Note Blocks</strong>: Sticky notes with inline markdown and YIQ luminance contrast text.</li>
        </ul>
      </div>
    ),
    before: async () => {
      if (graph && graph.nodes.size === 0 && onLoadSample) {
        await onLoadSample('minimal', true);
      }
    }
  },
  {
    target: '[data-tour="sidebar-properties"]',
    placement: 'left',
    title: '🎛️ Right Inspector — Properties Tab',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          The right panel displays full configuration options for the selected process node:
        </p>
        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          <li>Rename process nodes and pick custom highlight accent colors.</li>
          <li>Add format-aware <strong>Input Sockets</strong> and <strong>Output Plugs</strong>.</li>
          <li>Assign data format types (USD, Alembic, EXR, Maya, Nuke).</li>
        </ul>
      </div>
    ),
    before: async () => {
      if (graph && graph.nodes.size === 0 && onLoadSample) {
        await onLoadSample('minimal', true);
      }
      if (setIsSidebarCollapsed) setIsSidebarCollapsed(false);
      if (setSidebarTab) setSidebarTab('properties');
      if (graph && graph.nodes.size > 0 && setSelection) {
        const firstNode = Array.from(graph.nodes.keys())[0];
        setSelection([firstNode]);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  },
  {
    target: '[data-tour="sidebar-properties"]',
    placement: 'left',
    title: '📝 Right Inspector — Details & Markdown Tab',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          The panel switches to the <strong>Details</strong> tab to edit rich WYSIWYG documentation:
        </p>
        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          <li>Edit markdown descriptions, publish steps, and data contracts.</li>
          <li>Click <strong>↗️ Expand</strong> to open the full-screen markdown modal editor.</li>
        </ul>
      </div>
    ),
    before: async () => {
      if (graph && graph.nodes.size === 0 && onLoadSample) {
        await onLoadSample('minimal', true);
      }
      if (setIsSidebarCollapsed) setIsSidebarCollapsed(false);
      if (setSidebarTab) setSidebarTab('details');
      if (graph && graph.nodes.size > 0 && setSelection) {
        const firstNode = Array.from(graph.nodes.keys())[0];
        setSelection([firstNode]);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  },
  {
    target: '[data-tour="format-manager-trigger"]',
    placement: 'bottom',
    title: '🏷️ DCC Formats Menu',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          Clicking <strong>Formats</strong> in the main menu opens the custom CG extension registry.
        </p>
        <p className="text-xs text-muted">
          Let’s take a look inside the Format Type Manager dialog on the next step!
        </p>
      </div>
    ),
    before: async () => {
      if (setActiveModal) setActiveModal(null);
    }
  },
  {
    target: '[data-tour="format-manager-dialog"]',
    placement: 'right',
    title: '⚙️ Format Type Manager Dialog',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          Register and manage custom CG file extensions and formats:
        </p>
        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          <li>Define format codes (e.g. <code>usd</code>, <code>exr</code>, <code>abc</code>, <code>ma</code>).</li>
          <li>Assign unique color tags and custom SVG file type icons.</li>
          <li>Connection paths automatically render centered format badges!</li>
        </ul>
      </div>
    ),
    before: async () => {
      if (setActiveModal) setActiveModal('FORMAT_MANAGER');
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  },
  {
    target: '[data-tour="export-trigger"]',
    placement: 'bottom',
    title: '📤 Export Menu',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          Clicking <strong>Export...</strong> opens high-resolution diagram export options.
        </p>
        <p className="text-xs text-muted">
          Let’s inspect the SVG, PNG, and PDF rendering options on the next step!
        </p>
      </div>
    ),
    before: async () => {
      if (setActiveModal) setActiveModal(null);
    }
  },
  {
    target: '[data-tour="export-dialog-modal"]',
    placement: 'right',
    title: '🖼️ Diagram Export & Report Settings',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          Export your pipeline architecture directly into production deliverables:
        </p>
        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>Vector SVG</strong> with embedded format badges and header clip paths.</li>
          <li><strong>High-DPI PNG / JPEG</strong> raster images for wiki pages.</li>
          <li><strong>Multi-Page PDF</strong> documentation reports with cover pages.</li>
        </ul>
      </div>
    ),
    before: async () => {
      if (setActiveModal) setActiveModal('EXPORT_DIALOG');
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  },
  {
    target: '[data-tour="status-bar"]',
    placement: 'top',
    title: '🚀 Ready to Build!',
    content: (
      <div>
        <p style={{ marginBottom: '10px' }}>
          You're all set to start mapping your CG pipelines!
        </p>
        <p className="text-xs text-muted">
          You can restart this onboarding tour anytime from the <strong>Help</strong> menu or the Welcome Screen.
        </p>
      </div>
    ),
    before: async () => {
      if (setActiveModal) setActiveModal(null);
    }
  }
];
