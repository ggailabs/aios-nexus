/**
 * AIOS Nexus - IDE Adapters
 *
 * Adapters for different IDE targets
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');

// Base adapter class
class BaseAdapter {
  constructor(config) {
    this.config = config;
    this.enabled = true;
  }

  getId() {
    throw new Error('getId() must be implemented');
  }

  getName() {
    throw new Error('getName() must be implemented');
  }

  getTargetRoot() {
    throw new Error('getTargetRoot() must be implemented');
  }

  getTargetPaths() {
    throw new Error('getTargetPaths() must be implemented');
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }
}

// Claude Code Adapter
class ClaudeAdapter extends BaseAdapter {
  getId() {
    return 'claude';
  }
  getName() {
    return 'Claude Code';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.claude');
  }

  getTargetPaths() {
    return {
      main: path.join(this.config.root, '.claude', 'CLAUDE.md'),
      commands: path.join(this.config.root, '.claude', 'commands', 'AIOS', 'agents'),
      hooks: path.join(this.config.root, '.claude', 'hooks'),
      skills: path.join(this.config.root, '.claude', 'skills'),
    };
  }
}

// Cursor Adapter
class CursorAdapter extends BaseAdapter {
  getId() {
    return 'cursor';
  }
  getName() {
    return 'Cursor';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.cursor');
  }

  getTargetPaths() {
    return {
      rules: path.join(this.config.root, '.cursor', 'rules'),
      mcp: path.join(this.config.root, '.cursor', 'mcp.json'),
    };
  }
}

// Windsurf Adapter
class WindsurfAdapter extends BaseAdapter {
  getId() {
    return 'windsurf';
  }
  getName() {
    return 'Windsurf';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.windsurf');
  }

  getTargetPaths() {
    return {
      rules: path.join(this.config.root, '.windsurf', 'rules'),
      skills: path.join(this.config.root, '.windsurf', 'skills'),
      workflows: path.join(this.config.root, '.windsurf', 'workflows'),
    };
  }
}

// Codex CLI Adapter
class CodexAdapter extends BaseAdapter {
  getId() {
    return 'codex';
  }
  getName() {
    return 'Codex CLI';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.codex');
  }

  getTargetPaths() {
    return {
      agents: path.join(this.config.root, '.codex', 'agents'),
      skills: path.join(this.config.root, '.codex', 'skills'),
      agentsMd: path.join(this.config.root, 'AGENTS.md'),
    };
  }
}

// Gemini CLI Adapter
class GeminiAdapter extends BaseAdapter {
  getId() {
    return 'gemini';
  }
  getName() {
    return 'Gemini CLI';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.gemini');
  }

  getTargetPaths() {
    return {
      rules: path.join(this.config.root, '.gemini', 'rules'),
      commands: path.join(this.config.root, '.gemini', 'commands'),
      hooks: path.join(this.config.root, '.gemini', 'hooks'),
    };
  }
}

// GitHub Copilot Adapter
class CopilotAdapter extends BaseAdapter {
  getId() {
    return 'copilot';
  }
  getName() {
    return 'GitHub Copilot';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.github');
  }

  getTargetPaths() {
    return {
      instructions: path.join(this.config.root, '.github', 'copilot-instructions.md'),
    };
  }
}

// AntiGravity Adapter
class AntigravityAdapter extends BaseAdapter {
  getId() {
    return 'antigravity';
  }
  getName() {
    return 'AntiGravity';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.agent');
  }

  getTargetPaths() {
    return {
      agents: path.join(this.config.root, '.agent', 'agents'),
      skills: path.join(this.config.root, '.agent', 'skills'),
      workflows: path.join(this.config.root, '.agent', 'workflows'),
    };
  }
}

// VS Code Adapter
class VSCodeAdapter extends BaseAdapter {
  getId() {
    return 'vscode';
  }
  getName() {
    return 'VS Code';
  }

  getTargetRoot() {
    return path.join(this.config.root, '.vscode');
  }

  getTargetPaths() {
    return {
      settings: path.join(this.config.root, '.vscode', 'settings.json'),
      mcp: path.join(this.config.root, '.vscode', 'mcp.json'),
    };
  }
}

// IDE Adapters Manager
class IDEAdapters {
  constructor(config) {
    this.config = config;
    this.adapters = new Map([
      ['claude', new ClaudeAdapter(config)],
      ['cursor', new CursorAdapter(config)],
      ['windsurf', new WindsurfAdapter(config)],
      ['codex', new CodexAdapter(config)],
      ['gemini', new GeminiAdapter(config)],
      ['copilot', new CopilotAdapter(config)],
      ['antigravity', new AntigravityAdapter(config)],
      ['vscode', new VSCodeAdapter(config)],
    ]);
  }

  get(id) {
    return this.adapters.get(id);
  }

  getAll() {
    return Array.from(this.adapters.entries()).map(([id, adapter]) => ({
      id,
      name: adapter.getName(),
      enabled: adapter.isEnabled(),
      root: adapter.getTargetRoot(),
    }));
  }

  getEnabled() {
    return this.getAll().filter((a) => a.enabled);
  }
}

module.exports = {
  IDEAdapters,
  BaseAdapter,
  ClaudeAdapter,
  CursorAdapter,
  WindsurfAdapter,
  CodexAdapter,
  GeminiAdapter,
  CopilotAdapter,
  AntigravityAdapter,
  VSCodeAdapter,
};
