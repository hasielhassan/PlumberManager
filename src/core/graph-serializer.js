import { dataTypeRegistry } from './data-types';

export function serializeGraph(graphModel) {
  const data = {
    NODES: {},
    CONNECTIONS: [],
    CUSTOM_TYPES: []
  };

  // 1. Serialize Nodes
  for (const [name, node] of graphModel.nodes.entries()) {
    const serializedAttributes = node.attributes.map(attr => {
      // Return a clean representation
      const attrData = {
        name: attr.name,
        plug: attr.plug,
        socket: attr.socket,
        preset: attr.preset,
        dataType: attr.dataType,
        connectionIcon: attr.connectionIcon,
        connectionLabel: attr.connectionLabel,
        plugMaxConnections: attr.plugMaxConnections,
        socketMaxConnections: attr.socketMaxConnections
      };
      return attrData;
    });

    data.NODES[name] = {
      preset: node.preset || 'node_preset_1',
      position: [node.position.x, node.position.y],
      alternate: node.alternate !== undefined ? node.alternate : true,
      attributes: serializedAttributes,
      metadata: node.metadata || { process_details: '' }
    };
  }

  // 2. Serialize Connections
  data.CONNECTIONS = graphModel.connections.map(c => [
    `${c.sourceNode}.${c.sourceAttr}`,
    `${c.targetNode}.${c.targetAttr}`
  ]);

  // 3. Serialize custom data types to embed them
  const allTypes = dataTypeRegistry.getAllTypes();
  const customTypes = allTypes.filter(t => t.isCustom);
  data.CUSTOM_TYPES = customTypes.map(ct => ({
    code: ct.code,
    type: ct.type,
    description: ct.description,
    iconPath: ct.iconPath,
    hash: ct.hash
  }));

  return JSON.stringify(data, null, 4);
}

export function deserializeGraph(jsonString, graphModel) {
  try {
    const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    
    graphModel.clear();

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid graph file format.');
    }

    // 1. Load Custom Types if embedded
    if (data.CUSTOM_TYPES && Array.isArray(data.CUSTOM_TYPES)) {
      data.CUSTOM_TYPES.forEach(ct => {
        dataTypeRegistry.addCustomType(ct);
      });
    }

    // 2. Re-create Nodes
    const nodesData = data.NODES || {};
    for (const [name, nodeData] of Object.entries(nodesData)) {
      const pos = nodeData.position || [100, 100];
      const position = { x: pos[0], y: pos[1] };
      const preset = nodeData.preset || 'node_preset_1';
      
      const node = graphModel.createNode(name, position, preset);
      if (node) {
        node.alternate = nodeData.alternate !== undefined ? nodeData.alternate : true;
        node.metadata = nodeData.metadata || { process_details: '' };

        // Attributes
        const attrs = nodeData.attributes || [];
        attrs.forEach(attrData => {
          // Parse Python legacy class type string if present
          let cleanType = attrData.dataType || 'Unknown';
          if (typeof cleanType === 'string' && cleanType.includes("<class '")) {
            const matches = cleanType.match(/<class '__main__\.(\w+)'>/);
            if (matches && matches[1]) {
              cleanType = matches[1].toLowerCase();
            } else {
              // Extract whatever is inside single quotes
              const quotes = cleanType.match(/'([^']+)'/);
              if (quotes && quotes[1]) {
                const parts = quotes[1].split('.');
                cleanType = parts[parts.length - 1].toLowerCase();
              }
            }
          } else if (typeof cleanType === 'string') {
            cleanType = cleanType.toLowerCase();
          }

          graphModel.createAttribute(name, {
            name: attrData.name,
            plug: attrData.plug !== undefined ? attrData.plug : true,
            socket: attrData.socket !== undefined ? attrData.socket : true,
            preset: attrData.preset || (attrData.plug ? 'attr_preset_2' : 'attr_preset_1'),
            dataType: cleanType,
            connectionIcon: attrData.connectionIcon || null,
            connectionLabel: attrData.connectionLabel || null,
            plugMaxConnections: attrData.plugMaxConnections !== undefined ? attrData.plugMaxConnections : -1,
            socketMaxConnections: attrData.socketMaxConnections !== undefined ? attrData.socketMaxConnections : 1
          });
        });
      }
    }

    // 3. Re-create Connections
    const connectionsData = data.CONNECTIONS || [];
    connectionsData.forEach(conn => {
      const source = conn[0];
      const target = conn[1];
      if (source && target) {
        const [sourceNode, sourceAttr] = source.split('.');
        const [targetNode, targetAttr] = target.split('.');
        if (sourceNode && sourceAttr && targetNode && targetAttr) {
          graphModel.createConnection(sourceNode, sourceAttr, targetNode, targetAttr);
        }
      }
    });

    graphModel.emit('node:moved', {});
    graphModel.emit('graph:loaded', {});
    return true;
  } catch (err) {
    console.error('Failed to parse graph JSON:', err);
    return false;
  }
}
