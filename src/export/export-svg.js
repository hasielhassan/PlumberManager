import { getNodeDimensions } from '../canvas/node-renderer';
import { getSlotCenter } from '../canvas/hit-testing';
import editorConfig from '../../config/editor-config.json';
import { convertArrayToRgba, getColorWithOpacity } from '../utils/color';

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

  // 2. Start building SVG string
  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n`;
  
  // Style definition for typography and classes
  svg += `  <style>
    .node-title { font-family: Inter, sans-serif; font-size: ${editorConfig.node.fontSize}px; font-weight: bold; fill: #ffffff; text-anchor: middle; dominant-baseline: middle; }
    .attr-text { font-family: Inter, sans-serif; font-size: ${editorConfig.attr.fontSize}px; fill: #dddddd; dominant-baseline: middle; }
  </style>\n`;

  // Background rect (optional)
  if (includeBackground) {
    svg += `  <rect width="${width}" height="${height}" fill="#1e222b" />\n`;
  }
  
  // Group offset to fit bounding box
  svg += `  <g transform="translate(${-minX}, ${-minY})">\n`;

  // Clip paths definitions for rounded headers
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

  // 3. Draw connections with connection format type badges
  graphModel.connections.forEach(conn => {
    const srcNode = graphModel.nodes.get(conn.sourceNode);
    const tgtNode = graphModel.nodes.get(conn.targetNode);
    if (!srcNode || !tgtNode) return;

    const pSource = getSlotCenter(srcNode, conn.sourceAttr, 'plug');
    const pTarget = getSlotCenter(tgtNode, conn.targetAttr, 'socket');

    const dx = (pTarget.x - pSource.x) * 0.5;
    const dy = pTarget.y - pSource.y;

    const c1x = pSource.x + dx;
    const c1y = pSource.y;
    const c2x = pSource.x + dx;
    const c2y = pSource.y + dy;

    const color = convertArrayToRgba(editorConfig.connection.color);
    const pathD = `M ${pSource.x} ${pSource.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${pTarget.x} ${pTarget.y}`;

    // Draw curve
    svg += `    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="${editorConfig.connection.width}" />\n`;

    // Draw format badge at midpoint
    const attr = srcNode.attributes.find(a => a.name === conn.sourceAttr);
    const dataTypeCode = attr ? attr.dataType : null;

    if (dataTypeCode) {
      let tVal = 0.5;
      const tCandidates = [0.5, 0.35, 0.65, 0.25, 0.75, 0.2, 0.8];
      const nodesList = Array.from(graphModel.nodes.values()).filter(n => n.preset !== 'node_preset_backdrop');
      
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

      const ctrl1 = { x: c1x, y: c1y };
      const ctrl2 = { x: c2x, y: c2y };

      for (const t of tCandidates) {
        const pt = getBezierPoint(pSource, ctrl1, ctrl2, pTarget, t);
        if (!overlaps(pt)) {
          tVal = t;
          break;
        }
      }

      const m = getBezierPoint(pSource, ctrl1, ctrl2, pTarget, tVal);
      const mx = m.x;
      const my = m.y;

      const codeLower = dataTypeCode.toLowerCase();
      const badgeSize = 42;

      svg += `    <g class="format-badge" transform="translate(${mx}, ${my})">\n`;
      svg += `      <circle cx="0" cy="0" r="17" fill="#0f172a" />\n`;
      svg += `      <image href="/data_type_icons/${codeLower}.svg" x="${-badgeSize / 2}" y="${-badgeSize / 2}" width="${badgeSize}" height="${badgeSize}" />\n`;
      svg += `    </g>\n`;
    }
  });

  // 4. Draw nodes
  graphModel.nodes.forEach(node => {
    const { width: nodeW, height: nodeH, headerHeight, attrHeight, radius, border } = getNodeDimensions(node);
    const { x, y } = node.position;

    const presetName = node.preset || 'node_default';
    const preset = editorConfig.presets[presetName] || editorConfig.presets.node_default;
    const headerBg = node.metadata?.custom_color || convertArrayToRgba(preset.bg);
    const borderColor = node.metadata?.custom_color || convertArrayToRgba(preset.border);
    const safeName = node.name.replace(/[^a-zA-Z0-9-_]/g, '_');

    // Render Backdrop blocks
    if (node.preset === 'node_preset_backdrop') {
      const backdropBg = getColorWithOpacity(node.metadata?.custom_color || '#1e222b', 0.08);
      const titleBg = getColorWithOpacity(node.metadata?.custom_color || '#1e222b', 0.25);
      const strokeColor = getColorWithOpacity(node.metadata?.custom_color || '#5a6478', 0.5);
      
      svg += `    <!-- Backdrop Group: ${node.name} -->\n`;
      svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="${radius}" fill="${backdropBg}" stroke="${strokeColor}" stroke-width="${border}" />\n`;
      svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${headerHeight}" fill="${titleBg}" clip-path="url(#clip-${safeName})" />\n`;
      svg += `    <text x="${x + 12}" y="${y + headerHeight / 2}" fill="#ffffff" font-family="Inter, sans-serif" font-size="12px" font-weight="bold" text-anchor="start" dominant-baseline="middle">${node.name}</text>\n`;
      return;
    }

    // Render Note blocks differently
    if (node.preset === 'node_preset_note') {
      svg += `    <!-- Note: ${node.name} -->\n`;
      svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="${radius}" fill="${headerBg}" stroke="${borderColor}" stroke-width="${border}" />\n`;
      
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

      svg += `    <text x="${x + nodeW / 2}" y="${y + headerHeight / 2}" fill="${titleColor}" font-family="Inter, sans-serif" font-size="11px" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${node.name}</text>\n`;
      svg += `    <line x1="${x + 8}" y1="${y + headerHeight}" x2="${x + nodeW - 8}" y2="${y + headerHeight}" stroke="rgba(0,0,0,0.08)" stroke-width="1" />\n`;

      const details = node.metadata?.process_details || 'Write a note...';
      const lines = details.split('\n');
      let rowY = y + headerHeight + 8;
      const maxY = y + nodeH - 16;
      const maxWidth = nodeW - 16;
      const charWidth = 4.5; // approximate character width at 8.5px font

      // SVG word-wrap helper (estimates width from character count)
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

        // Heading support
        if (text.startsWith('#')) {
          const headingMatch = text.match(/^(#+)\s*(.*)/);
          if (headingMatch) {
            const level = headingMatch[1].length;
            const headingText = headingMatch[2].replace(/\*\*/g, '');
            const fontSize = Math.max(8, 12 - level);
            const hCharWidth = fontSize * 0.55;
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
      return;
    }

    // Normal process nodes rendering
    svg += `    <!-- Node: ${node.name} -->\n`;
    svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}" rx="${radius}" fill="#1f242e" stroke="${borderColor}" stroke-width="${border}" />\n`;
    svg += `    <rect x="${x}" y="${y}" width="${nodeW}" height="${headerHeight}" fill="${headerBg}" clip-path="url(#clip-${safeName})" />\n`;
    svg += `    <text x="${x + nodeW / 2}" y="${y + headerHeight / 2}" class="node-title">${node.name}</text>\n`;

    // Attribute rows
    node.attributes.forEach((attr, idx) => {
      const rowY = y + headerHeight + (idx * attrHeight) + 2;
      const attrPreset = editorConfig.presets[attr.preset] || editorConfig.presets.attr_default;

      // Draw label text
      const textX = x + 16;
      const textY = rowY + attrHeight / 2;
      svg += `      <text x="${textX}" y="${textY}" class="attr-text">${attr.name}</text>\n`;

      const slotRadius = 5;

      // Socket (input circle)
      if (attr.socket) {
        const socketBg = convertArrayToRgba(attrPreset.socket);
        svg += `      <circle cx="${x}" cy="${rowY + attrHeight / 2}" r="${slotRadius}" fill="${socketBg}" stroke="#11141a" stroke-width="1.5" />\n`;
      }

      // Plug (output circle)
      if (attr.plug) {
        const plugBg = convertArrayToRgba(attrPreset.plug);
        svg += `      <circle cx="${x + nodeW}" cy="${rowY + attrHeight / 2}" r="${slotRadius}" fill="${plugBg}" stroke="#11141a" stroke-width="1.5" />\n`;
      }
    });
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

export default exportSvg;
