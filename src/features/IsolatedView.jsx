import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../design-system/components';
import { GraphModel } from '../core/graph-model';
import { drawNode, getNodeDimensions } from '../canvas/node-renderer';
import { drawConnection } from '../canvas/connection-renderer';
import { drawGrid } from '../canvas/grid-renderer';
import { getSlotCenter } from '../canvas/hit-testing';
import { layoutGraph } from '../core/graph-layout';
import './IsolatedView.css';

export function IsolatedView({ isOpen, onClose, nodeName, mainGraph }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.0);
  const [dimensions, setDimensions] = useState({ width: 500, height: 350 });
  const [isoGraph, setIsoGraph] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);

  // Re-build isolated graph from main graph data
  useEffect(() => {
    if (!isOpen || !nodeName || !mainGraph) return;

    const isoData = mainGraph.getIsolatedData(nodeName);
    if (!isoData) return;

    const g = new GraphModel();
    // 1. Create main node
    const mainNode = mainGraph.nodes.get(nodeName);
    g.createNode(nodeName, { x: 200, y: 200 }, mainNode.preset);
    
    // Copy main node attributes
    mainNode.attributes.forEach(attr => {
      g.createAttribute(nodeName, attr);
    });

    // 2. Create connected inputs nodes
    Object.entries(isoData.inputs).forEach(([attrName, data]) => {
      data.connections.forEach(([srcNodeName, srcAttrName]) => {
        // Create source node if not exist
        if (!g.nodes.has(srcNodeName)) {
          const srcNode = mainGraph.nodes.get(srcNodeName);
          g.createNode(srcNodeName, { x: 50, y: 100 }, srcNode?.preset);
          const connectedAttr = srcNode?.attributes.find(a => a.name === srcAttrName);
          if (connectedAttr) {
            g.createAttribute(srcNodeName, connectedAttr);
          }
        }
        g.createConnection(srcNodeName, srcAttrName, nodeName, attrName);
      });
    });

    // 3. Create connected outputs nodes
    Object.entries(isoData.outputs).forEach(([attrName, data]) => {
      data.connections.forEach(([tgtNodeName, tgtAttrName]) => {
        // Create target node if not exist
        if (!g.nodes.has(tgtNodeName)) {
          const tgtNode = mainGraph.nodes.get(tgtNodeName);
          g.createNode(tgtNodeName, { x: 400, y: 100 }, tgtNode?.preset);
          const connectedAttr = tgtNode?.attributes.find(a => a.name === tgtAttrName);
          if (connectedAttr) {
            g.createAttribute(tgtNodeName, connectedAttr);
          }
        }
        g.createConnection(nodeName, attrName, tgtNodeName, tgtAttrName);
      });
    });

    // 4. Compute layout synchronously (no animation to prevent overlapping on first draw)
    layoutGraph(g, { animate: false, nodesep: 35, ranksep: 220, centralNodeName: nodeName });
    setIsoGraph(g);
    setUpdateKey(prev => prev + 1);

    // Initial camera focus (fit all nodes)
    setTimeout(() => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    }, 100);
  }, [isOpen, nodeName, mainGraph]);

  // Adjust camera to fit all nodes in the isolation view
  useEffect(() => {
    if (!isoGraph || isoGraph.nodes.size === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const node of isoGraph.nodes.values()) {
      const { width, height } = getNodeDimensions(node);
      const { x, y } = node.position;
      if (x < minX) minX = x;
      if (x + width > maxX) maxX = x + width;
      if (y < minY) minY = y;
      if (y + height > maxY) maxY = y + height;
    }

    const padding = 60;
    const graphWidth = maxX - minX + padding * 2;
    const graphHeight = maxY - minY + padding * 2;

    const zoomX = dimensions.width / graphWidth;
    const zoomY = dimensions.height / graphHeight;
    const newZoom = Math.max(0.2, Math.min(1.5, Math.min(zoomX, zoomY)));

    const centerX = minX + (maxX - minX) / 2;
    const centerY = minY + (maxY - minY) / 2;

    setZoom(newZoom);
    setPan({
      x: dimensions.width / 2 - centerX * newZoom,
      y: dimensions.height / 2 - centerY * newZoom
    });
  }, [dimensions, updateKey, isoGraph]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isoGraph) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw grid
    drawGrid(ctx, dimensions.width, dimensions.height, pan, zoom);

    // Draw connections
    isoGraph.connections.forEach(conn => {
      const srcNode = isoGraph.nodes.get(conn.sourceNode);
      const tgtNode = isoGraph.nodes.get(conn.targetNode);
      if (!srcNode || !tgtNode) return;

      const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
      const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');
      
      const attr = srcNode.attributes.find(a => a.name === conn.sourceAttr);
      drawConnection(ctx, pSource, pTarget, conn, attr?.dataType, true, isoGraph);
    });

    // Draw nodes
    isoGraph.nodes.forEach(node => {
      drawNode(ctx, node, node.name === nodeName); // Highlight the main node
    });

    ctx.restore();
  }, [dimensions, pan, zoom, isoGraph, updateKey, nodeName]);

  // Pan handlers
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Ref-cached state to avoid listener attachment overhead
  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);
  useEffect(() => {
    zoomRef.current = zoom;
    panRef.current = pan;
  }, [zoom, pan]);

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
      const boundedZoom = Math.max(0.1, Math.min(3.0, newZoom));

      setZoom(boundedZoom);
      setPan({
        x: screenX - worldPoint.x * boundedZoom,
        y: screenY - worldPoint.y * boundedZoom
      });
    };

    canvas.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheelEvent);
  }, [isOpen, isoGraph]);

  return (
    <Modal
      isOpen={isOpen}
      title={`Isolated View: ${nodeName}`}
      onClose={onClose}
      size="xl"
      className="ds-isolated-view-modal"
    >
      <div ref={containerRef} className="ds-isolated-view-container">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="ds-isolated-view-canvas"
        />
      </div>
    </Modal>
  );
}

export default IsolatedView;
