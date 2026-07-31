import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useGraph } from '../hooks/useGraph';
import { Panel, Button, TextInput, Divider, ScrollArea } from '../design-system/components';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { SlotList } from './SlotList';
import { TypeMismatchDialog } from './dialogs/TypeMismatchDialog';

const MilkdownEditor = lazy(() => import('./MilkdownEditor').then(m => ({ default: m.MilkdownEditor })));
import './PropertiesPanel.css';

export function PropertiesPanel({
  nodeName,
  onNameChange,
  onCreateInput,
  onCreateOutput,
  onExpandDetails,
  activeTab: externalActiveTab,
  onTabChange
}) {
  const { graph } = useGraph();
  const { executeAction } = useCommandHistory();
  const node = graph.nodes.get(nodeName);
  
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [internalActiveTab, setInternalActiveTab] = useState('properties');
  const [mismatchPending, setMismatchPending] = useState(null);
  const activeTab = externalActiveTab !== undefined && externalActiveTab !== null ? externalActiveTab : internalActiveTab;

  const setActiveTab = (tab) => {
    setInternalActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };
  
  const lastDetailsRef = useRef('');
  const colorInputRef = useRef(null);

  // Sync state with selected node
  useEffect(() => {
    if (node) {
      setName(node.name);
      setDetails(node.metadata?.process_details || '');
      setCustomColor(node.metadata?.custom_color || '');
    }
  }, [nodeName, node]);



  if (!node) {
    return (
      <div className="text-center text-muted py-8 text-sm">
        No selection.<br />Select a node to inspect and edit.
      </div>
    );
  }

  const handleNameBlur = () => {
    if (name && name !== node.name) {
      executeAction(() => {
        const success = graph.renameNode(node.name, name.trim());
        if (!success) {
          setName(node.name); // revert if duplicate
        }
      }, 'Rename Node');
    }
  };

  const handleDetailsChange = (val) => {
    setDetails(val);
    node.metadata = { ...node.metadata, process_details: val };
    graph.emit('node:moved', {}); // force redraw
  };

  const handleDetailsFocus = () => {
    lastDetailsRef.current = details;
  };

  const handleDetailsBlur = () => {
    if (details !== lastDetailsRef.current) {
      const val = details;
      node.metadata = { ...node.metadata, process_details: lastDetailsRef.current };
      executeAction(() => {
        node.metadata = { ...node.metadata, process_details: val };
        graph.emit('node:moved', {});
      }, 'Edit Documentation');
    }
  };

  const handleRenameAttribute = (index, newName) => {
    if (!newName) return;
    executeAction(() => {
      graph.editAttribute(node.name, index, { name: newName });
    }, 'Rename Slot Attribute');
  };

  const handleDataTypeChange = (index, newType) => {
    const attr = node.attributes[index];
    if (!attr || attr.dataType?.toLowerCase() === newType?.toLowerCase()) return;

    // Find all active connections attached to this attribute
    const affectedConns = graph.connections.filter(c =>
      (c.sourceNode === node.name && c.sourceAttr === attr.name) ||
      (c.targetNode === node.name && c.targetAttr === attr.name)
    );

    const incompatibleConns = affectedConns.map(c => {
      const isSource = c.sourceNode === node.name;
      const oppNodeName = isSource ? c.targetNode : c.sourceNode;
      const oppAttrName = isSource ? c.targetAttr : c.sourceAttr;
      const oppNode = graph.nodes.get(oppNodeName);
      const oppAttr = oppNode?.attributes.find(a => a.name === oppAttrName);

      return {
        sourceNode: c.sourceNode,
        sourceAttr: c.sourceAttr,
        sourceType: (c.sourceNode === node.name ? attr.dataType : oppAttr?.dataType) || 'unknown',
        targetNode: c.targetNode,
        targetAttr: c.targetAttr,
        targetType: (c.targetNode === node.name ? attr.dataType : oppAttr?.dataType) || 'unknown',
        oppNodeName,
        oppAttrName,
        oppAttr
      };
    }).filter(item => item.oppAttr && item.oppAttr.dataType.toLowerCase() !== newType.toLowerCase());

    if (incompatibleConns.length === 0) {
      executeAction(() => {
        graph.editAttribute(node.name, index, { dataType: newType });
        graph.emit('node:moved', {});
      }, 'Change Connection Type');
      return;
    }

    // Prompt user with modal for resolving mismatch
    setMismatchPending({
      nodeName: node.name,
      attrIndex: index,
      attrName: attr.name,
      oldType: attr.dataType,
      newType,
      affectedConnections: incompatibleConns
    });
  };

  const handleCascadeMismatch = () => {
    if (!mismatchPending) return;
    const { nodeName: targetNodeName, attrIndex, attrName, newType } = mismatchPending;

    executeAction(() => {
      // 1. Update initial target slot
      graph.editAttribute(targetNodeName, attrIndex, { dataType: newType });

      // 2. Cascade across connected network
      const queue = [{ nodeName: targetNodeName, attrName }];
      const visited = new Set([`${targetNodeName}:${attrName}`]);

      while (queue.length > 0) {
        const current = queue.shift();
        const conns = graph.connections.filter(c =>
          (c.sourceNode === current.nodeName && c.sourceAttr === current.attrName) ||
          (c.targetNode === current.nodeName && c.targetAttr === current.attrName)
        );

        for (const c of conns) {
          const oppNName = c.sourceNode === current.nodeName ? c.targetNode : c.sourceNode;
          const oppAName = c.sourceNode === current.nodeName ? c.targetAttr : c.sourceAttr;
          const key = `${oppNName}:${oppAName}`;

          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ nodeName: oppNName, attrName: oppAName });
          }
        }
      }

      visited.forEach(key => {
        const [nName, aName] = key.split(':');
        const n = graph.nodes.get(nName);
        if (n) {
          const aIdx = n.attributes.findIndex(a => a.name === aName);
          if (aIdx !== -1) {
            graph.editAttribute(nName, aIdx, { dataType: newType });
          }
        }
      });

      graph.emit('node:moved', {});
    }, 'Cascade Data Type Change');

    setMismatchPending(null);
  };

  const handleDisconnectMismatch = () => {
    if (!mismatchPending) return;
    const { nodeName: targetNodeName, attrIndex, newType, affectedConnections } = mismatchPending;

    executeAction(() => {
      // 1. Update target slot
      graph.editAttribute(targetNodeName, attrIndex, { dataType: newType });

      // 2. Remove incompatible connections
      affectedConnections.forEach(item => {
        graph.deleteConnection(item.sourceNode, item.sourceAttr, item.targetNode, item.targetAttr);
      });

      graph.emit('node:moved', {});
    }, 'Change Type & Disconnect Incompatible');

    setMismatchPending(null);
  };

  const handleReorderAttribute = (index, direction) => {
    executeAction(() => {
      graph.reorderAttribute(node.name, index, direction);
    }, 'Reorder Attributes');
  };

  const handleDeleteAttribute = (attrName) => {
    executeAction(() => {
      graph.deleteAttribute(node.name, attrName);
    }, 'Delete Slot Attribute');
  };

  const handleSelectColor = (hex) => {
    executeAction(() => {
      setCustomColor(hex);
      node.metadata = { ...node.metadata, custom_color: hex };
      graph.emit('node:moved', {});
    }, 'Change Node Color');
  };

  const cgColors = [
    { hex: '', label: 'Default', border: 'rgba(255,255,255,0.1)' },
    { hex: '#6cc188', label: 'Green', border: '#4ca76a' },
    { hex: '#2f855a', label: 'Dark Green', border: '#22543d' },
    { hex: '#4a90e2', label: 'Blue', border: '#2a74c7' },
    { hex: '#3182ce', label: 'Light Blue', border: '#2b6cb0' },
    { hex: '#319795', label: 'Teal', border: '#234e52' },
    { hex: '#00b5d8', label: 'Cyan', border: '#008b8b' },
    { hex: '#9013fe', label: 'Purple', border: '#740bc7' },
    { hex: '#d53f8c', label: 'Pink', border: '#97266d' },
    { hex: '#e28b4a', label: 'Orange', border: '#c36f2f' },
    { hex: '#f5a623', label: 'Yellow', border: '#d58c14' },
    { hex: '#d0021b', label: 'Red', border: '#b00010' },
    { hex: '#4a4a4a', label: 'Grey', border: '#333333' }
  ];

  const isCustomColor = customColor && !cgColors.some(c => c.hex === customColor);

  const isNote = node.preset === 'node_preset_note';
  const isBackdrop = node.preset === 'node_preset_backdrop';

  // Gather list of process nodes for Note linking dropdown
  const processNodesOptions = [
    { value: '', label: 'None (Unlinked)' },
    ...Array.from(graph.nodes.values())
      .filter(n => n.preset !== 'node_preset_note' && n.preset !== 'node_preset_backdrop')
      .map(n => ({ value: n.name, label: n.name }))
  ];

  // Determine available tabs based on node type
  const showDetailsTab = true; // Enabled for all including backdrops

  return (
    <div className="ds-properties-panel flex flex-col h-full">
      {/* Tab Bar — only show if we have multiple tabs */}
      {showDetailsTab && (
        <div className="ds-tab-bar">
          <button
            type="button"
            className={`ds-tab ${activeTab === 'properties' ? 'ds-tab--active' : ''}`}
            onClick={() => setActiveTab('properties')}
            data-tour="sidebar-properties-tab"
          >
            Properties
          </button>
          <button
            type="button"
            className={`ds-tab ${activeTab === 'details' ? 'ds-tab--active' : ''}`}
            onClick={() => setActiveTab('details')}
            data-tour="sidebar-details-tab"
          >
            {isNote ? 'Note Content' : isBackdrop ? 'Group Details' : 'Details'}
          </button>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'properties' ? (
        <ScrollArea className="h-full">
          <div className="ds-tab-content flex flex-col gap-4 p-4">
            {/* Node Name Configuration */}
            <TextInput
              label={isBackdrop ? 'Group Title' : isNote ? 'Note Title' : 'Process Name'}
              value={name}
              onChange={(e) => {
                const val = e.target.value;
                setName(val);
                if (onNameChange) onNameChange(val);
              }}
              onBlur={handleNameBlur}
              onEnter={handleNameBlur}
            />

            {/* Highlight Color Picker */}
            <div className="flex flex-col gap-2">
              <label className="ds-input-label">Node Highlight Color</label>
              <div className="flex items-center gap-2 flex-wrap">
                {cgColors.map((color) => (
                  <button
                    key={color.label}
                    type="button"
                    className={`ds-color-badge ${customColor === color.hex ? 'ds-color-badge--active' : ''}`}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: color.hex || '#1a202c',
                      border: `2px solid ${customColor === color.hex ? 'var(--ds-text-primary)' : color.border}`,
                      cursor: 'pointer',
                      padding: 0
                    }}
                    title={color.label}
                    onClick={() => handleSelectColor(color.hex)}
                  />
                ))}
                {/* Custom Color Selector (native color dialog trigger) */}
                <div style={{ position: 'relative', width: '22px', height: '22px' }}>
                  <button
                    type="button"
                    className={`ds-color-badge ${isCustomColor ? 'ds-color-badge--active' : ''}`}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, red, orange, yellow, green, blue, purple)',
                      border: `2px solid ${isCustomColor ? 'var(--ds-text-primary)' : 'rgba(255,255,255,0.15)'}`,
                      cursor: 'pointer',
                      padding: 0
                    }}
                    title="Custom Color"
                    onClick={() => colorInputRef.current?.click()}
                  />
                  <input
                    ref={colorInputRef}
                    type="color"
                    value={isCustomColor ? customColor : '#6cc188'}
                    onChange={(e) => handleSelectColor(e.target.value)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 0,
                      height: 0,
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Backdrop Specific layout ends here */}
            {isBackdrop && (
              <div className="text-center text-xs text-muted py-6 border border-dashed rounded mt-4">
                Drag nodes inside backdrop to group.<br />Resize from the bottom-right corner.
              </div>
            )}

            {/* Note Node Link Picker */}
            {isNote && (
              <>
                <div className="flex flex-col gap-1 mt-2">
                  <label className="ds-input-label">Linked Process Node</label>
                  <select
                    value={node.metadata?.linked_process || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      executeAction(() => {
                        node.metadata = { ...node.metadata, linked_process: val };
                        graph.emit('node:moved', {});
                      }, 'Link Note to Process');
                    }}
                    className="ds-select p-2 rounded border bg-sidebar text-sm text-primary"
                    style={{
                      width: '100%',
                      height: '34px',
                      backgroundColor: 'var(--ds-bg-sidebar)',
                      borderColor: 'var(--ds-border-color)',
                      color: 'var(--ds-text-primary)',
                      outline: 'none'
                    }}
                  >
                    {processNodesOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Normal Process Fields (Hidden for Notes & Backdrops) */}
            {!isNote && !isBackdrop && (
              <>
                {/* Attribute CRUD Actions */}
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={onCreateInput}>
                    Create Input
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1" onClick={onCreateOutput}>
                    Create Output
                  </Button>
                </div>

                <Divider />

                {/* Inputs Collapsible Section */}
                <Panel title="Inputs" collapsible>
                  <SlotList
                    node={node}
                    type="input"
                    onRenameAttribute={handleRenameAttribute}
                    onDataTypeChange={handleDataTypeChange}
                    onReorderAttribute={handleReorderAttribute}
                    onDeleteAttribute={handleDeleteAttribute}
                  />
                </Panel>

                {/* Outputs Collapsible Section */}
                <Panel title="Outputs" collapsible>
                  <SlotList
                    node={node}
                    type="output"
                    onRenameAttribute={handleRenameAttribute}
                    onDataTypeChange={handleDataTypeChange}
                    onReorderAttribute={handleReorderAttribute}
                    onDeleteAttribute={handleDeleteAttribute}
                  />
                </Panel>

                <Divider />

                <TextInput
                  label="Coordinates"
                  value={`${Math.round(node.position.x)}, ${Math.round(node.position.y)}`}
                  readOnly
                />
              </>
            )}
          </div>
        </ScrollArea>
      ) : (
        showDetailsTab && (
          <div className="ds-tab-content ds-tab-content--details flex flex-col gap-2 p-4 flex-1 min-h-0">
            <div className="flex items-center justify-between flex-shrink-0">
              <label className="ds-input-label">{isNote ? 'Note Description' : isBackdrop ? 'Group Details' : 'Process Details'}</label>
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  className="text-xs text-accent hover:underline"
                  onClick={onExpandDetails}
                  title="Expand details markdown editor"
                  data-tour="markdown-doc"
                >
                  ↗️ Expand
                </button>
              </div>
            </div>
            
            <Suspense fallback={<div style={{ padding: '20px', fontSize: '13px', color: 'var(--ds-text-secondary)' }}>Loading WYSIWYG Editor...</div>}>
              <MilkdownEditor
                key={nodeName}
                defaultValue={node.metadata?.process_details || ''}
                onChange={handleDetailsChange}
                onFocus={handleDetailsFocus}
                onBlur={handleDetailsBlur}
                className="ds-milkdown-inline"
              />
            </Suspense>
          </div>
        )
      )}

      {mismatchPending && (
        <TypeMismatchDialog
          isOpen={Boolean(mismatchPending)}
          onClose={() => setMismatchPending(null)}
          nodeName={mismatchPending.nodeName}
          attrName={mismatchPending.attrName}
          oldType={mismatchPending.oldType}
          newType={mismatchPending.newType}
          affectedConnections={mismatchPending.affectedConnections}
          onCascade={handleCascadeMismatch}
          onDisconnect={handleDisconnectMismatch}
        />
      )}
    </div>
  );
}

export default PropertiesPanel;
