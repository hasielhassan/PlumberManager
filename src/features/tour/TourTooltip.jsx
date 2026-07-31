import React from 'react';
import './TourTooltip.css';
import { localStorageManager } from '../../core/local-storage';

export function TourTooltip({
  index,
  step,
  backProps,
  closeProps,
  skipProps,
  primaryProps,
  tooltipProps,
  size,
  isLastStep
}) {
  const handleSkip = (e) => {
    localStorageManager.savePreferences({ hasCompletedTour: true });
    const targetProps = skipProps || closeProps;
    if (targetProps && targetProps.onClick) {
      targetProps.onClick(e);
    }
  };

  const handlePrimary = (e) => {
    if (isLastStep) {
      localStorageManager.savePreferences({ hasCompletedTour: true });
    }
    if (primaryProps && primaryProps.onClick) {
      primaryProps.onClick(e);
    }
  };

  return (
    <div className="ds-tour-tooltip" {...tooltipProps}>
      <div className="ds-tour-header">
        {step.title && <h3 className="ds-tour-title">{step.title}</h3>}
        <span className="ds-tour-step-badge">
          Step {index + 1} of {size}
        </span>
      </div>

      <div className="ds-tour-body">
        {step.content}
      </div>

      <div className="ds-tour-footer">
        <button
          type="button"
          className="ds-tour-skip-btn"
          {...(skipProps || closeProps)}
          onClick={handleSkip}
          title="Skip onboarding tour"
        >
          Skip Tour
        </button>

        <div className="ds-tour-actions">
          {index > 0 && (
            <button
              type="button"
              className="ds-tour-btn ds-tour-btn-secondary"
              {...backProps}
            >
              Back
            </button>
          )}

          <button
            type="button"
            className="ds-tour-btn ds-tour-btn-primary"
            {...primaryProps}
            onClick={handlePrimary}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourTooltip;
