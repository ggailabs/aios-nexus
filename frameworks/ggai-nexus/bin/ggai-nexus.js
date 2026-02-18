#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');

// Check if TUI mode is available and requested
const useTUI = process.argv.includes('--tui') || process.argv.includes('-t');

if (useTUI) {
  console.log('🚀 Starting GGAI Nexus TUI...');
  
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
  .name('ggai-nexus')
  .description('AI-powered development environment setup with multi-IDE support')
  .version('1.0.0');

program
  .option('-t, --tui', 'Use Terminal User Interface')
  .option('-l, --language <lang>', 'Set interface language (pt-BR, es-ES, en-US)', 'en-US')
  .option('-q, --quick', 'Quick setup with defaults')
  .option('--ide <ide>', 'Specify IDE (windsurf, cursor, antigravity, vscode)')
  .option('--type <type>', 'Specify project type (frontend, backend, fullstack, docs)')
  .option('--no-ai', 'Skip AI scaffolding')
  .option('--dev', 'Development mode')
  .parse();

// If no arguments provided, show help
if (process.argv.length <= 2) {
  program.help();
}
