/**
 * AIOS Nexus - MCP Server Module
 *
 * Model Context Protocol Server for AI assistants
 * Version: 5.0.0
 */

const { MCPServer } = require('./server');
const { registerTools } = require('./tools-server');
const { registerResources } = require('./resources-server');
const { registerPrompts } = require('./prompts-server');

module.exports = {
  MCPServer,
  registerTools,
  registerResources,
  registerPrompts,
  createServer: (config) => new MCPServer(config),
};
