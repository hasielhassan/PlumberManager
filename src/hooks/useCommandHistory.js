import { useState, useEffect } from 'react';
import { commandHistory, SnapshotCommand } from '../core/command-history';
import { useGraph } from './useGraph';

export function useCommandHistory() {
  const { graph, updateTrigger } = useGraph();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    setCanUndo(commandHistory.canUndo());
    setCanRedo(commandHistory.canRedo());
  }, [updateTrigger]);

  const executeAction = (actionFn, label = '') => {
    const cmd = new SnapshotCommand(graph, label);
    actionFn();
    cmd.saveAfter();
    commandHistory.execute(cmd);
  };

  const undo = () => {
    commandHistory.undo();
  };

  const redo = () => {
    commandHistory.redo();
  };

  const clearHistory = () => {
    commandHistory.clear();
  };

  return {
    executeAction,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory
  };
}

export default useCommandHistory;
