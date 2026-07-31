import { serializeGraph, deserializeGraph } from './graph-serializer';

export class SnapshotCommand {
  constructor(graphModel, label = '') {
    this.graphModel = graphModel;
    this.label = label;
    this.beforeState = serializeGraph(graphModel);
    this.afterState = null;
  }

  saveAfter() {
    this.afterState = serializeGraph(this.graphModel);
  }

  do() {
    if (this.afterState) {
      deserializeGraph(this.afterState, this.graphModel);
    }
  }

  undo() {
    if (this.beforeState) {
      deserializeGraph(this.beforeState, this.graphModel);
    }
  }
}

export class CommandHistory {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
    this.maxSize = 50;
  }

  execute(command) {
    // If it's a SnapshotCommand, assume the action already happened and we just push it
    if (command instanceof SnapshotCommand && !command.afterState) {
      command.saveAfter();
    }
    
    this.undoStack.push(command);
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  undo() {
    if (this.undoStack.length === 0) return;
    const command = this.undoStack.pop();
    command.undo();
    this.redoStack.push(command);
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const command = this.redoStack.pop();
    command.do();
    this.undoStack.push(command);
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}

export const commandHistory = new CommandHistory();
export default commandHistory;
