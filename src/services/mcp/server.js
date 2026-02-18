/**
 * AIOS Nexus - MCP Server
 *
 * Model Context Protocol Server Implementation
 * Version: 5.0.0
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const { Server } = require('@modelcontextprotocol/sdk/server');

const sdkServerPath = require.resolve('@modelcontextprotocol/sdk/server');
const sdkDir = sdkServerPath.split('/dist/')[0];
const stdioPath = path.join(sdkDir, 'dist/cjs/server/stdio.js');
const { StdioServerTransport } = require(stdioPath);

const { registerTools } = require('./tools-server');
const { registerResources } = require('./resources-server');
const { registerPrompts } = require('./prompts-server');

class AIOSMCPServer {
  constructor(config = {}) {
    this.config = {
      name: config.name || 'aios-nexus',
      version: config.version || '5.0.0',
      contextRoot: config.contextRoot || path.join(process.cwd(), '.context'),
      aiosRoot: config.aiosRoot || path.join(process.cwd(), '.aios-core'),
      ...config,
    };

    this.server = new Server(
      { name: this.config.name, version: this.config.version },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {},
        },
      }
    );

    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error(chalk.red('[MCP Error]'), error.message);
    };

    process.on('SIGINT', async () => {
      await this.shutdown();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.shutdown();
      process.exit(0);
    });
  }

  async initialize() {
    registerTools(this.server, this.config);
    registerResources(this.server, this.config);
    registerPrompts(this.server, this.config);

    console.error(chalk.gray('[MCP] Tools registered'));
    console.error(chalk.gray('[MCP] Resources registered'));
    console.error(chalk.gray('[MCP] Prompts registered'));
  }

  async start() {
    await this.initialize();

    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error(chalk.green('[MCP] AIOS Nexus MCP Server started'));
    console.error(chalk.gray(`[MCP] Version: ${this.config.version}`));
    console.error(chalk.gray(`[MCP] Context Root: ${this.config.contextRoot}`));
  }

  async shutdown() {
    console.error(chalk.yellow('[MCP] Shutting down...'));
    await this.server.close();
  }

  getStatus() {
    return {
      name: this.config.name,
      version: this.config.version,
      contextRoot: this.config.contextRoot,
    };
  }
}

module.exports = { MCPServer: AIOSMCPServer };
