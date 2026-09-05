import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from '../../design-system/components';

export function NewProcessDialog({ isOpen, onClose, onCreate, existingNames = [] }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
    }
  }, [isOpen]);

  const trimmed = name.trim();
  const isDuplicate = existingNames.some(existing => existing.toLowerCase() === trimmed.toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trimmed && !isDuplicate) {
      onCreate(trimmed);
      onClose();
    }
  };

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit} disabled={!trimmed || isDuplicate}>
        Create Node
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} title="Create Process Node" onClose={onClose} actions={actions} size="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <TextInput
            label="Process Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. LookDev, Animation, Render"
            autoFocus
          />
          {isDuplicate && trimmed && (
            <span className="text-error text-xs" style={{ marginTop: '2px' }}>
              A node named "{trimmed}" already exists.
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default NewProcessDialog;
