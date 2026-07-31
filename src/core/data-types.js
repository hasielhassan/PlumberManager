import builtInConfig from '../../config/data-types.json';
import { customTypeStore } from './custom-type-store';

export class DataTypeRegistry {
  constructor() {
    this.types = new Map();
    this.imageCaches = new Map();
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    // Load built-in types
    builtInConfig.forEach(dt => {
      this.types.set(dt.code, {
        code: dt.code,
        type: dt.type,
        description: dt.description || '',
        iconPath: dt.path,
        isCustom: false
      });
    });

    // Load custom types from local storage store
    const customTypes = customTypeStore.getTypes();
    customTypes.forEach(ct => {
      this.types.set(ct.code, {
        code: ct.code,
        type: ct.type,
        description: ct.description || '',
        iconPath: ct.iconPath || '',
        isCustom: true,
        hash: ct.hash
      });
    });

    // Pre-load images for Canvas
    await this.preloadImages();
    this.initialized = true;
  }

  getAllTypes() {
    return Array.from(this.types.values()).sort((a, b) => a.code.localeCompare(b.code));
  }

  getType(code) {
    // If not initialized, do a sync register check
    if (!this.initialized) {
      this.initializeSync();
    }
    return this.types.get(code?.toLowerCase());
  }

  initializeSync() {
    if (this.initialized) return;
    builtInConfig.forEach(dt => {
      this.types.set(dt.code, {
        code: dt.code,
        type: dt.type,
        description: dt.description || '',
        iconPath: dt.path,
        isCustom: false
      });
    });
    const customTypes = customTypeStore.getTypes();
    customTypes.forEach(ct => {
      this.types.set(ct.code, {
        code: ct.code,
        type: ct.type,
        description: ct.description || '',
        iconPath: ct.iconPath || '',
        isCustom: true,
        hash: ct.hash
      });
    });
  }

  async preloadImages() {
    const promises = [];
    for (const [code, dt] of this.types.entries()) {
      if (dt.iconPath) {
        promises.push(this.loadImage(code, dt.iconPath));
      }
    }
    await Promise.all(promises);
  }

  loadImage(code, path) {
    return new Promise((resolve) => {
      if (this.imageCaches.has(code)) {
        resolve(this.imageCaches.get(code));
        return;
      }
      const img = new Image();
      img.src = path;
      img.onload = () => {
        this.imageCaches.set(code, img);
        resolve(img);
      };
      img.onerror = () => {
        console.warn(`Failed to load data type icon for ${code}: ${path}`);
        resolve(null);
      };
    });
  }

  getImage(code) {
    return this.imageCaches.get(code?.toLowerCase()) || null;
  }

  // Check compatibility (same-type matching)
  acceptsConnection(sourceType, targetType) {
    if (!sourceType || !targetType) return false;
    return sourceType.toLowerCase() === targetType.toLowerCase();
  }

  // Register custom type dynamically
  addCustomType(typeConfig) {
    const hash = customTypeStore.addType(typeConfig);
    this.types.set(typeConfig.code, {
      code: typeConfig.code,
      type: typeConfig.type,
      description: typeConfig.description || '',
      iconPath: typeConfig.iconPath,
      isCustom: true,
      hash
    });
    // Load image async
    this.loadImage(typeConfig.code, typeConfig.iconPath);
    return hash;
  }

  removeCustomType(code) {
    customTypeStore.removeType(code);
    this.types.delete(code);
    this.imageCaches.delete(code);
  }
}

export const dataTypeRegistry = new DataTypeRegistry();
export default dataTypeRegistry;
