import { ensureGlobals } from '../embed/widget-polyfills';
const { _, graphlib } = ensureGlobals();
import dagreModule from 'dagre';

const dagre = dagreModule?.graphlib ? dagreModule : (dagreModule?.default || dagreModule || {});
if (dagre && !dagre.graphlib) {
  dagre.graphlib = (typeof window !== 'undefined' && window.graphlib) ? window.graphlib : graphlib;
}

import editorConfig from '../../config/editor-config.json';
import { getNodeDimensions } from '../canvas/node-renderer';
import { getSlotCenter } from '../canvas/hit-testing';
import { getParentBackdropName } from './graph-topology';

function optimizeSlotOrdering(graphModel) {
  for (const [nodeName, node] of graphModel.nodes.entries()) {
    if (node.preset === 'node_preset_backdrop' || node.preset === 'node_preset_note') continue;

    const inputs = node.attributes.filter(a => a.socket);
    const outputs = node.attributes.filter(a => a.plug);
    const other = node.attributes.filter(a => !a.socket && !a.plug);

    const getAvgConnectedY = (attrName, type) => {
      let sumY = 0;
      let count = 0;
      graphModel.connections.forEach(conn => {
        if (type === 'socket' && conn.targetNode === nodeName && conn.targetAttr === attrName) {
          const srcNode = graphModel.nodes.get(conn.sourceNode);
          if (srcNode) {
            sumY += getSlotCenter(srcNode, conn.sourceAttr, 'plug').y;
            count++;
          }
        }
        if (type === 'plug' && conn.sourceNode === nodeName && conn.sourceAttr === attrName) {
          const tgtNode = graphModel.nodes.get(conn.targetNode);
          if (tgtNode) {
            sumY += getSlotCenter(tgtNode, conn.targetAttr, 'socket').y;
            count++;
          }
        }
      });
      return count > 0 ? sumY / count : Infinity;
    };

    inputs.sort((a, b) => {
      const yA = getAvgConnectedY(a.name, 'socket');
      const yB = getAvgConnectedY(b.name, 'socket');
      if (yA === Infinity && yB === Infinity) return 0;
      return yA - yB;
    });

    outputs.sort((a, b) => {
      const yA = getAvgConnectedY(a.name, 'plug');
      const yB = getAvgConnectedY(b.name, 'plug');
      if (yA === Infinity && yB === Infinity) return 0;
      return yA - yB;
    });

    node.attributes = [...inputs, ...outputs, ...other];
  }
}

/**
 * Recomputes each backdrop's box directly from its children's resolved
 * positions, instead of trusting Dagre's compound-cluster auto margin
 * (which is not header-aware and can land at or below the backdrop's
 * title-bar height). Backdrops with no children keep their existing
 * (or default) size rather than inheriting Dagre's undefined group
 * width/height, which previously corrupted metadata to NaN.
 */
function recomputeBackdropBounds(g, graphModel, childrenOf) {
  const padding = editorConfig.layout.backdropPadding;

  for (const [name, node] of graphModel.nodes.entries()) {
    if (node.preset !== 'node_preset_backdrop') continue;
    const dagreNode = g.node(name);
    if (!dagreNode) continue;

    const kids = childrenOf.get(name) || [];
    if (kids.length === 0) {
      dagreNode.width = node.metadata?.width || 320;
      dagreNode.height = node.metadata?.height || 220;
      continue;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const kidName of kids) {
      const kidNode = g.node(kidName);
      if (!kidNode) continue;
      minX = Math.min(minX, kidNode.x - kidNode.width / 2);
      minY = Math.min(minY, kidNode.y - kidNode.height / 2);
      maxX = Math.max(maxX, kidNode.x + kidNode.width / 2);
      maxY = Math.max(maxY, kidNode.y + kidNode.height / 2);
    }

    const left = minX - padding.left;
    const top = minY - padding.top;
    const right = maxX + padding.right;
    const bottom = maxY + padding.bottom;

    dagreNode.width = right - left;
    dagreNode.height = bottom - top;
    dagreNode.x = (left + right) / 2;
    dagreNode.y = (top + bottom) / 2;
  }
}

/** Anchors each note with a `linked_process` directly above that process node's resolved position. */
function placeLinkedNotes(g, graphModel) {
  const gap = editorConfig.layout.linkedNoteGap;
  for (const [name, node] of graphModel.nodes.entries()) {
    if (node.preset !== 'node_preset_note') continue;
    const linked = node.metadata?.linked_process;
    if (!linked || !graphModel.nodes.has(linked)) continue;

    const anchor = g.node(linked);
    const noteDagreNode = g.node(name);
    if (!anchor || !noteDagreNode) continue;

    noteDagreNode.x = anchor.x;
    noteDagreNode.y = anchor.y - anchor.height / 2 - noteDagreNode.height / 2 - gap;
  }
}

/**
 * Moves every unlinked note onto a dedicated shelf above the rest of the
 * graph, so a note with no process link doesn't default into the same
 * rank/column as the pipeline's entry nodes.
 */
function placeUnlinkedNotesOnShelf(g, graphModel) {
  const noteNames = new Set();
  const unlinkedNotes = [];

  for (const [name, node] of graphModel.nodes.entries()) {
    if (node.preset !== 'node_preset_note') continue;
    noteNames.add(name);
    if (!node.metadata?.linked_process) unlinkedNotes.push(name);
  }
  if (unlinkedNotes.length === 0) return;

  let minX = Infinity;
  let minY = Infinity;
  for (const name of graphModel.nodes.keys()) {
    if (noteNames.has(name)) continue; // exclude notes (incl. already-anchored linked notes)
    const dagreNode = g.node(name);
    if (!dagreNode) continue;
    minX = Math.min(minX, dagreNode.x - dagreNode.width / 2);
    minY = Math.min(minY, dagreNode.y - dagreNode.height / 2);
  }
  if (!isFinite(minX)) minX = 0;
  if (!isFinite(minY)) minY = 0;

  const gap = editorConfig.layout.noteShelfGap;
  const spacing = editorConfig.layout.noteShelfSpacing;
  let shelfX = minX;

  unlinkedNotes.forEach(name => {
    const dagreNode = g.node(name);
    if (!dagreNode) return;
    dagreNode.x = shelfX + dagreNode.width / 2;
    dagreNode.y = minY - gap - dagreNode.height / 2;
    shelfX += dagreNode.width + spacing;
  });
}

/**
 * Resolves AABB overlaps across every node, including backdrops. A backdrop
 * always "overlaps" its own children by design, so any pair where one node
 * is a descendant of the other (via Dagre's compound parent tracking) is
 * skipped; when a backdrop is pushed to resolve a collision with an
 * unrelated node, all of its descendants are pushed by the same delta so
 * the group moves as a rigid body without separating from its contents.
 */
function resolveOverlaps(g, graphModel, childrenOf) {
  function collectDescendants(name, acc) {
    const kids = childrenOf.get(name);
    if (!kids) return acc;
    for (const kid of kids) {
      if (!acc.has(kid)) {
        acc.add(kid);
        collectDescendants(kid, acc);
      }
    }
    return acc;
  }

  const descendantsOf = new Map();
  for (const name of graphModel.nodes.keys()) {
    descendantsOf.set(name, collectDescendants(name, new Set()));
  }
  const isRelated = (a, b) => descendantsOf.get(a)?.has(b) || descendantsOf.get(b)?.has(a);

  const applyPush = (entry, dx, dy) => {
    entry.dagreNode.x += dx;
    entry.dagreNode.y += dy;
    for (const kidName of descendantsOf.get(entry.name) || []) {
      const kidDagreNode = g.node(kidName);
      if (kidDagreNode) {
        kidDagreNode.x += dx;
        kidDagreNode.y += dy;
      }
    }
  };

  const allNodes = [];
  for (const [name, node] of graphModel.nodes.entries()) {
    // Unlinked notes already have their final shelf position - leave them out
    // of general overlap resolution so they aren't pulled back toward the graph.
    if (node.preset === 'node_preset_note' && !node.metadata?.linked_process) continue;
    const dagreNode = g.node(name);
    if (dagreNode) allNodes.push({ name, node, dagreNode });
  }

  const PAD_X = editorConfig.layout.overlapPadX;
  const PAD_Y = editorConfig.layout.overlapPadY;
  const MAX_ITERATIONS = 40;

  for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
    let resolved = true;

    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const a = allNodes[i];
        const b = allNodes[j];
        if (isRelated(a.name, b.name)) continue;

        const halfWA = a.dagreNode.width / 2;
        const halfHA = a.dagreNode.height / 2;
        const halfWB = b.dagreNode.width / 2;
        const halfHB = b.dagreNode.height / 2;

        const overlapX = (halfWA + halfWB + PAD_X) - Math.abs(a.dagreNode.x - b.dagreNode.x);
        const overlapY = (halfHA + halfHB + PAD_Y) - Math.abs(a.dagreNode.y - b.dagreNode.y);

        if (overlapX > 0 && overlapY > 0) {
          resolved = false;

          if (overlapX < overlapY) {
            const push = overlapX / 2 + 1;
            const dir = a.dagreNode.x <= b.dagreNode.x ? -1 : 1;
            applyPush(a, push * dir, 0);
            applyPush(b, -push * dir, 0);
          } else {
            const push = overlapY / 2 + 1;
            const dir = a.dagreNode.y <= b.dagreNode.y ? -1 : 1;
            applyPush(a, 0, push * dir);
            applyPush(b, 0, -push * dir);
          }
        }
      }
    }

    if (resolved) break;
  }
}

export function layoutGraph(graphModel, options = {}) {
  if (graphModel.nodes.size === 0) return;

  const rankDir = options.rankDir || options.rankdir || 'LR';
  const nodesep = options.nodesep !== undefined ? options.nodesep : editorConfig.layout.fullGraph.nodesep;
  const ranksep = options.ranksep !== undefined ? options.ranksep : editorConfig.layout.fullGraph.ranksep;

  const g = new dagre.graphlib.Graph({ compound: true });

  g.setGraph({
    rankdir: rankDir,
    nodesep: nodesep,
    ranksep: ranksep,
    marginx: 50,
    marginy: 50
  });

  g.setDefaultEdgeLabel(() => ({}));

  // 1. Add all nodes to dagre graph
  for (const [name, node] of graphModel.nodes.entries()) {
    if (node.preset === 'node_preset_backdrop') {
      // Set backdrop as a compound parent group node
      g.setNode(name, { label: name, isGroup: true });
    } else {
      const { width, height } = getNodeDimensions(node);
      g.setNode(name, { width, height });
    }
  }

  // 2. Set compound parent nesting for nodes physically inside backdrops
  const childrenOf = new Map();
  for (const name of graphModel.nodes.keys()) {
    const parentBackdrop = getParentBackdropName(name, graphModel);
    if (parentBackdrop) {
      g.setParent(name, parentBackdrop);
      if (!childrenOf.has(parentBackdrop)) childrenOf.set(parentBackdrop, []);
      childrenOf.get(parentBackdrop).push(name);
    }
  }

  // 3. Add all explicit edges (connects nodes in dagre, ignoring compound
  // parent boundaries - dagre handles routing). Notes are intentionally left
  // out of ranking entirely; their position is resolved after layout below.
  graphModel.connections.forEach(conn => {
    g.setEdge(conn.sourceNode, conn.targetNode);
  });

  // 4. Compute layout
  dagre.layout(g);

  // 5. Header-aware backdrop bounds, replacing Dagre's raw (non-header-aware,
  // and for empty backdrops undefined) auto-computed group size.
  recomputeBackdropBounds(g, graphModel, childrenOf);

  // 6. Place notes: linked notes anchor beside their process node; unlinked
  // notes move to a shelf above the graph instead of the entry-rank column.
  placeLinkedNotes(g, graphModel);
  placeUnlinkedNotesOnShelf(g, graphModel);

  // 7. Resolve remaining overlaps across the whole graph (nodes + backdrops),
  // including any introduced by the backdrop/note repositioning above.
  resolveOverlaps(g, graphModel, childrenOf);

  // Store start positions for animation interpolation
  const startPositions = {};
  for (const [name, node] of graphModel.nodes.entries()) {
    startPositions[name] = { ...node.position };
  }

  // Position nodes at target coordinates temporarily to compute optimized slot order
  const targetPositions = {};
  for (const name of graphModel.nodes.keys()) {
    const dagreNode = g.node(name);
    if (dagreNode) {
      const targetPos = {
        x: dagreNode.x - dagreNode.width / 2,
        y: dagreNode.y - dagreNode.height / 2
      };
      targetPositions[name] = targetPos;

      const node = graphModel.nodes.get(name);
      if (node) {
        node.position = targetPos;
        // If it is a backdrop, update its width/height from the layout size!
        if (node.preset === 'node_preset_backdrop') {
          node.metadata = {
            ...node.metadata,
            width: Math.max(160, dagreNode.width),
            height: Math.max(100, dagreNode.height)
          };
        }
      }
    }
  }

  // Reorder inputs/outputs so they cross less based on the new layout positions
  optimizeSlotOrdering(graphModel);

  // If animation is disabled or single node, apply target positions directly and return
  if (!options.animate || graphModel.nodes.size <= 1) {
    graphModel.emit('node:moved', {});
    graphModel.emit('graph:layout_completed', {});
    return;
  }

  // Restore start positions for transition animation
  for (const [name, node] of graphModel.nodes.entries()) {
    const start = startPositions[name];
    if (start) {
      node.position = start;
    }
  }

  const duration = 300; // ms
  let startTime = null;

  const animateStep = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(1.0, elapsed / duration);

    // easeInOutCubic curve
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    for (const name of graphModel.nodes.keys()) {
      const start = startPositions[name];
      const target = targetPositions[name];
      if (start && target) {
        const currentX = start.x + (target.x - start.x) * ease;
        const currentY = start.y + (target.y - start.y) * ease;

        const node = graphModel.nodes.get(name);
        if (node) {
          node.position = { x: currentX, y: currentY };
        }
      }
    }

    // Force canvas redrawing
    graphModel.emit('node:moved', {});

    if (progress < 1.0) {
      requestAnimationFrame(animateStep);
    } else {
      graphModel.emit('graph:layout_completed', {});
    }
  };

  requestAnimationFrame(animateStep);
}

export default layoutGraph;
