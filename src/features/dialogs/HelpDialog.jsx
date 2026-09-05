import React from 'react';
import { Modal, Button, Kbd } from '../../design-system/components';
import { getAssetUrl } from '../../utils/asset-path';
import './HelpDialog.css';

export function HelpDialog({ isOpen, onClose, onStartTour }) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="PlumberManager Help & Shortcuts"
      onClose={onClose}
      size="lg"
      actions={
        <div className="flex items-center gap-2">
          {onStartTour && (
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
                onStartTour();
              }}
              data-tour="take-tour"
            >
              🚀 Take Guided Tour
            </Button>
          )}
          <Button variant="primary" onClick={onClose}>
            Got it
          </Button>
        </div>
      }
    >
      <div className="ds-help-layout">
        <div>
          <h4 className="ds-help-section-title">Key Features</h4>
          <div className="ds-features-grid">
            <div className="ds-feature-card">
              <div className="ds-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m10 15-3-3 3-3" />
                  <path d="m14 9 3 3-3 3" />
                  <path d="m15 10-3-3-3 3" />
                  <path d="m9 14 3 3 3-3" />
                </svg>
              </div>
              <div className="ds-feature-content">
                <span className="ds-feature-title">Dynamic Canvas</span>
                <span className="ds-feature-desc">Middle-mouse-drag or Alt+drag to pan. Scroll to zoom centered on mouse cursor.</span>
              </div>
            </div>

            <div className="ds-feature-card">
              <div className="ds-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
                </svg>
              </div>
              <div className="ds-feature-content">
                <span className="ds-feature-title">CG Industry Data Types</span>
                <span className="ds-feature-desc">Preloaded with USD, Alembic, OpenColorIO, EXR, FBX, and more.</span>
              </div>
            </div>

            <div className="ds-feature-card">
              <div className="ds-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <div className="ds-feature-content">
                <span className="ds-feature-title">Custom Format Builder</span>
                <span className="ds-feature-desc">Create custom pipeline data formats with custom colors.</span>
              </div>
            </div>

            <div className="ds-feature-card">
              <div className="ds-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="ds-feature-content">
                <span className="ds-feature-title">Isolated Graph View</span>
                <span className="ds-feature-desc">Filter and view isolated subgraphs focusing purely on a process and its immediate connections.</span>
              </div>
            </div>

            <div className="ds-feature-card">
              <div className="ds-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                </svg>
              </div>
              <div className="ds-feature-content">
                <span className="ds-feature-title">Note Blocks</span>
                <span className="ds-feature-desc">Annotate process workflows using text note boxes directly on the canvas.</span>
              </div>
            </div>

            <div className="ds-feature-card">
              <div className="ds-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
              <div className="ds-feature-content">
                <span className="ds-feature-title">Production Grade Exports</span>
                <span className="ds-feature-desc">Save graphs as High-res PNG, Vector SVG, or multi-page documentation PDF files.</span>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--ds-border-color)', margin: 0 }} />

        <div>
          <h4 className="ds-help-section-title">Keyboard Shortcuts</h4>
          <div className="ds-shortcuts-list">
            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Command Palette Search</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Quick Connection Spawn</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>Ctrl</Kbd> + <Kbd>→</Kbd> / <Kbd>Ctrl</Kbd> + <Kbd>←</Kbd>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Rename Selected Process</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>F2</Kbd>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Delete Selected Nodes</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>Delete</Kbd> or <Kbd>Backspace</Kbd>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Fit Canvas to View</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>F</Kbd>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Snap Node coordinates</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>Shift</Kbd> + <span className="ds-shortcut-action-text">Drag Node</span>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Copy Selected Nodes</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Paste Nodes under Mouse</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>Ctrl</Kbd> + <Kbd>V</Kbd>
              </div>
            </div>

            <div className="ds-shortcut-row">
              <span className="ds-shortcut-name">Undo / Redo</span>
              <div className="ds-shortcut-keys-container">
                <Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd> / <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>Z</Kbd>
              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--ds-border-color)', margin: 0 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--ds-font-size-xs)', color: 'var(--ds-text-secondary)', gap: '12px', flexWrap: 'wrap' }}>
          <span>Want to embed diagrams in your wiki or pipeline dashboards?</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a 
              href={getAssetUrl('/embed-example.html')} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--ds-color-accent)', textDecoration: 'none', fontWeight: '600' }}
            >
              Live Embed Showcase ↗
            </a>
            <a 
              href="https://github.com/hasielhassan/PlumberManager#embedding-the-viewer-widget" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--ds-color-accent)', textDecoration: 'none', fontWeight: '600' }}
            >
              Developer Docs ↗
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default HelpDialog;
