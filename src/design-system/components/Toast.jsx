import React, { useEffect } from 'react';
import './Toast.css';

export function Toast({
  message,
  type = 'secondary', // 'primary' | 'secondary' | 'accent' | 'error' | 'danger'
  onClose,
  duration = 3000
}) {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getEmoji = () => {
    switch (type) {
      case 'primary': return '💾';
      case 'accent': return '⚡';
      case 'error':
      case 'danger': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`ds-toast ds-toast--${type}`} role="alert">
      <span className="ds-toast__icon">{getEmoji()}</span>
      <span className="ds-toast__message">{message}</span>
      {onClose && (
        <button className="ds-toast__close" onClick={onClose} aria-label="Close notification">
          ✕
        </button>
      )}
    </div>
  );
}

export default Toast;
