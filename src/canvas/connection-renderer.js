import editorConfig from '../../config/editor-config.json';
import { convertArrayToRgba } from '../utils/color';
import { dataTypeRegistry } from '../core/data-types';
import { getBezierPoint, getControlPoints, resolveBadgePosition, BADGE_SIZE } from './connection-badge-layout';

export { getBezierPoint };

/** Draws just the curve, returning its control points so a badge can be placed on it separately. */
export function drawConnectionCurve(ctx, pSource, pTarget, active = true) {
  const { ctrl1, ctrl2 } = getControlPoints(pSource, pTarget);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pSource.x, pSource.y);
  ctx.bezierCurveTo(ctrl1.x, ctrl1.y, ctrl2.x, ctrl2.y, pTarget.x, pTarget.y);
  ctx.strokeStyle = convertArrayToRgba(editorConfig.connection.color, active ? 1.0 : 0.25);
  ctx.lineWidth = editorConfig.connection.width;
  ctx.stroke();
  ctx.restore();

  return { ctrl1, ctrl2 };
}

/**
 * Draws a connection's data-type badge at a collision-free point along its
 * curve. `placedBadges` should be one array shared across a whole render
 * pass so later badges avoid earlier ones, not just node bounding boxes.
 */
export function drawConnectionBadge(ctx, pSource, ctrl1, ctrl2, pTarget, dataTypeCode, { graph = null, seedT = 0.5, placedBadges = [], active = true } = {}) {
  if (!dataTypeCode) return null;

  let pos;
  if (graph && graph.nodes) {
    const obstacleNodes = Array.from(graph.nodes.values()).filter(n => n.preset !== 'node_preset_backdrop');
    pos = resolveBadgePosition({ pSource, ctrl1, ctrl2, pTarget, seedT, obstacleNodes, placedBadges });
  } else {
    pos = getBezierPoint(pSource, ctrl1, ctrl2, pTarget, seedT);
  }

  const img = dataTypeRegistry.getImage(dataTypeCode);
  if (img && img.complete) {
    ctx.save();
    // Cutout background disk under icon so connection line doesn't bleed through
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, BADGE_SIZE / 2 - 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    ctx.drawImage(img, pos.x - BADGE_SIZE / 2, pos.y - BADGE_SIZE / 2, BADGE_SIZE, BADGE_SIZE);
    ctx.restore();
  } else {
    // Fallback: draw circular text badge if icon is loading/missing
    ctx.save();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#2d3748';
    ctx.fill();
    ctx.strokeStyle = convertArrayToRgba(editorConfig.connection.color, active ? 1.0 : 0.25);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dataTypeCode.toUpperCase().substring(0, 4), pos.x, pos.y);
    ctx.restore();
  }

  return pos;
}

/** Convenience one-shot draw (curve + badge) for single, non-bundled connections like the live drag preview. */
export function drawConnection(ctx, pSource, pTarget, connection, dataTypeCode = null, active = true, graph = null, placedBadges = []) {
  const { ctrl1, ctrl2 } = drawConnectionCurve(ctx, pSource, pTarget, active);
  drawConnectionBadge(ctx, pSource, ctrl1, ctrl2, pTarget, dataTypeCode, { graph, active, placedBadges });
}

export default drawConnection;
