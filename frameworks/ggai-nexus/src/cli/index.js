#!/usr/bin/env node

const inquirer = require('inquirer').default || require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const fs = require('fs-extra');
const path = require('path');

const LanguageManager = require('./languages');
const IDEDetector = require('../core/detector');
const AIScaffolder = require('../core/scaffolder');
const ContentGenerator = require('../core/generator');

class CLIApp {
  constructor() {
    this.options = {
      language: 'en-US',
      ide: null,
      projectType: null,
      useAI: true,
      quickMode: false
    };
    this.config = {
      language: this.options.language || 'en-US',
      ide: this.options.ide,
      projectType: this.options.type,
      useAI: !this.options.noAi,
      quickMode: this.options.quick
    };
    
    this.languageManager = new LanguageManager();
    this.languageManager.loadLanguage(this.config.language);
  }

  async start() {
    console.log('╭───────────────────────╮');
    console.log('│                       │');
    console.log('│  🌍 GGAI Nexus Setup  │');
    console.log('│                       │');
    console.log('│                       │');
    console.log('╰───────────────────────╯');

    if (!this.config.quickMode) {
      await this.runInteractiveSetup();
    } else {
      await this.runQuickSetup();
    }
  }

  async runInteractiveSetup() {
    // Language selection
    if (!this.options.language) {
      const { language } = await inquirer.prompt([
        {
          type: 'list',
          name: 'language',
          message: this.languageManager.t('choose_language'),
          choices: [
            { name: this.languageManager.t('portuguese'), value: 'pt-BR' },
            { name: this.languageManager.t('english'), value: 'en-US' },
            { name: this.languageManager.t('spanish'), value: 'es-ES' }
          ]
        }
      ]);
      
      this.languageManager.loadLanguage(language);
      this.config.language = language;
    }

    // IDE selection
    if (!this.config.ide) {
      const { ide } = await inquirer.prompt([
        {
          type: 'list',
          name: 'ide',
          message: this.languageManager.t('choose_ide'),
          choices: [
            { name: '🌊 Windsurf', value: 'windsurf' },
            { name: '🎯 Cursor', value: 'cursor' },
            { name: '🚀 Antigravity', value: 'antigravity' },
            { name: '💻 VS Code', value: 'vscode' }
          ]
        }
      ]);
      
      this.config.ide = ide;
    }

    // Project type selection
    if (!this.config.projectType) {
      const { projectType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'projectType',
          message: this.languageManager.t('choose_project_type'),
          choices: [
            { name: this.languageManager.t('frontend_only'), value: 'frontend' },
            { name: this.languageManager.t('backend_only'), value: 'backend' },
            { name: this.languageManager.t('full_stack'), value: 'fullstack' },
            { name: this.languageManager.t('documentation_only'), value: 'docs' }
          ]
        }
      ]);
      
      this.config.projectType = projectType;
    }

    // AI scaffolding
    const { useAI } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'useAI',
        message: this.languageManager.t('ai_scaffolding'),
        default: true
      }
    ]);
    
    this.config.useAI = useAI;

    await this.executeSetup();
  }

  async runQuickSetup() {
    // Set defaults for quick mode
    this.config.ide = this.config.ide || 'windsurf';
    this.config.projectType = this.config.projectType || 'frontend';
    
    console.log('Quick setup: Windsurf + Frontend');
    await this.executeSetup();
  }

  async executeSetup() {
    const spinner = ora(this.languageManager.t('analyzing_codebase')).start();

    try {
      // Detect current project structure
      const detector = new IDEDetector();
      const projectInfo = await detector.analyzeProject(process.cwd());
      
      spinner.text = this.languageManager.t('generating_content');

      // Generate content
      const generator = new ContentGenerator(this.config);
      const result = await generator.generate(projectInfo);

      spinner.succeed(this.languageManager.t('setup_complete'));

      // Show results
      this.showResults(result);

    } catch (error) {
      spinner.fail('Setup failed');
      console.error('Error:', error.message);
      process.exit(1);
    }
  }

  showResults(result) {
    const summary = `
✅ ${this.languageManager.t('your_dev_env_ready')}

📁 ${this.languageManager.t('created')}: ${result.targetDir}
📝 ${this.languageManager.t('documentation')}: ${result.docsCount} ${this.languageManager.t('files')}
🤖 ${this.languageManager.t('agents')}: ${result.agentsCount} ${this.languageManager.t('specialized')}
⚡ ${this.languageManager.t('skills')}: ${result.skillsCount} ${this.languageManager.t('custom')}
🔄 ${this.languageManager.t('workflows')}: ${result.workflowsCount} ${this.languageManager.t('project_specific')}

📋 ${this.languageManager.t('next_steps')}:
• ${this.languageManager.t('restart_ide')}
• ${this.languageManager.t('check_readme')}
• ${this.languageManager.t('start_coding')} 🚀
    `;

    console.log('╭───────────────────────╮');
    console.log('│                       │');
    console.log('│  📋 Setup Summary      │');
    console.log('│                       │');
    console.log('│                       │');
    console.log('╰───────────────────────╯');
    console.log(summary);
  }
}

// Export for use in bin file
module.exports = CLIApp;

// Run if called directly
const app = new CLIApp();
app.start().catch(console.error);
