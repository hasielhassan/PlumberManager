import { GraphModel } from './graph-model';
import { layoutGraph } from './graph-layout';
import { getNodeDimensions } from '../canvas/node-renderer';

/**
 * Builds an isolated subgraph model for a given node name.
 * 
 * - For Backdrop groups: Isolates the backdrop and all process nodes inside its
 *   bounds, preserving internal connections and stripping external ones.
 * - For Note & Process nodes: Isolates the central node along with its direct
 *   inputs and outputs, copying full metadata (colors, descriptions, sizes).
 * 
 * @param {GraphModel} mainGraph 
 * @param {string} nodeName 
 * @returns {GraphModel|null}
 */
export function buildIsolatedGraph(mainGraph, nodeName) {
  if (!mainGraph || !nodeName) return null;
  const mainNode = mainGraph.nodes.get(nodeName);
  if (!mainNode) return null;

  const isoG = new GraphModel();

  // 1. Backdrop Group Isolation
  if (mainNode.preset === 'node_preset_backdrop') {
    const { width: bWidth, height: bHeight } = getNodeDimensions(mainNode);
    const bX = mainNode.position.x;
    const bY = mainNode.position.y;

    // Find all nodes situated inside backdrop bounds
    const internalNodes = [];
    for (const [name, node] of mainGraph.nodes.entries()) {
      if (name === mainNode.name) continue;
      const { width: nW, height: nH } = getNodeDimensions(node);
      const nX = node.position.x;
      const nY = node.position.y;
      if (nX >= bX && nX + nW <= bX + bWidth && nY >= bY && nY + nH <= bY + bHeight) {
        internalNodes.push(node);
      }
    }

    // Add backdrop node with full metadata
    const isoBackdrop = isoG.createNode(nodeName, { ...mainNode.position }, mainNode.preset);
    if (isoBackdrop) {
      isoBackdrop.metadata = JSON.parse(JSON.stringify(mainNode.metadata || {}));
    }

    // Add internal child nodes with full metadata
    const internalNames = new Set(internalNodes.map(n => n.name));
    for (const node of internalNodes) {
      const created = isoG.createNode(node.name, { ...node.position }, node.preset);
      if (created) {
        created.metadata = JSON.parse(JSON.stringify(node.metadata || {}));
      }
      node.attributes.forEach(attr => isoG.createAttribute(node.name, attr));
    }

    // Add ONLY internal connections
    for (const conn of mainGraph.connections) {
      if (internalNames.has(conn.sourceNode) && internalNames.has(conn.targetNode)) {
        isoG.createConnection(conn.sourceNode, conn.sourceAttr, conn.targetNode, conn.targetAttr);
      }
    }

    return isoG;
  }

  // 2. Note & Process Node Isolation
  const isoData = mainGraph.getIsolatedData(nodeName);
  if (!isoData) return null;

  // Add central node with full metadata (color, body text, custom size)
  const isoMain = isoG.createNode(nodeName, { x: 200, y: 200 }, mainNode.preset);
  if (isoMain) {
    isoMain.metadata = JSON.parse(JSON.stringify(mainNode.metadata || {}));
  }
  mainNode.attributes.forEach(attr => isoG.createAttribute(nodeName, attr));

  // Add connected inputs with metadata
  Object.entries(isoData.inputs).forEach(([attrName, data]) => {
    data.connections.forEach(([srcNodeName, srcAttrName]) => {
      if (!isoG.nodes.has(srcNodeName)) {
        const srcNode = mainGraph.nodes.get(srcNodeName);
        const createdSrc = isoG.createNode(srcNodeName, { x: 50, y: 100 }, srcNode?.preset);
        if (createdSrc && srcNode) {
          createdSrc.metadata = JSON.parse(JSON.stringify(srcNode.metadata || {}));
        }
        srcNode?.attributes.forEach(attr => isoG.createAttribute(srcNodeName, attr));
      }
      isoG.createConnection(srcNodeName, srcAttrName, nodeName, attrName);
    });
  });

  // Add connected outputs with metadata
  Object.entries(isoData.outputs).forEach(([attrName, data]) => {
    data.connections.forEach(([tgtNodeName, tgtAttrName]) => {
      if (!isoG.nodes.has(tgtNodeName)) {
        const tgtNode = mainGraph.nodes.get(tgtNodeName);
        const createdTgt = isoG.createNode(tgtNodeName, { x: 400, y: 100 }, tgtNode?.preset);
        if (createdTgt && tgtNode) {
          createdTgt.metadata = JSON.parse(JSON.stringify(tgtNode.metadata || {}));
        }
        tgtNode?.attributes.forEach(attr => isoG.createAttribute(tgtNodeName, attr));
      }
      isoG.createConnection(nodeName, attrName, tgtNodeName, tgtAttrName);
    });
  });

  layoutGraph(isoG, { animate: false, nodesep: 35, ranksep: 220, centralNodeName: nodeName });
  return isoG;
}
