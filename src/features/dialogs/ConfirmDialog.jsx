import React from 'react';
import { Modal, Button } from '../../design-system/components';

export function ConfirmDialog({
  isOpen,
  title = 'Are you sure?',
  message,
  onConfirm,
  onCancel,
  onClose,
  confirmText = 'Yes, proceed',
  cancelText = 'Cancel',
  variant = 'primary' // 'primary' | 'danger'
}) {
  const handleClose = onCancel || onClose;

  const actions = (
    <>
      <Button variant="ghost" onClick={handleClose}>{cancelText}</Button>
      <Button variant={variant} onClick={onConfirm}>
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} title={title} onClose={handleClose} actions={actions} size="sm">
      <p className="text-sm text-secondary">{message}</p>
    </Modal>
  );
}

export default ConfirmDialog;
