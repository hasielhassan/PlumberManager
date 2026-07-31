import React, { useState, useEffect, useRef } from 'react';
import { dataTypeRegistry } from '../core/data-types';
import './FormatSelect.css';

/**
 * Custom combobox for selecting data type formats.
 * Features:
 * - Alphabetically sorted format options
 * - Real-time text search filtering (code, display name, description)
 * - Auto-focused search input inside dropdown
 * - Full keyboard navigation (Arrow keys, Enter, Escape)
 * - Inline vector format badges
 */
export function FormatSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionListRef = useRef(null);

  // Alphabetically sort options by format code
  const sortedOptions = React.useMemo(() => {
    return [...options].sort((a, b) => a.value.localeCompare(b.value));
  }, [options]);

  // Filter options dynamically by search query matching code, name, or description
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return sortedOptions;
    const q = searchQuery.toLowerCase().trim();

    return sortedOptions.filter((opt) => {
      const typeInfo = dataTypeRegistry.getType(opt.value);
      const codeMatch = opt.value.toLowerCase().includes(q);
      const nameMatch = (typeInfo?.type || opt.label || '').toLowerCase().includes(q);
      const descMatch = (typeInfo?.description || '').toLowerCase().includes(q);
      return codeMatch || nameMatch || descMatch;
    });
  }, [sortedOptions, searchQuery]);

  // Handle click outside to close
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setHighlightedIndex(0);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 30);
    }
  }, [isOpen]);

  // Reset highlight index when filter changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  const handleSelect = (formatCode) => {
    onChange({ target: { value: formatCode } });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0 && filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex].value);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="ds-format-select-container" onKeyDown={handleKeyDown}>
      <button 
        type="button" 
        className="ds-format-select-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <img 
          src={`/data_type_icons/${value}.svg`} 
          alt="" 
          className="ds-format-select-icon"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="ds-format-select-label">{value}</span>
        <span className="ds-format-select-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="ds-format-select-dropdown">
          {/* Search Input Filter Header */}
          <div className="ds-format-select-search-wrap">
            <input
              ref={searchInputRef}
              type="text"
              className="ds-format-select-search-input"
              placeholder="Search format, name, desc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options Scroll List */}
          <div ref={optionListRef} className="ds-format-select-options-list ds-scroll-area">
            {filteredOptions.length === 0 ? (
              <div className="ds-format-select-empty">
                No matching format found
              </div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const typeInfo = dataTypeRegistry.getType(opt.value);
                const isCustom = typeInfo?.isCustom ?? false;
                const description = typeInfo?.description || '';
                const displayName = typeInfo?.type || opt.label;
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;

                return (
                  <div 
                    key={opt.value} 
                    className={`ds-format-select-option ${isSelected ? 'ds-format-select-option--selected' : ''} ${isHighlighted ? 'ds-format-select-option--highlighted' : ''}`}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                  >
                    <img 
                      src={`/data_type_icons/${opt.value}.svg`} 
                      alt="" 
                      className="ds-format-select-option-icon"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="ds-format-select-option-info">
                      <div className="ds-format-select-option-header">
                        <span className="ds-format-select-option-code">{opt.value.toUpperCase()}</span>
                        <span className="ds-format-select-option-name">{displayName}</span>
                      </div>
                      {description && (
                        <span className="ds-format-select-option-desc">{description}</span>
                      )}
                    </div>
                    <span className={`ds-format-select-option-badge ${isCustom ? 'ds-format-select-option-badge--custom' : ''}`}>
                      {isCustom ? 'Custom' : 'Built-in'}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormatSelect;
