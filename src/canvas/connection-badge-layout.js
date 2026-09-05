import editorConfig from '../../config/editor-config.json';
import { getNodeDimensions } from './node-renderer';

export const BADGE_SIZE = editorConfig.badge.size;
export const BADGE_MIN_SEPARATION = editorConfig.badge.minSeparation;
const NODE_COLLISION_PAD = editorConfig.badge.nodeCollisionPad;

// Broad fallback search order, tried after a connection's bundle-aware seed.
const FALLBACK_T_CANDIDATES = [0.5, 0.35, 0.65, 0.25, 0.75, 0.2, 0.8];

export function getBezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
  };
}

function getBezierTangent(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const dx = 3 * mt * mt * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
  const dy = 3 * mt * mt * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

export function getControlPoints(pSource, pTarget) {
  const dx = (pTarget.x - pSource.x) * 0.5;
  const dy = pTarget.y - pSource.y;
  return {
    ctrl1: { x: pSource.x + dx, y: pSource.y },
    ctrl2: { x: pSource.x + dx, y: pSource.y + dy }
  };
}

/**
 * Groups connections that share the same (sourceNode, targetNode) pair so
 * their badges can be staggered along the shared curve family instead of
 * all defaulting to the same midpoint.
 */
export function computeConnectionBundles(connections) {
  const groups = new Map();
  connections.forEach(conn => {
    const key = `${conn.sourceNode}=>${conn.targetNode}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(conn);
  });

  const bundleInfo = new Map();
  groups.forEach(group => {
    group.forEach((conn, index) => {
      bundleInfo.set(conn, { index, count: group.length });
    });
  });
  return bundleInfo;
}

/** Seed t for the i-th of `count` parallel connections between the same two nodes. */
export function getBadgeSeedT(index, count) {
  if (count <= 1) return 0.5;
  return 0.35 + (index / (count - 1)) * 0.30;
}

function hitsAnyNode(pt, obstacleNodes) {
  for (const node of obstacleNodes) {
    const { width: w, height: h } = getNodeDimensions(node);
    const left = node.position.x - NODE_COLLISION_PAD;
    const right = node.position.x + w + NODE_COLLISION_PAD;
    const top = node.position.y - NODE_COLLISION_PAD;
    const bottom = node.position.y + h + NODE_COLLISION_PAD;
    if (pt.x >= left && pt.x <= right && pt.y >= top && pt.y <= bottom) return true;
  }
  return false;
}

function nearestBadge(pt, placedBadges) {
  let min = Infinity;
  let nearest = null;
  for (const b of placedBadges) {
    const d = Math.hypot(pt.x - b.x, pt.y - b.y);
    if (d < min) { min = d; nearest = b; }
  }
  return nearest;
}

function nearestBadgeDistance(pt, placedBadges) {
  if (placedBadges.length === 0) return Infinity;
  let min = Infinity;
  for (const b of placedBadges) {
    const d = Math.hypot(pt.x - b.x, pt.y - b.y);
    if (d < min) min = d;
  }
  return min;
}

/**
 * Picks a collision-free badge position along a connection's Bezier curve.
 *
 * `seedT` (from getBadgeSeedT) is tried first, then a broad fallback set.
 * A candidate is accepted immediately if it clears both node bounding boxes
 * and every already-placed badge in this render pass (tracked in
 * `placedBadges`, which the caller accumulates across the whole connection
 * loop). If every candidate is still too close to a placed badge — a very
 * short connection can't fit another badge along its own curve — the
 * least-congested candidate is nudged sideways, off the curve, away from
 * the conflicting badge, rather than silently overlapping it.
 */
export function resolveBadgePosition({ pSource, ctrl1, ctrl2, pTarget, seedT = 0.5, obstacleNodes = [], placedBadges = [] }) {
  const seen = new Set();
  const tCandidates = [seedT, ...FALLBACK_T_CANDIDATES].filter(t => {
    if (seen.has(t)) return false;
    seen.add(t);
    return true;
  });

  const candidates = tCandidates.map(t => {
    const pt = getBezierPoint(pSource, ctrl1, ctrl2, pTarget, t);
    return { t, pt, clearOfNodes: !hitsAnyNode(pt, obstacleNodes) };
  });

  const pool = candidates.some(c => c.clearOfNodes) ? candidates.filter(c => c.clearOfNodes) : candidates;

  let best = pool[0];
  let bestDist = nearestBadgeDistance(best.pt, placedBadges);
  for (const c of pool) {
    const d = nearestBadgeDistance(c.pt, placedBadges);
    if (d > bestDist) {
      best = c;
      bestDist = d;
    }
  }

  if (bestDist >= BADGE_MIN_SEPARATION) {
    return best.pt;
  }

  // Still too close to a placed badge - nudge off-curve along the local
  // normal, away from whichever placed badge it's closest to. Repeated
  // (rather than one-shot) because clearing the nearest conflict can still
  // leave a dense bundle too close to a *different* placed badge.
  const tangent = getBezierTangent(pSource, ctrl1, ctrl2, pTarget, best.t);
  const normal = { x: -tangent.y, y: tangent.x };

  // The nudge only moves along the curve's (fixed) normal line, so its effect
  // on distance-to-conflict shrinks with the angle between that line and the
  // conflict - a generous per-step buffer plus enough attempts covers that.
  let candidate = best.pt;
  const MAX_NUDGE_ATTEMPTS = 16;
  for (let attempt = 0; attempt < MAX_NUDGE_ATTEMPTS; attempt++) {
    const dist = nearestBadgeDistance(candidate, placedBadges);
    if (dist >= BADGE_MIN_SEPARATION) break;

    const conflict = nearestBadge(candidate, placedBadges);
    let dir = 1;
    if (conflict) {
      const away = { x: candidate.x - conflict.x, y: candidate.y - conflict.y };
      dir = (away.x * normal.x + away.y * normal.y) < 0 ? -1 : 1;
    }
    const nudge = dir * (BADGE_MIN_SEPARATION - dist + 4);
    candidate = { x: candidate.x + normal.x * nudge, y: candidate.y + normal.y * nudge };
  }

  return candidate;
}
