import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Joyride, STATUS, EVENTS } from 'react-joyride';
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
  setSelection,
  setPanelWidth
}) {
  const [tourKey, setTourKey] = useState(0);
  const prevRunRef = useRef(false);

  // Keep a stable ref to the latest props so callbacks inside steps never stale
  const propsRef = useRef({
    onLoadSample,
    setIsSidebarCollapsed,
    setSidebarTab,
    setSelection,
    setActiveModal,
    setPanelWidth,
    graph
  });

  useEffect(() => {
    propsRef.current = {
      onLoadSample,
      setIsSidebarCollapsed,
      setSidebarTab,
      setSelection,
      setActiveModal,
      setPanelWidth,
      graph
    };
  });

  // Generate steps with stable proxy callbacks so `steps` array reference never changes during a tour run
  const steps = useMemo(() => {
    return getTourSteps({
      onLoadSample: (...args) => propsRef.current.onLoadSample?.(...args),
      setIsSidebarCollapsed: (...args) => propsRef.current.setIsSidebarCollapsed?.(...args),
      setSidebarTab: (...args) => propsRef.current.setSidebarTab?.(...args),
      setSelection: (...args) => propsRef.current.setSelection?.(...args),
      setActiveModal: (...args) => propsRef.current.setActiveModal?.(...args),
      setPanelWidth: (...args) => propsRef.current.setPanelWidth?.(...args),
      get graph() { return propsRef.current.graph; }
    });
  }, [tourKey]);

  // Reset key ONLY when `run` transitions from false to true
  useEffect(() => {
    if (run && !prevRunRef.current) {
      setTourKey(prev => prev + 1);
      if (graph && graph.nodes.size === 0 && onLoadSample) {
        onLoadSample('minimal', true);
      }
    }
    prevRunRef.current = run;
  }, [run, graph, onLoadSample]);

  const handleJoyrideEvent = useCallback((data, _controls) => {
    const { status, type } = data;

    // Finished, Skipped, or Tour Ended
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(status) ||
      type === EVENTS.TOUR_END
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
      tooltipComponent={TourTooltip}
      onEvent={handleJoyrideEvent}
      options={{
        zIndex: 10050,
        primaryColor: 'hsl(142, 36%, 59%)',
        backgroundColor: 'hsl(210, 12%, 22%)',
        textColor: 'hsl(0, 0%, 93%)',
        overlayColor: 'rgba(10, 15, 20, 0.75)',
        spotlightPadding: 6,
        spotlightRadius: 8,
        blockTargetInteraction: false,
        overlayClickAction: false,
        buttons: ['back', 'close', 'primary', 'skip'],
        beforeTimeout: 8000,
        targetWaitTimeout: 3000
      }}
    />
  );
}

export default OnboardingTour;
