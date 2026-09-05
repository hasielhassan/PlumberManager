import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '../design-system/components';
import { drawNode, getNodeDimensions } from '../canvas/node-renderer';
import { drawConnectionCurve, drawConnectionBadge } from '../canvas/connection-renderer';
import { drawGrid } from '../canvas/grid-renderer';
import { getSlotCenter } from '../canvas/hit-testing';
import { computeConnectionBundles, getBadgeSeedT } from '../canvas/connection-badge-layout';
import { buildIsolatedGraph } from '../core/isolation-builder';
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

    const g = buildIsolatedGraph(mainGraph, nodeName);
    if (!g) return;

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

    // Backdrops first, so they sit behind connections and nodes.
    isoGraph.nodes.forEach(node => {
      if (node.preset === 'node_preset_backdrop') drawNode(ctx, node, node.name === nodeName);
    });

    // Connection curves - all of them - before any badge is drawn.
    const geometries = [];
    isoGraph.connections.forEach(conn => {
      const srcNode = isoGraph.nodes.get(conn.sourceNode);
      const tgtNode = isoGraph.nodes.get(conn.targetNode);
      if (!srcNode || !tgtNode) return;

      const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
      const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');

      const attr = srcNode.attributes.find(a => a.name === conn.sourceAttr && a.plug) ||
                   srcNode.attributes.find(a => a.name === conn.sourceAttr);
      const { ctrl1, ctrl2 } = drawConnectionCurve(ctx, pSource, pTarget, true);
      geometries.push({ conn, pSource, pTarget, ctrl1, ctrl2, dataTypeCode: attr?.dataType });
    });

    // Connection badges - placed against both nodes and each other.
    const bundleInfo = computeConnectionBundles(isoGraph.connections);
    const placedBadges = [];
    geometries.forEach(({ conn, pSource, pTarget, ctrl1, ctrl2, dataTypeCode }) => {
      const { index, count } = bundleInfo.get(conn) || { index: 0, count: 1 };
      const pos = drawConnectionBadge(ctx, pSource, ctrl1, ctrl2, pTarget, dataTypeCode, {
        graph: isoGraph,
        seedT: getBadgeSeedT(index, count),
        placedBadges,
        active: true
      });
      if (pos) placedBadges.push(pos);
    });

    // Non-backdrop nodes on top of everything else.
    isoGraph.nodes.forEach(node => {
      if (node.preset !== 'node_preset_backdrop') drawNode(ctx, node, node.name === nodeName);
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

    const touchState = { lastPos: null, pinchDist: null, pinchZoom: null, midpoint: null };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        touchState.lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchState.pinchDist = null;
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        touchState.pinchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        touchState.pinchZoom = zoomRef.current;
        touchState.midpoint = {
          x: ((t1.clientX + t2.clientX) / 2) - rect.left,
          y: ((t1.clientY + t2.clientY) / 2) - rect.top
        };
        touchState.lastPos = null;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && touchState.lastPos) {
        e.preventDefault();
        const dx = e.touches[0].clientX - touchState.lastPos.x;
        const dy = e.touches[0].clientY - touchState.lastPos.y;
        setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        touchState.lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && touchState.pinchDist !== null) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const scale = currentDist / touchState.pinchDist;
        const newZoom = Math.max(0.1, Math.min(3.0, touchState.pinchZoom * scale));

        const midpoint = {
          x: ((t1.clientX + t2.clientX) / 2) - rect.left,
          y: ((t1.clientY + t2.clientY) / 2) - rect.top
        };
        const currentPan = panRef.current;
        const startMid = touchState.midpoint || midpoint;

        const worldX = (startMid.x - currentPan.x) / zoomRef.current;
        const worldY = (startMid.y - currentPan.y) / zoomRef.current;

        const midDx = midpoint.x - startMid.x;
        const midDy = midpoint.y - startMid.y;

        setZoom(newZoom);
        setPan({
          x: midpoint.x - worldX * newZoom + midDx,
          y: midpoint.y - worldY * newZoom + midDy
        });

        touchState.midpoint = midpoint;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length === 0) {
        touchState.lastPos = null;
        touchState.pinchDist = null;
        touchState.pinchZoom = null;
        touchState.midpoint = null;
      }
    };

    canvas.addEventListener('wheel', handleWheelEvent, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('wheel', handleWheelEvent);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
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
