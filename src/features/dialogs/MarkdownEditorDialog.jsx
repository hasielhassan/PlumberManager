import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Modal, Button } from '../../design-system/components';
const MilkdownEditor = lazy(() => import('../MilkdownEditor').then(m => ({ default: m.MilkdownEditor })));
import './MarkdownEditorDialog.css';

export function MarkdownEditorDialog({
  isOpen,
  nodeName,
  initialContent = '',
  onClose,
  onSave
}) {
  const [, setContent] = useState(initialContent);
  // Track the latest content via ref to avoid stale closure in save
  const contentRef = useRef(initialContent);

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent);
      contentRef.current = initialContent;
    }
  }, [isOpen, initialContent]);

  const handleContentChange = (markdown) => {
    setContent(markdown);
    contentRef.current = markdown;
  };

  const handleSave = () => {
    onSave(contentRef.current);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`Documentation Editor — ${nodeName}`}
      onClose={onClose}
      size="2xl"
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Documentation
          </Button>
        </>
      }
    >
      <div className="ds-md-editor-layout">
        {isOpen && (
          <Suspense fallback={<div style={{ padding: '20px', fontSize: '14px', color: 'var(--ds-text-secondary)', textAlign: 'center' }}>Loading WYSIWYG Editor...</div>}>
            <MilkdownEditor
              defaultValue={initialContent}
              onChange={handleContentChange}
              className="ds-milkdown-modal"
            />
          </Suspense>
        )}
      </div>
    </Modal>
  );
}

export default MarkdownEditorDialog;
