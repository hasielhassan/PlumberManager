import React, { useState, useEffect } from 'react';
import { TextInput, IconButton } from '../design-system/components';
import { dataTypeRegistry } from '../core/data-types';
import { FormatSelect } from './FormatSelect';
import './SlotList.css';

function SlotRow({
  attr,
  type,
  masterIdx,
  idx,
  totalSlots,
  types,
  existingSameSideNames,
  onRenameAttribute,
  onDataTypeChange,
  onReorderAttribute,
  onDeleteAttribute
}) {
  const [slotName, setSlotName] = useState(attr.name);

  useEffect(() => {
    setSlotName(attr.name);
  }, [attr.name]);

  const trimmed = slotName.trim();
  const isDuplicate = existingSameSideNames.includes(trimmed.toLowerCase());

  const handleCommitRename = () => {
    if (!trimmed || isDuplicate || trimmed === attr.name) {
      setSlotName(attr.name); // Revert if invalid or unchanged
      return;
    }
    onRenameAttribute(masterIdx, trimmed, type);
  };

  return (
    <div className="ds-slot-row">
      {/* Input Name field */}
      <div className="ds-slot-name-field">
        <TextInput
          value={slotName}
          placeholder="Slot name"
          onChange={(e) => setSlotName(e.target.value)}
          onEnter={handleCommitRename}
          onBlur={handleCommitRename}
          error={isDuplicate ? 'Duplicate name' : undefined}
        />
      </div>
      
      {/* Custom Type Selector */}
      <div className="ds-slot-type-select">
        <FormatSelect
          value={attr.dataType}
          options={types}
          onChange={(e) => onDataTypeChange(masterIdx, e.target.value)}
        />
      </div>

      {/* Reorder and Delete Actions */}
      <div className="ds-slot-actions">
        <IconButton
          icon="▲"
          size="sm"
          onClick={() => onReorderAttribute(masterIdx, -1)}
          disabled={idx === 0}
          title="Move Up"
        />
        <IconButton
          icon="▼"
          size="sm"
          onClick={() => onReorderAttribute(masterIdx, 1)}
          disabled={idx === totalSlots - 1}
          title="Move Down"
        />
        <IconButton
          icon="✕"
          size="sm"
          onClick={() => onDeleteAttribute(attr.name, type)}
          className="text-error"
          title="Delete Attribute"
        />
      </div>
    </div>
  );
}

export function SlotList({
  node,
  type = 'input', // 'input' | 'output'
  onRenameAttribute,
  onDataTypeChange,
  onReorderAttribute,
  onDeleteAttribute
}) {
  const [types, setTypes] = useState([]);
  
  useEffect(() => {
    const list = dataTypeRegistry.getAllTypes().map(dt => ({
      value: dt.code,
      label: dt.type
    }));
    setTypes(list);
  }, []);

  const attributes = node.attributes.filter(a => type === 'input' ? a.socket : a.plug);

  if (attributes.length === 0) {
    return (
      <div className="text-center text-xs text-muted py-3 border border-dashed rounded">
        No {type}s created yet.
      </div>
    );
  }

  return (
    <div className="ds-slot-list-container">
      {attributes.map((attr, idx) => {
        // Find exact index of this attribute object in the master node.attributes array
        const masterIdx = node.attributes.findIndex(a => a === attr);
        const existingSameSideNames = attributes
          .filter(a => a !== attr)
          .map(a => a.name.toLowerCase());

        return (
          <SlotRow
            key={`${type}-${attr.name}-${idx}`}
            attr={attr}
            type={type}
            masterIdx={masterIdx}
            idx={idx}
            totalSlots={attributes.length}
            types={types}
            existingSameSideNames={existingSameSideNames}
            onRenameAttribute={onRenameAttribute}
            onDataTypeChange={onDataTypeChange}
            onReorderAttribute={onReorderAttribute}
            onDeleteAttribute={onDeleteAttribute}
          />
        );
      })}
    </div>
  );
}

export default SlotList;
