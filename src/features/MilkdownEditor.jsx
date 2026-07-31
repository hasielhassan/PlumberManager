import React, { useRef, useCallback, useEffect } from 'react';
import { Crepe } from '@milkdown/crepe';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';

// Import Milkdown Crepe theme — common base + nord-dark for our dark UI
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';

import './MilkdownEditor.css';

/**
 * Inner editor component — must be rendered inside a <MilkdownProvider>.
 * Manages the Crepe editor lifecycle and syncs markdown content.
 */
function MilkdownEditorInner({
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  readOnly = false,
  className = '',
}) {
  const crepeRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const onFocusRef = useRef(onFocus);
  const onBlurRef = useRef(onBlur);

  // Keep the callback refs current to avoid editor recreations
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onFocusRef.current = onFocus;
  }, [onFocus]);

  useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);

  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: defaultValue || '',
      features: {
        [Crepe.Feature.CodeMirror]: false, // Disable heavy CodeMirror for our use case
        [Crepe.Feature.ImageBlock]: false,  // No image uploads in pipeline docs
        [Crepe.Feature.Latex]: false,       // No LaTeX needed
        [Crepe.Feature.BlockEdit]: true,
        [Crepe.Feature.Toolbar]: false, // Disable floating popup toolbar to avoid overlay issues
        [Crepe.Feature.TopBar]: true,  // Persistent top toolbar
        [Crepe.Feature.Placeholder]: true,
        [Crepe.Feature.Table]: true,
        [Crepe.Feature.LinkTooltip]: true,
        [Crepe.Feature.ListItem]: true,
        [Crepe.Feature.Cursor]: true,
      },
      featureConfigs: {
        [Crepe.Feature.Placeholder]: {
          text: 'Type your pipeline documentation here...',
        },
      },
    });

    crepe.on((listener) => {
      listener.markdownUpdated((_ctx, markdown, _prevMarkdown) => {
        if (onChangeRef.current) {
          onChangeRef.current(markdown);
        }
      });
      listener.focus((_ctx) => {
        if (onFocusRef.current) {
          onFocusRef.current();
        }
      });
      listener.blur((_ctx) => {
        if (onBlurRef.current) {
          onBlurRef.current();
        }
      });
    });

    if (readOnly) {
      crepe.setReadonly(true);
    }

    crepeRef.current = crepe;
    return crepe;
  }, []);

  return (
    <div className={`ds-milkdown-wrapper ${className}`}>
      <Milkdown />
    </div>
  );
}

/**
 * Reusable Milkdown WYSIWYG markdown editor component.
 *
 * @param {string} defaultValue - Initial markdown string to populate the editor
 * @param {function} onChange - Callback fired with updated markdown string
 * @param {function} onFocus - Callback fired on editor focus
 * @param {function} onBlur - Callback fired on editor blur
 * @param {boolean} readOnly - If true, editor is non-editable
 * @param {string} className - Additional CSS class for the wrapper
 */
export function MilkdownEditor({
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  readOnly = false,
  className = '',
}) {
  // Stable callbacks
  const stableOnChange = useCallback(
    (md) => {
      if (onChange) onChange(md);
    },
    [onChange]
  );

  const stableOnFocus = useCallback(() => {
    if (onFocus) onFocus();
  }, [onFocus]);

  const stableOnBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  return (
    <MilkdownProvider>
      <MilkdownEditorInner
        defaultValue={defaultValue}
        onChange={stableOnChange}
        onFocus={stableOnFocus}
        onBlur={stableOnBlur}
        readOnly={readOnly}
        className={className}
      />
    </MilkdownProvider>
  );
}

export default MilkdownEditor;
