import dagre from 'dagre';
import { getNodeDimensions } from '../canvas/node-renderer';

function getParentBackdropName(nodeName, graphModel) {
  const node = graphModel.nodes.get(nodeName);
  if (!node || node.preset === 'node_preset_backdrop') return null;
  
  let parentName = null;
  let minArea = Infinity;
  
  for (const [bName, b] of graphModel.nodes.entries()) {
    if (b.preset === 'node_preset_backdrop') {
      const w = b.metadata?.width || 320;
      const h = b.metadata?.height || 220;
      
      // Hit test node center coordinates
      const dimensions = getNodeDimensions(node);
      const cx = node.position.x + dimensions.width / 2;
      const cy = node.position.y + dimensions.height / 2;
      
      if (cx >= b.position.x && cx <= b.position.x + w &&
          cy >= b.position.y && cy <= b.position.y + h) {
        const area = w * h;
        if (area < minArea) {
          minArea = area;
          parentName = bName;
        }
      }
    }
  }
  return parentName;
}

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
            sumY += srcNode.position.y;
            count++;
          }
        }
        if (type === 'plug' && conn.sourceNode === nodeName && conn.sourceAttr === attrName) {
          const tgtNode = graphModel.nodes.get(conn.targetNode);
          if (tgtNode) {
            sumY += tgtNode.position.y;
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

export function layoutGraph(graphModel, options = {}) {
  if (graphModel.nodes.size === 0) return;

  const rankDir = options.rankDir || options.rankdir || 'LR';
  const nodesep = options.nodesep !== undefined ? options.nodesep : 80;
  const ranksep = options.ranksep !== undefined ? options.ranksep : 140;

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
  for (const name of graphModel.nodes.keys()) {
    const parentBackdrop = getParentBackdropName(name, graphModel);
    if (parentBackdrop) {
      g.setParent(name, parentBackdrop);
    }
  }

  // 3. Add all explicit edges
  graphModel.connections.forEach(conn => {
    // Connect nodes in dagre (ignores compound parent boundaries, dagre handles routing!)
    g.setEdge(conn.sourceNode, conn.targetNode);
  });

  // 4. Add virtual layout edges to align Linked Notes close to their process nodes
  for (const [name, node] of graphModel.nodes.entries()) {
    if (node.preset === 'node_preset_note' && node.metadata?.linked_process) {
      const linked = node.metadata.linked_process;
      if (graphModel.nodes.has(linked)) {
        // Create high-weight virtual link to pull them next to each other
        g.setEdge(linked, name, { minlen: 1, weight: 15 });
      }
    }
  }

  // 5. Compute layout
  dagre.layout(g);

  // Post-processing for isolated graphs: resolve all node-node overlaps
  if (options.centralNodeName && graphModel.nodes.has(options.centralNodeName)) {
    const allNodes = [];
    for (const [name, node] of graphModel.nodes.entries()) {
      if (node.preset === 'node_preset_backdrop') continue;
      const dagreNode = g.node(name);
      if (dagreNode) {
        allNodes.push({ name, node, dagreNode });
      }
    }

    const PAD_X = 70;  // horizontal gap between nodes (includes badge clearance)
    const PAD_Y = 50;  // vertical gap between nodes
    const MAX_ITERATIONS = 20;

    for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
      let resolved = true;

      for (let i = 0; i < allNodes.length; i++) {
        for (let j = i + 1; j < allNodes.length; j++) {
          const a = allNodes[i];
          const b = allNodes[j];

          // Dagre coords are center-based
          const halfWA = a.dagreNode.width / 2;
          const halfHA = a.dagreNode.height / 2;
          const halfWB = b.dagreNode.width / 2;
          const halfHB = b.dagreNode.height / 2;

          const overlapX = (halfWA + halfWB + PAD_X) - Math.abs(a.dagreNode.x - b.dagreNode.x);
          const overlapY = (halfHA + halfHB + PAD_Y) - Math.abs(a.dagreNode.y - b.dagreNode.y);

          if (overlapX > 0 && overlapY > 0) {
            resolved = false;

            // Push apart along the axis with the smaller overlap (cheaper to resolve)
            if (overlapX < overlapY) {
              const push = overlapX / 2 + 1;
              if (a.dagreNode.x <= b.dagreNode.x) {
                a.dagreNode.x -= push;
                b.dagreNode.x += push;
              } else {
                a.dagreNode.x += push;
                b.dagreNode.x -= push;
              }
            } else {
              const push = overlapY / 2 + 1;
              if (a.dagreNode.y <= b.dagreNode.y) {
                a.dagreNode.y -= push;
                b.dagreNode.y += push;
              } else {
                a.dagreNode.y += push;
                b.dagreNode.y -= push;
              }
            }
          }
        }
      }

      if (resolved) break;
    }
  }

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
