import React from 'react';
import { Modal, Button } from '../../design-system/components';
import './TypeMismatchDialog.css';

export function TypeMismatchDialog({
  isOpen,
  onClose,
  nodeName,
  attrName,
  oldType,
  newType,
  affectedConnections = [],
  onCascade,
  onDisconnect
}) {
  if (!isOpen) return null;

  const actions = (
    <div className="ds-mismatch-actions">
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="secondary" onClick={onDisconnect}>
        Disconnect Incompatible
      </Button>
      <Button variant="primary" onClick={onCascade}>
        Cascade & Update Connected Slots
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      title="Data Type Mismatch Detected"
      onClose={onClose}
      actions={actions}
      size="md"
    >
      <div className="ds-mismatch-body">
        <p className="ds-mismatch-description">
          Changing <strong>{nodeName} ➔ {attrName}</strong> from{' '}
          <span className="ds-mismatch-badge ds-mismatch-badge--old">{oldType.toUpperCase()}</span> to{' '}
          <span className="ds-mismatch-badge ds-mismatch-badge--new">{newType.toUpperCase()}</span>{' '}
          affects <strong>{affectedConnections.length}</strong> active connection{affectedConnections.length > 1 ? 's' : ''}:
        </p>

        <div className="ds-mismatch-list ds-scroll-area">
          {affectedConnections.map((conn, idx) => (
            <div key={idx} className="ds-mismatch-row">
              <div className="ds-mismatch-endpoint">
                <img
                  src={`/data_type_icons/${conn.sourceType.toLowerCase()}.svg`}
                  alt=""
                  className="ds-mismatch-icon"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="ds-mismatch-node-name">{conn.sourceNode}</span>
                <span className="ds-mismatch-attr-name">.{conn.sourceAttr}</span>
              </div>

              <div className="ds-mismatch-flow-arrow">
                ➔
              </div>

              <div className="ds-mismatch-endpoint">
                <img
                  src={`/data_type_icons/${conn.targetType.toLowerCase()}.svg`}
                  alt=""
                  className="ds-mismatch-icon"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="ds-mismatch-node-name">{conn.targetNode}</span>
                <span className="ds-mismatch-attr-name">.{conn.targetAttr}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="ds-mismatch-callout">
          <p>
            Choose <strong>Cascade & Update</strong> to update all connected slot types to {newType.toUpperCase()} in lockstep, or <strong>Disconnect Incompatible</strong> to break mismatched connections.
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default TypeMismatchDialog;
