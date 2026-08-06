import { getNodeDimensions } from './node-renderer';
import { getBezierPoint } from './connection-renderer';

export function hitTestNode(point, nodes) {
  const nodeArray = Array.from(nodes.values());
  const nonBackdrops = nodeArray.filter(n => n.preset !== 'node_preset_backdrop').reverse();
  const backdrops = nodeArray.filter(n => n.preset === 'node_preset_backdrop').reverse();

  // Check process/normal nodes first
  for (const node of nonBackdrops) {
    const { width, height } = getNodeDimensions(node);
    const { x, y } = node.position;
    if (point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height) {
      return node;
    }
  }

  // Check backdrop nodes second
  for (const node of backdrops) {
    const { width, height } = getNodeDimensions(node);
    const { x, y } = node.position;
    if (point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height) {
      return node;
    }
  }

  return null;
}

export function hitTestSlot(point, node) {
  const { width, headerHeight, attrHeight } = getNodeDimensions(node);
  const { x, y } = node.position;

  for (let idx = 0; idx < node.attributes.length; idx++) {
    const attr = node.attributes[idx];
    const rowY = y + headerHeight + (idx * attrHeight) + 2;
    const slotY = rowY + attrHeight / 2;
    const slotRadius = 5;
    const hitPadding = 12; // Allow some padding for easier clicking

    if (attr.socket) {
      const socketX = x;
      const dist = Math.hypot(point.x - socketX, point.y - slotY);
      if (dist <= slotRadius + hitPadding) {
        return { nodeName: node.name, attributeName: attr.name, type: 'socket', index: idx, dataType: attr.dataType };
      }
    }

    if (attr.plug) {
      const plugX = x + width;
      const dist = Math.hypot(point.x - plugX, point.y - slotY);
      if (dist <= slotRadius + hitPadding) {
        return { nodeName: node.name, attributeName: attr.name, type: 'plug', index: idx, dataType: attr.dataType };
      }
    }
  }

  return null;
}

export function getSlotCenter(node, attrName, type) {
  const { width, headerHeight, attrHeight, height } = getNodeDimensions(node);
  const { x, y } = node.position;
  const idx = node.attributes.findIndex(a => a.name === attrName);
  
  if (idx === -1) return { x: x + width / 2, y: y + height / 2 };

  const rowY = y + headerHeight + (idx * attrHeight) + 2;
  const slotY = rowY + attrHeight / 2;

  if (type === 'socket') {
    return { x, y: slotY };
  } else {
    return { x: x + width, y: slotY };
  }
}

export function hitTestConnection(point, connections, nodes) {
  const threshold = 10;

  for (let i = 0; i < connections.length; i++) {
    const conn = connections[i];
    const srcNode = nodes.get(conn.sourceNode);
    const tgtNode = nodes.get(conn.targetNode);
    if (!srcNode || !tgtNode) continue;

    const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
    const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');

    const dx = (pTarget.x - pSource.x) * 0.5;
    const dy = pTarget.y - pSource.y;

    const ctrl1 = { x: pSource.x + dx, y: pSource.y };
    const ctrl2 = { x: pSource.x + dx, y: pSource.y + dy };

    // Check distance to bezier curve by sampling t
    for (let t = 0; t <= 1; t += 0.05) {
      const bp = getBezierPoint(pSource, ctrl1, ctrl2, pTarget, t);
      const dist = Math.hypot(point.x - bp.x, point.y - bp.y);
      if (dist <= threshold) {
        return conn;
      }
    }
  }

  return null;
}

export function nodesInRect(rect, nodes) {
  const hitNodes = [];
  const xMin = Math.min(rect.p1.x, rect.p2.x);
  const xMax = Math.max(rect.p1.x, rect.p2.x);
  const yMin = Math.min(rect.p1.y, rect.p2.y);
  const yMax = Math.max(rect.p1.y, rect.p2.y);

  for (const node of nodes.values()) {
    const { width, height } = getNodeDimensions(node);
    const { x, y } = node.position;
    
    // Check overlap
    if (x + width >= xMin && x <= xMax && y + height >= yMin && y <= yMax) {
      hitNodes.push(node.name);
    }
  }

  return hitNodes;
}
