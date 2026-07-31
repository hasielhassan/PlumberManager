import { getNodeDimensions } from './node-renderer';

export function drawMinimap(ctx, viewWidth, viewHeight, pan, zoom, nodes) {
  if (nodes.size === 0) return;

  const mmWidth = 180;
  const mmHeight = 120;
  const margin = 16;
  
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform to screen space

  const mmX = margin;
  const mmY = viewHeight - mmHeight - margin;

  // 1. Draw minimap container
  ctx.fillStyle = 'rgba(20, 24, 30, 0.85)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(mmX, mmY, mmWidth, mmHeight, 6);
  ctx.fill();
  ctx.stroke();

  // 2. Create clipping boundary to prevent lines/viewport from bleeding outside
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(mmX + 1, mmY + 1, mmWidth - 2, mmHeight - 2, 5);
  ctx.clip();

  // Calculate bounding box of all nodes in world space
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const node of nodes.values()) {
    const { width, height } = getNodeDimensions(node);
    const { x, y } = node.position;
    if (x < minX) minX = x;
    if (x + width > maxX) maxX = x + width;
    if (y < minY) minY = y;
    if (y + height > maxY) maxY = y + height;
  }

  // Bounding box dimensions with padding
  const padding = 200;
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;

  const worldW = maxX - minX;
  const worldH = maxY - minY;

  // Map scale factor to fit the container
  const scaleX = (mmWidth - 16) / worldW;
  const scaleY = (mmHeight - 16) / worldH;
  const scale = Math.min(scaleX, scaleY);

  // Center alignment offset
  const offsetX = mmX + 8 + (mmWidth - 16 - worldW * scale) / 2;
  const offsetY = mmY + 8 + (mmHeight - 16 - worldH * scale) / 2;

  const worldToMinimap = (wx, wy) => {
    return {
      x: offsetX + (wx - minX) * scale,
      y: offsetY + (wy - minY) * scale
    };
  };

  // 3. Draw nodes inside the minimap
  nodes.forEach(node => {
    const { width, height } = getNodeDimensions(node);
    const { x, y } = node.position;
    
    const p1 = worldToMinimap(x, y);
    const w = width * scale;
    const h = height * scale;

    ctx.fillStyle = 'rgba(108, 193, 136, 0.7)'; // Accent green
    ctx.fillRect(p1.x, p1.y, Math.max(2, w), Math.max(2, h));
  });

  // 4. Draw viewport indicator
  const viewWorldTL = { x: -pan.x / zoom, y: -pan.y / zoom };
  const viewWorldBR = { x: (viewWidth - pan.x) / zoom, y: (viewHeight - pan.y) / zoom };

  const vpTL = worldToMinimap(viewWorldTL.x, viewWorldTL.y);
  const vpBR = worldToMinimap(viewWorldBR.x, viewWorldBR.y);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(
    vpTL.x,
    vpTL.y,
    vpBR.x - vpTL.x,
    vpBR.y - vpTL.y
  );

  ctx.restore(); // Restore clipping
  ctx.restore(); // Restore transform matrix
}

export default drawMinimap;
