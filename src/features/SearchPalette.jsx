import React, { useState, useEffect, useRef } from 'react';
import { useGraph } from '../hooks/useGraph';
import './SearchPalette.css';

export function SearchPalette({ isOpen, onClose, onSelectNode }) {
  const { graph } = useGraph();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut listener to close/navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter nodes matching search query
  const filteredNodes = Array.from(graph.nodes.keys()).filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredNodes.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredNodes.length) % Math.max(1, filteredNodes.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredNodes[selectedIndex]) {
        onSelectNode(filteredNodes[selectedIndex]);
        onClose();
      }
    }
  };

  return (
    <div className="ds-palette-backdrop" onClick={onClose}>
      <div 
        className="ds-palette" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="ds-palette-search-container">
          <span className="ds-palette-search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="ds-palette-input"
            placeholder="Search processes..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="ds-palette-esc-badge">ESC</span>
        </div>

        <div className="ds-palette-results ds-scroll-area">
          {filteredNodes.length === 0 ? (
            <div className="ds-palette-empty">No nodes match your search.</div>
          ) : (
            filteredNodes.map((name, idx) => (
              <div
                key={name}
                className={`ds-palette-item ${idx === selectedIndex ? 'ds-palette-item--selected' : ''}`}
                onClick={() => {
                  onSelectNode(name);
                  onClose();
                }}
              >
                <span className="ds-palette-item-icon">🔌</span>
                <span className="ds-palette-item-name">{name}</span>
                {idx === selectedIndex && <span className="ds-palette-enter-indicator">⏎ Select</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPalette;
