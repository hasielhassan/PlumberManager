import React, { useState, useEffect } from 'react';
import { TextInput, IconButton } from '../design-system/components';
import { dataTypeRegistry } from '../core/data-types';
import { FormatSelect } from './FormatSelect';
import './SlotList.css';

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
    // Populate select options alphabetically
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
        // Find index of this attribute in the master node.attributes array
        const masterIdx = node.attributes.findIndex(a => a.name === attr.name);

        return (
          <div key={attr.name} className="ds-slot-row">
            {/* Input Name field - flex-grow & min-width styled */}
            <div className="ds-slot-name-field">
              <TextInput
                defaultValue={attr.name}
                placeholder="Slot name"
                onEnter={(e) => onRenameAttribute(masterIdx, e.target.value)}
                onBlur={(e) => onRenameAttribute(masterIdx, e.target.value)}
              />
            </div>
            
            {/* Custom Type Selector with icons inside trigger + options */}
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
                disabled={idx === attributes.length - 1}
                title="Move Down"
              />
              <IconButton
                icon="✕"
                size="sm"
                onClick={() => onDeleteAttribute(attr.name)}
                className="text-error"
                title="Delete Attribute"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SlotList;
