import { serializeGraph, deserializeGraph } from './graph-serializer';

const AUTOSAVE_KEY = 'plumber:autosave';
const RECENT_FILES_KEY = 'plumber:recent-files';
const PREFS_KEY = 'plumber:preferences';

let autoSaveTimeout = null;

export const localStorageManager = {
  // Debounced auto-save
  autoSave(graphModel) {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    autoSaveTimeout = setTimeout(() => {
      try {
        const json = serializeGraph(graphModel);
        localStorage.setItem(AUTOSAVE_KEY, json);
      } catch (err) {
        console.error('Failed to auto-save graph to localStorage:', err);
      }
    }, 1000); // 1-second debounce
  },

  hasAutoSave() {
    return !!localStorage.getItem(AUTOSAVE_KEY);
  },

  loadAutoSave(graphModel) {
    try {
      const stored = localStorage.getItem(AUTOSAVE_KEY);
      if (stored) {
        return deserializeGraph(stored, graphModel);
      }
    } catch (err) {
      console.error('Failed to load auto-save from localStorage:', err);
    }
    return false;
  },

  clearAutoSave() {
    localStorage.removeItem(AUTOSAVE_KEY);
  },

  // Recent files list
  getRecentFiles() {
    try {
      const stored = localStorage.getItem(RECENT_FILES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addRecentFile(name, content) {
    try {
      let list = this.getRecentFiles();
      // Remove duplicates
      list = list.filter(f => f.name !== name);
      // Prepend to top
      list.unshift({
        name,
        content,
        lastOpened: Date.now()
      });
      // Limit to 5 files
      if (list.length > 5) {
        list.pop();
      }
      localStorage.setItem(RECENT_FILES_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save recent files list:', e);
    }
  },

  // User preferences
  getPreferences() {
    try {
      const stored = localStorage.getItem(PREFS_KEY);
      const defaults = {
        theme: 'dark',
        panelWidth: 360,
        minimapEnabled: true,
        autoRelayout: true,
        hasCompletedTour: false
      };
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return {
        theme: 'dark',
        panelWidth: 360,
        minimapEnabled: true,
        autoRelayout: true,
        hasCompletedTour: false
      };
    }
  },

  savePreferences(prefs) {
    try {
      const current = this.getPreferences();
      localStorage.setItem(PREFS_KEY, JSON.stringify({ ...current, ...prefs }));
    } catch (e) {
      console.error('Failed to save preferences:', e);
    }
  }
};

export default localStorageManager;
