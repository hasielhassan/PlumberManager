/**
 * Abstract helper to generate a 100% W3C compliant, 6-sided symmetric hexagonal vector badge SVG string.
 * Automatically parses, scales, and aligns any user-pasted SVG markup or raw paths.
 *
 * @param {Object} params
 * @param {string} params.code - Format code (e.g. "hhaz")
 * @param {string} [params.label] - Text label (e.g. "HHAZ")
 * @param {string} [params.color] - Hex stroke / accent color (e.g. "#F43F5E")
 * @param {string} [params.logoXml] - Raw SVG code or path elements
 * @returns {string} SVG XML string
 */
export function generateHexagonBadgeSvg({ code = 'custom', label = '', color = '#38BDF8', logoXml = '' }) {
  const cleanCode = (code || 'custom').toLowerCase().replace(/[^a-z0-9-_]/g, '_');
  const cleanLabel = (label || code || 'FORMAT').toUpperCase();

  let fontSize = "7.2";
  let letterSpacing = "0.5";
  if (cleanLabel.length <= 3) {
    fontSize = "9.0";
    letterSpacing = "0.4";
  } else if (cleanLabel.length === 4) {
    fontSize = "8.2";
    letterSpacing = "0.5";
  } else if (cleanLabel.length <= 7) {
    fontSize = "7.2";
    letterSpacing = "0.5";
  } else {
    fontSize = "6.5";
    letterSpacing = "0.6";
  }

  let raw = (logoXml || '').trim();
  let processedLogoXml = '';

  if (!raw) {
    // Default emblem logo: sleek circle badge matching theme color
    processedLogoXml = `<circle cx="32" cy="25.5" r="7" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="1.8"/>`;
  } else {
    let vx = 0, vy = 0, vw = 24, vh = 24;
    let innerContent = raw;

    // Check if full <svg ...> tag is provided
    const svgMatch = raw.match(/<svg([^>]*)>(.*)<\/svg>/is);
    if (svgMatch) {
      const attrs = svgMatch[1];
      innerContent = svgMatch[2];

      const vbMatch = attrs.match(/viewBox=["']([^"']+)["']/i);
      if (vbMatch) {
        const parts = vbMatch[1].trim().split(/[\s,]+/).map(Number);
        if (parts.length === 4 && !parts.some(isNaN)) {
          [vx, vy, vw, vh] = parts;
        }
      } else {
        const wMatch = attrs.match(/width=["']([^"']+)["']/i);
        const hMatch = attrs.match(/height=["']([^"']+)["']/i);
        if (wMatch && hMatch) {
          vw = parseFloat(wMatch[1]) || 24;
          vh = parseFloat(hMatch[1]) || 24;
        }
      }
    } else if (!raw.startsWith('<')) {
      // Raw d="..." path string
      innerContent = `<path d="${raw}"/>`;
    }

    const origW = vw > 0 ? vw : 24;
    const origH = vh > 0 ? vh : 24;

    // Target bounding box inside hexagon: centered at x=32, y=25.5, max width 23, max height 22
    const scale = Math.min(23.0 / origW, 22.0 / origH);
    const tx = (32 - (origW * scale) / 2) - (vx * scale);
    const ty = (25.5 - (origH * scale) / 2) - (vy * scale);

    // Replace stroke="currentColor" or fill="currentColor" with theme color
    innerContent = innerContent
      .replace(/stroke=["']currentColor["']/gi, `stroke="${color}"`)
      .replace(/fill=["']currentColor["']/gi, `fill="${color}"`);

    // Check if original SVG specifies fill or stroke attributes
    const hasStroke = raw.includes('stroke=');
    const fillAttr = hasStroke && !raw.includes('fill="') ? 'fill="none"' : '';
    const strokeAttr = hasStroke ? `stroke="${color}"` : '';

    processedLogoXml = `<g transform="translate(${tx.toFixed(2)}, ${ty.toFixed(2)}) scale(${scale.toFixed(4)})" ${fillAttr} ${strokeAttr}>${innerContent}</g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-${cleanCode}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-${cleanCode}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-${cleanCode})" 
    stroke="${color}" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-${cleanCode})"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  ${processedLogoXml}

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="${fontSize}" 
    font-weight="700" 
    letter-spacing="${letterSpacing}"
  >${cleanLabel}</text>
</svg>`;
}

export default generateHexagonBadgeSvg;
