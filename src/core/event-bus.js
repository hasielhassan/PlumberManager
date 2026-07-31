export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
      if (this.listeners.get(event).size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  emit(event, payload) {
    if (this.listeners.has(event)) {
      for (const listener of this.listeners.get(event)) {
        try {
          listener(payload);
        } catch (err) {
          console.error(`Error in event listener for ${event}:`, err);
        }
      }
    }
    // Also emit to wildcard/global listeners if any
    if (this.listeners.has('*')) {
      for (const listener of this.listeners.get('*')) {
        try {
          listener({ event, payload });
        } catch (err) {
          console.error(`Error in wildcard listener:`, err);
        }
      }
    }
  }
}

export const eventBus = new EventBus();
export default eventBus;
