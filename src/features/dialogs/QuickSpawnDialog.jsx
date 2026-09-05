import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button } from '../../design-system/components';
import { dataTypeRegistry } from '../../core/data-types';
import { FormatSelect } from '../FormatSelect';

export function QuickSpawnDialog({
  isOpen,
  direction = 'right',
  sourceNode,
  existingNodeNames = [],
  onClose,
  onSubmit
}) {
  const [nodeName, setNodeName] = useState('');
  const [slotName, setSlotName] = useState('');
  const [dataType, setDataType] = useState('usd');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (isOpen && sourceNode) {
      const defaultNode = direction === 'right' 
        ? `${sourceNode.name}_Next` 
        : `${sourceNode.name}_Prev`;
      setNodeName(defaultNode);

      // Default slot name: if right, try 'cache'; if left, 'input'
      setSlotName(direction === 'right' ? 'cache' : 'input');

      // Populate format choices
      const allTypes = dataTypeRegistry.getAllTypes().map(dt => ({
        value: dt.code,
        label: dt.type
      }));
      setTypes(allTypes);

      // Default to last attribute's type if available, else 'usd'
      const lastAttr = sourceNode.attributes && sourceNode.attributes.length > 0
        ? sourceNode.attributes[sourceNode.attributes.length - 1]
        : null;
      setDataType(lastAttr?.dataType || 'usd');
    }
  }, [isOpen, direction, sourceNode]);

  const trimmedNodeName = nodeName.trim();
  const trimmedSlotName = slotName.trim();

  // Validate process name uniqueness
  const isDuplicateNode = existingNodeNames.some(
    existing => existing.toLowerCase() === trimmedNodeName.toLowerCase()
  );

  // Validate slot name uniqueness on the source node side
  const isDuplicateSlot = sourceNode?.attributes?.some(a => {
    if (a.name.toLowerCase() !== trimmedSlotName.toLowerCase()) return false;
    return direction === 'right' ? a.plug : a.socket;
  }) || false;

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (trimmedNodeName && trimmedSlotName && !isDuplicateNode && !isDuplicateSlot && dataType) {
      onSubmit({
        nodeName: trimmedNodeName,
        slotName: trimmedSlotName,
        dataType
      });
      onClose();
    }
  };

  const isSubmitDisabled = !trimmedNodeName || !trimmedSlotName || isDuplicateNode || isDuplicateSlot;

  const isDownstream = direction === 'right';
  const title = isDownstream 
    ? 'Quick Spawn Node (Downstream →)' 
    : 'Quick Spawn Node (← Upstream)';

  const actions = (
    <>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSubmit} disabled={isSubmitDisabled}>
        Spawn & Connect
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      actions={actions}
      size="sm"
      className="ds-modal--overflow-visible"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="text-xs text-muted">
          {isDownstream 
            ? `Creating downstream node connected from "${sourceNode?.name}".` 
            : `Creating upstream node feeding into "${sourceNode?.name}".`}
        </div>

        {/* Process Name Input */}
        <div className="flex flex-col gap-1">
          <TextInput
            label="New Process Name"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            placeholder="e.g. Review, Grading, Comp"
            autoFocus
          />
          {isDuplicateNode && trimmedNodeName && (
            <span className="text-error text-xs" style={{ marginTop: '2px' }}>
              A node named "{trimmedNodeName}" already exists.
            </span>
          )}
        </div>

        {/* Slot Name Input */}
        <div className="flex flex-col gap-1">
          <TextInput
            label={isDownstream ? 'Connecting Output Slot Name' : 'Connecting Input Slot Name'}
            value={slotName}
            onChange={(e) => setSlotName(e.target.value)}
            placeholder="e.g. cache, geo, textures"
          />
          {isDuplicateSlot && trimmedSlotName && (
            <span className="text-error text-xs" style={{ marginTop: '2px' }}>
              An {isDownstream ? 'output' : 'input'} slot named "{trimmedSlotName}" already exists on "{sourceNode?.name}".
            </span>
          )}
        </div>

        {/* Data Type Format Selection */}
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

export default QuickSpawnDialog;
