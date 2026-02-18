/**
 * AIOS Nexus - Workflow State Manager
 *
 * Persistent state management for workflows
 * Version: 5.0.0
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class WorkflowState {
  constructor(stateFile) {
    this.stateFile = stateFile || path.join(process.cwd(), '.ai', 'workflow-state.json');
    this.cache = null;
  }

  /**
   * Save workflow state
   */
  async save(workflow) {
    try {
      // Ensure directory exists
      await fs.ensureDir(path.dirname(this.stateFile));

      // Read existing state
      let state = await this._readState();

      // Update or add workflow
      const existingIndex = state.workflows.findIndex((w) => w.id === workflow.id);
      if (existingIndex >= 0) {
        state.workflows[existingIndex] = workflow;
      } else {
        state.workflows.push(workflow);
      }

      // Update metadata
      state.lastUpdated = new Date().toISOString();
      state.version = '5.0.0';

      // Write state
      await fs.writeJson(this.stateFile, state, { spaces: 2 });

      // Update cache
      this.cache = state;

      return true;
    } catch (error) {
      console.error(chalk.red(`Error saving workflow state: ${error.message}`));
      return false;
    }
  }

  /**
   * Load current workflow state
   */
  async load() {
    try {
      const state = await this._readState();

      // Find running workflow
      const running = state.workflows.find((w) => w.status === 'running');
      return running || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Load specific workflow by ID
   */
  async loadById(workflowId) {
    try {
      const state = await this._readState();
      return state.workflows.find((w) => w.id === workflowId) || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * List all workflows
   */
  async listAll() {
    try {
      const state = await this._readState();
      return state.workflows;
    } catch (error) {
      return [];
    }
  }

  /**
   * Delete workflow
   */
  async delete(workflowId) {
    try {
      const state = await this._readState();
      state.workflows = state.workflows.filter((w) => w.id !== workflowId);
      state.lastUpdated = new Date().toISOString();

      await fs.writeJson(this.stateFile, state, { spaces: 2 });
      this.cache = state;

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clear all completed workflows
   */
  async clearCompleted() {
    try {
      const state = await this._readState();
      const before = state.workflows.length;

      state.workflows = state.workflows.filter((w) => w.status === 'running');
      state.lastUpdated = new Date().toISOString();

      await fs.writeJson(this.stateFile, state, { spaces: 2 });
      this.cache = state;

      const cleared = before - state.workflows.length;
      return { cleared, remaining: state.workflows.length };
    } catch (error) {
      return { cleared: 0, remaining: 0 };
    }
  }

  /**
   * Get state statistics
   */
  async getStats() {
    try {
      const state = await this._readState();
      const workflows = state.workflows;

      return {
        total: workflows.length,
        running: workflows.filter((w) => w.status === 'running').length,
        completed: workflows.filter((w) => w.status === 'completed').length,
        cancelled: workflows.filter((w) => w.status === 'cancelled').length,
        byScale: {
          QUICK: workflows.filter((w) => w.scale === 'QUICK').length,
          SMALL: workflows.filter((w) => w.scale === 'SMALL').length,
          MEDIUM: workflows.filter((w) => w.scale === 'MEDIUM').length,
          LARGE: workflows.filter((w) => w.scale === 'LARGE').length,
        },
      };
    } catch (error) {
      return {
        total: 0,
        running: 0,
        completed: 0,
        cancelled: 0,
        byScale: { QUICK: 0, SMALL: 0, MEDIUM: 0, LARGE: 0 },
      };
    }
  }

  /**
   * Export state to file
   */
  async export(outputPath) {
    try {
      const state = await this._readState();
      await fs.writeJson(outputPath, state, { spaces: 2 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Import state from file
   */
  async import(inputPath) {
    try {
      const imported = await fs.readJson(inputPath);

      // Validate structure
      if (!imported.workflows || !Array.isArray(imported.workflows)) {
        throw new Error('Invalid state file structure');
      }

      // Merge with existing
      const existing = await this._readState();
      const existingIds = existing.workflows.map((w) => w.id);

      // Add only new workflows
      imported.workflows.forEach((w) => {
        if (!existingIds.includes(w.id)) {
          existing.workflows.push(w);
        }
      });

      existing.lastUpdated = new Date().toISOString();

      await fs.writeJson(this.stateFile, existing, { spaces: 2 });
      this.cache = existing;

      return { imported: imported.workflows.length };
    } catch (error) {
      return { imported: 0, error: error.message };
    }
  }

  /**
   * Read state file
   */
  async _readState() {
    // Return cache if available
    if (this.cache) {
      return this.cache;
    }

    try {
      if (await fs.pathExists(this.stateFile)) {
        this.cache = await fs.readJson(this.stateFile);
        return this.cache;
      }
    } catch (error) {
      // Ignore read errors
    }

    // Return default state
    const defaultState = {
      version: '5.0.0',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      workflows: [],
    };

    this.cache = defaultState;
    return defaultState;
  }

  /**
   * Reset state
   */
  async reset() {
    const defaultState = {
      version: '5.0.0',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      workflows: [],
    };

    await fs.writeJson(this.stateFile, defaultState, { spaces: 2 });
    this.cache = defaultState;

    return true;
  }
}

module.exports = { WorkflowState };
