import { getNodeDimensions, drawNode } from '../canvas/node-renderer';
import { drawConnection } from '../canvas/connection-renderer';
import { getSlotCenter } from '../canvas/hit-testing';

export function renderGraphToCanvas(graphModel, scale = 2, bgFill = '#1e222b') {
  if (graphModel.nodes.size === 0) return null;

  // 1. Calculate bounding box of all nodes
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const node of graphModel.nodes.values()) {
    const { width, height } = getNodeDimensions(node);
    const { x, y } = node.position;
    if (x < minX) minX = x;
    if (x + width > maxX) maxX = x + width;
    if (y < minY) minY = y;
    if (y + height > maxY) maxY = y + height;
  }

  const padding = 50;
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;

  const width = maxX - minX;
  const height = maxY - minY;

  // 2. Create offscreen canvas
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  
  if (bgFill) {
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(-minX, -minY);

  // 3. Draw connections
  graphModel.connections.forEach(conn => {
    const srcNode = graphModel.nodes.get(conn.sourceNode);
    const tgtNode = graphModel.nodes.get(conn.targetNode);
    if (!srcNode || !tgtNode) return;

    const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
    const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');
    
    const attr = srcNode.attributes.find(a => a.name === conn.sourceAttr && a.plug) ||
                 srcNode.attributes.find(a => a.name === conn.sourceAttr);
    drawConnection(ctx, pSource, pTarget, conn, attr?.dataType, true, graphModel);
  });

  // 4. Draw nodes
  graphModel.nodes.forEach(node => {
    drawNode(ctx, node, false);
  });

  ctx.restore();

  return { canvas, width, height };
}

export function exportPng(graphModel, fileName = 'pipeline.png', includeBackground = true) {
  const result = renderGraphToCanvas(graphModel, 2, includeBackground ? '#1e222b' : null);
  if (!result) return;

  result.canvas.toBlob((blob) => {
    if (blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }
  }, 'image/png');
}

export function exportJpeg(graphModel, fileName = 'pipeline.jpg', includeBackground = true, quality = 0.8) {
  // JPEGs do not support transparency. If background is disabled, we fill with white.
  const bg = includeBackground ? '#1e222b' : '#ffffff';
  const result = renderGraphToCanvas(graphModel, 2, bg);
  if (!result) return;

  result.canvas.toBlob((blob) => {
    if (blob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }
  }, 'image/jpeg', quality);
}

export default exportPng;
