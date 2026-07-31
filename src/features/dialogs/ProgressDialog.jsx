import React from 'react';
import { Modal } from '../../design-system/components';
import './ProgressDialog.css';

export function ProgressDialog({
  isOpen,
  title = 'Processing',
  message = 'Please wait while we complete the action...'
}) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={null} // prevent closing via header or backdrop
      size="sm"
    >
      <div className="ds-progress-container flex flex-col items-center justify-center gap-4 py-8">
        <div className="ds-progress-spinner" />
        <div className="ds-progress-message text-center text-sm text-secondary">
          {message}
        </div>
      </div>
    </Modal>
  );
}

export default ProgressDialog;
