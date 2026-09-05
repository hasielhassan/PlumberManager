import { getNodeDimensions } from '../canvas/node-renderer';
import { getSlotCenter } from '../canvas/hit-testing';
import { getAssetUrl } from '../utils/asset-path';
import editorConfig from '../../config/editor-config.json';
import { convertArrayToRgba, getColorWithOpacity } from '../utils/color';
import { dataTypeRegistry } from '../core/data-types';
import {
  getBezierPoint,
  getControlPoints,
  computeConnectionBundles,
  getBadgeSeedT,
  resolveBadgePosition,
  BADGE_SIZE
} from '../canvas/connection-badge-layout';

function renderBackdrop(node, dims) {
  const { width: nodeW, height: nodeH, headerHeight, radius } = dims;
  const { x, y } = node.position;
  const safeName = node.name.replace(/[^a-zA-Z0-9-_]/g, '_');

  const backdropBg = getColorWithOpacity(node.metadata?.custom_color || '#1e222b', 0.08);
  const titleBg = getColorWithOpacity(node.metadata?.custom_color || '#1e222b', 0.25);
  const strokeColor = getColorWithOpacity(node.metadata?.custom_color || '#5a6478', 0.5);

  let svg = `    <!-- Backdrop Group: ${node.name} -->\n`;
  svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="${radius}" fill="${backdropBg}" stroke="${strokeColor}" stroke-width="${editorConfig.node.border}" />\n`;
  svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${headerHeight}" fill="${titleBg}" clip-path="url(#clip-${safeName})" />\n`;
  svg += `    <text x="${x + 12}" y="${y + headerHeight / 2}" fill="#ffffff" font-family="Inter, sans-serif" font-size="12px" font-weight="bold" text-anchor="start" dominant-baseline="middle">${node.name}</text>\n`;
  return svg;
}

function renderNote(node, dims) {
  const { width: nodeW, height: nodeH, headerHeight, radius, border } = dims;
  const { x, y } = node.position;
  const presetName = node.preset || 'node_default';
  const preset = editorConfig.presets[presetName] || editorConfig.presets.node_default;
  const headerBg = node.metadata?.custom_color || convertArrayToRgba(preset.bg);
  const borderColor = node.metadata?.custom_color || convertArrayToRgba(preset.border);

  const getTextColor = (hex) => {
    if (!hex) return 'rgba(50, 40, 10, 0.85)';
    const r = parseInt(hex.substring(1,3), 16);
    const g = parseInt(hex.substring(3,5), 16);
    const b = parseInt(hex.substring(5,7), 16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return yiq >= 128 ? 'rgba(50, 40, 10, 0.85)' : 'rgba(255, 255, 255, 0.9)';
  };

  const txtColor = getTextColor(node.metadata?.custom_color);
  const titleColor = txtColor.replace('0.85', '1.0').replace('0.9', '1.0');

  let svg = `    <!-- Note: ${node.name} -->\n`;
  svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="${radius}" fill="${headerBg}" stroke="${borderColor}" stroke-width="${border}" />\n`;
  svg += `    <text x="${x + nodeW / 2}" y="${y + headerHeight / 2}" fill="${titleColor}" font-family="Inter, sans-serif" font-size="11px" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${node.name}</text>\n`;
  svg += `    <line x1="${x + 8}" y1="${y + headerHeight}" x2="${x + nodeW - 8}" y2="${y + headerHeight}" stroke="rgba(0,0,0,0.08)" stroke-width="1" />\n`;

  const details = node.metadata?.process_details || 'Write a note...';
  const lines = details.split('\n');
  let rowY = y + headerHeight + 8;
  const maxY = y + nodeH - 16;
  const maxWidth = nodeW - 16;
  const charWidth = 4.5; // approximate character width at 8.5px font

  const svgWrapText = (text, indentPx) => {
    const availChars = Math.floor((maxWidth - indentPx) / charWidth);
    if (availChars <= 0) return [text];
    const words = text.split(/\s+/);
    const wrapped = [];
    let current = '';
    for (const word of words) {
      const test = current ? current + ' ' + word : word;
      if (test.length > availChars && current) {
        wrapped.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) wrapped.push(current);
    return wrapped;
  };

  lines.forEach(line => {
    let text = line.trim();
    if (!text) {
      rowY += 6;
      return;
    }

    if (text.startsWith('#')) {
      const headingMatch = text.match(/^(#+)\s*(.*)/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const headingText = headingMatch[2].replace(/\*\*/g, '');
        const fontSize = Math.max(8, 12 - level);
        const hWrapped = svgWrapText(headingText, 0);
        hWrapped.forEach(wLine => {
          if (rowY + fontSize + 4 > maxY) return;
          svg += `    <text x="${x + 8}" y="${rowY + fontSize / 2}" fill="${titleColor}" font-family="Inter, sans-serif" font-size="${fontSize}px" font-weight="bold" dominant-baseline="middle">${wLine}</text>\n`;
          rowY += fontSize + 4;
        });
        return;
      }
    }

    let isBullet = false;
    if (text.startsWith('- ') || text.startsWith('* ')) {
      isBullet = true;
      text = text.substring(2);
    }

    const cleanText = text.replace(/\*\*/g, '');
    const indent = isBullet ? 12 : 0;
    const wrappedLines = svgWrapText(cleanText, indent);

    wrappedLines.forEach((wLine, wi) => {
      if (rowY + 12 > maxY) return;

      if (isBullet && wi === 0) {
        svg += `    <circle cx="${x + 12}" cy="${rowY + 6}" r="1.5" fill="${txtColor}" />\n`;
      }

      const textX = x + 8 + indent;
      svg += `    <text x="${textX}" y="${rowY + 6}" fill="${txtColor}" font-family="Inter, sans-serif" font-size="8.5px" dominant-baseline="middle">${wLine}</text>\n`;
      rowY += 12;
    });
  });

  return svg;
}

function renderProcessNode(node, dims) {
  const { width: nodeW, height: nodeH, headerHeight, attrHeight, radius, border } = dims;
  const { x, y } = node.position;
  const presetName = node.preset || 'node_default';
  const preset = editorConfig.presets[presetName] || editorConfig.presets.node_default;
  const headerBg = node.metadata?.custom_color || convertArrayToRgba(preset.bg);
  const borderColor = node.metadata?.custom_color || convertArrayToRgba(preset.border);
  const safeName = node.name.replace(/[^a-zA-Z0-9-_]/g, '_');

  let svg = `    <!-- Node: ${node.name} -->\n`;
  svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="${radius}" fill="#1f242e" stroke="${borderColor}" stroke-width="${border}" />\n`;
  svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${headerHeight}" fill="${headerBg}" clip-path="url(#clip-${safeName})" />\n`;
  svg += `    <text x="${x + nodeW / 2}" y="${y + headerHeight / 2}" class="node-title">${node.name}</text>\n`;

  node.attributes.forEach((attr, idx) => {
    const rowY = y + headerHeight + (idx * attrHeight) + 2;
    const attrPreset = editorConfig.presets[attr.preset] || editorConfig.presets.attr_default;

    const textX = x + 16;
    const textY = rowY + attrHeight / 2;
    svg += `      <text x="${textX}" y="${textY}" class="attr-text">${attr.name}</text>\n`;

    const slotRadius = 5;

    if (attr.socket) {
      const socketBg = convertArrayToRgba(attrPreset.socket);
      svg += `      <circle cx="${x}" cy="${rowY + attrHeight / 2}" r="${slotRadius}" fill="${socketBg}" stroke="#11141a" stroke-width="1.5" />\n`;
    }

    if (attr.plug) {
      const plugBg = convertArrayToRgba(attrPreset.plug);
      svg += `      <circle cx="${x + nodeW}" cy="${rowY + attrHeight / 2}" r="${slotRadius}" fill="${plugBg}" stroke="#11141a" stroke-width="1.5" />\n`;
    }
  });

  return svg;
}

export function generateSvgString(graphModel, includeBackground = true) {
  if (graphModel.nodes.size === 0) return '';

  // 1. Calculate bounding box of all nodes
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const node of graphModel.nodes.values()) {
    const { width, height } = getNodeDimensions(node);
    const { x, y } = node.position;
    if (x < minX) minX = x;
    if (x + width > maxX) maxX = x + width;
    if (y < minY) minY = y;
    if (y + height > maxY) maxY = y + height;
  }

  const padding = 50;
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;

  const width = maxX - minX;
  const height = maxY - minY;

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n`;

  svg += `  <style>
    .node-title { font-family: Inter, sans-serif; font-size: ${editorConfig.node.fontSize}px; font-weight: bold; fill: #ffffff; text-anchor: middle; dominant-baseline: middle; }
    .attr-text { font-family: Inter, sans-serif; font-size: ${editorConfig.attr.fontSize}px; fill: #dddddd; dominant-baseline: middle; }
  </style>\n`;

  if (includeBackground) {
    svg += `  <rect width="${width}" height="${height}" fill="#1e222b" />\n`;
  }

  svg += `  <g transform="translate(${-minX}, ${-minY})">\n`;

  svg += `    <defs>\n`;
  graphModel.nodes.forEach(node => {
    if (node.preset === 'node_preset_note') return;
    const { width: nodeW, height: nodeH, radius } = getNodeDimensions(node);
    const { x, y } = node.position;
    const safeName = node.name.replace(/[^a-zA-Z0-9-_]/g, '_');
    svg += `      <clipPath id="clip-${safeName}">\n`;
    svg += `        <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="${radius}" />\n`;
    svg += `      </clipPath>\n`;
  });
  svg += `    </defs>\n`;

  // 2. Backdrops first, so they sit behind connections and nodes.
  graphModel.nodes.forEach(node => {
    if (node.preset === 'node_preset_backdrop') {
      svg += renderBackdrop(node, getNodeDimensions(node));
    }
  });

  // 3. Connection curves - all of them - before any badge is drawn.
  const geometries = [];
  graphModel.connections.forEach(conn => {
    const srcNode = graphModel.nodes.get(conn.sourceNode);
    const tgtNode = graphModel.nodes.get(conn.targetNode);
    if (!srcNode || !tgtNode) return;

    const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
    const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');
    const { ctrl1, ctrl2 } = getControlPoints(pSource, pTarget);

    const color = convertArrayToRgba(editorConfig.connection.color);
    const pathD = `M ${pSource.x} ${pSource.y} C ${ctrl1.x} ${ctrl1.y}, ${ctrl2.x} ${ctrl2.y}, ${pTarget.x} ${pTarget.y}`;
    svg += `    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="${editorConfig.connection.width}" />\n`;

    const attr = srcNode.attributes.find(a => a.name === conn.sourceAttr && a.plug) ||
                 srcNode.attributes.find(a => a.name === conn.sourceAttr);
    geometries.push({ conn, pSource, pTarget, ctrl1, ctrl2, dataTypeCode: attr ? attr.dataType : null });
  });

  // 4. Connection badges - placed against both nodes and each other.
  const bundleInfo = computeConnectionBundles(graphModel.connections);
  const obstacleNodes = Array.from(graphModel.nodes.values()).filter(n => n.preset !== 'node_preset_backdrop');
  const placedBadges = [];

  geometries.forEach(({ conn, pSource, pTarget, ctrl1, ctrl2, dataTypeCode }) => {
    if (!dataTypeCode) return;

    const { index, count } = bundleInfo.get(conn) || { index: 0, count: 1 };
    const pos = resolveBadgePosition({
      pSource, ctrl1, ctrl2, pTarget,
      seedT: getBadgeSeedT(index, count),
      obstacleNodes,
      placedBadges
    });
    placedBadges.push(pos);

    const codeLower = dataTypeCode.toLowerCase();
    const dataUrl = dataTypeRegistry.getDataUrl(codeLower) || getAssetUrl(`/data_type_icons/${codeLower}.svg`);

    svg += `    <g class="format-badge" transform="translate(${pos.x}, ${pos.y})">\n`;
    svg += `      <circle cx="0" cy="0" r="17" fill="#0f172a" />\n`;
    svg += `      <image href="${dataUrl}" x="${-BADGE_SIZE / 2}" y="${-BADGE_SIZE / 2}" width="${BADGE_SIZE}" height="${BADGE_SIZE}" />\n`;
    svg += `    </g>\n`;
  });

  // 5. Notes and process nodes, on top of everything else.
  graphModel.nodes.forEach(node => {
    if (node.preset === 'node_preset_backdrop') return;
    const dims = getNodeDimensions(node);
    svg += node.preset === 'node_preset_note' ? renderNote(node, dims) : renderProcessNode(node, dims);
  });

  svg += `  </g>\n`;
  svg += `</svg>`;

  return svg;
}

export function exportSvg(graphModel, fileName = 'pipeline.svg', includeBackground = true) {
  const svg = generateSvgString(graphModel, includeBackground);
  if (!svg) return;

  // Trigger download
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

export { getBezierPoint };
export default exportSvg;
