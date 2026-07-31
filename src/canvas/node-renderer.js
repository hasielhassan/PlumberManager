import editorConfig from '../../config/editor-config.json';
import { convertArrayToRgba, getColorWithOpacity } from '../utils/color';

export function getNodeDimensions(node) {
  const border = editorConfig.node.border;            // default 2
  const radius = editorConfig.node.radius;            // default 10

  if (node.preset === 'node_preset_backdrop') {
    // Backdrop dimensions come directly from its metadata!
    const width = node.metadata?.width || 320;
    const height = node.metadata?.height || 220;
    return { 
      width, 
      height, 
      headerHeight: 28, 
      attrHeight: 0, 
      radius: 8, 
      border: 1.5 
    };
  }

  if (node.preset === 'node_preset_note') {
    const width = node.metadata?.width || 220;
    const height = node.metadata?.height || 130;
    return { 
      width, 
      height, 
      headerHeight: 26, 
      attrHeight: 0, 
      radius: 6, 
      border: 1.5 
    };
  }

  const baseWidth = editorConfig.node.width;          // default 200
  const headerHeight = 32;                            // Styled header height
  const attrHeight = editorConfig.node.attrHeight;    // default 30

  const attrCount = node.attributes.length;
  const height = attrCount > 0
    ? headerHeight + attrHeight * attrCount + 6
    : headerHeight + 14; 

  return { width: baseWidth, height, headerHeight, attrHeight, radius, border };
}

export function drawNode(ctx, node, isSelected, _hoveredSlot = null) {
  const { width, height, headerHeight, attrHeight, radius, border } = getNodeDimensions(node);
  const { x, y } = node.position;

  // Retrieve presets
  const presetName = node.preset || 'node_default';
  const preset = editorConfig.presets[presetName] || editorConfig.presets.node_default;
  
  const headerBgColor = node.metadata?.custom_color || convertArrayToRgba(preset.bg); // Preset color for the top header (e.g. green)
  const borderColor = isSelected 
    ? convertArrayToRgba(preset.borderSel) 
    : (node.metadata?.custom_color || convertArrayToRgba(preset.border));

  // Helper to determine readable text color based on YIQ contrast
  const getTextColor = (hex) => {
    if (!hex) return 'rgba(50, 40, 10, 0.85)';
    const r = parseInt(hex.substring(1,3), 16);
    const g = parseInt(hex.substring(3,5), 16);
    const b = parseInt(hex.substring(5,7), 16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return yiq >= 128 ? 'rgba(50, 40, 10, 0.85)' : 'rgba(255, 255, 255, 0.9)';
  };

  // 1. Special Rendering for Backdrop Group Boxes
  if (node.preset === 'node_preset_backdrop') {
    ctx.save();
    
    // Fill transparent body
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    
    // Draw transparent backdrop background
    ctx.fillStyle = getColorWithOpacity(node.metadata?.custom_color || '#1e222b', 0.08);
    ctx.fill();

    // Clip and draw header banner
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.clip();
    
    ctx.fillStyle = getColorWithOpacity(node.metadata?.custom_color || '#1e222b', 0.25);
    ctx.fillRect(x, y, width, headerHeight);
    
    // Subtle header separator line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(x, y + headerHeight - 1, width, 1);
    ctx.restore();

    // Draw backdrop stroke border
    ctx.lineWidth = isSelected ? border + 0.5 : border;
    ctx.strokeStyle = isSelected ? borderColor : getColorWithOpacity(node.metadata?.custom_color || '#5a6478', 0.5);
    ctx.stroke();

    // Draw Title (Left-aligned, always white!)
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 12px sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.name, x + 12, y + headerHeight / 2);

    // Draw bottom-right resize grabber lines
    ctx.strokeStyle = isSelected ? borderColor : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // outer line
    ctx.moveTo(x + width - 4, y + height - 12);
    ctx.lineTo(x + width - 12, y + height - 4);
    // inner line
    ctx.moveTo(x + width - 4, y + height - 8);
    ctx.lineTo(x + width - 8, y + height - 4);
    ctx.stroke();
    
    ctx.restore();
    return;
  }

  // 2. Special Rendering for Note Blocks (Yellow Post-It notes)
  if (node.preset === 'node_preset_note') {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fillStyle = headerBgColor;
    ctx.fill();
    ctx.restore();

    ctx.lineWidth = border;
    ctx.strokeStyle = borderColor;
    ctx.stroke();

    const noteTextColor = getTextColor(node.metadata?.custom_color);
    const noteTitleColor = getTextColor(node.metadata?.custom_color).replace('0.85', '1.0').replace('0.9', '1.0');

    // Draw Note title
    ctx.fillStyle = noteTitleColor;
    ctx.font = `bold 11px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.name, x + width / 2, y + headerHeight / 2);

    // Draw note divider line
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(x + 8, y + headerHeight, width - 16, 1);

    // Draw wrapped body text supporting simple markdown
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const details = node.metadata?.process_details || 'Double click to write a note...';
    const lines = details.split('\n');
    let rowY = y + headerHeight + 8;
    const marginX = x + 8;
    const maxWidth = width - 16;
    const maxY = y + height - 16;
    const defaultLineHeight = 13;

    // Helper: word-wrap a string into lines that fit within maxW pixels
    const wrapText = (text, font, maxW, indentX) => {
      ctx.font = font;
      const availW = maxW - indentX;
      const words = text.split(/\s+/);
      const wrapped = [];
      let current = '';
      for (const word of words) {
        const test = current ? current + ' ' + word : word;
        if (ctx.measureText(test).width > availW && current) {
          wrapped.push(current);
          current = word;
        } else {
          current = test;
        }
      }
      if (current) wrapped.push(current);
      return wrapped;
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) {
        rowY += 6; // paragraph spacer
        continue;
      }

      ctx.fillStyle = noteTextColor;
      ctx.font = '10px sans-serif';

      // Heading Support (e.g., ### Title or # Title)
      if (line.startsWith('#')) {
        const headingMatch = line.match(/^(#+)\s*(.*)/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          const text = headingMatch[2];
          const fontSize = Math.max(9, 14 - level);
          const headingFont = `bold ${fontSize}px sans-serif`;
          ctx.font = headingFont;
          ctx.fillStyle = noteTitleColor;

          const wrappedHeading = wrapText(text, headingFont, maxWidth, 0);
          for (const wLine of wrappedHeading) {
            if (rowY + fontSize + 4 > maxY) break;
            ctx.fillText(wLine, marginX, rowY);
            rowY += fontSize + 4;
          }
          continue;
        }
      }

      // Bullet list support (e.g. - item or * item)
      let isBullet = false;
      let bulletIndent = 0;
      if (line.startsWith('- ') || line.startsWith('* ')) {
        isBullet = true;
        bulletIndent = 10;
        line = line.substring(2);
      }

      if (rowY + defaultLineHeight > maxY) break;

      // Strip bold markers for wrapping measurement, then render with formatting
      const plainText = line.replace(/\*\*/g, '');
      const wrappedLines = wrapText(plainText, '10px sans-serif', maxWidth, bulletIndent);

      for (let wi = 0; wi < wrappedLines.length; wi++) {
        if (rowY + defaultLineHeight > maxY) break;

        // Draw bullet dot only on first wrapped line
        if (isBullet && wi === 0) {
          ctx.beginPath();
          ctx.arc(marginX + 3, rowY + 6, 2, 0, Math.PI * 2);
          ctx.fillStyle = noteTextColor;
          ctx.fill();
        }

        // Render inline formatting (Bold: **text**) on first line,
        // plain text on continuation lines
        const currentIndent = isBullet ? bulletIndent : 0;
        if (wi === 0) {
          // Find the portion of the original line that maps to this wrapped line
          const parts = line.split(/(\*\*.*?\*\*)/g);
          let currentX = marginX + currentIndent;
          ctx.fillStyle = noteTextColor;

          parts.forEach(part => {
            if (part.startsWith('**') && part.endsWith('**')) {
              ctx.font = 'bold 9.5px sans-serif';
              const cleanPart = part.substring(2, part.length - 2);
              ctx.fillText(cleanPart, currentX, rowY);
              currentX += ctx.measureText(cleanPart).width;
            } else {
              ctx.font = '10px sans-serif';
              ctx.fillText(part, currentX, rowY);
              currentX += ctx.measureText(part).width;
            }
          });
        } else {
          ctx.font = '10px sans-serif';
          ctx.fillStyle = noteTextColor;
          ctx.fillText(wrappedLines[wi], marginX + currentIndent, rowY);
        }

        rowY += defaultLineHeight;
      }
    }

    // Draw bottom-right resize grabber lines (same style as backdrops)
    ctx.strokeStyle = isSelected ? borderColor : getTextColor(node.metadata?.custom_color).replace('0.85', '0.25').replace('0.9', '0.25');
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + width - 4, y + height - 12);
    ctx.lineTo(x + width - 12, y + height - 4);
    ctx.moveTo(x + width - 4, y + height - 8);
    ctx.lineTo(x + width - 8, y + height - 4);
    ctx.stroke();

    return;
  }

  // 3. Normal Node Rendering
  const bodyBgColor = '#1f242e'; 
  const textColor = '#ffffff'; 

  // Draw node shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;

  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fillStyle = bodyBgColor;
  ctx.fill();
  ctx.restore();

  // Draw Header Background (Clipped inside rounded rectangle)
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.clip();
  
  ctx.fillStyle = headerBgColor;
  ctx.fillRect(x, y, width, headerHeight);
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.fillRect(x, y + headerHeight - 1, width, 1);
  ctx.restore();

  // Draw border
  ctx.lineWidth = border;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  // Draw node title inside the header (centered)
  ctx.fillStyle = textColor;
  ctx.font = `bold ${editorConfig.node.fontSize}px ${editorConfig.node.font || 'sans-serif'}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(node.name, x + width / 2, y + headerHeight / 2);

  // Draw attributes
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = `${editorConfig.attr.fontSize}px ${editorConfig.attr.font || 'sans-serif'}`;

  node.attributes.forEach((attr, idx) => {
    const rowY = y + headerHeight + (idx * attrHeight) + 2; 
    
    // Alt background color
    const attrPreset = editorConfig.presets[attr.preset] || editorConfig.presets.attr_default;
    let rowBg = 'transparent'; 
    if (node.alternate && idx % 2 === 1) {
      rowBg = 'rgba(255, 255, 255, 0.02)'; 
    }

    if (rowBg !== 'transparent') {
      ctx.fillStyle = rowBg;
      ctx.fillRect(x + border, rowY, width - border * 2, attrHeight);
    }

    // Draw attribute label text
    const textMargin = 16;
    const textX = x + textMargin;
    const textY = rowY + attrHeight / 2;
    ctx.fillStyle = convertArrayToRgba(attrPreset.text);
    ctx.fillText(attr.name, textX, textY);

    const slotRadius = 5; 
    
    if (attr.socket) {
      const socketX = x;
      const socketY = rowY + attrHeight / 2;
      const socketBg = convertArrayToRgba(attrPreset.socket);
      
      ctx.beginPath();
      ctx.arc(socketX, socketY, slotRadius, 0, Math.PI * 2);
      ctx.fillStyle = socketBg;
      ctx.fill();
      ctx.strokeStyle = '#11141a';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    if (attr.plug) {
      const plugX = x + width;
      const plugY = rowY + attrHeight / 2;
      const plugBg = convertArrayToRgba(attrPreset.plug);

      ctx.beginPath();
      ctx.arc(plugX, plugY, slotRadius, 0, Math.PI * 2);
      ctx.fillStyle = plugBg;
      ctx.fill();
      ctx.strokeStyle = '#11141a';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });
}
export default drawNode;
