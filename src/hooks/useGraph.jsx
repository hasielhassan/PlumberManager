/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GraphModel } from '../core/graph-model';
import { dataTypeRegistry } from '../core/data-types';

const GraphContext = createContext(null);

export function GraphProvider({ children }) {
  const [graph] = useState(() => {
    const model = new GraphModel();
    return model;
  });

  const [selection, setSelection] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [viewportCenter, setViewportCenter] = useState({ x: 250, y: 200 });

  // Force re-render on any graph modification or icon preload
  useEffect(() => {
    const forceUpdate = () => setUpdateTrigger(prev => prev + 1);
    
    dataTypeRegistry.initialize();
    const unsubRegistry = dataTypeRegistry.onLoaded(forceUpdate);

    const unsubCreated = graph.on('node:created', forceUpdate);
    const unsubDeleted = graph.on('node:deleted', forceUpdate);
    const unsubRenamed = graph.on('node:renamed', forceUpdate);
    const unsubMoved = graph.on('node:moved', forceUpdate);
    const unsubMeta = graph.on('node:metadata_updated', forceUpdate);
    const unsubAttrCreated = graph.on('attribute:created', forceUpdate);
    const unsubAttrDeleted = graph.on('attribute:deleted', forceUpdate);
    const unsubAttrEdited = graph.on('attribute:edited', forceUpdate);
    const unsubAttrReordered = graph.on('attribute:reordered', forceUpdate);
    const unsubConnCreated = graph.on('connection:created', forceUpdate);
    const unsubConnDeleted = graph.on('connection:deleted', forceUpdate);
    const unsubCleared = graph.on('graph:cleared', forceUpdate);

    return () => {
      unsubRegistry();
      unsubCreated();
      unsubDeleted();
      unsubRenamed();
      unsubMoved();
      unsubMeta();
      unsubAttrCreated();
      unsubAttrDeleted();
      unsubAttrEdited();
      unsubAttrReordered();
      unsubConnCreated();
      unsubConnDeleted();
      unsubCleared();
    };
  }, [graph]);

  return (
    <GraphContext.Provider value={{ graph, selection, setSelection, updateTrigger, viewportCenter, setViewportCenter }}>
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
}
