import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Joyride, STATUS, ACTIONS } from 'react-joyride';
import { getTourSteps } from './tour-steps';
import { TourTooltip } from './TourTooltip';
import { localStorageManager } from '../../core/local-storage';

export function OnboardingTour({
  run,
  onCloseTour,
  graph,
  onLoadSample,
  _isSidebarCollapsed,
  setIsSidebarCollapsed,
  setActiveModal,
  setSidebarTab,
  setSelection
}) {
  const [tourKey, setTourKey] = useState(0);

  // Generate steps dynamically with live before hooks
  const steps = useMemo(() => {
    return getTourSteps({
      onLoadSample,
      setIsSidebarCollapsed,
      setSidebarTab,
      setSelection,
      setActiveModal,
      graph
    });
  }, [onLoadSample, setIsSidebarCollapsed, setSidebarTab, setSelection, setActiveModal, graph]);

  // Reset key ONLY when `run` transitions to true
  useEffect(() => {
    if (run) {
      setTourKey(prev => prev + 1);
      if (graph && graph.nodes.size === 0 && onLoadSample) {
        onLoadSample('minimal', true);
      }
    }
  }, [run, graph, onLoadSample]);

  const handleJoyrideCallback = useCallback((data) => {
    const { status, type, action } = data;

    // Finished, Skipped, Closed, or Tour Ended
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(status) ||
      type === 'tour:end' ||
      [ACTIONS.CLOSE, ACTIONS.SKIP, ACTIONS.STOP].includes(action)
    ) {
      localStorageManager.savePreferences({ hasCompletedTour: true });
      if (setActiveModal) {
        setActiveModal(null);
      }
      if (onCloseTour) {
        onCloseTour();
      }
    }
  }, [setActiveModal, onCloseTour]);

  if (!run) return null;

  return (
    <Joyride
      key={tourKey}
      steps={steps}
      run={run}
      continuous
      showProgress={false}
      showSkipButton
      disableOverlayClose
      spotlightClicks
      spotlightPadding={6}
      tooltipComponent={TourTooltip}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10050,
          primaryColor: 'hsl(142, 36%, 59%)',
          backgroundColor: 'hsl(210, 12%, 22%)',
          textColor: 'hsl(0, 0%, 93%)',
          overlayColor: 'rgba(10, 15, 20, 0.75)',
          spotlightShadow: '0 0 15px rgba(142, 236, 179, 0.4)',
          spotlightBorderRadius: '8px'
        }
      }}
    />
  );
}

export default OnboardingTour;
