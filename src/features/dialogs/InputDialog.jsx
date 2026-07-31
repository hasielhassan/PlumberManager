import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from '../../design-system/components';

export function InputDialog({
  isOpen,
  title,
  label,
  placeholder,
  defaultValue = '',
  onClose,
  onSubmit
}) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  const handleSubmit = () => {
    onSubmit(value);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!value.trim()}>
            Confirm
          </Button>
        </>
      }
    >
      <div className="py-2">
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onEnter={handleSubmit}
          autoFocus
        />
      </div>
    </Modal>
  );
}

export default InputDialog;
