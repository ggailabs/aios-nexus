#!/usr/bin/env node

/**
 * AIOS Nexus - Main CLI Entry Point
 *
 * Framework Unificado de Desenvolvimento com IA
 * Version: 5.0.0
 *
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 * Website: https://genesisgrid.ai
 */

const { Command } = require('commander');
const chalk = require('chalk');
const boxen = require('boxen').default;
const path = require('path');
const fs = require('fs-extra');

const packageJson = require('../package.json');

const program = new Command();

// Banner
const banner = boxen(
  chalk.cyan.bold('AIOS Nexus') +
    '\n' +
    chalk.gray('Framework Unificado de Desenvolvimento com IA\n') +
    chalk.dim(`v${packageJson.version}`),
  { padding: 1, margin: 1, borderStyle: 'round' }
);

// Version
program
  .name('aios-nexus')
  .description('AIOS Nexus - Framework Unificado de Desenvolvimento com IA')
  .version(packageJson.version)
  .hook('preAction', () => {
    if (process.argv.length === 2 || process.argv[2] === '--help') {
      console.log(banner);
    }
  });

// ============================================================================
// INIT COMMAND
// ============================================================================
program
  .command('init [project-name]')
  .description('Initialize a new AIOS Nexus project')
  .option('-t, --tui', 'Use Terminal User Interface')
  .option('-l, --language <lang>', 'Set interface language (pt-BR, en-US, es-ES)')
  .option('-q, --quick', 'Quick setup with defaults')
  .option('--ide <ide>', 'Specify IDE (claude, cursor, windsurf, codex, gemini)')
  .option('--type <type>', 'Project type (frontend, backend, fullstack)')
  .action(async (projectName, options) => {
    const { initCommand } = require('./commands/init');
    await initCommand(projectName, options);
  });

// ============================================================================
// INSTALL COMMAND
// ============================================================================
program
  .command('install')
  .description('Install AIOS Nexus in existing project')
  .option('-t, --tui', 'Use Terminal User Interface')
  .option('-l, --language <lang>', 'Set interface language')
  .option('--ide <ide>', 'Specify IDE')
  .action(async (options) => {
    const { installCommand } = require('./commands/install');
    await installCommand(options);
  });

// ============================================================================
// SYNC COMMAND
// ============================================================================
program
  .command('sync')
  .description('Sync .context/ to IDE targets')
  .option('--ide <ide>', 'Sync specific IDE only')
  .option('--validate', 'Validate sync integrity')
  .option('--watch', 'Watch for changes and auto-sync')
  .option('--dry-run', 'Preview changes without writing')
  .option('-f, --force', 'Force overwrite existing files')
  .action(async (options) => {
    const { syncCommand } = require('./commands/sync');
    await syncCommand(options);
  });

// ============================================================================
// VALIDATE COMMAND
// ============================================================================
program
  .command('validate')
  .description('Validate AIOS Nexus configuration and context')
  .option('--strict', 'Enable strict validation')
  .option('--fix', 'Auto-fix issues where possible')
  .action(async (options) => {
    const { validateCommand } = require('./commands/validate');
    await validateCommand(options);
  });

// ============================================================================
// CONTEXT COMMAND
// ============================================================================
program
  .command('context <action>')
  .description('Manage .context/ directory')
  .option('--target <target>', 'Target: docs, agents, skills, plans, all')
  .option('--file <file>', 'Specific file to fill')
  .action(async (action, options) => {
    const { contextCommand } = require('./commands/context');
    await contextCommand(action, options);
  });

// ============================================================================
// WORKFLOW COMMAND
// ============================================================================
program
  .command('workflow <action>')
  .description('Manage PREVC workflows')
  .option('-n, --name <name>', 'Workflow name')
  .option('-d, --description <desc>', 'Workflow description')
  .option('-s, --scale <scale>', 'Scale: QUICK, SMALL, MEDIUM, LARGE')
  .action(async (action, options) => {
    const { workflowCommand } = require('./commands/workflow');
    await workflowCommand(action, options);
  });

// ============================================================================
// AGENT COMMAND
// ============================================================================
program
  .command('agent <action>')
  .description('Manage AI agents')
  .option('-i, --id <id>', 'Agent ID')
  .option('-l, --list', 'List all agents')
  .action(async (action, options) => {
    const { agentCommand } = require('./commands/agent');
    await agentCommand(action, options);
  });

// ============================================================================
// SCAFFOLD COMMAND
// ============================================================================
program
  .command('scaffold <action>')
  .description('AI-powered scaffolding')
  .option('--no-ai', 'Skip AI generation')
  .option('--preview', 'Preview generated content')
  .action(async (action, options) => {
    const { scaffoldCommand } = require('./commands/scaffold');
    await scaffoldCommand(action, options);
  });

// ============================================================================
// MIGRATE COMMAND
// ============================================================================
program
  .command('migrate')
  .description('Migrate from legacy frameworks')
  .option('--from <framework>', 'Source framework: aios-4.x, ai-coders, antigravity, ggai-nexus')
  .option('--backup', 'Create backup before migration')
  .action(async (options) => {
    const { migrateCommand } = require('./commands/migrate');
    await migrateCommand(options);
  });

// ============================================================================
// MCP COMMAND
// ============================================================================
program
  .command('mcp')
  .description('Start MCP server')
  .option('--port <port>', 'Server port', '3000')
  .action(async (options) => {
    const { mcpCommand } = require('./commands/mcp');
    await mcpCommand(options);
  });

// Parse arguments
program.parse();
