import React from 'react';
import { Button } from '../design-system/components';
import './WelcomeScreen.css';

export function WelcomeScreen({
  onCreateNode,
  onOpenFile,
  onLoadSample,
  recentFiles = [],
  onOpenRecent,
  onStartTour
}) {
  return (
    <div className="ds-welcome-screen p-8 absolute inset-0 z-10">
      <div className="ds-welcome-container">
        <div className="ds-welcome-logo flex flex-col items-center gap-2">
          <img src="/favicon.svg" alt="PlumberManager" style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '8px' }} />
          <h1 className="text-xl font-bold">Welcome to Plumber Manager</h1>
          <p className="text-sm text-secondary">
            Design CG Pipeline interactive diagrams and structure your data flow documentation.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
          <Button variant="primary" onClick={onCreateNode} className="w-full">
            Create Process Node
          </Button>
          <Button variant="secondary" onClick={onOpenFile} className="w-full">
            Open Graph File (.gph)
          </Button>
          {onStartTour && (
            <Button variant="secondary" onClick={onStartTour} className="w-full" data-tour="take-tour">
              🚀 Take Feature Tour
            </Button>
          )}
          
          <div className="ds-welcome-samples flex flex-col gap-1 mt-2">
            <span className="text-xs text-muted font-semibold text-left mb-1">Load Samples:</span>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => onLoadSample('minimal')} className="flex-1">Minimal</Button>
              <Button size="sm" onClick={() => onLoadSample('test')} className="flex-1">Test</Button>
              <Button size="sm" onClick={() => onLoadSample('animation')} className="flex-1">Animation</Button>
            </div>
          </div>
        </div>

        {recentFiles.length > 0 && (
          <div className="ds-recent-files w-full border-t border-color pt-6 text-left">
            <h4 className="text-xs text-muted font-bold uppercase letter-spacing mb-2">Recent Files</h4>
            <div className="flex flex-col gap-2">
              {recentFiles.map(file => (
                <button
                  key={file.name}
                  onClick={() => onOpenRecent(file)}
                  className="ds-recent-file-item flex justify-between p-2 rounded hover:bg-hover transition-colors text-left"
                >
                  <span className="text-sm font-medium text-primary">{file.name}</span>
                  <span className="text-xs text-muted">{new Date(file.lastOpened).toLocaleDateString()}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;
