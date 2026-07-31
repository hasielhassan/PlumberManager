import React from 'react';
import './Button.css';

export function Button({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',          // 'sm' | 'md' | 'lg'
  icon,
  onClick,
  disabled = false,
  className = '',
  title,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`ds-button ds-button--${variant} ds-button--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      {...props}
    >
      {icon && <span className="ds-button__icon">{icon}</span>}
      {children && <span className="ds-button__text">{children}</span>}
    </button>
  );
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  title,
  ...props
}) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={`ds-button--icon-only ${className}`}
      title={title}
      icon={icon}
      {...props}
    />
  );
}
