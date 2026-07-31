import React from 'react';
import { Button, IconButton, Divider } from '../design-system/components';
import { useGraph } from '../hooks/useGraph';
import './Toolbar.css';

export function Toolbar({
  onCreateNode,
  onAutoLayout,
  onIsolateSelected,
  onToggleMinimap,
  minimapEnabled,
  undoEnabled,
  redoEnabled,
  onUndo,
  onRedo
}) {
  const { selection } = useGraph();

  return (
    <div className="ds-toolbar flex items-center justify-between px-4 py-2 border-b shrink-0" data-tour="toolbar">
      <div className="flex items-center gap-2">
        <Button variant="primary" size="sm" onClick={onCreateNode} icon="＋">
          Create Process
        </Button>
        <Button variant="secondary" size="sm" onClick={onAutoLayout} icon="⚡">
          Auto Layout Graph
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onIsolateSelected}
          disabled={selection.length !== 1}
          icon="🔍"
        >
          Isolate Selected
        </Button>

        <Divider vertical />

        {/* Undo/Redo Buttons */}
        <IconButton
          icon="↶"
          size="sm"
          onClick={onUndo}
          disabled={!undoEnabled}
          title="Undo (Ctrl+Z)"
        />
        <IconButton
          icon="↷"
          size="sm"
          onClick={onRedo}
          disabled={!redoEnabled}
          title="Redo (Ctrl+Shift+Z)"
        />

        <Divider vertical />

        <IconButton
          icon="🗺️"
          size="sm"
          onClick={onToggleMinimap}
          className={minimapEnabled ? 'ds-button--active' : ''}
          title="Toggle Minimap"
        />
      </div>
    </div>
  );
}

export default Toolbar;
