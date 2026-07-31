import editorConfig from '../../config/editor-config.json';
import { convertArrayToRgba } from '../utils/color';

export function drawGrid(ctx, width, height, pan, zoom) {
  const gridSize = editorConfig.grid.size;
  const gridColor = convertArrayToRgba(editorConfig.grid.color);

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1 / zoom; // Keep grid lines crisp at different zoom levels

  // Calculate visible bounds in world space
  const worldLeft = -pan.x / zoom;
  const worldRight = (width - pan.x) / zoom;
  const worldTop = -pan.y / zoom;
  const worldBottom = (height - pan.y) / zoom;

  // Align start positions to the grid size
  const startX = Math.floor(worldLeft / gridSize) * gridSize;
  const endX = worldRight + gridSize;

  const startY = Math.floor(worldTop / gridSize) * gridSize;
  const endY = worldBottom + gridSize;

  ctx.beginPath();

  // Draw vertical grid lines across visible world space
  for (let x = startX; x < endX; x += gridSize) {
    ctx.moveTo(x, worldTop);
    ctx.lineTo(x, worldBottom);
  }

  // Draw horizontal grid lines across visible world space
  for (let y = startY; y < endY; y += gridSize) {
    ctx.moveTo(worldLeft, y);
    ctx.lineTo(worldRight, y);
  }

  ctx.stroke();
}

export default drawGrid;
