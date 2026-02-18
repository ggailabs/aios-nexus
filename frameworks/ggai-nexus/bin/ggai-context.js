#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');

// Check if TUI mode is available and requested
const useTUI = process.argv.includes('--tui') || process.argv.includes('-t');

if (useTUI) {
  console.log('🚀 Starting Zenith Protocol v6.1...');
  
  // Use require with babel register for JSX
  try {
    require('@babel/register')({
      presets: ['@babel/preset-react']
    });
    
    require('../src/tui/app.jsx');
  } catch (error) {
    console.error('Failed to load TUI:', error.message);
    process.exit(1);
  }
} else {
  // Load CLI app
  try {
    require('../src/cli/index.js');
  } catch (error) {
    console.error('Failed to load CLI:', error.message);
    process.exit(1);
  }
}

program
  .name('ggai-context')
  .description('Genesis Grid AI Framework CLI - The definitive universal orchestrator for AI-assisted development')
  .version('6.1.0')
  .option('-t, --tui', 'Use Terminal User Interface')
  .option('--dev', 'Development mode')
  .option('-v, --version', 'Show version');

program
  .command('init')
  .description('Initialize or upgrade a project to Zenith v6.1')
  .option('-f, --force', 'Force initialization')
  .action((options) => {
    const InitCommand = require('../src/commands/init');
    const init = new InitCommand(options);
    init.execute();
  });

program
  .command('monitor')
  .description('Open Universal Context Hub & Health dashboard')
  .option('-p, --port <port>', 'Dashboard port', '3000')
  .action((options) => {
    const MonitorCommand = require('../src/commands/monitor');
    const monitor = new MonitorCommand(options);
    monitor.execute();
  });

program
  .command('sync')
  .description('Synchronize context to all AI platforms')
  .option('--platform <platform>', 'Specific platform (gemini, windsurf, openai, cursor)')
  .action((options) => {
    const SyncCommand = require('../src/commands/sync');
    const sync = new SyncCommand(options);
    sync.execute();
  });

program
  .command('discover')
  .description('Deep feed discovery of project modules and objectives')
  .option('--depth <depth>', 'Discovery depth', '3')
  .action((options) => {
    const DiscoverCommand = require('../src/commands/discover');
    const discover = new DiscoverCommand(options);
    discover.execute();
  });

program
  .command('skills')
  .description('Manage universal skills following agentskills.io standard')
  .option('--list', 'List all available skills')
  .option('--execute <skill>', 'Execute a specific skill')
  .action((options) => {
    const SkillsCommand = require('../src/commands/skills');
    const skills = new SkillsCommand(options);
    skills.execute();
  });

program.parse(process.argv);
