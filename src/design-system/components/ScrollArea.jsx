import React from 'react';

export function ScrollArea({
  children,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={`ds-scroll-area overflow-auto ${className}`}
      style={{ maxHeight: '100%', maxWidth: '100%', ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
