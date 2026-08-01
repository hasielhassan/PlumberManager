import { contentHash } from '../utils/content-hash';
import { generateHexagonBadgeSvg } from '../utils/hexagon-badge-generator';

const STORAGE_KEY = 'plumber:custom-types';

function toBase64DataUri(svgText) {
  if (!svgText) return '';
  if (svgText.startsWith('data:image/svg+xml;base64,')) return svgText;
  if (svgText.startsWith('data:image/svg+xml')) {
    // Convert utf8 data URI to base64 data URI
    try {
      const raw = decodeURIComponent(svgText.split(',')[1] || '');
      if (raw) {
        return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(raw)))}`;
      }
    } catch { /* fallback */ }
  }
  const encoded = btoa(unescape(encodeURIComponent(svgText)));
  return `data:image/svg+xml;base64,${encoded}`;
}

export class CustomTypeStore {
  constructor() {
    this.customTypes = [];
    this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          this.customTypes = parsed.map(t => {
            let iconPath = t.iconPath || '';
            // Self-heal broken/legacy static paths stored in localStorage
            if (!iconPath.startsWith('data:image/svg+xml')) {
              const svgText = t.icon || generateHexagonBadgeSvg({
                code: t.code || 'custom',
                label: (t.code || 'CUSTOM').toUpperCase(),
                color: '#10B981'
              });
              iconPath = toBase64DataUri(svgText);
            } else if (iconPath.startsWith('data:image/svg+xml;utf8,')) {
              iconPath = toBase64DataUri(iconPath);
            }

            return {
              ...t,
              code: (t.code || '').toLowerCase(),
              extensions: Array.isArray(t.extensions) ? t.extensions : [],
              iconPath
            };
          });
        } else {
          this.customTypes = [];
        }
      } else {
        this.customTypes = [];
      }
    } catch (e) {
      console.warn('Recovering from invalid custom data types in localStorage:', e);
      this.customTypes = [];
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.customTypes));
    } catch (e) {
      console.error('Failed to save custom data types to localStorage:', e);
    }
  }

  getTypes() {
    return this.customTypes;
  }

  getType(code) {
    if (!code) return null;
    return this.customTypes.find(t => t.code.toLowerCase() === code.toLowerCase());
  }

  addType(typeConfig) {
    const { code, type, extensions = [], description = '', icon = '', iconPath = '' } = typeConfig;
    const lowerCode = code.toLowerCase();
    const extArray = Array.isArray(extensions) ? extensions : [];

    const finalIconPath = toBase64DataUri(iconPath || icon || generateHexagonBadgeSvg({
      code: lowerCode,
      label: lowerCode.toUpperCase(),
      color: '#38BDF8'
    }));

    // Compute content hash based on properties to differentiate versions
    const serialized = `${lowerCode}:${type}:${extArray.join(',')}:${finalIconPath}`;
    const hash = `sha256:${contentHash(serialized)}`;

    const existingIndex = this.customTypes.findIndex(t => t.code.toLowerCase() === lowerCode);
    
    const newType = {
      code: lowerCode,
      type,
      extensions: extArray,
      description,
      icon,
      iconPath: finalIconPath,
      hash
    };

    if (existingIndex !== -1) {
      this.customTypes[existingIndex] = newType;
    } else {
      this.customTypes.push(newType);
    }

    this.save();
    return hash;
  }

  removeType(code) {
    const lowerCode = code?.toLowerCase();
    if (!lowerCode) return;
    this.customTypes = this.customTypes.filter(t => t.code.toLowerCase() !== lowerCode);
    this.save();
  }

  importTypes(typesList) {
    const results = { added: 0, skipped: 0, conflicts: 0 };
    if (!Array.isArray(typesList)) return results;

    typesList.forEach(incoming => {
      if (!incoming.code || !incoming.type) {
        results.skipped++;
        return;
      }
      
      const lowerCode = incoming.code.toLowerCase();
      const existing = this.getType(lowerCode);
      
      if (existing) {
        if (existing.hash === incoming.hash) {
          results.skipped++;
        } else {
          this.addType(incoming);
          results.conflicts++;
        }
      } else {
        this.addType(incoming);
        results.added++;
      }
    });

    return results;
  }
}

export const customTypeStore = new CustomTypeStore();
export default customTypeStore;
