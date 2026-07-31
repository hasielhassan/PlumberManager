import editorConfig from '../../config/editor-config.json';
import { convertArrayToRgba } from '../utils/color';
import { dataTypeRegistry } from '../core/data-types';

export function getBezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x;
  const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y;

  return { x, y };
}

export function drawConnection(ctx, pSource, pTarget, connection, dataTypeCode = null, active = true, graph = null) {
  const dx = (pTarget.x - pSource.x) * 0.5;
  const dy = pTarget.y - pSource.y;

  const ctrl1 = { x: pSource.x + dx, y: pSource.y };
  const ctrl2 = { x: pSource.x + dx, y: pSource.y + dy };

  const connWidth = editorConfig.connection.width;
  const connColor = convertArrayToRgba(editorConfig.connection.color, active ? 1.0 : 0.25);

  // 1. Draw Bezier Curve
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pSource.x, pSource.y);
  ctx.bezierCurveTo(ctrl1.x, ctrl1.y, ctrl2.x, ctrl2.y, pTarget.x, pTarget.y);
  ctx.strokeStyle = connColor;
  ctx.lineWidth = connWidth;
  ctx.stroke();
  ctx.restore();

  // 2. Draw Data Type Icon at a non-overlapping t value on the Bezier curve
  if (dataTypeCode) {
    let tVal = 0.5;
    
    if (graph && graph.nodes) {
      const tCandidates = [0.5, 0.35, 0.65, 0.25, 0.75, 0.2, 0.8];
      const nodesList = Array.from(graph.nodes.values()).filter(n => n.preset !== 'node_preset_backdrop');
      
      const overlaps = (pt) => {
        for (const node of nodesList) {
          const w = node.metadata?.width || 190;
          const h = node.attributes ? (32 + node.attributes.length * 26) : 100;
          
          const padX = 18;
          const padY = 18;
          
          const left = node.position.x - padX;
          const right = node.position.x + w + padX;
          const top = node.position.y - padY;
          const bottom = node.position.y + h + padY;
          
          if (pt.x >= left && pt.x <= right && pt.y >= top && pt.y <= bottom) {
            return true;
          }
        }
        return false;
      };
      
      for (const t of tCandidates) {
        const pt = getBezierPoint(pSource, ctrl1, ctrl2, pTarget, t);
        if (!overlaps(pt)) {
          tVal = t;
          break;
        }
      }
    }

    const mid = getBezierPoint(pSource, ctrl1, ctrl2, pTarget, tVal);
    const imgSize = 42;

    const img = dataTypeRegistry.getImage(dataTypeCode);
    if (img && img.complete) {
      ctx.save();
      // Cutout background disk under icon so connection line doesn't bleed through
      ctx.beginPath();
      ctx.arc(mid.x, mid.y, imgSize / 2 - 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Draw SVG Icon Badge
      ctx.drawImage(img, mid.x - imgSize / 2, mid.y - imgSize / 2, imgSize, imgSize);
      ctx.restore();
    } else {
      // Fallback: draw circular text badge if icon is loading/missing
      ctx.save();
      ctx.beginPath();
      ctx.arc(mid.x, mid.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#2d3748';
      ctx.fill();
      ctx.strokeStyle = connColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(dataTypeCode.toUpperCase().substring(0, 4), mid.x, mid.y);
      ctx.restore();
    }
  }
}
export default drawConnection;
