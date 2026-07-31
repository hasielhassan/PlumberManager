import React from 'react';
import './Divider.css';

export function Divider({
  vertical = false,
  className = '',
  ...props
}) {
  return (
    <hr
      className={`ds-divider ${vertical ? 'ds-divider--vertical' : 'ds-divider--horizontal'} ${className}`}
      {...props}
    />
  );
}
