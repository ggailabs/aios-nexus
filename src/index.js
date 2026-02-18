/**
 * AIOS Nexus - Main Entry Point
 *
 * Version: 5.0.0
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 * Website: https://ggailabs.com
 * Email: contato@ggailabs.com
 */

const { WorkflowEngine } = require('./services/workflow');
const { Scaffolder } = require('./core/scaffolder');
const { SyncEngine } = require('./services/sync');
const { MCPServer, registerTools, registerResources, registerPrompts } = require('./services/mcp');

module.exports = {
  // Core Engines
  WorkflowEngine,
  Scaffolder,
  SyncEngine,

  // MCP Server
  MCPServer,
  registerTools,
  registerResources,
  registerPrompts,

  // Version
  version: '5.0.0',
};
