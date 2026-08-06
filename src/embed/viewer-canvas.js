import { drawGrid } from '../canvas/grid-renderer';
import { drawNode, getNodeDimensions } from '../canvas/node-renderer';
import { drawConnection } from '../canvas/connection-renderer';
import { hitTestNode, getSlotCenter } from '../canvas/hit-testing';

export class ViewerCanvas {
  constructor(canvas, graphModel, onNodeClick) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.graph = graphModel;
    this.onNodeClick = onNodeClick;

    this.pan = { x: 0, y: 0 };
    this.zoom = 1.0;
    this.selectedNodeName = null;

    // Viewport panning state
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };

    // Node dragging state
    this.isDraggingNode = false;
    this.dragNode = null;
    this.dragStartWorld = { x: 0, y: 0 };
    this.dragStartNodePos = { x: 0, y: 0 };
    this.childNodeStarts = [];
    this.hasDragged = false;

    this.initEvents();
  }

  setSelectedNode(nodeName) {
    this.selectedNodeName = nodeName || null;
    this.render();
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('wheel', this.handleWheel.bind(this));

    // Touch event support
    this.touchState = {
      startPos: null,
      lastPan: null,
      hasMoved: false,
      pinchStartDist: null,
      pinchStartZoom: null,
      pinchMidpoint: null
    };

    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
  }

  handleTouchStart(e) {
    const rect = this.canvas.getBoundingClientRect();
    if (e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const screenX = touch.clientX - rect.left;
      const screenY = touch.clientY - rect.top;
      const worldPoint = this.screenToWorld(screenX, screenY);

      const clickedNode = hitTestNode(worldPoint, this.graph.nodes);
      if (clickedNode) {
        this.isDraggingNode = true;
        this.dragNode = clickedNode;
        this.dragStartWorld = { ...worldPoint };
        this.dragStartNodePos = { x: clickedNode.position.x, y: clickedNode.position.y };
        this.hasDragged = false;

        this.setSelectedNode(clickedNode.name);
        this.onNodeClick(clickedNode.name);

        if (clickedNode.preset === 'node_preset_backdrop') {
          const { width, height } = getNodeDimensions(clickedNode);
          const bX = clickedNode.position.x;
          const bY = clickedNode.position.y;
          this.childNodeStarts = [];
          for (const node of this.graph.nodes.values()) {
            if (node.name === clickedNode.name || node.preset === 'node_preset_backdrop') continue;
            const { width: nW, height: nH } = getNodeDimensions(node);
            const nX = node.position.x;
            const nY = node.position.y;
            if (nX >= bX && nX + nW <= bX + width && nY >= bY && nY + nH <= bY + height) {
              this.childNodeStarts.push({ node, startX: nX, startY: nY });
            }
          }
        } else {
          this.childNodeStarts = [];
        }
      } else {
        this.isPanning = true;
        this.panStart = { x: touch.clientX - this.pan.x, y: touch.clientY - this.pan.y };
      }

      this.touchState.startPos = { x: screenX, y: screenY };
      this.touchState.hasMoved = false;
      this.touchState.pinchStartDist = null;
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      this.touchState.pinchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      this.touchState.pinchStartZoom = this.zoom;
      this.touchState.pinchMidpoint = {
        x: ((t1.clientX + t2.clientX) / 2) - rect.left,
        y: ((t1.clientY + t2.clientY) / 2) - rect.top
      };
      this.isPanning = false;
      this.isDraggingNode = false;
    }
  }

  handleTouchMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const screenX = touch.clientX - rect.left;
      const screenY = touch.clientY - rect.top;
      const worldPoint = this.screenToWorld(screenX, screenY);

      if (this.isDraggingNode && this.dragNode) {
        e.preventDefault();
        const dx = worldPoint.x - this.dragStartWorld.x;
        const dy = worldPoint.y - this.dragStartWorld.y;

        if (Math.hypot(dx, dy) > 2) {
          this.touchState.hasMoved = true;
          this.hasDragged = true;
        }

        this.dragNode.position.x = this.dragStartNodePos.x + dx;
        this.dragNode.position.y = this.dragStartNodePos.y + dy;

        if (this.childNodeStarts.length > 0) {
          for (const item of this.childNodeStarts) {
            item.node.position.x = item.startX + dx;
            item.node.position.y = item.startY + dy;
          }
        }
        this.render();
        return;
      }

      if (this.isPanning) {
        e.preventDefault();
        const startPos = this.touchState.startPos || { x: screenX, y: screenY };
        if (Math.hypot(screenX - startPos.x, screenY - startPos.y) > 5) {
          this.touchState.hasMoved = true;
        }
        this.pan = {
          x: touch.clientX - this.panStart.x,
          y: touch.clientY - this.panStart.y
        };
        this.render();
      }
    } else if (e.touches.length === 2 && this.touchState.pinchStartDist !== null) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const scale = currentDist / this.touchState.pinchStartDist;
      const newZoom = Math.max(0.1, Math.min(3.0, this.touchState.pinchStartZoom * scale));

      const midpoint = {
        x: ((t1.clientX + t2.clientX) / 2) - rect.left,
        y: ((t1.clientY + t2.clientY) / 2) - rect.top
      };
      const startMid = this.touchState.pinchMidpoint || midpoint;

      const worldX = (startMid.x - this.pan.x) / this.zoom;
      const worldY = (startMid.y - this.pan.y) / this.zoom;

      const midDx = midpoint.x - startMid.x;
      const midDy = midpoint.y - startMid.y;

      this.zoom = newZoom;
      this.pan = {
        x: midpoint.x - worldX * newZoom + midDx,
        y: midpoint.y - worldY * newZoom + midDy
      };
      this.touchState.pinchMidpoint = midpoint;
      this.render();
    }
  }

  handleTouchEnd(e) {
    if (e.touches.length === 0) {
      if (this.isDraggingNode) {
        this.isDraggingNode = false;
        this.dragNode = null;
        this.childNodeStarts = [];
      } else if (this.isPanning && !this.touchState.hasMoved && this.touchState.startPos) {
        const worldPoint = this.screenToWorld(this.touchState.startPos.x, this.touchState.startPos.y);
        const clickedNode = hitTestNode(worldPoint, this.graph.nodes);
        if (clickedNode) {
          this.setSelectedNode(clickedNode.name);
          this.onNodeClick(clickedNode.name);
        } else {
          this.setSelectedNode(null);
          this.onNodeClick(null);
        }
      }
      this.isPanning = false;
      this.touchState.startPos = null;
      this.touchState.hasMoved = false;
      this.touchState.pinchStartDist = null;
      this.touchState.pinchStartZoom = null;
      this.touchState.pinchMidpoint = null;
    } else if (e.touches.length === 1) {
      this.touchState.pinchStartDist = null;
    }
  }

  screenToWorld(screenX, screenY) {
    return {
      x: (screenX - this.pan.x) / this.zoom,
      y: (screenY - this.pan.y) / this.zoom
    };
  }

  handleMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPoint = this.screenToWorld(screenX, screenY);

    const clickedNode = hitTestNode(worldPoint, this.graph.nodes);

    if (clickedNode) {
      this.isDraggingNode = true;
      this.dragNode = clickedNode;
      this.dragStartWorld = { ...worldPoint };
      this.dragStartNodePos = { x: clickedNode.position.x, y: clickedNode.position.y };
      this.hasDragged = false;

      // Select node on click
      this.setSelectedNode(clickedNode.name);
      this.onNodeClick(clickedNode.name);

      // Track child nodes if backdrop is dragged (Rule #4)
      if (clickedNode.preset === 'node_preset_backdrop') {
        const { width, height } = getNodeDimensions(clickedNode);
        const bX = clickedNode.position.x;
        const bY = clickedNode.position.y;

        this.childNodeStarts = [];
        for (const node of this.graph.nodes.values()) {
          if (node.name === clickedNode.name || node.preset === 'node_preset_backdrop') continue;
          const { width: nW, height: nH } = getNodeDimensions(node);
          const nX = node.position.x;
          const nY = node.position.y;

          if (nX >= bX && nX + nW <= bX + width && nY >= bY && nY + nH <= bY + height) {
            this.childNodeStarts.push({ node, startX: nX, startY: nY });
          }
        }
      } else {
        this.childNodeStarts = [];
      }
    } else {
      // Start pan
      this.isPanning = true;
      this.panStart = { x: e.clientX - this.pan.x, y: e.clientY - this.pan.y };
    }
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPoint = this.screenToWorld(screenX, screenY);

    if (this.isDraggingNode && this.dragNode) {
      const dx = worldPoint.x - this.dragStartWorld.x;
      const dy = worldPoint.y - this.dragStartWorld.y;

      if (Math.hypot(dx, dy) > 2) {
        this.hasDragged = true;
      }

      this.dragNode.position.x = this.dragStartNodePos.x + dx;
      this.dragNode.position.y = this.dragStartNodePos.y + dy;

      if (this.childNodeStarts.length > 0) {
        for (const item of this.childNodeStarts) {
          item.node.position.x = item.startX + dx;
          item.node.position.y = item.startY + dy;
        }
      }

      this.render();
      return;
    }

    if (this.isPanning) {
      this.pan = {
        x: e.clientX - this.panStart.x,
        y: e.clientY - this.panStart.y
      };
      this.render();
    }
  }

  handleMouseUp(e) {
    if (this.isDraggingNode) {
      this.isDraggingNode = false;
      this.dragNode = null;
      this.childNodeStarts = [];
      return;
    }

    if (this.isPanning) {
      this.isPanning = false;

      // Clear selection if clicking background without dragging
      const rect = this.canvas.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;
      const worldPoint = this.screenToWorld(screenX, screenY);
      const clickedNode = hitTestNode(worldPoint, this.graph.nodes);

      if (!clickedNode) {
        this.setSelectedNode(null);
        this.onNodeClick(null);
      }
    }
  }

  handleWheel(e) {
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPoint = this.screenToWorld(screenX, screenY);

    const factor = 1.15;
    const newZoom = e.deltaY < 0 ? this.zoom * factor : this.zoom / factor;
    const boundedZoom = Math.max(0.1, Math.min(3.0, newZoom));

    this.zoom = boundedZoom;
    this.pan = {
      x: screenX - worldPoint.x * boundedZoom,
      y: screenY - worldPoint.y * boundedZoom
    };
    this.render();
  }

  fitToView() {
    if (this.graph.nodes.size === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const node of this.graph.nodes.values()) {
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

    const zoomX = this.canvas.width / graphWidth;
    const zoomY = this.canvas.height / graphHeight;
    const newZoom = Math.max(0.15, Math.min(1.5, Math.min(zoomX, zoomY)));

    const centerX = minX + (maxX - minX) / 2;
    const centerY = minY + (maxY - minY) / 2;

    this.zoom = newZoom;
    this.pan = {
      x: this.canvas.width / 2 - centerX * newZoom,
      y: this.canvas.height / 2 - centerY * newZoom
    };
    this.render();
  }

  focusNode(nodeName) {
    const node = this.graph.nodes.get(nodeName);
    if (!node) return;

    const targetZoom = 1.15;
    this.zoom = targetZoom;

    const { width, height } = getNodeDimensions(node);
    const centerX = node.position.x + width / 2;
    const centerY = node.position.y + height / 2;

    this.pan = {
      x: this.canvas.width / 2 - centerX * targetZoom,
      y: this.canvas.height / 2 - centerY * targetZoom
    };
    this.setSelectedNode(nodeName);
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    ctx.translate(this.pan.x, this.pan.y);
    ctx.scale(this.zoom, this.zoom);

    // 1. Grid
    drawGrid(ctx, this.canvas.width, this.canvas.height, this.pan, this.zoom);

    // 2. Connections
    this.graph.connections.forEach(conn => {
      const srcNode = this.graph.nodes.get(conn.sourceNode);
      const tgtNode = this.graph.nodes.get(conn.targetNode);
      if (!srcNode || !tgtNode) return;

      const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
      const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');

      const attr = srcNode.attributes.find(a => a.name === conn.sourceAttr);
      drawConnection(ctx, pSource, pTarget, conn, attr?.dataType, true, this.graph);
    });

    // 3. Nodes (Rule #3: Backdrops drawn FIRST, normal nodes drawn SECOND)
    const backdrops = [];
    const normalNodes = [];
    this.graph.nodes.forEach(node => {
      if (node.preset === 'node_preset_backdrop') {
        backdrops.push(node);
      } else {
        normalNodes.push(node);
      }
    });

    backdrops.forEach(node => {
      const isSelected = this.selectedNodeName === node.name;
      drawNode(ctx, node, isSelected);
    });

    normalNodes.forEach(node => {
      const isSelected = this.selectedNodeName === node.name;
      drawNode(ctx, node, isSelected);
    });

    ctx.restore();
  }
}
export default ViewerCanvas;
