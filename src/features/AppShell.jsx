import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGraph } from '../hooks/useGraph';
import { Panel, Toast } from '../design-system/components';
import { Toolbar } from './Toolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { WelcomeScreen } from './WelcomeScreen';
import { NodeEditorCanvas } from '../canvas/NodeEditorCanvas';
import { 
  NewProcessDialog, 
  NewSlotDialog, 
  ConfirmDialog, 
  AboutDialog,
  ProgressDialog,
  MarkdownEditorDialog,
  ExportDialog,
  HelpDialog
} from './dialogs';
import { serializeGraph, deserializeGraph } from '../core/graph-serializer';
import { layoutGraph } from '../core/graph-layout';
import { localStorageManager } from '../core/local-storage';
import { downloadFile, uploadFile } from '../utils/file-io';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { SearchPalette } from './SearchPalette';
import { DataTypeManager } from './DataTypeManager';
import { IsolatedView } from './IsolatedView';
import { OnboardingTour } from './tour/OnboardingTour';
import './AppShell.css';

export function AppShell() {
  const { graph, selection, setSelection, updateTrigger } = useGraph();

  // Panel sizing & state
  const [panelWidth, setPanelWidth] = useState(() => localStorageManager.getPreferences().panelWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [draftNodeName, setDraftNodeName] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Auto Layout state
  const [autoRelayout] = useState(() => localStorageManager.getPreferences().autoRelayout);

  // Toast notifications state
  const [toast, setToast] = useState(null);

  // Modals state
  const [activeModal, setActiveModal] = useState(null);
  const [recentFiles, setRecentFiles] = useState(() => localStorageManager.getRecentFiles());
  const [minimapEnabled, setMinimapEnabled] = useState(() => localStorageManager.getPreferences().minimapEnabled);

  // Custom UI Dialog overlays (replacing window.confirm, window.prompt and loaders)
  const [confirmData, setConfirmData] = useState(null);
  const [progressData, setProgressData] = useState({ isOpen: false, title: '', message: '' });
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // Onboarding Tour state
  const [isTourRunning, setIsTourRunning] = useState(() => !localStorageManager.getPreferences().hasCompletedTour);
  const [sidebarTab, setSidebarTab] = useState('properties');

  // Open Menu Dropdown & Samples state
  const DEFAULT_SAMPLES = [
    { id: 'animation', name: 'Animation Pipeline', file: 'animation.gph' },
    { id: 'minimal', name: 'Minimal Diagram', file: 'minimal.gph' },
    { id: 'test', name: 'Test Diagram', file: 'test.gph' }
  ];
  const [samplesList, setSamplesList] = useState(DEFAULT_SAMPLES);
  const [isOpenMenuOpen, setIsOpenMenuOpen] = useState(false);
  const [isSamplesSubmenuOpen, setIsSamplesSubmenuOpen] = useState(false);
  const openMenuRef = useRef(null);

  // Fetch samples manifest
  useEffect(() => {
    fetch('/samples/manifest.json')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('No manifest file');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSamplesList(data);
        }
      })
      .catch(err => {
        console.warn('Failed to load sample manifest, using default list', err);
      });
  }, []);

  // Handle click outside & Esc key for Open menu dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openMenuRef.current && !openMenuRef.current.contains(e.target)) {
        setIsOpenMenuOpen(false);
        setIsSamplesSubmenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpenMenuOpen(false);
        setIsSamplesSubmenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Command History hooks
  const { executeAction, undo, redo, canUndo, canRedo, clearHistory } = useCommandHistory();

  // Show Toast helper
  const showToast = useCallback((message, type = 'secondary') => {
    setToast({ message, type });
  }, []);

  // Sync selection to active properties node
  useEffect(() => {
    if (selection.length === 1) {
      setActiveNode(selection[0]);
      setDraftNodeName(selection[0]);
    } else {
      setActiveNode(null);
      setDraftNodeName('');
    }
  }, [selection]);

  // Set up auto-saving on any graph mutation
  useEffect(() => {
    if (graph.nodes.size > 0) {
      localStorageManager.autoSave(graph);
    }
  }, [updateTrigger, graph]);

  // Try to restore auto-save on initial mount using custom ConfirmDialog
  useEffect(() => {
    if (localStorageManager.hasAutoSave() && graph.nodes.size === 0) {
      setShowRestoreModal(true);
    }
  }, [graph]);

  // Document Menu Trigger helper (File commands)
  const handleOpenFile = useCallback(async () => {
    try {
      const file = await uploadFile('.gph, .json');
      if (file && file.content) {
        setProgressData({ isOpen: true, title: 'Opening Graph', message: `Loading ${file.name}...` });
        setTimeout(() => {
          const success = deserializeGraph(file.content, graph);
          setProgressData({ isOpen: false });
          if (success) {
            localStorageManager.addRecentFile(file.name, file.content);
            setRecentFiles(localStorageManager.getRecentFiles());
            showToast(`Loaded graph: ${file.name}`, 'accent');
          } else {
            showToast('Failed to parse graph file. Format invalid.', 'danger');
          }
        }, 300);
      }
    } catch {
      setProgressData({ isOpen: false });
      showToast('Error opening file.', 'danger');
    }
  }, [graph, showToast]);

  const handleSaveFile = useCallback(() => {
    if (graph.nodes.size === 0) {
      showToast('Cannot save an empty graph.', 'secondary');
      return;
    }
    try {
      setProgressData({ isOpen: true, title: 'Saving Graph', message: 'Saving file to your computer...' });
      setTimeout(() => {
        const content = serializeGraph(graph);
        const success = downloadFile(content, 'pipeline.gph', 'application/json');
        setProgressData({ isOpen: false });
        if (success) {
          showToast('Graph downloaded successfully.', 'accent');
        } else {
          showToast('Failed to save file.', 'danger');
        }
      }, 300);
    } catch {
      setProgressData({ isOpen: false });
      showToast('Error saving file.', 'danger');
    }
  }, [graph, showToast]);

  // Bind Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+K, Ctrl+P)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'SELECT' ||
        e.target.isContentEditable ||
        e.target.closest('[contenteditable="true"]')
      ) {
        return;
      }

      if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        showToast('Undone.', 'secondary');
      }
      if (e.ctrlKey && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z'))) {
        e.preventDefault();
        redo();
        showToast('Redone.', 'secondary');
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveModal('SEARCH_PALETTE');
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setActiveModal('CREATE_NODE');
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        handleOpenFile();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveFile();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleOpenFile, handleSaveFile, showToast]);

  const handleLoadRecent = (fileData) => {
    setProgressData({ isOpen: true, title: 'Restoring Graph', message: 'Loading recent graph file...' });
    setTimeout(() => {
      const success = deserializeGraph(fileData.content, graph);
      setProgressData({ isOpen: false });
      if (success) {
        clearHistory();
        showToast(`Loaded recent graph: ${fileData.name}`, 'accent');
      } else {
        showToast('Failed to load recent graph.', 'danger');
      }
    }, 300);
  };

  const handleLoadSample = async (sampleName, quiet = false) => {
    try {
      if (!quiet) setProgressData({ isOpen: true, title: 'Loading Sample', message: `Fetching /samples/${sampleName}.gph...` });
      const response = await fetch(`/samples/${sampleName}.gph`);
      if (!response.ok) {
        throw new Error('Sample file not found');
      }
      const content = await response.text();
      const success = deserializeGraph(content, graph);
      if (!quiet) setProgressData({ isOpen: false });
      if (success) {
        clearHistory();
        const firstNode = Array.from(graph.nodes.keys())[0];
        if (firstNode) {
          setSelection([firstNode]);
        }
        if (!quiet) showToast(`Loaded sample graph: ${sampleName}`, 'accent');
      } else {
        if (!quiet) showToast('Failed to parse sample graph.', 'danger');
      }
    } catch (err) {
      if (!quiet) setProgressData({ isOpen: false });
      console.warn('Fetch failed, loading fallback local samples.', err);
      if (!quiet) showToast(`Failed to fetch sample: /samples/${sampleName}.gph`, 'danger');
    }
  };

  const handleCreateNode = (nodeName) => {
    executeAction(() => {
      const node = graph.createNode(nodeName, { x: 150, y: 150 });
      if (node) {
        setSelection([nodeName]);
        showToast(`Node "${nodeName}" created.`, 'primary');
      } else {
        showToast(`A node named "${nodeName}" already exists.`, 'danger');
      }
    }, 'Create Process Node');
  };

  const handleCreateInput = (name, dataType) => {
    if (!activeNode) return;
    executeAction(() => {
      graph.createAttribute(activeNode, {
        name,
        plug: false,
        socket: true,
        dataType
      });
      showToast(`Input slot "${name}" created on "${activeNode}".`, 'primary');
    }, 'Create Input Attribute');
  };

  const handleCreateOutput = (name, dataType) => {
    if (!activeNode) return;
    executeAction(() => {
      graph.createAttribute(activeNode, {
        name,
        plug: true,
        socket: false,
        dataType
      });
      showToast(`Output slot "${name}" created on "${activeNode}".`, 'primary');
    }, 'Create Output Attribute');
  };

  const handleAutoLayout = () => {
    executeAction(() => {
      layoutGraph(graph);
      showToast('Auto-layout computed successfully.', 'accent');
    }, 'Auto Layout Graph');
  };

  const handleToggleMinimap = () => {
    const nextVal = !minimapEnabled;
    setMinimapEnabled(nextVal);
    localStorageManager.savePreferences({ minimapEnabled: nextVal });
  };

  // Drag and drop .gph files directly onto the editor
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.gph') || file.name.endsWith('.json'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = deserializeGraph(event.target.result, graph);
        if (success) {
          clearHistory();
          localStorageManager.addRecentFile(file.name, event.target.result);
          setRecentFiles(localStorageManager.getRecentFiles());
          showToast(`Dropped and loaded graph: ${file.name}`, 'accent');
        } else {
          showToast('Failed to parse dropped file.', 'danger');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResizerMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener('mousemove', handleResizerMouseMove);
    document.addEventListener('mouseup', handleResizerMouseUp);
  };

  const handleResizerMouseMove = (e) => {
    const newWidth = window.innerWidth - e.clientX;
    const maxWidth = Math.floor(window.innerWidth * 0.5);
    if (newWidth > 260 && newWidth < maxWidth) {
      setPanelWidth(newWidth);
      localStorageManager.savePreferences({ panelWidth: newWidth });
    }
  };

  const handleResizerMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleResizerMouseMove);
    document.removeEventListener('mouseup', handleResizerMouseUp);
  };

  return (
    <div
      className="ds-app-shell flex flex-col h-full overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Top Menu Bar */}
      <header className="ds-menu-bar flex items-center justify-between shrink-0" data-tour="menu-bar">
        <div className="flex items-center gap-4">
          <div className="ds-app-logo flex items-center gap-2">
            <img src="/favicon.svg" alt="" className="ds-logo-icon" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            <span className="ds-logo-text font-bold">PlumberManager</span>
          </div>
          <nav className="ds-menu-nav flex items-center">
            <button className="ds-menu-trigger" onClick={() => {
              setConfirmData({
                title: 'Clear Workspace',
                message: 'Clear current editor workspace? This will wipe all nodes and configurations.',
                onConfirm: () => {
                  executeAction(() => {
                    graph.clear();
                    localStorageManager.clearAutoSave();
                    showToast('Cleared workspace.', 'secondary');
                  }, 'Clear Workspace');
                }
              });
            }}>New</button>
            <div className="ds-menu-container" ref={openMenuRef}>
              <button 
                className={`ds-menu-trigger ${isOpenMenuOpen ? 'ds-menu-trigger--active' : ''}`}
                onClick={() => setIsOpenMenuOpen(prev => !prev)}
              >
                Open ▾
              </button>
              {isOpenMenuOpen && (
                <div className="ds-menu-dropdown">
                  <button 
                    className="ds-menu-dropdown-item" 
                    onClick={() => {
                      setIsOpenMenuOpen(false);
                      setIsSamplesSubmenuOpen(false);
                      handleOpenFile();
                    }}
                  >
                    <span>📁 From file...</span>
                  </button>
                  <div className="ds-menu-dropdown-divider" />
                  <div 
                    className="ds-submenu-container"
                    onMouseEnter={() => setIsSamplesSubmenuOpen(true)}
                    onMouseLeave={() => setIsSamplesSubmenuOpen(false)}
                  >
                    <button 
                      className={`ds-menu-dropdown-item ${isSamplesSubmenuOpen ? 'ds-menu-dropdown-item--active' : ''}`}
                      onClick={() => setIsSamplesSubmenuOpen(prev => !prev)}
                    >
                      <span>Samples</span>
                      <span>▸</span>
                    </button>
                    {isSamplesSubmenuOpen && (
                      <div className="ds-submenu-dropdown">
                        {samplesList.map(sample => (
                          <button
                            key={sample.id}
                            className="ds-menu-dropdown-item"
                            onClick={() => {
                              setIsOpenMenuOpen(false);
                              setIsSamplesSubmenuOpen(false);
                              handleLoadSample(sample.id);
                            }}
                            title={sample.description || sample.name}
                          >
                            <span>{sample.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button className="ds-menu-trigger" onClick={handleSaveFile}>Save</button>
            <button className="ds-menu-trigger" onClick={() => setActiveModal('EXPORT_DIALOG')} data-tour="export-trigger">Export...</button>
            <button className="ds-menu-trigger" onClick={() => setActiveModal('FORMAT_MANAGER')} data-tour="format-manager-trigger">Formats</button>
            <button className="ds-menu-trigger" onClick={() => setActiveModal('HELP_DIALOG')}>Help</button>
            <button className="ds-menu-trigger" onClick={() => setActiveModal('ABOUT')}>About</button>
          </nav>
        </div>
        <div className="ds-menu-bar-right text-xs text-muted pr-4" data-tour="search-palette-trigger">
          Ctrl+K Search
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-row flex-1 overflow-hidden relative">
        {/* Editor Area */}
        <main className="ds-main-area flex-1 flex flex-col overflow-hidden relative">
          
          <Toolbar
            onCreateNode={() => setActiveModal('CREATE_NODE')}
            onAutoLayout={handleAutoLayout}
            onIsolateSelected={() => setActiveModal('ISOLATION_VIEW')}
            undoEnabled={canUndo}
            redoEnabled={canRedo}
            onUndo={undo}
            onRedo={redo}
            minimapEnabled={minimapEnabled}
            onToggleMinimap={handleToggleMinimap}
          />
          {/* Canvas Wrapper */}
          <div className="ds-canvas-container flex-1 bg-app relative" data-tour="canvas-container">
            {graph.nodes.size === 0 ? (
              <WelcomeScreen
                onCreateNode={() => setActiveModal('CREATE_NODE')}
                onOpenFile={handleOpenFile}
                onLoadSample={handleLoadSample}
                recentFiles={recentFiles}
                onOpenRecent={handleLoadRecent}
                onStartTour={() => setIsTourRunning(true)}
              />
            ) : (
              <NodeEditorCanvas autoRelayout={autoRelayout} minimapEnabled={minimapEnabled} />
            )}

            {isSidebarCollapsed && (
              <button
                type="button"
                className="ds-sidebar-expand-btn"
                onClick={() => setIsSidebarCollapsed(false)}
                title="Expand Sidebar"
              >
                ◂
              </button>
            )}
          </div>
        </main>

        {/* Resizer Handle */}
        {!isSidebarCollapsed && (
          <div
            className={`ds-resizer ${isResizing ? 'ds-resizer--active' : ''}`}
            onMouseDown={handleResizerMouseDown}
          />
        )}

        {/* Sidebar Panel */}
        {!isSidebarCollapsed && (
          <aside className="ds-sidebar shrink-0" style={{ width: panelWidth }} data-tour="sidebar-properties">
            <Panel 
              title={activeNode ? `Properties — ${draftNodeName}` : "Properties"} 
              collapsible={false} 
              className="h-full border-none rounded-none"
              headerActions={
                <button
                  type="button"
                  className="ds-sidebar-collapse-btn"
                  onClick={() => setIsSidebarCollapsed(true)}
                  title="Collapse Sidebar"
                >
                  ▸
                </button>
              }
            >
              <PropertiesPanel
                nodeName={activeNode}
                onNameChange={setDraftNodeName}
                onCreateInput={() => setActiveModal('CREATE_INPUT')}
                onCreateOutput={() => setActiveModal('CREATE_OUTPUT')}
                onExpandDetails={() => setActiveModal('MARKDOWN_EDITOR')}
                activeTab={sidebarTab}
                onTabChange={setSidebarTab}
              />
            </Panel>
          </aside>
        )}
      </div>

      {/* Status Bar */}
      <footer className="ds-status-bar flex items-center justify-between shrink-0 px-4 text-xs text-secondary border-t" data-tour="status-bar">
        <div>Ready</div>
        <div className="flex items-center gap-4">
          <div>Nodes: {graph.nodes.size}</div>
          <div>Connections: {graph.connections.length}</div>
        </div>
      </footer>

      {/* Modals Mounting */}
      <NewProcessDialog
        isOpen={activeModal === 'CREATE_NODE'}
        onClose={() => setActiveModal(null)}
        onCreate={handleCreateNode}
      />

      <NewSlotDialog
        isOpen={activeModal === 'CREATE_INPUT'}
        onClose={() => setActiveModal(null)}
        type="input"
        onCreate={handleCreateInput}
      />

      <NewSlotDialog
        isOpen={activeModal === 'CREATE_OUTPUT'}
        onClose={() => setActiveModal(null)}
        type="output"
        onCreate={handleCreateOutput}
      />

      <AboutDialog
        isOpen={activeModal === 'ABOUT'}
        onClose={() => setActiveModal(null)}
      />

      <SearchPalette
        isOpen={activeModal === 'SEARCH_PALETTE'}
        onClose={() => setActiveModal(null)}
        onSelectNode={(name) => setSelection([name])}
      />

      <DataTypeManager
        isOpen={activeModal === 'FORMAT_MANAGER'}
        onClose={() => setActiveModal(null)}
        onUpdate={() => graph.emit('node:moved', {})} // trigger components re-render to load custom formats
      />

      <IsolatedView
        isOpen={activeModal === 'ISOLATION_VIEW'}
        onClose={() => setActiveModal(null)}
        nodeName={activeNode}
        mainGraph={graph}
      />

      <ExportDialog
        isOpen={activeModal === 'EXPORT_DIALOG'}
        onClose={() => setActiveModal(null)}
        graph={graph}
        onShowProgress={(show, title, message) => {
          setProgressData({ isOpen: show, title: title || '', message: message || '' });
        }}
      />

      <HelpDialog
        isOpen={activeModal === 'HELP_DIALOG'}
        onClose={() => setActiveModal(null)}
        onStartTour={() => setIsTourRunning(true)}
      />

      {/* Guided Onboarding Tour */}
      <OnboardingTour
        run={isTourRunning}
        onCloseTour={() => {
          setIsTourRunning(false);
          setActiveModal(null);
          localStorageManager.savePreferences({ hasCompletedTour: true });
        }}
        graph={graph}
        onLoadSample={handleLoadSample}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setActiveModal={setActiveModal}
        setSidebarTab={setSidebarTab}
        setSelection={setSelection}
        selection={selection}
      />

      {activeNode && graph.nodes.has(activeNode) && (
        <MarkdownEditorDialog
          isOpen={activeModal === 'MARKDOWN_EDITOR'}
          nodeName={activeNode}
          initialContent={graph.nodes.get(activeNode).metadata?.process_details || ''}
          onClose={() => setActiveModal(null)}
          onSave={(content) => {
            graph.updateNodeMetadata(activeNode, 'process_details', content);
            graph.emit('node:moved', {}); // trigger re-render
            showToast('Documentation saved.', 'accent');
          }}
        />
      )}

      {/* Progress / Loading Dialog overlay */}
      <ProgressDialog
        isOpen={progressData.isOpen}
        title={progressData.title}
        message={progressData.message}
      />

      {/* General Confirm Dialog overlay */}
      <ConfirmDialog
        isOpen={confirmData !== null}
        title={confirmData?.title}
        message={confirmData?.message}
        onClose={() => setConfirmData(null)}
        onConfirm={() => {
          if (confirmData?.onConfirm) confirmData.onConfirm();
          setConfirmData(null);
        }}
      />

      {/* Restore Unsaved Session Confirm Dialog */}
      <ConfirmDialog
        isOpen={showRestoreModal}
        title="Restore Workspace"
        message="We found unsaved changes from your previous session. Would you like to restore them?"
        onClose={() => {
          setShowRestoreModal(false);
          localStorageManager.clearAutoSave();
        }}
        onConfirm={() => {
          setShowRestoreModal(false);
          localStorageManager.loadAutoSave(graph);
          clearHistory();
          showToast('Restored previous unsaved work.', 'accent');
        }}
      />

      {/* Toasts */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </div>
  );
}

export default AppShell;
