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
    
    // Simple state
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };

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
  }

  screenToWorld(screenX, screenY) {
    return {
      x: (screenX - this.pan.x) / this.zoom,
      y: (screenY - this.pan.y) / this.zoom
    };
  }

  handleMouseDown(e) {
    // Start pan
    this.isPanning = true;
    this.panStart = { x: e.clientX - this.pan.x, y: e.clientY - this.pan.y };
  }

  handleMouseMove(e) {
    if (this.isPanning) {
      this.pan = {
        x: e.clientX - this.panStart.x,
        y: e.clientY - this.panStart.y
      };
      this.render();
    }
  }

  handleMouseUp(e) {
    if (!this.isPanning) return;
    this.isPanning = false;

    // Check click distance to see if it's a click vs drag
    const rect = this.canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    
    const worldPoint = this.screenToWorld(screenX, screenY);
    const clickedNode = hitTestNode(worldPoint, this.graph.nodes);

    if (clickedNode) {
      this.setSelectedNode(clickedNode.name);
      this.onNodeClick(clickedNode.name);
    } else {
      this.setSelectedNode(null);
      this.onNodeClick(null);
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

    const { width, height } = getNodeDimensions(node);
    this.pan = {
      x: this.canvas.width / 2 - (node.position.x + width / 2) * this.zoom,
      y: this.canvas.height / 2 - (node.position.y + height / 2) * this.zoom
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

    // 3. Nodes with selection highlighting
    this.graph.nodes.forEach(node => {
      const isSelected = this.selectedNodeName === node.name;
      drawNode(ctx, node, isSelected);
    });

    ctx.restore();
  }
}
export default ViewerCanvas;
