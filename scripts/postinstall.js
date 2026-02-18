#!/usr/bin/env node

/**
 * AIOS Nexus - Post-Install Script
 *
 * Runs automatically after npm install
 * Sets up .context and .aios-core templates
 *
 * Version: 5.0.0
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

async function postInstall() {
  // Skip if this is the main package development
  if (process.cwd().includes('aios-core') && process.cwd().endsWith('aios-core')) {
    console.log(chalk.gray('[AIOS Nexus] Development mode - skipping postinstall'));
    return;
  }

  console.log(chalk.cyan.bold('\n🎉 AIOS Nexus installed successfully!\n'));

  console.log(chalk.white('To get started, run:'));
  console.log(chalk.cyan('  npx aios-nexus init'));
  console.log();
  console.log(chalk.white('Or install in existing project:'));
  console.log(chalk.cyan('  npx aios-nexus install'));
  console.log();
  console.log(chalk.white('Available commands:'));
  console.log(chalk.gray('  aios-nexus init        - Initialize new project'));
  console.log(chalk.gray('  aios-nexus install     - Install in existing project'));
  console.log(chalk.gray('  aios-nexus sync        - Sync with IDEs'));
  console.log(chalk.gray('  aios-nexus workflow    - Manage workflows'));
  console.log(chalk.gray('  aios-nexus agent       - Manage agents'));
  console.log(chalk.gray('  aios-nexus mcp         - Start MCP server'));
  console.log();
  console.log(chalk.white('Documentation:'));
  console.log(chalk.gray('  https://ggailabs.com/aios-nexus'));
  console.log(chalk.gray('  https://github.com/ggailabs/aios-nexus'));
  console.log();
}

postInstall().catch((error) => {
  // Don't fail install on error
  console.error(chalk.yellow('[AIOS Nexus] Post-install warning:'), error.message);
});
