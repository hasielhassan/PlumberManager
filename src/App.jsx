import React from 'react';
import { GraphProvider } from './hooks/useGraph';
import AppShell from './features/AppShell';
import { ErrorBoundary } from './features/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <GraphProvider>
        <AppShell />
      </GraphProvider>
    </ErrorBoundary>
  );
}
