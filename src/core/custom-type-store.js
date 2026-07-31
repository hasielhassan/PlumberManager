import { contentHash } from '../utils/content-hash';

const STORAGE_KEY = 'plumber:custom-types';

export class CustomTypeStore {
  constructor() {
    this.customTypes = [];
    this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.customTypes = JSON.parse(stored);
      } else {
        this.customTypes = [];
      }
    } catch (e) {
      console.error('Failed to load custom data types from localStorage:', e);
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
    return this.customTypes.find(t => t.code.toLowerCase() === code.toLowerCase());
  }

  addType(typeConfig) {
    const { code, type, description = '', icon = '', iconPath = '' } = typeConfig;
    const lowerCode = code.toLowerCase();

    // Compute content hash based on properties to differentiate versions
    const serialized = `${lowerCode}:${type}:${icon}:${iconPath}`;
    const hash = `sha256:${contentHash(serialized)}`;

    // Remove existing if it has the same code
    const existingIndex = this.customTypes.findIndex(t => t.code.toLowerCase() === lowerCode);
    
    const newType = {
      code: lowerCode,
      type,
      description,
      icon,
      iconPath: iconPath || (icon ? `data:image/svg+xml;utf8,${encodeURIComponent(icon)}` : ''),
      hash
    };

    if (existingIndex !== -1) {
      // Replace
      this.customTypes[existingIndex] = newType;
    } else {
      this.customTypes.push(newType);
    }

    this.save();
    return hash;
  }

  removeType(code) {
    const lowerCode = code.toLowerCase();
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
          // Exactly the same, skip
          results.skipped++;
        } else {
          // Different hash, conflict!
          // Auto resolve by replacing or keeping latest (here we replace)
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
