import React from 'react';
import { Modal, Button } from '../../design-system/components';
import { getAssetUrl } from '../../utils/asset-path';

export function AboutDialog({ isOpen, onClose }) {
  const actions = (
    <Button variant="primary" onClick={onClose}>Close</Button>
  );

  return (
    <Modal isOpen={isOpen} title="About Plumber Manager" onClose={onClose} actions={actions} size="md">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        {/* Prominent Centered Logo */}
        <img 
          src={getAssetUrl('/favicon.svg')} 
          alt="PlumberManager Logo" 
          style={{ width: '96px', height: '96px', objectFit: 'contain', filter: 'drop-shadow(0 4px 14px rgba(16, 185, 129, 0.3))' }} 
        />
        
        {/* Perfectly Center-Aligned Title & Version */}
        <div className="flex flex-col items-center justify-center text-center w-full gap-1">
          <h3 className="text-xl font-bold text-primary m-0">Plumber Manager</h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/20 text-accent inline-block">
            v{typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0'}
          </span>
        </div>

        <p className="text-sm text-secondary max-w-md leading-relaxed">
          A dedicated interactive node editor and documentation platform designed for planning, managing, and visualizing CG Pipeline data flows and DCC connection structures.
        </p>

        {/* Author & Repo Metadata */}
        <div className="text-xs text-muted flex flex-col gap-1 w-full border-t border-border/50 pt-3 text-center">
          <div>Author: <strong className="text-primary">Hasiel Alvarez</strong></div>
          <div>Repo: <a href="https://github.com/hasielhassan/PlumberManager" target="_blank" rel="noreferrer" className="text-accent hover:underline">github.com/hasielhassan/PlumberManager</a></div>
          <div>License: GNU General Public License v3.0</div>
          <div>Copyright © 2019-2026 Hasiel Alvarez</div>
        </div>

        {/* Separated AI Disclaimer Card */}
        <div style={{
          backgroundColor: 'var(--ds-bg-sidebar)',
          border: '1px solid var(--ds-border-color)',
          borderRadius: 'var(--ds-radius-md)',
          padding: '10px 16px',
          width: '100%',
          maxWidth: '440px',
          textAlign: 'center'
        }}>
          <p className="text-xs text-muted leading-relaxed m-0">
            🤖 <strong>AI & Craftsmanship Disclaimer:</strong><br />
            Developed with the interactive assistance of <strong>Claude</strong> and <strong>Gemini</strong>, fueled by lots of coffee ☕, hands-on pipeline experience, and love.
          </p>
        </div>

        {/* Nuanced, Humble Support / Buy Me A Coffee Button */}
        <a
          href="https://buymeacoffee.com/hasielhassan"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            color: '#F59E0B',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '6px 14px',
            borderRadius: 'var(--ds-radius-md)',
            fontWeight: '600',
            fontSize: '12px',
            textDecoration: 'none',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
            e.currentTarget.style.color = '#FBBF24';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
            e.currentTarget.style.color = '#F59E0B';
          }}
        >
          <span>☕</span> Buy me a coffee
        </a>
      </div>
    </Modal>
  );
}

export default AboutDialog;
