import React from 'react';
import './TextInput.css';

export function TextInput({
  label,
  value,
  onChange,
  onKeyDown,
  onBlur,
  placeholder,
  disabled = false,
  readOnly = false,
  error,
  className = '',
  inline = false,
  autoFocus = false,
  onEnter,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const inputProps = {
    type: 'text',
    className: `ds-text-input ${error ? 'ds-text-input--error' : ''} ${readOnly ? 'ds-text-input--readonly' : ''}`,
    onKeyDown: handleKeyDown,
    onBlur: onBlur,
    placeholder: placeholder,
    disabled: disabled,
    readOnly: readOnly,
    autoFocus: autoFocus,
    ...props
  };

  // Only pass value/onChange if value is explicitly defined to avoid React controlled warnings
  if (value !== undefined) {
    inputProps.value = value;
    inputProps.onChange = onChange;
  }

  return (
    <div className={`ds-input-group ${inline ? 'ds-input-group--inline' : ''} ${className}`}>
      {label && <label className="ds-input-label">{label}</label>}
      <div className="ds-input-container">
        <input {...inputProps} />
        {error && <span className="ds-input-error-msg">{error}</span>}
      </div>
    </div>
  );
}

export default TextInput;
