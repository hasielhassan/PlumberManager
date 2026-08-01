import builtInConfig from '../../config/data-types.json';
import { customTypeStore } from './custom-type-store';
import { getAssetUrl } from '../utils/asset-path';

export class DataTypeRegistry {
  constructor() {
    this.types = new Map();
    this.extensionMap = new Map();
    this.imageCaches = new Map();
    this.dataUrlCaches = new Map();
    this.svgTextCaches = new Map();
    this.initialized = false;
    this.onLoadedListeners = new Set();

    // Populate default types & dynamic extensions from config on construction
    this.registerDefaults();
  }

  resolveCode(code) {
    if (!code) return '';
    const clean = code.toLowerCase();
    return this.extensionMap.get(clean) || clean;
  }

  registerDefaults() {
    builtInConfig.forEach(dt => {
      const primaryCode = dt.code.toLowerCase();
      const typeInfo = {
        code: dt.code,
        type: dt.type,
        extensions: dt.extensions || [],
        description: dt.description || '',
        iconPath: getAssetUrl(`/data_type_icons/${dt.code}.svg`),
        isCustom: false
      };
      this.types.set(primaryCode, typeInfo);

      if (Array.isArray(dt.extensions)) {
        dt.extensions.forEach(ext => {
          this.extensionMap.set(ext.toLowerCase(), primaryCode);
        });
      }
    });

    const customTypes = customTypeStore.getTypes();
    customTypes.forEach(ct => {
      const primaryCode = ct.code.toLowerCase();
      const iconPath = ct.iconPath || '';
      const typeInfo = {
        code: ct.code,
        type: ct.type,
        extensions: ct.extensions || [],
        description: ct.description || '',
        iconPath,
        isCustom: true,
        hash: ct.hash
      };
      this.types.set(primaryCode, typeInfo);

      if (Array.isArray(ct.extensions)) {
        ct.extensions.forEach(ext => {
          this.extensionMap.set(ext.toLowerCase(), primaryCode);
        });
      }

      if (iconPath) {
        this.loadImage(primaryCode, iconPath);
      }
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
    const cleanCode = this.resolveCode(code);
    return this.types.get(cleanCode) || null;
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
    const cleanCode = this.resolveCode(code);
    if (!cleanCode || !path) return Promise.resolve(null);

    return new Promise((resolve) => {
      if (this.imageCaches.has(cleanCode) && this.dataUrlCaches.has(cleanCode)) {
        resolve(this.imageCaches.get(cleanCode));
        return;
      }

      // If path is already a data URL (e.g. custom types with embedded icons)
      if (path.startsWith('data:')) {
        this.dataUrlCaches.set(cleanCode, path);
        try {
          if (path.includes('base64,')) {
            const base64Str = path.split('base64,')[1] || '';
            const rawSvg = atob(base64Str);
            if (rawSvg && rawSvg.includes('<svg')) {
              this.svgTextCaches.set(cleanCode, rawSvg);
            }
          } else {
            const rawSvg = decodeURIComponent(path.split(',')[1] || '');
            if (rawSvg && rawSvg.includes('<svg')) {
              this.svgTextCaches.set(cleanCode, rawSvg);
            }
          }
        } catch { /* ignore parse error */ }

        const img = new Image();
        img.src = path;
        img.onload = () => {
          this.imageCaches.set(cleanCode, img);
          this.notifyLoaded();
          resolve(img);
        };
        img.onerror = (e) => {
          console.warn(`Failed to load Data URI image for custom type ${cleanCode}:`, e);
          resolve(null);
        };
        return;
      }

      // Otherwise fetch path to create standalone Base64 Data URL for SVG export & cache HTMLImageElement
      fetch(path)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then(text => {
          this.svgTextCaches.set(cleanCode, text);
          const encoded = btoa(unescape(encodeURIComponent(text)));
          const dataUrl = `data:image/svg+xml;base64,${encoded}`;
          this.dataUrlCaches.set(cleanCode, dataUrl);

          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
            this.imageCaches.set(cleanCode, img);
            this.notifyLoaded();
            resolve(img);
          };
          img.onerror = () => {
            // Fallback: load standard image URL directly
            const fallbackImg = new Image();
            fallbackImg.src = path;
            fallbackImg.onload = () => {
              this.imageCaches.set(cleanCode, fallbackImg);
              this.notifyLoaded();
              resolve(fallbackImg);
            };
            fallbackImg.onerror = () => resolve(null);
          };
        })
        .catch(err => {
          console.warn(`Failed to fetch SVG content for ${cleanCode}:`, err);
          const fallbackImg = new Image();
          fallbackImg.src = path;
          fallbackImg.onload = () => {
            this.imageCaches.set(cleanCode, fallbackImg);
            this.notifyLoaded();
            resolve(fallbackImg);
          };
          fallbackImg.onerror = () => resolve(null);
        });
    });
  }

  getImage(code) {
    if (!code) return null;
    const cleanCode = this.resolveCode(code);
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

  getDataUrl(code) {
    if (!code) return null;
    const cleanCode = this.resolveCode(code);
    return this.dataUrlCaches.get(cleanCode) || null;
  }

  getSvgText(code) {
    if (!code) return null;
    const cleanCode = this.resolveCode(code);
    return this.svgTextCaches.get(cleanCode) || null;
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

  // Check compatibility (same-type matching with extension resolution)
  acceptsConnection(sourceType, targetType) {
    if (!sourceType || !targetType) return false;
    return this.resolveCode(sourceType) === this.resolveCode(targetType);
  }

  // Register custom type dynamically
  addCustomType(typeConfig) {
    const hash = customTypeStore.addType(typeConfig);
    const stored = customTypeStore.getType(typeConfig.code);
    const cleanCode = this.resolveCode(typeConfig.code);
    const iconPath = stored?.iconPath || typeConfig.iconPath || '';

    const typeInfo = {
      code: stored?.code || typeConfig.code,
      type: stored?.type || typeConfig.type,
      extensions: stored?.extensions || typeConfig.extensions || [],
      description: stored?.description || typeConfig.description || '',
      iconPath,
      isCustom: true,
      hash
    };
    this.types.set(cleanCode, typeInfo);

    if (Array.isArray(typeInfo.extensions)) {
      typeInfo.extensions.forEach(ext => {
        this.extensionMap.set(ext.toLowerCase(), cleanCode);
      });
    }

    if (iconPath) {
      this.loadImage(cleanCode, iconPath);
    }
    return hash;
  }

  removeCustomType(code) {
    const cleanCode = this.resolveCode(code);
    if (!cleanCode) return;

    // Remove file extensions associated with this code
    for (const [ext, primary] of this.extensionMap.entries()) {
      if (primary === cleanCode) {
        this.extensionMap.delete(ext);
      }
    }

    customTypeStore.removeType(cleanCode);
    this.types.delete(cleanCode);
    this.imageCaches.delete(cleanCode);
    this.dataUrlCaches.delete(cleanCode);
    this.svgTextCaches.delete(cleanCode);
  }
}

export const dataTypeRegistry = new DataTypeRegistry();
export default dataTypeRegistry;
