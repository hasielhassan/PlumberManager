import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from '../../design-system/components';

export function NewProcessDialog({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      onClose();
    }
  };

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit} disabled={!name.trim()}>
        Create Node
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} title="Create Process Node" onClose={onClose} actions={actions} size="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          label="Process Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. LookDev, Animation, Render"
          autoFocus
        />
      </form>
    </Modal>
  );
}

export default NewProcessDialog;
