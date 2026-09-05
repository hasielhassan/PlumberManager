import { GraphModel } from './graph-model';
import { layoutGraph } from './graph-layout';
import { getParentBackdropName } from './graph-topology';
import editorConfig from '../../config/editor-config.json';

function cloneMetadata(node) {
  return JSON.parse(JSON.stringify(node.metadata || {}));
}

function addNodeWithMetadata(isoG, mainNode, name, position) {
  const created = isoG.createNode(name, position, mainNode.preset);
  if (created) created.metadata = cloneMetadata(mainNode);
  mainNode.attributes.forEach(attr => isoG.createAttribute(name, attr));
  return created;
}

/**
 * Pulls a linked note/process counterpart into the isolated graph. When
 * `includeItsConnections` is set (used when isolating a Note itself), the
 * counterpart's own direct inputs/outputs are pulled in too, so isolating a
 * note shows both the note and the process it documents.
 */
function addLinkedCounterpart(isoG, mainGraph, counterpartName, includeItsConnections) {
  if (!counterpartName || isoG.nodes.has(counterpartName)) return;
  const counterpart = mainGraph.nodes.get(counterpartName);
  if (!counterpart) return;

  addNodeWithMetadata(isoG, counterpart, counterpartName, { x: 200, y: 40 });
  if (!includeItsConnections) return;

  const isoData = mainGraph.getIsolatedData(counterpartName);
  if (!isoData) return;

  Object.entries(isoData.inputs).forEach(([attrName, data]) => {
    data.connections.forEach(([srcNodeName, srcAttrName]) => {
      if (!isoG.nodes.has(srcNodeName)) {
        const srcNode = mainGraph.nodes.get(srcNodeName);
        if (srcNode) addNodeWithMetadata(isoG, srcNode, srcNodeName, { x: 50, y: 40 });
      }
      isoG.createConnection(srcNodeName, srcAttrName, counterpartName, attrName);
    });
  });

  Object.entries(isoData.outputs).forEach(([attrName, data]) => {
    data.connections.forEach(([tgtNodeName, tgtAttrName]) => {
      if (!isoG.nodes.has(tgtNodeName)) {
        const tgtNode = mainGraph.nodes.get(tgtNodeName);
        if (tgtNode) addNodeWithMetadata(isoG, tgtNode, tgtNodeName, { x: 350, y: 40 });
      }
      isoG.createConnection(counterpartName, attrName, tgtNodeName, tgtAttrName);
    });
  });
}

/**
 * Builds an isolated subgraph model for a given node name.
 *
 * - For Backdrop groups: Isolates the backdrop and all process nodes inside its
 *   bounds (same center-point containment test used by the layout engine and
 *   PDF export), preserving internal connections and stripping external ones.
 * - For Note & Process nodes: Isolates the central node along with its direct
 *   inputs and outputs, copying full metadata (colors, descriptions, sizes),
 *   plus any linked note/process counterpart - isolating a process pulls in
 *   a note linked to it, and isolating a note pulls in the process it's
 *   linked to (with that process's own direct connections).
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
    const internalNodes = [];
    for (const [name, node] of mainGraph.nodes.entries()) {
      if (name === nodeName) continue;
      if (getParentBackdropName(name, mainGraph) === nodeName) {
        internalNodes.push(node);
      }
    }

    const isoBackdrop = isoG.createNode(nodeName, { ...mainNode.position }, mainNode.preset);
    if (isoBackdrop) isoBackdrop.metadata = cloneMetadata(mainNode);

    const internalNames = new Set(internalNodes.map(n => n.name));
    for (const node of internalNodes) {
      addNodeWithMetadata(isoG, node, node.name, { ...node.position });
    }

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

  addNodeWithMetadata(isoG, mainNode, nodeName, { x: 200, y: 200 });

  Object.entries(isoData.inputs).forEach(([attrName, data]) => {
    data.connections.forEach(([srcNodeName, srcAttrName]) => {
      if (!isoG.nodes.has(srcNodeName)) {
        const srcNode = mainGraph.nodes.get(srcNodeName);
        if (srcNode) addNodeWithMetadata(isoG, srcNode, srcNodeName, { x: 50, y: 100 });
      }
      isoG.createConnection(srcNodeName, srcAttrName, nodeName, attrName);
    });
  });

  Object.entries(isoData.outputs).forEach(([attrName, data]) => {
    data.connections.forEach(([tgtNodeName, tgtAttrName]) => {
      if (!isoG.nodes.has(tgtNodeName)) {
        const tgtNode = mainGraph.nodes.get(tgtNodeName);
        if (tgtNode) addNodeWithMetadata(isoG, tgtNode, tgtNodeName, { x: 400, y: 100 });
      }
      isoG.createConnection(nodeName, attrName, tgtNodeName, tgtAttrName);
    });
  });

  if (mainNode.preset === 'node_preset_note') {
    addLinkedCounterpart(isoG, mainGraph, mainNode.metadata?.linked_process, true);
  } else {
    for (const [name, node] of mainGraph.nodes.entries()) {
      if (node.preset === 'node_preset_note' && node.metadata?.linked_process === nodeName) {
        addLinkedCounterpart(isoG, mainGraph, name, false);
      }
    }
  }

  layoutGraph(isoG, {
    animate: false,
    nodesep: editorConfig.layout.isolation.nodesep,
    ranksep: editorConfig.layout.isolation.ranksep
  });
  return isoG;
}
