import React from 'react';
import './Badge.css';

export function Badge({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'accent' | 'error'
  className = '',
  ...props
}) {
  return (
    <span className={`ds-badge ds-badge--${variant} ${className}`} {...props}>
      {children}
    </span>
  );
}
