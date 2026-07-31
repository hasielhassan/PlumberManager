import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from '../../design-system/components';
import { dataTypeRegistry } from '../../core/data-types';
import { FormatSelect } from '../FormatSelect';

export function NewSlotDialog({ isOpen, onClose, onCreate, type = 'input' }) {
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('usd');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setName('');
      // Populate format choices
      const allTypes = dataTypeRegistry.getAllTypes().map(dt => ({
        value: dt.code,
        label: dt.type
      }));
      setTypes(allTypes);
      if (allTypes.length > 0) {
        setDataType(allTypes[0].value);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && dataType) {
      onCreate(name.trim(), dataType);
      onClose();
    }
  };

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit} disabled={!name.trim()}>
        Create {type === 'input' ? 'Input' : 'Output'}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      title={`Create New ${type === 'input' ? 'Input Slot (Socket)' : 'Output Slot (Plug)'}`}
      onClose={onClose}
      actions={actions}
      size="sm"
      className="ds-modal--overflow-visible"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          label="Slot Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. cache, geometry, textures"
          autoFocus
        />
        
        <div className="ds-input-group">
          <label className="ds-input-label">Data Type Format</label>
          <FormatSelect
            value={dataType}
            options={types}
            onChange={(e) => setDataType(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
}

export default NewSlotDialog;
