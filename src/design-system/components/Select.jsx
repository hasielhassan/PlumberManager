import React from 'react';
import './Select.css';

export function Select({
  label,
  value,
  onChange,
  options = [], // Array of { value, label, icon } or simple strings
  disabled = false,
  className = '',
  inline = false,
  ...props
}) {
  return (
    <div className={`ds-select-group ${inline ? 'ds-select-group--inline' : ''} ${className}`}>
      {label && <label className="ds-select-label">{label}</label>}
      <div className="ds-select-container">
        <select
          className="ds-select"
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val} className="ds-select-option">
                {lbl}
              </option>
            );
          })}
        </select>
        <span className="ds-select-arrow">▼</span>
      </div>
    </div>
  );
}
