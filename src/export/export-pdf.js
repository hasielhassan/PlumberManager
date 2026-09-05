import { renderGraphToCanvas } from './export-png';
import { layoutGraph } from '../core/graph-layout';
import { buildIsolatedGraph } from '../core/isolation-builder';
import { getParentBackdropName } from '../core/graph-topology';
import { generateSvgString } from './export-svg';
import editorConfig from '../../config/editor-config.json';

/** Kahn's algorithm over one group of nodes, restricted to connections within that group. */
function sortGroupTopologically(graphModel, nodes) {
  const names = new Set(nodes.map(n => n.name));
  const adj = {};
  const inDegree = {};
  nodes.forEach(node => {
    adj[node.name] = [];
    inDegree[node.name] = 0;
  });

  graphModel.connections.forEach(conn => {
    if (names.has(conn.sourceNode) && names.has(conn.targetNode)) {
      adj[conn.sourceNode].push(conn.targetNode);
      inDegree[conn.targetNode]++;
    }
  });

  const queue = nodes.filter(n => inDegree[n.name] === 0).map(n => n.name);
  const orderedNames = [];
  while (queue.length > 0) {
    queue.sort(); // stable/deterministic tie-breaker
    const u = queue.shift();
    orderedNames.push(u);
    adj[u].forEach(v => {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    });
  }

  // Append any cycle or disconnected nodes to be safe
  const remaining = nodes.filter(n => !orderedNames.includes(n.name)).map(n => n.name);
  orderedNames.push(...remaining);

  return orderedNames.map(name => graphModel.nodes.get(name));
}

/**
 * Orders process nodes for the per-node PDF pages, grouped by parent
 * backdrop first (nodes with no backdrop form a leading, ungrouped section)
 * so pages read as coherent department-by-department sections instead of a
 * single flat topological order that ignores backdrop grouping.
 */
function topologicalSort(graphModel) {
  const processNodes = Array.from(graphModel.nodes.values()).filter(node =>
    node.preset !== 'node_preset_note' && node.preset !== 'node_preset_backdrop'
  );

  const groups = new Map(); // parent backdrop name, or null for ungrouped -> nodes[]
  processNodes.forEach(node => {
    const parent = getParentBackdropName(node.name, graphModel);
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(node);
  });

  const ordered = [];
  if (groups.has(null)) {
    ordered.push(...sortGroupTopologically(graphModel, groups.get(null)));
  }
  for (const [parent, nodes] of groups.entries()) {
    if (parent === null) continue;
    ordered.push(...sortGroupTopologically(graphModel, nodes));
  }
  return ordered;
}

function renderMarkdownToPdf(doc, tokens, startX, startY, maxWidth, pageHeight, addPage) {
  let currentY = startY;
  const maxY = pageHeight - 20; // 20mm margin at bottom

  const ensureSpace = (h) => {
    if (currentY + h > maxY) {
      currentY = addPage();
    }
  };

  const getInlineTokens = (token) => {
    if (token.tokens) {
      let inlineTokens = [];
      for (const child of token.tokens) {
        if ((child.type === 'text' || child.type === 'paragraph') && child.tokens) {
          inlineTokens.push(...child.tokens);
        } else {
          inlineTokens.push(child);
        }
      }
      return inlineTokens;
    }
    return [{ type: 'text', text: token.text || '' }];
  };

  const drawInlineBlock = (inlineTokens, indentX = 0, fontSize = 10) => {
    const activeWidth = maxWidth - indentX;
    const actualStartX = startX + indentX;
    
    const chunks = [];
    for (const subToken of inlineTokens) {
      let style = 'normal';
      let font = 'helvetica';
      let color = [74, 85, 104];
      let isCode = false;
      
      if (subToken.type === 'strong') {
        style = 'bold';
      } else if (subToken.type === 'em') {
        style = 'italic';
      } else if (subToken.type === 'codespan') {
        style = 'normal';
        font = 'courier';
        color = [199, 37, 78];
        isCode = true;
      }
      
      const text = subToken.text || subToken.raw || '';
      const parts = text.split(/(\s+)/);
      for (const part of parts) {
        if (!part) continue;
        chunks.push({
          text: part,
          style,
          font,
          color,
          isCode
        });
      }
    }
    
    const lines = [];
    let currentLine = [];
    let currentLineWidth = 0;
    
    for (const chunk of chunks) {
      doc.setFont(chunk.font, chunk.style);
      doc.setFontSize(fontSize);
      const chunkWidth = doc.getTextWidth(chunk.text);
      
      if (currentLineWidth === 0 && chunk.text.trim() === '') {
        continue;
      }
      
      if (currentLineWidth + chunkWidth > activeWidth) {
        if (currentLineWidth > 0) {
          lines.push(currentLine);
          currentLine = [];
          currentLineWidth = 0;
          if (chunk.text.trim() === '') {
            continue;
          }
        }
        
        doc.setFont(chunk.font, chunk.style);
        doc.setFontSize(fontSize);
        const newWidth = doc.getTextWidth(chunk.text);
        currentLine.push({ ...chunk, width: newWidth });
        currentLineWidth = newWidth;
      } else {
        currentLine.push({ ...chunk, width: chunkWidth });
        currentLineWidth += chunkWidth;
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    
    const lineHeight = fontSize * 0.45;
    for (const line of lines) {
      ensureSpace(lineHeight);
      
      let currentX = actualStartX;
      for (const chunk of line) {
        doc.setFont(chunk.font, chunk.style);
        doc.setFontSize(fontSize);
        doc.setTextColor(chunk.color[0], chunk.color[1], chunk.color[2]);
        
        if (chunk.isCode) {
          doc.setFillColor(242, 242, 242);
          const rectHeight = fontSize * 0.3527 + 0.8;
          doc.rect(currentX, currentY + 0.2, chunk.width, rectHeight, 'F');
        }
        
        doc.text(chunk.text, currentX, currentY, { baseline: 'top' });
        currentX += chunk.width;
      }
      currentY += lineHeight;
    }
  };

  for (const token of tokens) {
    if (token.type === 'space') {
      currentY += 4;
      continue;
    }
    
    if (token.type === 'heading') {
      const level = token.depth;
      const headingFontSize = Math.max(10, 18 - level * 2);
      const headingLineHeight = headingFontSize * 0.5;
      
      ensureSpace(headingLineHeight + 4);
      currentY += 2;
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(45, 55, 72);
      
      const inlineTokens = token.tokens || [{ type: 'text', text: token.text || '' }];
      drawInlineBlock(inlineTokens, 0, headingFontSize);
      
      currentY += 2;
      continue;
    }
    
    if (token.type === 'paragraph') {
      const inlineTokens = token.tokens || [{ type: 'text', text: token.text || '' }];
      drawInlineBlock(inlineTokens, 0, 10);
      currentY += 3;
      continue;
    }
    
    if (token.type === 'list') {
      let itemIdx = 1;
      for (const item of token.items) {
        ensureSpace(6);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(74, 85, 104);
        
        let prefix = '•';
        if (token.ordered) {
          prefix = `${itemIdx}.`;
          itemIdx++;
        }
        
        doc.text(prefix, startX + 3, currentY, { baseline: 'top' });
        
        const inlineTokens = getInlineTokens(item);
        drawInlineBlock(inlineTokens, 8, 10);
        currentY += 2;
      }
      currentY += 2;
      continue;
    }

    if (token.type === 'code') {
      const codeText = token.text || '';
      doc.setFont('courier', 'normal');
      doc.setFontSize(9);
      const codeLines = doc.splitTextToSize(codeText, maxWidth - 8);
      const codeBlockHeight = codeLines.length * 4.5 + 4;
      
      ensureSpace(codeBlockHeight);
      doc.setFillColor(242, 242, 242);
      doc.rect(startX, currentY, maxWidth, codeBlockHeight, 'F');
      
      doc.setTextColor(199, 37, 78);
      let codeY = currentY + 2;
      for (const line of codeLines) {
        doc.text(line, startX + 4, codeY, { baseline: 'top' });
        codeY += 4.5;
      }
      currentY += codeBlockHeight + 4;
      continue;
    }

    if (token.type === 'hr') {
      ensureSpace(4);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(startX, currentY + 2, startX + maxWidth, currentY + 2);
      currentY += 4;
      continue;
    }
    
    if (token.text) {
      ensureSpace(5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(74, 85, 104);
      doc.text(token.text, startX, currentY, { baseline: 'top' });
      currentY += 5;
    }
  }
  
  return currentY;
}

export async function exportPdf(graphModel, fileName = 'pipeline-documentation.pdf', includeBackground = true, options = {}) {
  if (graphModel.nodes.size === 0) return;

  const {
    pdfMode = 'vector',
    compressPdf = true,
    quality = 0.8,
    title = 'CG Pipeline Diagram',
    subtitle = 'Interactive Data Flow Documentation',
    includeBackdropPages = false
  } = options;

  // Dynamically load heavy pdf and markdown dependencies
  const { jsPDF } = await import('jspdf');
  const { marked } = await import('marked');
  await import('svg2pdf.js');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: compressPdf
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 1. Cover Page
  doc.setFillColor(30, 34, 43); // Dark theme cover bg
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(title, pageWidth / 2, 60, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(160, 174, 192);
  doc.text(subtitle, pageWidth / 2, 70, { align: 'center' });

  // Add full diagram render to the cover
  if (pdfMode === 'vector') {
    const fullGraphSvg = generateSvgString(graphModel, includeBackground);
    if (fullGraphSvg) {
      try {
        const fullSvgDoc = new DOMParser().parseFromString(fullGraphSvg, 'image/svg+xml');
        const fullSvgElement = fullSvgDoc.documentElement;
        const svgW = parseFloat(fullSvgElement.getAttribute('width') || 800);
        const svgH = parseFloat(fullSvgElement.getAttribute('height') || 600);
        
        const maxW = pageWidth - 40;
        const maxH = 100;
        const ratio = svgW / svgH;
        let w = maxW;
        let h = w / ratio;
        if (h > maxH) {
          h = maxH;
          w = h * ratio;
        }
        
        await doc.svg(fullSvgElement, {
          x: (pageWidth - w) / 2,
          y: 90,
          width: w,
          height: h
        });
      } catch (e) {
        console.warn('Failed to render cover page SVG to PDF:', e);
      }
    }
  } else {
    // Raster mode
    const bg = includeBackground ? '#1a202c' : '#ffffff';
    const fullGraphResult = renderGraphToCanvas(graphModel, 2, bg);
    if (fullGraphResult) {
      try {
        const format = compressPdf ? 'JPEG' : 'PNG';
        const fullGraphImg = fullGraphResult.canvas.toDataURL(compressPdf ? 'image/jpeg' : 'image/png', quality);
        const maxW = pageWidth - 40;
        const maxH = 100;
        
        const ratio = fullGraphResult.width / fullGraphResult.height;
        let w = maxW;
        let h = w / ratio;
        if (h > maxH) {
          h = maxH;
          w = h * ratio;
        }
        
        doc.addImage(fullGraphImg, format, (pageWidth - w) / 2, 90, w, h, undefined, compressPdf ? 'FAST' : undefined);
      } catch (e) {
        console.warn('Failed to embed full graph image in PDF cover page:', e);
      }
    }
  }

  // Footer on cover page
  doc.setFontSize(10);
  doc.setTextColor(113, 128, 150);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 30, { align: 'center' });
  doc.text('Made with Plumber Manager', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // 1.5 Optional Backdrop Group Pages
  const backdrops = Array.from(graphModel.nodes.values()).filter(n => n.preset === 'node_preset_backdrop');
  if (includeBackdropPages && backdrops.length > 0) {
    for (let bdIdx = 0; bdIdx < backdrops.length; bdIdx++) {
      const bdNode = backdrops[bdIdx];
      doc.addPage();
      
      let pageNum = bdIdx + 2;
      
      const drawBackdropHeader = () => {
        doc.setFillColor(45, 55, 72);
        doc.rect(0, 0, pageWidth, 25, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(bdNode.name, 15, 17);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(226, 232, 240);
        doc.text(`Group details [Page ${pageNum}]`, pageWidth - 45, 15);
      };

      drawBackdropHeader();

      const addPdfPage = () => {
        doc.addPage();
        pageNum++;
        drawBackdropHeader();
        return 40;
      };

      let currentY = 40;

      // Isolated graph for only nodes inside this backdrop, freshly laid out
      // for a clean print page (unlike the interactive Isolate View, which
      // preserves each node's canvas position).
      const isoG = buildIsolatedGraph(graphModel, bdNode.name);
      if (isoG) {
        layoutGraph(isoG, {
          animate: false,
          nodesep: editorConfig.layout.isolation.nodesep,
          ranksep: editorConfig.layout.isolation.ranksep
        });
      }

      if (isoG && pdfMode === 'vector') {
        const isoSvgString = generateSvgString(isoG, includeBackground);
        if (isoSvgString) {
          try {
            const isoSvgDoc = new DOMParser().parseFromString(isoSvgString, 'image/svg+xml');
            const isoSvgElement = isoSvgDoc.documentElement;
            const isoSvgW = parseFloat(isoSvgElement.getAttribute('width') || 400);
            const isoSvgH = parseFloat(isoSvgElement.getAttribute('height') || 300);

            const maxW = pageWidth - 30;
            const maxH = 100;
            const ratio = isoSvgW / isoSvgH;
            let w = maxW;
            let h = w / ratio;
            if (h > maxH) {
              h = maxH;
              w = h * ratio;
            }

            await doc.svg(isoSvgElement, {
              x: (pageWidth - w) / 2,
              y: currentY,
              width: w,
              height: h
            });
            currentY += h + 15;
          } catch (e) {
            console.warn('Failed to render backdrop SVG subgraph to PDF:', e);
          }
        }
      } else if (isoG) {
        const bg = includeBackground ? '#2d3748' : '#ffffff';
        const isoResult = renderGraphToCanvas(isoG, 2, bg);
        if (isoResult) {
          try {
            const format = compressPdf ? 'JPEG' : 'PNG';
            const isoImg = isoResult.canvas.toDataURL(compressPdf ? 'image/jpeg' : 'image/png', quality);
            const maxW = pageWidth - 30;
            const maxH = 100;
            const ratio = isoResult.width / isoResult.height;
            let w = maxW;
            let h = w / ratio;
            if (h > maxH) {
              h = maxH;
              w = h * ratio;
            }
            doc.addImage(isoImg, format, (pageWidth - w) / 2, currentY, w, h, undefined, compressPdf ? 'FAST' : undefined);
            currentY += h + 15;
          } catch (e) {
            console.warn('Failed to render backdrop subgraph to PDF:', e);
          }
        }
      }

      // Group description text
      doc.setTextColor(45, 55, 72);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Group Description:', 15, currentY);
      currentY += 6;

      const detailsRaw = bdNode.metadata?.process_details || '';
      const details = detailsRaw.replace(/<br\s*\/?>/gi, '\n');
      const tokens = marked.lexer(details || 'No group description provided.');
      currentY = renderMarkdownToPdf(doc, tokens, 15, currentY, pageWidth - 30, pageHeight, addPdfPage);
    }
  }

  // 2. Details Page for each Process Node (ordered topologically)
  const processNodes = topologicalSort(graphModel);
  const startPageNum = 1 + (includeBackdropPages ? backdrops.length : 0) + 1;

  for (let nodeIdx = 0; nodeIdx < processNodes.length; nodeIdx++) {
    const node = processNodes[nodeIdx];
    doc.addPage();
    
    let pageNum = startPageNum + nodeIdx;
    
    // Draw header function for subsequent page overflows
    const drawPageHeader = () => {
      doc.setFillColor(45, 55, 72);
      doc.rect(0, 0, pageWidth, 25, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(node.name, 15, 17);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(226, 232, 240);
      doc.text(`Process details [Page ${pageNum}]`, pageWidth - 45, 15);
    };

    drawPageHeader();

    const addPdfPage = () => {
      doc.addPage();
      pageNum++;
      drawPageHeader();
      return 40; // New Y start coordinate
    };

    let currentY = 40;

    // Isolated graph for this node + its direct connections and any linked
    // note - metadata (custom colors, note text, sizes) included, matching
    // the interactive Isolate View exactly.
    const isoG = buildIsolatedGraph(graphModel, node.name);
    if (isoG) {
      if (pdfMode === 'vector') {
        const isoSvgString = generateSvgString(isoG, includeBackground);
        if (isoSvgString) {
          try {
            const isoSvgDoc = new DOMParser().parseFromString(isoSvgString, 'image/svg+xml');
            const isoSvgElement = isoSvgDoc.documentElement;
            const isoSvgW = parseFloat(isoSvgElement.getAttribute('width') || 400);
            const isoSvgH = parseFloat(isoSvgElement.getAttribute('height') || 300);
            
            const maxW = pageWidth - 30;
            const maxH = 100;
            const ratio = isoSvgW / isoSvgH;
            let w = maxW;
            let h = w / ratio;
            if (h > maxH) {
              h = maxH;
              w = h * ratio;
            }
            
            await doc.svg(isoSvgElement, {
              x: (pageWidth - w) / 2,
              y: currentY,
              width: w,
              height: h
            });
            currentY += h + 15;
          } catch (e) {
            console.warn('Failed to render isolated SVG subgraph to PDF:', e);
          }
        }
      } else {
        // Raster Mode
        const bg = includeBackground ? '#2d3748' : '#ffffff';
        const isoResult = renderGraphToCanvas(isoG, 2, bg);
        if (isoResult) {
          try {
            const format = compressPdf ? 'JPEG' : 'PNG';
            const isoImg = isoResult.canvas.toDataURL(compressPdf ? 'image/jpeg' : 'image/png', quality);
            const maxW = pageWidth - 30;
            const maxH = 100;
            const ratio = isoResult.width / isoResult.height;
            let w = maxW;
            let h = w / ratio;
            if (h > maxH) {
              h = maxH;
              w = h * ratio;
            }
            doc.addImage(isoImg, format, (pageWidth - w) / 2, currentY, w, h, undefined, compressPdf ? 'FAST' : undefined);
            currentY += h + 15;
          } catch (e) {
            console.warn('Failed to render isolated subgraph to PDF:', e);
          }
        }
      }
    }

    // Process details description text
    doc.setTextColor(45, 55, 72);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Process Description:', 15, currentY);
    currentY += 6;

    const detailsRaw = node.metadata?.process_details || 'No description provided for this process node.';
    const details = detailsRaw.replace(/<br\s*\/?>/gi, '\n');
    const tokens = marked.lexer(details);
    
    // Render the parsed markdown onto PDF
    currentY = renderMarkdownToPdf(doc, tokens, 15, currentY, pageWidth - 30, pageHeight, addPdfPage);
    currentY += 10;

    // Inputs/Outputs slot tables listing
    if (currentY + 20 > pageHeight - 20) {
      currentY = addPdfPage();
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(45, 55, 72);
    doc.text('Format Interfaces:', 15, currentY);
    currentY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(74, 85, 104);
    
    const inputs = node.attributes.filter(a => a.socket).map(a => `${a.name} (${a.dataType.toUpperCase()})`);
    const outputs = node.attributes.filter(a => a.plug).map(a => `${a.name} (${a.dataType.toUpperCase()})`);

    doc.text(`Inputs: ${inputs.join(', ') || 'None'}`, 15, currentY);
    currentY += 6;
    doc.text(`Outputs: ${outputs.join(', ') || 'None'}`, 15, currentY);
  }

  // Save the generated document
  doc.save(fileName);
}

export default exportPdf;
