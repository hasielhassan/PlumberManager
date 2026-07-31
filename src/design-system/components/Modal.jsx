import React, { useEffect } from 'react';
import { IconButton } from './Button';
import './Modal.css';

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  actions, // React node(s) for the footer actions
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  ...props
}) {
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ds-modal-backdrop" onClick={onClose}>
      <div
        className={`ds-modal ds-modal--${size} ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking modal content
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div className="ds-modal__header">
          <h2 className="ds-modal__title">{title}</h2>
          {onClose && (
            <IconButton
              icon="✕"
              size="sm"
              onClick={onClose}
              title="Close Dialog"
              className="ds-modal__close-btn"
            />
          )}
        </div>
        <div className="ds-modal__content ds-scroll-area">
          {children}
        </div>
        {actions && (
          <div className="ds-modal__footer">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
