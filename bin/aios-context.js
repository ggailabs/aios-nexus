#!/usr/bin/env node

/**
 * AIOS Nexus - MCP Server Entry Point
 *
 * Model Context Protocol Server for AI assistants
 * Version: 5.0.0
 *
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 * Website: https://genesisgrid.ai
 */

const path = require('path');
const { MCPServer } = require('../src/services/mcp');

async function main() {
  const server = new MCPServer({
    name: 'aios-nexus',
    version: '5.0.0',
    contextRoot: path.join(process.cwd(), '.context'),
    aiosRoot: path.join(process.cwd(), '.aios-core'),
  });

  try {
    await server.start();
  } catch (error) {
    console.error('[MCP] Fatal error:', error.message);
    process.exit(1);
  }
}

main();
