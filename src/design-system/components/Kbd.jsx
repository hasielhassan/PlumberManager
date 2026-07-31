import React from 'react';
import './Kbd.css';

export function Kbd({
  children,
  className = '',
  ...props
}) {
  return (
    <kbd className={`ds-kbd ${className}`} {...props}>
      {children}
    </kbd>
  );
}
