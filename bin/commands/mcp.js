/**
 * AIOS Nexus - MCP Command
 *
 * Start MCP server
 * Version: 5.0.0
 */

const path = require('path');
const chalk = require('chalk');

async function mcpCommand(options) {
  console.log(chalk.cyan.bold('\n🔌 AIOS Nexus MCP Server\n'));
  console.log(chalk.gray('━'.repeat(40)));
  console.log(chalk.gray(`Port: ${options.port || 'stdio'}`));
  console.log(chalk.gray(`Mode: Standard I/O`));
  console.log(chalk.gray('━'.repeat(40)));
  console.log();

  try {
    const { MCPServer } = require('../src/services/mcp');

    const server = new MCPServer({
      name: 'aios-nexus',
      version: '5.0.0',
      contextRoot: path.join(process.cwd(), '.context'),
      aiosRoot: path.join(process.cwd(), '.aios-core'),
    });

    await server.start();
  } catch (error) {
    console.error(chalk.red('[MCP Error]'), error.message);
    process.exit(1);
  }
}

module.exports = { mcpCommand };
