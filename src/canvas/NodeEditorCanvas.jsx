import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useGraph } from '../hooks/useGraph';
import { drawGrid } from './grid-renderer';
import { drawNode, getNodeDimensions } from './node-renderer';
import { drawConnection } from './connection-renderer';
import {
  hitTestNode,
  hitTestSlot,
  hitTestConnection,
  nodesInRect,
  getSlotCenter
} from './hit-testing';
import { serializeGraph } from '../core/graph-serializer';
import { commandHistory, SnapshotCommand } from '../core/command-history';
import { layoutGraph } from '../core/graph-layout';
import { dataTypeRegistry } from '../core/data-types';
import { drawMinimap } from './minimap';
import { convertArrayToRgba } from '../utils/color';
import editorConfig from '../../config/editor-config.json';
import { InputDialog, ConfirmDialog } from '../features/dialogs';

export function NodeEditorCanvas({ autoRelayout = true, minimapEnabled = true }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { graph, selection, setSelection, updateTrigger } = useGraph();
  const actionStartSnapshotRef = useRef(null);
  const clipboardRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastSelectedNodeRef = useRef(null);
  const initialFocusDoneRef = useRef(false);

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Custom UI Dialog overlays
  const [contextMenu, setContextMenu] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const panRef = useRef(pan);
  const zoomRef = useRef(zoom);
  const selectionRef = useRef(selection);
  useEffect(() => {
    panRef.current = pan;
    zoomRef.current = zoom;
  }, [pan, zoom]);

  useEffect(() => {
    selectionRef.current = selection;
  }, [selection]);

  // Interaction State Machine
  const [interaction, setInteraction] = useState({
    state: 'DEFAULT', // 'DEFAULT', 'DRAG_VIEW', 'DRAG_NODE', 'SELECTION', 'DRAW_CONNECTION', 'DRAG_RESIZE_BACKDROP'
    startPoint: null, // Screen space
    currentPoint: null, // Screen space
    draggedNodes: [], // Node names being dragged
    nodeOffsets: [], // Offsets of dragged nodes relative to drag start point
    activeSlot: null, // Slot config currently being connected from
    rubberBandRect: null // { p1, p2 } in world space
  });

  const interactionRef = useRef(interaction);
  useEffect(() => {
    interactionRef.current = interaction;
  }, [interaction]);

  // Handle container resizing
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        
        // ONLY update state if the dimensions actually changed!
        setDimensions(prev => {
          if (prev.width === newWidth && prev.height === newHeight) {
            return prev;
          }
          return { width: newWidth, height: newHeight };
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(containerRef.current);
    handleResize(); // Initial call

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const screenToWorld = useCallback((screenX, screenY) => {
    return {
      x: (screenX - pan.x) / zoom,
      y: (screenY - pan.y) / zoom
    };
  }, [pan, zoom]);

  const focusAllNodes = useCallback(() => {
    if (graph.nodes.size === 0) return;
    
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const node of graph.nodes.values()) {
      const { width, height } = getNodeDimensions(node);
      const { x, y } = node.position;
      if (x < minX) minX = x;
      if (x + width > maxX) maxX = x + width;
      if (y < minY) minY = y;
      if (y + height > maxY) maxY = y + height;
    }

    const padding = 100;
    const graphWidth = maxX - minX + padding * 2;
    const graphHeight = maxY - minY + padding * 2;

    const zoomX = dimensions.width / graphWidth;
    const zoomY = dimensions.height / graphHeight;
    const newZoom = Math.max(0.1, Math.min(2.0, Math.min(zoomX, zoomY)));

    const centerX = minX + (maxX - minX) / 2;
    const centerY = minY + (maxY - minY) / 2;

    setZoom(newZoom);
    setPan({
      x: dimensions.width / 2 - centerX * newZoom,
      y: dimensions.height / 2 - centerY * newZoom
    });
  }, [graph, dimensions]);

  // Center view on load (or fit all nodes)
  useEffect(() => {
    if (graph.nodes.size > 0 && !initialFocusDoneRef.current && dimensions.width !== 800) {
      focusAllNodes();
      initialFocusDoneRef.current = true;
    }

    const handleGraphLoaded = () => {
      setTimeout(() => {
        focusAllNodes();
      }, 50);
    };

    graph.on('graph:loaded', handleGraphLoaded);
    return () => {
      graph.off('graph:loaded', handleGraphLoaded);
    };
  }, [graph, dimensions, focusAllNodes]);

  // Keyboard Shortcuts (Delete, Fit F, Snap S, Rename F2, Copy/Paste, Spawn Ctrl+Arrow)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'SELECT' ||
        e.target.isContentEditable ||
        e.target.closest('[contenteditable="true"]')
      ) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        selection.forEach(name => graph.deleteNode(name));
        setSelection([]);
      }
      if (e.key.toLowerCase() === 'f' && !e.ctrlKey) {
        // F focuses the selected node(s) if any, otherwise fits the full graph
        if (selection.length > 0) {
          let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
          for (const name of selection) {
            const node = graph.nodes.get(name);
            if (!node) continue;
            const { width, height } = getNodeDimensions(node);
            const { x, y } = node.position;
            if (x < minX) minX = x;
            if (x + width > maxX) maxX = x + width;
            if (y < minY) minY = y;
            if (y + height > maxY) maxY = y + height;
          }
          const padding = 80;
          const graphWidth = maxX - minX + padding * 2;
          const graphHeight = maxY - minY + padding * 2;
          const newZoom = Math.max(0.15, Math.min(2.0, Math.min(dimensions.width / graphWidth, dimensions.height / graphHeight)));
          const centerX = minX + (maxX - minX) / 2;
          const centerY = minY + (maxY - minY) / 2;
          setZoom(newZoom);
          setPan({
            x: dimensions.width / 2 - centerX * newZoom,
            y: dimensions.height / 2 - centerY * newZoom
          });
        } else {
          focusAllNodes();
        }
      }

      // 1. Rename selected (F2)
      if (e.key === 'F2' && selection.length === 1) {
        e.preventDefault();
        const oldName = selection[0];
        setInputData({
          title: 'Rename Node',
          label: 'Node Name',
          defaultValue: oldName,
          placeholder: 'Enter new name...',
          onSubmit: (newName) => {
            if (newName && newName.trim() && newName !== oldName) {
              const before = serializeGraph(graph);
              const success = graph.renameNode(oldName, newName.trim());
              if (success) {
                setSelection([newName.trim()]);
                const after = serializeGraph(graph);
                const cmd = new SnapshotCommand(graph, 'Rename Node');
                cmd.beforeState = before;
                cmd.afterState = after;
                commandHistory.execute(cmd);
                graph.emit('node:moved', {});
              }
            }
          }
        });
      }

      // 2. Copy (Ctrl+C)
      if (e.ctrlKey && e.key.toLowerCase() === 'c' && selection.length === 1) {
        e.preventDefault();
        const node = graph.nodes.get(selection[0]);
        if (node) {
          clipboardRef.current = {
            name: node.name,
            preset: node.preset,
            alternate: node.alternate,
            attributes: node.attributes.map(a => ({ ...a })),
            metadata: { ...node.metadata }
          };
        }
      }

      // 3. Paste (Ctrl+V)
      if (e.ctrlKey && e.key.toLowerCase() === 'v' && clipboardRef.current) {
        e.preventDefault();
        const clip = clipboardRef.current;
        let pasteName = `${clip.name}_copy`;
        let counter = 1;
        while (graph.nodes.has(pasteName)) {
          pasteName = `${clip.name}_copy${counter}`;
          counter++;
        }

        const before = serializeGraph(graph);
        const mousePos = mousePosRef.current || { x: 100, y: 100 };
        const newNode = graph.createNode(pasteName, { x: mousePos.x, y: mousePos.y }, clip.preset);
        if (newNode) {
          newNode.alternate = clip.alternate;
          newNode.metadata = { ...clip.metadata };
          clip.attributes.forEach(attr => {
            graph.createAttribute(pasteName, attr);
          });
          
          setSelection([pasteName]);

          const after = serializeGraph(graph);
          const cmd = new SnapshotCommand(graph, 'Paste Node');
          cmd.beforeState = before;
          cmd.afterState = after;
          commandHistory.execute(cmd);
          graph.emit('node:moved', {});
        }
      }

      // 4. Quick connected node creation (Ctrl+ArrowRight / Ctrl+ArrowLeft)
      if (e.ctrlKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && selection.length === 1) {
        e.preventDefault();
        const selectedNodeName = selection[0];
        const node = graph.nodes.get(selectedNodeName);
        if (!node || node.preset === 'node_preset_backdrop') return; // ignore backdrop spawner

        const isRight = e.key === 'ArrowRight';
        
        setInputData({
          title: 'Quick Spawn — Step 1',
          label: `Enter ${isRight ? 'output' : 'input'} slot name:`,
          defaultValue: isRight ? 'output' : 'input',
          placeholder: 'Slot name...',
          onSubmit: (slotName) => {
            if (!slotName || !slotName.trim()) return;

            setInputData({
              title: 'Quick Spawn — Step 2',
              label: 'Enter new process name:',
              defaultValue: `${node.name}_Next`,
              placeholder: 'Process name...',
              onSubmit: (newNodeName) => {
                if (!newNodeName || !newNodeName.trim()) return;

                const before = serializeGraph(graph);

                // Create slot on current node
                graph.createAttribute(selectedNodeName, {
                  name: slotName,
                  plug: isRight,
                  socket: !isRight,
                  dataType: 'usd' 
                });

                // Spawn new node offset
                const offset = isRight ? 320 : -320;
                const newPos = { x: node.position.x + offset, y: node.position.y };
                graph.createNode(newNodeName, newPos, 'node_preset_1');

                // Create matching slot on new node
                graph.createAttribute(newNodeName, {
                  name: slotName,
                  plug: !isRight,
                  socket: isRight,
                  dataType: 'usd'
                });

                // Connect them
                if (isRight) {
                  graph.createConnection(selectedNodeName, slotName, newNodeName, slotName);
                } else {
                  graph.createConnection(newNodeName, slotName, selectedNodeName, slotName);
                }

                // Auto relayout
                if (autoRelayout) {
                  layoutGraph(graph);
                }

                setSelection([newNodeName]);

                const after = serializeGraph(graph);
                const cmd = new SnapshotCommand(graph, 'Quick Spawn Node');
                cmd.beforeState = before;
                cmd.afterState = after;
                commandHistory.execute(cmd);
                graph.emit('node:moved', {});
              }
            });
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selection, dimensions, graph, autoRelayout, focusAllNodes, setSelection]);

  // Keep lastSelectedNodeRef in sync so we can track changes elsewhere if needed
  useEffect(() => {
    if (selection.length !== 1) {
      lastSelectedNodeRef.current = null;
    } else {
      lastSelectedNodeRef.current = selection[0];
    }
  }, [selection]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // 1. Draw Grid
    drawGrid(ctx, dimensions.width, dimensions.height, pan, zoom);

    // 2. Draw Connections
    graph.connections.forEach(conn => {
      const srcNode = graph.nodes.get(conn.sourceNode);
      const tgtNode = graph.nodes.get(conn.targetNode);
      if (!srcNode || !tgtNode) return;

      const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
      const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');
      
      const attr = srcNode.attributes.find(a => a.name === conn.sourceAttr && a.plug) ||
                   srcNode.attributes.find(a => a.name === conn.sourceAttr);

      drawConnection(ctx, pSource, pTarget, conn, attr?.dataType, true, graph);
    });

    // 3. Draw Active Temporary Connection (during drag connection)
    if (interaction.state === 'DRAW_CONNECTION' && interaction.startPoint && interaction.currentPoint) {
      const startWorld = screenToWorld(interaction.startPoint.x, interaction.startPoint.y);
      const currentWorld = screenToWorld(interaction.currentPoint.x, interaction.currentPoint.y);
      
      const isPlug = interaction.activeSlot.type === 'plug';
      const pSource = isPlug ? startWorld : currentWorld;
      const pTarget = isPlug ? currentWorld : startWorld;

      drawConnection(ctx, pSource, pTarget, null, interaction.activeSlot.dataType, true, graph);
    }

    // 4. Draw Nodes (Backdrops drawn first so they lay in the background behind other nodes)
    const sortedNodes = Array.from(graph.nodes.values()).sort((a, b) => {
      const aIsBackdrop = a.preset === 'node_preset_backdrop';
      const bIsBackdrop = b.preset === 'node_preset_backdrop';
      if (aIsBackdrop && !bIsBackdrop) return -1;
      if (!aIsBackdrop && bIsBackdrop) return 1;
      return 0;
    });

    sortedNodes.forEach(node => {
      const isSelected = selection.includes(node.name);
      drawNode(ctx, node, isSelected);
    });

    // 5. Draw Rubber Band Selection Rect
    if (interaction.state === 'SELECTION' && interaction.rubberBandRect) {
      const { p1, p2 } = interaction.rubberBandRect;
      ctx.strokeStyle = convertArrayToRgba(editorConfig.connection.color, 0.5);
      ctx.lineWidth = 1 / zoom;
      ctx.fillStyle = 'rgba(108, 193, 136, 0.1)';
      ctx.beginPath();
      ctx.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
      ctx.fill();
      ctx.stroke();
    }

    // 6. Draw Minimap Overlay
    if (minimapEnabled) {
      drawMinimap(ctx, dimensions.width, dimensions.height, pan, zoom, graph.nodes);
    }

    ctx.restore();
  }, [dimensions, pan, zoom, graph, selection, interaction, updateTrigger, minimapEnabled, screenToWorld]);

  // Mouse Handlers
  const handleMouseDown = (e) => {
    setContextMenu(null);

    const rect = canvasRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPoint = screenToWorld(screenX, screenY);

    // 1. Pan view (Middle button, or Space + Left button, or Alt + Left button)
    const isPanTrigger = e.button === 1 || (e.button === 0 && (e.altKey || e.shiftKey));
    if (isPanTrigger) {
      setInteraction({
        state: 'DRAG_VIEW',
        startPoint: { x: screenX, y: screenY },
        currentPoint: { x: screenX, y: screenY }
      });
      return;
    }

    if (e.button === 0) {
      actionStartSnapshotRef.current = serializeGraph(graph);

      // 2. Check for backdrop resize handle corner clicks (high priority!)
      for (const [name, node] of graph.nodes.entries()) {
        if ((node.preset === 'node_preset_backdrop' || node.preset === 'node_preset_note') && selection.includes(name)) {
          const { width, height } = getNodeDimensions(node);
          const rx = node.position.x + width;
          const ry = node.position.y + height;
          const dist = Math.hypot(worldPoint.x - rx, worldPoint.y - ry);
          if (dist < 16) {
            setInteraction({
              state: 'DRAG_RESIZE_BACKDROP',
              startPoint: { x: screenX, y: screenY },
              currentPoint: { x: screenX, y: screenY },
              backdropName: name,
              startWidth: width,
              startHeight: height
            });
            return;
          }
        }
      }

      // 3. Check for slot hit
      for (const node of graph.nodes.values()) {
        if (node.preset === 'node_preset_backdrop') continue; // backdrops don't have slots
        const slot = hitTestSlot(worldPoint, node);
        if (slot) {
          setInteraction({
            state: 'DRAW_CONNECTION',
            startPoint: { x: screenX, y: screenY },
            currentPoint: { x: screenX, y: screenY },
            activeSlot: slot
          });
          return;
        }
      }

      // 4. Check for node hit (processes and notes have priority over backdrops)
      let clickedNode = null;
      
      // Hit test non-backdrop nodes first
      const nonBackdrops = Array.from(graph.nodes.values()).filter(n => n.preset !== 'node_preset_backdrop');
      clickedNode = hitTestNode(worldPoint, new Map(nonBackdrops.map(n => [n.name, n])));

      // Fallback hit test backdrop nodes
      if (!clickedNode) {
        const backdrops = Array.from(graph.nodes.values()).filter(n => n.preset === 'node_preset_backdrop');
        clickedNode = hitTestNode(worldPoint, new Map(backdrops.map(n => [n.name, n])));
      }

      if (clickedNode) {
        let newSelection = [...selection];
        
        // Single selection
        if (!e.ctrlKey && !e.shiftKey) {
          if (!selection.includes(clickedNode.name)) {
            newSelection = [clickedNode.name];
          }
        } else if (e.ctrlKey) {
          // Toggle selection
          if (selection.includes(clickedNode.name)) {
            newSelection = newSelection.filter(name => name !== clickedNode.name);
          } else {
            newSelection.push(clickedNode.name);
          }
        }

        setSelection(newSelection);

        // Special behavior: If clicked node is a Backdrop Group, drag all nodes currently inside it!
        let draggedNodes = [...newSelection];
        if (clickedNode.preset === 'node_preset_backdrop') {
          const bW = clickedNode.metadata?.width || 320;
          const bH = clickedNode.metadata?.height || 220;
          const innerNodes = [];

          graph.nodes.forEach((n, name) => {
            if (name !== clickedNode.name && n.preset !== 'node_preset_backdrop') {
              const dim = getNodeDimensions(n);
              const cx = n.position.x + dim.width / 2;
              const cy = n.position.y + dim.height / 2;
              
              if (cx >= clickedNode.position.x && cx <= clickedNode.position.x + bW &&
                  cy >= clickedNode.position.y && cy <= clickedNode.position.y + bH) {
                innerNodes.push(name);
              }
            }
          });
          draggedNodes = [clickedNode.name, ...innerNodes];
        }

        const nodeOffsets = draggedNodes.map(name => {
          const node = graph.nodes.get(name);
          return {
            x: worldPoint.x - node.position.x,
            y: worldPoint.y - node.position.y
          };
        });

        setInteraction({
          state: 'DRAG_NODE',
          startPoint: { x: screenX, y: screenY },
          currentPoint: { x: screenX, y: screenY },
          draggedNodes,
          nodeOffsets
        });
        return;
      }

      // 5. Clicked connection line (to select/delete it)
      const clickedConn = hitTestConnection(worldPoint, graph.connections, graph.nodes);
      if (clickedConn) {
        setConfirmData({
          title: 'Delete Connection',
          message: 'Are you sure you want to remove this connection line?',
          onConfirm: () => {
            const before = serializeGraph(graph);
            graph.deleteConnection(
              clickedConn.sourceNode,
              clickedConn.sourceAttr,
              clickedConn.targetNode,
              clickedConn.targetAttr
            );
            const after = serializeGraph(graph);
            const cmd = new SnapshotCommand(graph, 'Delete Connection');
            cmd.beforeState = before;
            cmd.afterState = after;
            commandHistory.execute(cmd);
            graph.emit('node:moved', {}); 
          }
        });
        actionStartSnapshotRef.current = null;
        return;
      }

      // 6. Clicked empty space: Rubber-band selection
      setSelection([]);
      setInteraction({
        state: 'SELECTION',
        startPoint: { x: screenX, y: screenY },
        currentPoint: { x: screenX, y: screenY },
        rubberBandRect: { p1: worldPoint, p2: worldPoint }
      });
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPoint = screenToWorld(screenX, screenY);

    mousePosRef.current = worldPoint;

    if (interaction.state === 'DEFAULT') return;

    if (interaction.state === 'DRAG_VIEW') {
      const dx = screenX - interaction.startPoint.x;
      const dy = screenY - interaction.startPoint.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setInteraction(prev => ({
        ...prev,
        startPoint: { x: screenX, y: screenY },
        currentPoint: { x: screenX, y: screenY }
      }));
    }

    if (interaction.state === 'DRAG_NODE') {
      interaction.draggedNodes.forEach((name, idx) => {
        const offset = interaction.nodeOffsets[idx];
        let newX = worldPoint.x - offset.x;
        let newY = worldPoint.y - offset.y;

        const snapGrid = e.shiftKey;
        if (snapGrid) {
          const gridSize = editorConfig.grid.size;
          newX = Math.round(newX / gridSize) * gridSize;
          newY = Math.round(newY / gridSize) * gridSize;
        }

        graph.moveNode(name, { x: newX, y: newY });
      });
      setInteraction(prev => ({ ...prev, currentPoint: { x: screenX, y: screenY } }));
    }

    if (interaction.state === 'DRAG_RESIZE_BACKDROP') {
      const startWorld = screenToWorld(interaction.startPoint.x, interaction.startPoint.y);
      const dx = worldPoint.x - startWorld.x;
      const dy = worldPoint.y - startWorld.y;

      const node = graph.nodes.get(interaction.backdropName);
      if (node) {
        node.metadata = {
          ...node.metadata,
          width: Math.max(160, interaction.startWidth + dx),
          height: Math.max(100, interaction.startHeight + dy)
        };
        graph.emit('node:moved', {});
      }
      setInteraction(prev => ({ ...prev, currentPoint: { x: screenX, y: screenY } }));
    }

    if (interaction.state === 'DRAW_CONNECTION') {
      setInteraction(prev => ({ ...prev, currentPoint: { x: screenX, y: screenY } }));
    }

    if (interaction.state === 'SELECTION') {
      const p1 = screenToWorld(interaction.startPoint.x, interaction.startPoint.y);
      setInteraction(prev => ({
        ...prev,
        currentPoint: { x: screenX, y: screenY },
        rubberBandRect: { p1, p2: worldPoint }
      }));
    }
  };

  const handleMouseUp = (e) => {
    if (interaction.state === 'DEFAULT') return;

    const rect = canvasRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPoint = screenToWorld(screenX, screenY);

    // Finalize drawing connection
    if (interaction.state === 'DRAW_CONNECTION') {
      let targetSlot = null;
      for (const node of graph.nodes.values()) {
        if (node.preset === 'node_preset_backdrop') continue;
        const slot = hitTestSlot(worldPoint, node);
        if (slot && slot.nodeName !== interaction.activeSlot.nodeName) {
          const isCompatible = (interaction.activeSlot.type === 'plug' && slot.type === 'socket') ||
                               (interaction.activeSlot.type === 'socket' && slot.type === 'plug');
          const isSameType = dataTypeRegistry.acceptsConnection(interaction.activeSlot.dataType, slot.dataType);
          
          if (isCompatible && isSameType) {
            targetSlot = slot;
            break;
          }
        }
      }

      if (targetSlot) {
        const isSourcePlug = interaction.activeSlot.type === 'plug';
        const srcNode = isSourcePlug ? interaction.activeSlot.nodeName : targetSlot.nodeName;
        const srcAttr = isSourcePlug ? interaction.activeSlot.attributeName : targetSlot.attributeName;
        const tgtNode = isSourcePlug ? targetSlot.nodeName : interaction.activeSlot.nodeName;
        const tgtAttr = isSourcePlug ? targetSlot.attributeName : interaction.activeSlot.attributeName;

        graph.createConnection(srcNode, srcAttr, tgtNode, tgtAttr);
      }
    }

    // Finalize rubber band selection
    if (interaction.state === 'SELECTION' && interaction.rubberBandRect) {
      const selected = nodesInRect(interaction.rubberBandRect, graph.nodes);
      setSelection(selected);
    }

    // Capture Undo action if graph state mutated
    const beforeState = actionStartSnapshotRef.current;
    const afterState = serializeGraph(graph);
    if (beforeState && beforeState !== afterState) {
      const cmdDescription = interaction.state === 'DRAG_RESIZE_BACKDROP' 
        ? 'Resize Node' 
        : 'Canvas Action';
      const cmd = new SnapshotCommand(graph, cmdDescription);
      cmd.beforeState = beforeState;
      cmd.afterState = afterState;
      commandHistory.execute(cmd);
      graph.emit('node:moved', {}); 
    }
    actionStartSnapshotRef.current = null;

    setInteraction({
      state: 'DEFAULT',
      startPoint: null,
      currentPoint: null,
      draggedNodes: [],
      nodeOffsets: [],
      activeSlot: null,
      rubberBandRect: null
    });
  };

  // Direct non-passive wheel event listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheelEvent = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;
      
      const currentZoom = zoomRef.current;
      const currentPan = panRef.current;
      
      const worldPoint = {
        x: (screenX - currentPan.x) / currentZoom,
        y: (screenY - currentPan.y) / currentZoom
      };

      const factor = 1.15;
      const newZoom = e.deltaY < 0 ? currentZoom * factor : currentZoom / factor;
      const boundedZoom = Math.max(0.1, Math.min(4.0, newZoom));

      setZoom(boundedZoom);
      setPan({
        x: screenX - worldPoint.x * boundedZoom,
        y: screenY - worldPoint.y * boundedZoom
      });
    };

    canvas.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheelEvent);
  }, []);

  // Touch event handlers supporting note selection, node dragging, resize, connection, pan, and pinch-zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const touchState = {
      startPos: null,       // { x, y } screen-space
      startWorld: null,     // { x, y } world-space
      hasMoved: false,
      pinchStartDist: null, // initial distance between two fingers
      pinchStartZoom: null, // zoom at start of pinch
      pinchMidpoint: null   // { x, y } screen-space midpoint of two fingers
    };

    const getTouchDistance = (t1, t2) => {
      return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    };

    const getTouchMidpoint = (t1, t2, rect) => {
      return {
        x: ((t1.clientX + t2.clientX) / 2) - rect.left,
        y: ((t1.clientY + t2.clientY) / 2) - rect.top
      };
    };

    const handleTouchStart = (e) => {
      setContextMenu(null);
      const rect = canvas.getBoundingClientRect();

      if (e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const screenX = touch.clientX - rect.left;
        const screenY = touch.clientY - rect.top;
        
        const currentPan = panRef.current;
        const currentZoom = zoomRef.current;
        const worldPoint = {
          x: (screenX - currentPan.x) / currentZoom,
          y: (screenY - currentPan.y) / currentZoom
        };

        touchState.startPos = { x: screenX, y: screenY };
        touchState.startWorld = worldPoint;
        touchState.hasMoved = false;
        touchState.pinchStartDist = null;

        actionStartSnapshotRef.current = serializeGraph(graph);

        // 1. Check for backdrop or note resize handle corner touches (using 24px radius for finger accuracy)
        const currentSelection = selectionRef.current;
        for (const [name, node] of graph.nodes.entries()) {
          if ((node.preset === 'node_preset_backdrop' || node.preset === 'node_preset_note') && currentSelection.includes(name)) {
            const { width, height } = getNodeDimensions(node);
            const rx = node.position.x + width;
            const ry = node.position.y + height;
            const dist = Math.hypot(worldPoint.x - rx, worldPoint.y - ry);
            if (dist < 24) {
              setInteraction({
                state: 'DRAG_RESIZE_BACKDROP',
                startPoint: { x: screenX, y: screenY },
                currentPoint: { x: screenX, y: screenY },
                backdropName: name,
                startWidth: width,
                startHeight: height
              });
              return;
            }
          }
        }

        // 2. Check for slot hit
        for (const node of graph.nodes.values()) {
          if (node.preset === 'node_preset_backdrop') continue;
          const slot = hitTestSlot(worldPoint, node);
          if (slot) {
            setInteraction({
              state: 'DRAW_CONNECTION',
              startPoint: { x: screenX, y: screenY },
              currentPoint: { x: screenX, y: screenY },
              activeSlot: slot
            });
            return;
          }
        }

        // 3. Check for node hit (processes and notes have priority over backdrops)
        let clickedNode = null;
        const nonBackdrops = Array.from(graph.nodes.values()).filter(n => n.preset !== 'node_preset_backdrop');
        clickedNode = hitTestNode(worldPoint, new Map(nonBackdrops.map(n => [n.name, n])));

        if (!clickedNode) {
          const backdrops = Array.from(graph.nodes.values()).filter(n => n.preset === 'node_preset_backdrop');
          clickedNode = hitTestNode(worldPoint, new Map(backdrops.map(n => [n.name, n])));
        }

        if (clickedNode) {
          let newSelection = [...currentSelection];
          if (!currentSelection.includes(clickedNode.name)) {
            newSelection = [clickedNode.name];
          }
          setSelection(newSelection);

          // Determine dragged nodes (if backdrop group, include inner nodes)
          let draggedNodes = [...newSelection];
          if (clickedNode.preset === 'node_preset_backdrop') {
            const bW = clickedNode.metadata?.width || 320;
            const bH = clickedNode.metadata?.height || 220;
            const innerNodes = [];

            graph.nodes.forEach((n, name) => {
              if (name !== clickedNode.name && n.preset !== 'node_preset_backdrop') {
                const dim = getNodeDimensions(n);
                const cx = n.position.x + dim.width / 2;
                const cy = n.position.y + dim.height / 2;

                if (cx >= clickedNode.position.x && cx <= clickedNode.position.x + bW &&
                    cy >= clickedNode.position.y && cy <= clickedNode.position.y + bH) {
                  innerNodes.push(name);
                }
              }
            });
            draggedNodes = [clickedNode.name, ...innerNodes];
          }

          const nodeOffsets = draggedNodes.map(name => {
            const node = graph.nodes.get(name);
            return {
              x: worldPoint.x - (node ? node.position.x : 0),
              y: worldPoint.y - (node ? node.position.y : 0)
            };
          });

          setInteraction({
            state: 'DRAG_NODE',
            startPoint: { x: screenX, y: screenY },
            currentPoint: { x: screenX, y: screenY },
            draggedNodes,
            nodeOffsets
          });
          return;
        }

        // 4. Check for connection hit
        const clickedConn = hitTestConnection(worldPoint, graph.connections, graph.nodes);
        if (clickedConn) {
          setConfirmData({
            title: 'Delete Connection',
            message: 'Are you sure you want to remove this connection line?',
            onConfirm: () => {
              const before = serializeGraph(graph);
              graph.deleteConnection(
                clickedConn.sourceNode,
                clickedConn.sourceAttr,
                clickedConn.targetNode,
                clickedConn.targetAttr
              );
              const after = serializeGraph(graph);
              const cmd = new SnapshotCommand(graph, 'Delete Connection');
              cmd.beforeState = before;
              cmd.afterState = after;
              commandHistory.execute(cmd);
              graph.emit('node:moved', {}); 
            }
          });
          actionStartSnapshotRef.current = null;
          return;
        }

        // 5. Empty space hit: view panning (or tap deselect on release)
        setInteraction({
          state: 'DRAG_VIEW',
          startPoint: { x: screenX, y: screenY },
          currentPoint: { x: screenX, y: screenY }
        });
      } else if (e.touches.length === 2) {
        // Two fingers — Pinch-to-zoom
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        touchState.pinchStartDist = getTouchDistance(e.touches[0], e.touches[1]);
        touchState.pinchStartZoom = zoomRef.current;
        touchState.pinchMidpoint = getTouchMidpoint(e.touches[0], e.touches[1], rect);

        setInteraction({
          state: 'DEFAULT',
          startPoint: null,
          currentPoint: null,
          draggedNodes: [],
          nodeOffsets: [],
          activeSlot: null,
          rubberBandRect: null
        });
      }
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      if (e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const screenX = touch.clientX - rect.left;
        const screenY = touch.clientY - rect.top;

        const currentPan = panRef.current;
        const currentZoom = zoomRef.current;
        const worldPoint = {
          x: (screenX - currentPan.x) / currentZoom,
          y: (screenY - currentPan.y) / currentZoom
        };

        const startPos = touchState.startPos || { x: screenX, y: screenY };
        const distMoved = Math.hypot(screenX - startPos.x, screenY - startPos.y);
        if (distMoved > 5) {
          touchState.hasMoved = true;
        }

        const currentInteraction = interactionRef.current;
        if (currentInteraction.state === 'DRAG_VIEW') {
          const dx = screenX - (currentInteraction.startPoint?.x ?? screenX);
          const dy = screenY - (currentInteraction.startPoint?.y ?? screenY);
          setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
          setInteraction(prev => ({
            ...prev,
            startPoint: { x: screenX, y: screenY },
            currentPoint: { x: screenX, y: screenY }
          }));
        } else if (currentInteraction.state === 'DRAG_NODE') {
          currentInteraction.draggedNodes.forEach((name, idx) => {
            const offset = currentInteraction.nodeOffsets[idx];
            if (!offset) return;
            let newX = worldPoint.x - offset.x;
            let newY = worldPoint.y - offset.y;
            graph.moveNode(name, { x: newX, y: newY });
          });
          setInteraction(prev => ({ ...prev, currentPoint: { x: screenX, y: screenY } }));
        } else if (currentInteraction.state === 'DRAG_RESIZE_BACKDROP') {
          const startWorld = touchState.startWorld || worldPoint;
          const dx = worldPoint.x - startWorld.x;
          const dy = worldPoint.y - startWorld.y;

          const node = graph.nodes.get(currentInteraction.backdropName);
          if (node) {
            node.metadata = {
              ...node.metadata,
              width: Math.max(160, currentInteraction.startWidth + dx),
              height: Math.max(100, currentInteraction.startHeight + dy)
            };
            graph.emit('node:moved', {});
          }
          setInteraction(prev => ({ ...prev, currentPoint: { x: screenX, y: screenY } }));
        } else if (currentInteraction.state === 'DRAW_CONNECTION') {
          setInteraction(prev => ({ ...prev, currentPoint: { x: screenX, y: screenY } }));
        }
      } else if (e.touches.length === 2 && touchState.pinchStartDist !== null) {
        e.preventDefault();
        const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
        const scale = currentDist / touchState.pinchStartDist;
        const newZoom = Math.max(0.1, Math.min(4.0, touchState.pinchStartZoom * scale));

        const midpoint = getTouchMidpoint(e.touches[0], e.touches[1], rect);
        const currentPan = panRef.current;
        const startMid = touchState.pinchMidpoint || midpoint;

        const worldX = (startMid.x - currentPan.x) / zoomRef.current;
        const worldY = (startMid.y - currentPan.y) / zoomRef.current;

        const midDx = midpoint.x - startMid.x;
        const midDy = midpoint.y - startMid.y;

        setZoom(newZoom);
        setPan({
          x: midpoint.x - worldX * newZoom + midDx,
          y: midpoint.y - worldY * newZoom + midDy
        });

        touchState.pinchMidpoint = midpoint;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length === 0) {
        const currentInteraction = interactionRef.current;
        const hasMoved = touchState.hasMoved;

        // If tap on empty canvas (DRAG_VIEW without significant move), deselect nodes!
        if (currentInteraction.state === 'DRAG_VIEW' && !hasMoved) {
          setSelection([]);
        }

        // Finalize drawing connection if active
        if (currentInteraction.state === 'DRAW_CONNECTION' && currentInteraction.currentPoint) {
          const currentPan = panRef.current;
          const currentZoom = zoomRef.current;
          const worldPoint = {
            x: (currentInteraction.currentPoint.x - currentPan.x) / currentZoom,
            y: (currentInteraction.currentPoint.y - currentPan.y) / currentZoom
          };

          let targetSlot = null;
          for (const node of graph.nodes.values()) {
            if (node.preset === 'node_preset_backdrop') continue;
            const slot = hitTestSlot(worldPoint, node);
            if (slot && slot.nodeName !== currentInteraction.activeSlot.nodeName) {
              const isCompatible = (currentInteraction.activeSlot.type === 'plug' && slot.type === 'socket') ||
                                   (currentInteraction.activeSlot.type === 'socket' && slot.type === 'plug');
              const isSameType = dataTypeRegistry.acceptsConnection(currentInteraction.activeSlot.dataType, slot.dataType);
              
              if (isCompatible && isSameType) {
                targetSlot = slot;
                break;
              }
            }
          }

          if (targetSlot) {
            const isSourcePlug = currentInteraction.activeSlot.type === 'plug';
            const srcNode = isSourcePlug ? currentInteraction.activeSlot.nodeName : targetSlot.nodeName;
            const srcAttr = isSourcePlug ? currentInteraction.activeSlot.attributeName : targetSlot.attributeName;
            const tgtNode = isSourcePlug ? targetSlot.nodeName : currentInteraction.activeSlot.nodeName;
            const tgtAttr = isSourcePlug ? targetSlot.attributeName : currentInteraction.activeSlot.attributeName;

            graph.createConnection(srcNode, srcAttr, tgtNode, tgtAttr);
          }
        }

        // Capture Undo action if graph state mutated
        const beforeState = actionStartSnapshotRef.current;
        const afterState = serializeGraph(graph);
        if (beforeState && beforeState !== afterState) {
          const cmdDescription = currentInteraction.state === 'DRAG_RESIZE_BACKDROP' 
            ? 'Resize Node' 
            : 'Canvas Action';
          const cmd = new SnapshotCommand(graph, cmdDescription);
          cmd.beforeState = beforeState;
          cmd.afterState = afterState;
          commandHistory.execute(cmd);
          graph.emit('node:moved', {}); 
        }
        actionStartSnapshotRef.current = null;

        setInteraction({
          state: 'DEFAULT',
          startPoint: null,
          currentPoint: null,
          draggedNodes: [],
          nodeOffsets: [],
          activeSlot: null,
          rubberBandRect: null
        });

        touchState.startPos = null;
        touchState.startWorld = null;
        touchState.hasMoved = false;
        touchState.pinchStartDist = null;
        touchState.pinchStartZoom = null;
        touchState.pinchMidpoint = null;
      } else if (e.touches.length === 1) {
        touchState.pinchStartDist = null;
        touchState.pinchStartZoom = null;
        touchState.pinchMidpoint = null;
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [graph, setSelection]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPoint = screenToWorld(screenX, screenY);
    setContextMenu({
      x: screenX,
      y: screenY,
      worldPos: worldPoint
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full overflow-hidden select-none relative"
      onContextMenu={handleContextMenu}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="block"
        style={{ position: 'absolute', top: 0, left: 0 }}
        data-tour="canvas-area"
      />

      {/* Custom Context Menu overlay */}
      {contextMenu && (
        <div
          className="ds-context-menu"
          style={{
            position: 'absolute',
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
        >
          <button
            type="button"
            className="ds-context-item"
            onClick={() => {
              setContextMenu(null);
              setInputData({
                title: 'Create Process Node',
                label: 'Process Name',
                placeholder: 'Enter process name...',
                defaultValue: 'Modeling',
                onSubmit: (name) => {
                  if (!name || !name.trim()) return;
                  const before = serializeGraph(graph);
                  const node = graph.createNode(name.trim(), contextMenu.worldPos, 'node_preset_1');
                  if (node) {
                    setSelection([name.trim()]);
                    const after = serializeGraph(graph);
                    const cmd = new SnapshotCommand(graph, 'Create Process');
                    cmd.beforeState = before;
                    cmd.afterState = after;
                    commandHistory.execute(cmd);
                    graph.emit('node:moved', {});
                  }
                }
              });
            }}
          >
            ＋ Create Process Node
          </button>
          <button
            type="button"
            className="ds-context-item"
            onClick={() => {
              setContextMenu(null);
              setInputData({
                title: 'Create Note Block',
                label: 'Note Title',
                placeholder: 'Enter note title...',
                defaultValue: 'Note',
                onSubmit: (name) => {
                  if (!name || !name.trim()) return;
                  const before = serializeGraph(graph);
                  const node = graph.createNode(name.trim(), contextMenu.worldPos, 'node_preset_note');
                  if (node) {
                    node.metadata = { process_details: 'Double click to edit this note.' };
                    setSelection([name.trim()]);
                    const after = serializeGraph(graph);
                    const cmd = new SnapshotCommand(graph, 'Create Note');
                    cmd.beforeState = before;
                    cmd.afterState = after;
                    commandHistory.execute(cmd);
                    graph.emit('node:moved', {});
                  }
                }
              });
            }}
          >
            📝 Create Note Block
          </button>
          <button
            type="button"
            className="ds-context-item"
            onClick={() => {
              setContextMenu(null);
              setInputData({
                title: 'Create Backdrop Group',
                label: 'Group Name',
                placeholder: 'Enter group title...',
                defaultValue: 'Backdrop Group',
                onSubmit: (name) => {
                  if (!name || !name.trim()) return;
                  const before = serializeGraph(graph);
                  const node = graph.createNode(name.trim(), contextMenu.worldPos, 'node_preset_backdrop');
                  if (node) {
                    node.metadata = { width: 340, height: 240 };
                    setSelection([name.trim()]);
                    const after = serializeGraph(graph);
                    const cmd = new SnapshotCommand(graph, 'Create Backdrop Group');
                    cmd.beforeState = before;
                    cmd.afterState = after;
                    commandHistory.execute(cmd);
                    graph.emit('node:moved', {});
                  }
                }
              });
            }}
          >
            📁 Create Backdrop Group
          </button>
          <button
            type="button"
            className="ds-context-item"
            onClick={() => {
              setContextMenu(null);
              layoutGraph(graph);
            }}
          >
            ⚡ Auto Layout Graph
          </button>
        </div>
      )}

      {/* Input dialog popup overlay */}
      <InputDialog
        isOpen={inputData !== null}
        title={inputData?.title}
        label={inputData?.label}
        placeholder={inputData?.placeholder}
        defaultValue={inputData?.defaultValue}
        onClose={() => setInputData(null)}
        onSubmit={(val) => {
          if (inputData?.onSubmit) inputData.onSubmit(val);
          setInputData(null);
        }}
      />

      {/* Confirm dialog popup overlay */}
      <ConfirmDialog
        isOpen={confirmData !== null}
        title={confirmData?.title}
        message={confirmData?.message}
        onClose={() => setConfirmData(null)}
        onConfirm={() => {
          if (confirmData?.onConfirm) confirmData.onConfirm();
          setConfirmData(null);
        }}
      />
    </div>
  );
}

export default NodeEditorCanvas;
