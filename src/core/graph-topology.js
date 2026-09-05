import { getNodeDimensions } from '../canvas/node-renderer';

/**
 * Finds the smallest-area backdrop whose bounds contain a node's center point.
 * Shared by the layout engine, isolation builder, and PDF export so backdrop
 * membership is computed identically everywhere.
 */
export function getParentBackdropName(nodeName, graphModel) {
  const node = graphModel.nodes.get(nodeName);
  if (!node || node.preset === 'node_preset_backdrop') return null;

  let parentName = null;
  let minArea = Infinity;

  const dimensions = getNodeDimensions(node);
  const cx = node.position.x + dimensions.width / 2;
  const cy = node.position.y + dimensions.height / 2;

  for (const [bName, b] of graphModel.nodes.entries()) {
    if (b.preset !== 'node_preset_backdrop') continue;

    const w = b.metadata?.width || 320;
    const h = b.metadata?.height || 220;

    if (cx >= b.position.x && cx <= b.position.x + w &&
        cy >= b.position.y && cy <= b.position.y + h) {
      const area = w * h;
      if (area < minArea) {
        minArea = area;
        parentName = bName;
      }
    }
  }
  return parentName;
}

export default getParentBackdropName;
