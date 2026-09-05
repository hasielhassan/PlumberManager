import { eventBus } from './event-bus';

export class GraphModel {
  constructor() {
    this.nodes = new Map();
    this.connections = [];
    this.listeners = new Map();
  }

  // Local subscriptions
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
    }
  }

  emit(event, payload) {
    // Emit locally
    if (this.listeners.has(event)) {
      for (const cb of this.listeners.get(event)) {
        cb(payload);
      }
    }
    // Proxy to global event bus
    eventBus.emit(event, { graph: this, ...payload });
  }

  clear() {
    this.nodes.clear();
    this.connections = [];
    this.emit('graph:cleared', {});
  }

  // Nodes API
  createNode(name, position = { x: 100, y: 100 }, preset = 'node_preset_1') {
    if (this.nodes.has(name)) {
      console.warn(`A node named "${name}" already exists.`);
      return null;
    }
    const node = {
      name,
      position,
      preset,
      alternate: true,
      attributes: [],
      metadata: {
        process_details: ''
      }
    };
    this.nodes.set(name, node);
    this.emit('node:created', { nodeName: name, node });
    return node;
  }

  deleteNode(name) {
    if (!this.nodes.has(name)) return;
    
    // Remove all associated connections
    this.connections = this.connections.filter(conn => {
      const isConnected = conn.sourceNode === name || conn.targetNode === name;
      if (isConnected) {
        this.emit('connection:deleted', { connection: conn });
      }
      return !isConnected;
    });

    const node = this.nodes.get(name);
    this.nodes.delete(name);
    this.emit('node:deleted', { nodeName: name, node });
  }

  renameNode(oldName, newName) {
    if (!this.nodes.has(oldName)) return false;
    if (this.nodes.has(newName)) {
      console.warn(`Node named "${newName}" already exists.`);
      return false;
    }
    
    const node = this.nodes.get(oldName);
    node.name = newName;
    
    this.nodes.set(newName, node);
    this.nodes.delete(oldName);

    // Update all connections referencing this node
    this.connections.forEach(conn => {
      if (conn.sourceNode === oldName) conn.sourceNode = newName;
      if (conn.targetNode === oldName) conn.targetNode = newName;
    });

    this.emit('node:renamed', { oldName, newName, node });
    return true;
  }

  moveNode(name, position) {
    if (!this.nodes.has(name)) return;
    const node = this.nodes.get(name);
    node.position = position;
    this.emit('node:moved', { nodeName: name, position });
  }

  updateNodeMetadata(name, key, value) {
    if (!this.nodes.has(name)) return;
    const node = this.nodes.get(name);
    node.metadata[key] = value;
    this.emit('node:metadata_updated', { nodeName: name, key, value });
  }

  // Attributes API (Slots)
  createAttribute(nodeName, attrConfig) {
    const node = this.nodes.get(nodeName);
    if (!node) return null;

    const {
      name,
      plug = false,
      socket = false,
      preset = plug ? 'attr_preset_2' : 'attr_preset_1',
      dataType = 'Unknown',
      connectionIcon = null,
      connectionLabel = null,
      plugMaxConnections = -1,
      socketMaxConnections = 1
    } = attrConfig;

    const isDuplicate = node.attributes.some(a => {
      if (a.name.toLowerCase() !== name.toLowerCase()) return false;
      if (socket && a.socket) return true;
      if (plug && a.plug) return true;
      if (!socket && !plug && !a.socket && !a.plug) return true;
      return false;
    });

    if (isDuplicate) {
      console.warn(`Attribute "${name}" already exists on node "${nodeName}" on the same side.`);
      return null;
    }

    const attribute = {
      name,
      plug,
      socket,
      preset,
      dataType,
      connectionIcon,
      connectionLabel,
      plugMaxConnections,
      socketMaxConnections
    };

    node.attributes.push(attribute);
    const index = node.attributes.length - 1;
    this.emit('attribute:created', { nodeName, attribute, index });
    return attribute;
  }

  deleteAttribute(nodeName, attributeName, type = null) {
    const node = this.nodes.get(nodeName);
    if (!node) return;

    let index = -1;
    if (type === 'socket' || type === 'input') {
      index = node.attributes.findIndex(a => a.name === attributeName && a.socket);
    } else if (type === 'plug' || type === 'output') {
      index = node.attributes.findIndex(a => a.name === attributeName && a.plug);
    }
    if (index === -1) {
      index = node.attributes.findIndex(a => a.name === attributeName);
    }
    if (index === -1) return;

    const attribute = node.attributes[index];

    // Delete any connections associated with this attribute on its specific side
    this.connections = this.connections.filter(conn => {
      const isMatch = (attribute.plug && conn.sourceNode === nodeName && conn.sourceAttr === attribute.name) ||
                      (attribute.socket && conn.targetNode === nodeName && conn.targetAttr === attribute.name);
      if (isMatch) {
        this.emit('connection:deleted', { connection: conn });
      }
      return !isMatch;
    });

    node.attributes.splice(index, 1);
    this.emit('attribute:deleted', { nodeName, attribute, index });
  }

  editAttribute(nodeName, index, updatedAttr) {
    const node = this.nodes.get(nodeName);
    if (!node || !node.attributes[index]) return null;

    const oldAttr = node.attributes[index];
    const oldName = oldAttr.name;
    const newName = updatedAttr.name !== undefined ? updatedAttr.name.trim() : oldName;
    const isSocket = updatedAttr.socket !== undefined ? updatedAttr.socket : oldAttr.socket;
    const isPlug = updatedAttr.plug !== undefined ? updatedAttr.plug : oldAttr.plug;

    // Check if new name conflicts with another attribute on the same side
    if (newName && newName.toLowerCase() !== oldName.toLowerCase()) {
      const hasConflict = node.attributes.some((a, i) => {
        if (i === index) return false;
        if (a.name.toLowerCase() !== newName.toLowerCase()) return false;
        if (isSocket && a.socket) return true;
        if (isPlug && a.plug) return true;
        if (!isSocket && !isPlug && !a.socket && !a.plug) return true;
        return false;
      });

      if (hasConflict) {
        console.warn(`Attribute "${newName}" already exists on node "${nodeName}" on the same side.`);
        return null;
      }
    }

    node.attributes[index] = {
      ...oldAttr,
      ...updatedAttr,
      name: newName
    };

    // If renamed, update connection references only for the matching side
    if (newName !== oldName) {
      this.connections.forEach(conn => {
        if (oldAttr.plug && conn.sourceNode === nodeName && conn.sourceAttr === oldName) {
          conn.sourceAttr = newName;
        }
        if (oldAttr.socket && conn.targetNode === nodeName && conn.targetAttr === oldName) {
          conn.targetAttr = newName;
        }
      });
    }

    this.emit('attribute:edited', { nodeName, index, oldAttr, newAttr: node.attributes[index] });
    return node.attributes[index];
  }

  reorderAttribute(nodeName, index, direction) {
    const node = this.nodes.get(nodeName);
    if (!node) return;

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= node.attributes.length) return;

    const temp = node.attributes[index];
    node.attributes[index] = node.attributes[newIndex];
    node.attributes[newIndex] = temp;

    this.emit('attribute:reordered', { nodeName, fromIndex: index, toIndex: newIndex });
  }

  // Connections API
  createConnection(sourceNode, sourceAttr, targetNode, targetAttr) {
    // Check if connection already exists
    const exists = this.connections.some(c => 
      c.sourceNode === sourceNode && c.sourceAttr === sourceAttr &&
      c.targetNode === targetNode && c.targetAttr === targetAttr
    );
    if (exists) return null;

    // Check if node exists
    const srcNode = this.nodes.get(sourceNode);
    const tgtNode = this.nodes.get(targetNode);
    if (!srcNode || !tgtNode) return null;

    const connection = {
      sourceNode,
      sourceAttr,
      targetNode,
      targetAttr
    };

    this.connections.push(connection);
    this.emit('connection:created', { connection });
    return connection;
  }

  deleteConnection(sourceNode, sourceAttr, targetNode, targetAttr) {
    const lenBefore = this.connections.length;
    this.connections = this.connections.filter(c => {
      const isMatch = c.sourceNode === sourceNode && c.sourceAttr === sourceAttr &&
                      c.targetNode === targetNode && c.targetAttr === targetAttr;
      if (isMatch) {
        this.emit('connection:deleted', { connection: c });
      }
      return !isMatch;
    });
    return this.connections.length < lenBefore;
  }

  // Evaluate Graph for Layout (returns edges array)
  evaluateGraph() {
    return this.connections.map(c => [
      `${c.sourceNode}.${c.sourceAttr}`,
      `${c.targetNode}.${c.targetAttr}`
    ]);
  }

  // Build isolation view data for a specific node
  getIsolatedData(nodeName) {
    const node = this.nodes.get(nodeName);
    if (!node) return null;

    const isolatedData = {
      node: nodeName,
      inputs: {},
      outputs: {}
    };

    // Filter node connections
    const nodeConnections = this.connections.filter(c => 
      c.sourceNode === nodeName || c.targetNode === nodeName
    );

    // Find inputs (sockets) and their connections
    node.attributes.forEach(attr => {
      if (attr.socket) {
        const conns = nodeConnections
          .filter(c => c.targetNode === nodeName && c.targetAttr === attr.name)
          .map(c => [c.sourceNode, c.sourceAttr]);

        isolatedData.inputs[attr.name] = {
          dataType: attr.dataType,
          connectionIcon: attr.connectionIcon,
          connections: conns
        };
      }
      if (attr.plug) {
        const conns = nodeConnections
          .filter(c => c.sourceNode === nodeName && c.sourceAttr === attr.name)
          .map(c => [c.targetNode, c.targetAttr]);

        isolatedData.outputs[attr.name] = {
          dataType: attr.dataType,
          connectionIcon: attr.connectionIcon,
          connections: conns
        };
      }
    });

    return isolatedData;
  }
}
