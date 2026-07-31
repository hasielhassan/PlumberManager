import builtInConfig from '../../config/data-types.json';
import { customTypeStore } from './custom-type-store';
import { getAssetUrl } from '../utils/asset-path';

export class DataTypeRegistry {
  constructor() {
    this.types = new Map();
    this.imageCaches = new Map();
    this.initialized = false;
    this.onLoadedListeners = new Set();

    // Populate default types map synchronously on construction
    this.registerDefaults();
  }

  registerDefaults() {
    builtInConfig.forEach(dt => {
      this.types.set(dt.code.toLowerCase(), {
        code: dt.code,
        type: dt.type,
        description: dt.description || '',
        iconPath: getAssetUrl(`/data_type_icons/${dt.code}.svg`),
        isCustom: false
      });
    });

    const customTypes = customTypeStore.getTypes();
    customTypes.forEach(ct => {
      this.types.set(ct.code.toLowerCase(), {
        code: ct.code,
        type: ct.type,
        description: ct.description || '',
        iconPath: getAssetUrl(`/data_type_icons/${ct.code}.svg`),
        isCustom: true,
        hash: ct.hash
      });
    });
  }

  async initialize() {
    if (this.initialized) return;
    this.initialized = true;
    await this.preloadImages();
  }

  getAllTypes() {
    return Array.from(this.types.values()).sort((a, b) => a.code.localeCompare(b.code));
  }

  getType(code) {
    if (!code) return null;
    return this.types.get(code.toLowerCase()) || null;
  }

  async preloadImages() {
    const promises = [];
    for (const [code, dt] of this.types.entries()) {
      if (dt.iconPath) {
        promises.push(this.loadImage(code, dt.iconPath));
      }
    }
    await Promise.all(promises);
    this.notifyLoaded();
  }

  loadImage(code, path) {
    const cleanCode = code?.toLowerCase();
    if (!cleanCode || !path) return Promise.resolve(null);

    return new Promise((resolve) => {
      if (this.imageCaches.has(cleanCode)) {
        resolve(this.imageCaches.get(cleanCode));
        return;
      }
      const img = new Image();
      const resolvedUrl = path;
      img.src = resolvedUrl;
      img.onload = () => {
        this.imageCaches.set(cleanCode, img);
        this.notifyLoaded();
        resolve(img);
      };
      img.onerror = () => {
        console.warn(`Failed to load data type icon for ${cleanCode}: ${resolvedUrl}`);
        resolve(null);
      };
    });
  }

  getImage(code) {
    if (!code) return null;
    const cleanCode = code.toLowerCase();
    if (this.imageCaches.has(cleanCode)) {
      return this.imageCaches.get(cleanCode);
    }
    // Lazy-trigger load if not yet cached
    const typeInfo = this.types.get(cleanCode);
    if (typeInfo && typeInfo.iconPath) {
      this.loadImage(cleanCode, typeInfo.iconPath);
    }
    return null;
  }

  onLoaded(fn) {
    this.onLoadedListeners.add(fn);
    return () => this.onLoadedListeners.delete(fn);
  }

  notifyLoaded() {
    this.onLoadedListeners.forEach(fn => {
      try { fn(); } catch { /* ignore listener errors */ }
    });
  }

  // Check compatibility (same-type matching)
  acceptsConnection(sourceType, targetType) {
    if (!sourceType || !targetType) return false;
    return sourceType.toLowerCase() === targetType.toLowerCase();
  }

  // Register custom type dynamically
  addCustomType(typeConfig) {
    const hash = customTypeStore.addType(typeConfig);
    const cleanCode = typeConfig.code.toLowerCase();
    const iconPath = typeConfig.iconPath ? getAssetUrl(typeConfig.iconPath) : '';
    this.types.set(cleanCode, {
      code: typeConfig.code,
      type: typeConfig.type,
      description: typeConfig.description || '',
      iconPath,
      isCustom: true,
      hash
    });
    if (iconPath) {
      this.loadImage(cleanCode, iconPath);
    }
    return hash;
  }

  removeCustomType(code) {
    const cleanCode = code?.toLowerCase();
    if (!cleanCode) return;
    customTypeStore.removeType(cleanCode);
    this.types.delete(cleanCode);
    this.imageCaches.delete(cleanCode);
  }
}

export const dataTypeRegistry = new DataTypeRegistry();
export default dataTypeRegistry;
