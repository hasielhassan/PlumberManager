import React, { useState } from 'react';
import './Panel.css';

export function Panel({
  title,
  children,
  collapsible = false,
  initExpanded = true,
  className = '',
  headerActions,
  ...props
}) {
  const [isExpanded, setIsExpanded] = useState(initExpanded);

  return (
    <div className={`ds-panel ${isExpanded ? 'ds-panel--expanded' : 'ds-panel--collapsed'} ${className}`} {...props}>
      <div className="ds-panel__header" onClick={() => collapsible && setIsExpanded(!isExpanded)}>
        <div className="ds-panel__header-left">
          {collapsible && (
            <span className={`ds-panel__chevron ${isExpanded ? 'ds-panel__chevron--expanded' : ''}`}>
              ▼
            </span>
          )}
          <h3 className="ds-panel__title">{title}</h3>
        </div>
        {(headerActions || collapsible) && (
          <div className="ds-panel__header-right" onClick={(e) => e.stopPropagation()}>
            {headerActions}
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="ds-panel__content ds-scroll-area">
          {children}
        </div>
      )}
    </div>
  );
}
