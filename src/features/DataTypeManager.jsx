import React, { useState, useEffect, useMemo } from 'react';
import { Modal, TextInput, Button, IconButton, Badge, ScrollArea } from '../design-system/components';
import { dataTypeRegistry } from '../core/data-types';
import { generateHexagonBadgeSvg } from '../utils/hexagon-badge-generator';
import { getAssetUrl } from '../utils/asset-path';
import { ConfirmDialog } from './dialogs';
import './DataTypeManager.css';

const PRESET_COLORS = [
  { hex: '#38BDF8', label: 'Sky Blue' },
  { hex: '#10B981', label: 'Emerald' },
  { hex: '#F59E0B', label: 'Amber' },
  { hex: '#8B5CF6', label: 'Purple' },
  { hex: '#F43F5E', label: 'Rose' },
  { hex: '#EA7600', label: 'Orange' },
  { hex: '#0088CC', label: 'Cyan' },
  { hex: '#EC4899', label: 'Pink' },
  { hex: '#6366F1', label: 'Indigo' }
];

export function DataTypeManager({ isOpen, onClose, onUpdate }) {
  const [types, setTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#38BDF8');
  const [svgIcon, setSvgIcon] = useState('');
  const [confirmDeleteCode, setConfirmDeleteCode] = useState(null);

  const refreshList = () => {
    setTypes(dataTypeRegistry.getAllTypes());
  };

  useEffect(() => {
    if (isOpen) {
      refreshList();
      setSearchQuery('');
      setCode('');
      setName('');
      setDescription('');
      setColor('#38BDF8');
      setSvgIcon('');
    }
  }, [isOpen]);

  // Generate live SVG hexagon badge preview
  const livePreviewSvg = useMemo(() => {
    return generateHexagonBadgeSvg({
      code: code || 'custom',
      label: (code || 'CUSTOM').toUpperCase(),
      color: color || '#38BDF8',
      logoXml: svgIcon
    });
  }, [code, color, svgIcon]);

  const livePreviewDataUri = useMemo(() => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(livePreviewSvg)}`;
  }, [livePreviewSvg]);

  // Alphabetically sorted and filtered formats list
  const filteredTypes = useMemo(() => {
    const sorted = [...types].sort((a, b) => a.code.localeCompare(b.code));
    if (!searchQuery.trim()) return sorted;

    const q = searchQuery.toLowerCase().trim();
    return sorted.filter((dt) => {
      const codeMatch = dt.code.toLowerCase().includes(q);
      const typeMatch = (dt.type || '').toLowerCase().includes(q);
      const descMatch = (dt.description || '').toLowerCase().includes(q);
      return codeMatch || typeMatch || descMatch;
    });
  }, [types, searchQuery]);

  const handleAddType = (e) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    const formatCode = code.trim().toLowerCase();
    const finalSvg = generateHexagonBadgeSvg({
      code: formatCode,
      label: formatCode.toUpperCase(),
      color: color || '#38BDF8',
      logoXml: svgIcon
    });

    const iconDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(finalSvg)}`;

    dataTypeRegistry.addCustomType({
      code: formatCode,
      type: name.trim(),
      description: description.trim(),
      icon: finalSvg,
      iconPath: iconDataUri
    });

    refreshList();
    setCode('');
    setName('');
    setDescription('');
    setColor('#38BDF8');
    setSvgIcon('');

    if (onUpdate) onUpdate();
  };

  const handleDeleteType = (formatCode) => {
    setConfirmDeleteCode(formatCode);
  };

  const confirmDelete = () => {
    if (confirmDeleteCode) {
      dataTypeRegistry.removeCustomType(confirmDeleteCode);
      refreshList();
      if (onUpdate) onUpdate();
    }
    setConfirmDeleteCode(null);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Format Type Manager"
        onClose={onClose}
        size="xl"
        className="ds-type-manager-modal"
        data-tour="format-manager-dialog"
      >
        <div className="ds-type-manager-layout">
          {/* Form to Add New */}
          <form onSubmit={handleAddType} className="ds-type-manager-form">
            <h3 className="ds-type-manager-section-title">Add Custom Format</h3>

            <TextInput
              label="Format Code (e.g., usd, abc)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. exr"
              required
            />

            <TextInput
              label="Format Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. OpenEXR Image Sequence"
              required
            />

            <TextInput
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of pipeline usage..."
            />

            {/* Theme Color Picker */}
            <div className="ds-input-group">
              <label className="ds-input-label">Badge Theme Color</label>
              <div className="ds-color-swatches-wrap">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    className={`ds-color-swatch ${color === c.hex ? 'ds-color-swatch--active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setColor(c.hex)}
                    title={c.label}
                  />
                ))}
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="ds-custom-color-input"
                  title="Choose custom color"
                />
              </div>
            </div>

            <div className="ds-input-group">
              <label className="ds-input-label">Custom Inner Logo Path (optional)</label>
              <textarea
                value={svgIcon}
                onChange={(e) => setSvgIcon(e.target.value)}
                placeholder="e.g. <path d='M12 2L2 22h20L12 2z'/> or SVG paths"
                className="ds-textarea"
                rows={2}
              />
            </div>

            {/* Live 6-Sided Hexagonal Badge Preview */}
            <div className="ds-badge-preview-card">
              <span className="ds-badge-preview-label">Live Icon Preview:</span>
              <div className="ds-badge-preview-icon-wrap">
                <img
                  src={livePreviewDataUri}
                  alt="Badge Preview"
                  className="ds-badge-preview-img"
                />
              </div>
            </div>

            <Button type="submit" variant="primary">
              Add Format Code
            </Button>
          </form>

          {/* Formats Registry List */}
          <div className="ds-type-manager-list-pane">
            <h3 className="ds-type-manager-section-title">Registered Data Formats ({filteredTypes.length})</h3>

            <div className="mb-2">
              <TextInput
                placeholder="Search format code, name, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ScrollArea className="ds-type-manager-scroll-area">
              <div className="ds-type-manager-list">
                {filteredTypes.length === 0 ? (
                  <div className="text-center text-xs text-muted py-4">
                    No formats match "{searchQuery}"
                  </div>
                ) : (
                  filteredTypes.map((dt) => {
                    const iconSrc = getAssetUrl(`/data_type_icons/${dt.code}.svg`);
                    return (
                      <div key={dt.code} className="ds-format-row">
                        <div className="ds-format-row-info-wrap">
                          <img
                            src={iconSrc}
                            alt=""
                            className="ds-format-row-icon"
                            onError={(e) => {
                              e.target.src = getAssetUrl('/data_type_icons/usd.svg');
                            }}
                          />
                          <div className="ds-format-info">
                            <div className="ds-format-header">
                              <span className="ds-format-code">{dt.code.toUpperCase()}</span>
                              <span className="ds-format-name">{dt.type}</span>
                            </div>
                            {dt.description && (
                              <span className="ds-format-desc">{dt.description}</span>
                            )}
                          </div>
                        </div>

                        <div className="ds-format-row-actions">
                          {dt.isCustom ? (
                            <>
                              <Badge variant="accent">Custom</Badge>
                              <IconButton
                                icon="✕"
                                size="sm"
                                onClick={() => handleDeleteType(dt.code)}
                                className="text-error"
                                title="Delete Custom Format"
                              />
                            </>
                          ) : (
                            <Badge variant="primary">Built-in</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmDeleteCode !== null}
        title="Delete Custom Format"
        message={`Are you sure you want to delete the custom data format "${confirmDeleteCode?.toUpperCase()}"? This action cannot be undone.`}
        onClose={() => setConfirmDeleteCode(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default DataTypeManager;
