import React, { useState } from 'react';
import { Modal, Button, TextInput, Select } from '../../design-system/components';

export function ExportDialog({
  isOpen,
  onClose,
  graph,
  onShowProgress // callback to show processing loaders
}) {
  const [format, setFormat] = useState('png');
  const [fileName, setFileName] = useState('pipeline');
  const [includeBg, setIncludeBg] = useState(true);
  const [pdfMode, setPdfMode] = useState('vector'); // 'vector' | 'raster'
  const [compressPdf, setCompressPdf] = useState(true);
  const [quality, setQuality] = useState(80); // 10 to 100
  const [pdfTitle, setPdfTitle] = useState('CG Pipeline Diagram');
  const [pdfSubtitle, setPdfSubtitle] = useState('Interactive Data Flow Documentation');
  const [includeBackdropPages, setIncludeBackdropPages] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    onClose();
    onShowProgress(true, 'Generating Export', `Generating your ${format.toUpperCase()} diagram, please wait...`);

    // Delay slightly to allow the React state / modal to render the progress dialog
    setTimeout(async () => {
      try {
        const fullFileName = `${fileName}.${format === 'jpeg' ? 'jpg' : format}`;
        const qVal = quality / 100;

        if (format === 'png') {
          const { exportPng } = await import('../../export/export-png');
          exportPng(graph, fullFileName, includeBg);
        } else if (format === 'jpeg') {
          const { exportJpeg } = await import('../../export/export-png');
          exportJpeg(graph, fullFileName, includeBg, qVal);
        } else if (format === 'svg') {
          const { exportSvg } = await import('../../export/export-svg');
          exportSvg(graph, fullFileName, includeBg);
        } else if (format === 'pdf') {
          const { exportPdf } = await import('../../export/export-pdf');
          await exportPdf(graph, fullFileName, includeBg, {
            pdfMode,
            compressPdf,
            quality: qVal,
            title: pdfTitle,
            subtitle: pdfSubtitle,
            includeBackdropPages
          });
        }
      } catch (err) {
        console.error('Export failed:', err);
      } finally {
        onShowProgress(false);
      }
    }, 150);
  };

  const formatOptions = [
    { value: 'png', label: 'Portable Network Graphics (.png)' },
    { value: 'jpeg', label: 'JPEG Image (.jpg)' },
    { value: 'svg', label: 'Scalable Vector Graphics (.svg)' },
    { value: 'pdf', label: 'Adobe PDF Document (.pdf)' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      title="Export Diagram"
      onClose={onClose}
      data-tour="export-dialog-modal"
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleExport}>
            Export File
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4 py-2">
        <TextInput
          label="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter file name..."
        />

        <div className="ds-input-group">
          <label className="ds-input-label">Format</label>
          <Select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            options={formatOptions}
          />
        </div>

        {format === 'pdf' && (
          <>
            <TextInput
              label="PDF Cover Title"
              value={pdfTitle}
              onChange={(e) => setPdfTitle(e.target.value)}
              placeholder="Enter PDF cover title..."
            />

            <TextInput
              label="PDF Cover Subtitle"
              value={pdfSubtitle}
              onChange={(e) => setPdfSubtitle(e.target.value)}
              placeholder="Enter PDF cover subtitle..."
            />

            <div className="ds-input-group">
              <label className="ds-input-label">PDF Render Mode</label>
              <Select
                value={pdfMode}
                onChange={(e) => setPdfMode(e.target.value)}
                options={[
                  { value: 'vector', label: 'Vector (SVG - Crisp & Zoomable, Infinite Quality)' },
                  { value: 'raster', label: 'Raster (Image - Compact size, configurable quality)' }
                ]}
              />
            </div>

            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="backdrop-pages-cb"
                checked={includeBackdropPages}
                onChange={(e) => setIncludeBackdropPages(e.target.checked)}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="backdrop-pages-cb" style={{ fontSize: '14px', color: 'var(--ds-text-primary)', cursor: 'pointer', userSelect: 'none' }}>
                Include dedicated page for each Backdrop Group
              </label>
            </div>
          </>
        )}

        {(format === 'jpeg' || (format === 'pdf' && pdfMode === 'raster')) && (
          <div className="ds-input-group flex flex-col gap-1">
            <label className="ds-input-label flex justify-between" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>Compression Quality</span>
              <span style={{ fontWeight: 'bold', color: 'var(--ds-color-accent)' }}>{quality}%</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                style={{ flex: 1, cursor: 'pointer', accentColor: 'var(--ds-color-accent)' }}
              />
              <span style={{ fontSize: '13px', color: 'var(--ds-text-secondary)', minWidth: '50px', textAlign: 'right' }}>
                {quality >= 90 ? 'High' : quality >= 60 ? 'Medium' : 'Low'}
              </span>
            </div>
          </div>
        )}

        {format === 'pdf' && pdfMode === 'raster' && (
          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="compress-pdf-cb"
              checked={compressPdf}
              onChange={(e) => setCompressPdf(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="compress-pdf-cb" style={{ fontSize: '14px', color: 'var(--ds-text-primary)', cursor: 'pointer', userSelect: 'none' }}>
              Compress PDF streams (reduces file size)
            </label>
          </div>
        )}

        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id="include-bg-cb"
            checked={includeBg}
            onChange={(e) => setIncludeBg(e.target.checked)}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <label htmlFor="include-bg-cb" style={{ fontSize: '14px', color: 'var(--ds-text-primary)', cursor: 'pointer', userSelect: 'none' }}>
            Include dark grey background (otherwise transparent / alpha)
          </label>
        </div>
      </div>
    </Modal>
  );
}

export default ExportDialog;
