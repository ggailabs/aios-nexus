/**
 * AIOS Nexus - Init Command
 *
 * Initialize a new AIOS Nexus project
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function initCommand(projectName, options) {
  const spinner = ora('Initializing AIOS Nexus...').start();

  try {
    const targetDir = projectName ? path.join(process.cwd(), projectName) : process.cwd();

    const contextRoot = path.join(targetDir, '.context');
    const aiosRoot = path.join(targetDir, '.aios-core');

    if (options.quick) {
      await quickInit(targetDir, contextRoot, aiosRoot);
    } else if (options.tui) {
      spinner.stop();
      await tuiInit(targetDir, contextRoot, aiosRoot, options);
    } else {
      spinner.stop();
      await interactiveInit(targetDir, contextRoot, aiosRoot, options);
    }

    spinner.succeed('AIOS Nexus initialized successfully!');

    console.log(chalk.cyan.bold('\n📋 Next Steps:'));
    console.log(chalk.gray('  1. Review .context/ directory'));
    console.log(chalk.gray('  2. Run `aios-nexus sync` to sync with your IDE'));
    console.log(chalk.gray('  3. Start developing with AI assistance!\n'));
  } catch (error) {
    spinner.fail('Initialization failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function quickInit(targetDir, contextRoot, aiosRoot) {
  await fs.ensureDir(contextRoot);
  await fs.ensureDir(path.join(contextRoot, 'docs'));
  await fs.ensureDir(path.join(contextRoot, 'agents'));
  await fs.ensureDir(path.join(contextRoot, 'skills'));
  await fs.ensureDir(path.join(contextRoot, 'plans'));
  await fs.ensureDir(path.join(contextRoot, 'workflows'));

  await fs.ensureDir(aiosRoot);

  await createConstitution(aiosRoot);
  await createConfig(aiosRoot);
  await createReadme(targetDir);
}

async function interactiveInit(targetDir, contextRoot, aiosRoot, options) {
  console.log(chalk.cyan.bold('\n🚀 AIOS Nexus Setup\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'What type of project is this?',
      choices: ['frontend', 'backend', 'fullstack', 'library', 'other'],
      default: options.type || 'fullstack',
    },
    {
      type: 'checkbox',
      name: 'ides',
      message: 'Which IDEs will you use?',
      choices: [
        { name: 'Claude Code', value: 'claude', checked: true },
        { name: 'Cursor', value: 'cursor' },
        { name: 'Windsurf', value: 'windsurf' },
        { name: 'Codex CLI', value: 'codex' },
        { name: 'Gemini CLI', value: 'gemini' },
        { name: 'GitHub Copilot', value: 'copilot' },
      ],
    },
    {
      type: 'list',
      name: 'language',
      message: 'Interface language:',
      choices: ['en-US', 'pt-BR', 'es-ES'],
      default: options.language || 'en-US',
    },
    {
      type: 'confirm',
      name: 'createStory',
      message: 'Create a sample story?',
      default: true,
    },
  ]);

  await quickInit(targetDir, contextRoot, aiosRoot);

  if (answers.createStory) {
    await createSampleStory(contextRoot);
  }

  console.log(chalk.green('\n✅ Project configured:'));
  console.log(chalk.gray(`   Type: ${answers.projectType}`));
  console.log(chalk.gray(`   IDEs: ${answers.ides.join(', ')}`));
  console.log(chalk.gray(`   Language: ${answers.language}`));

  return answers;
}

async function tuiInit(targetDir, contextRoot, aiosRoot, options) {
  const { startTUI } = require('../src/cli/tui');
  await startTUI({ view: 'init' });
}

async function createConstitution(aiosRoot) {
  const constitution = `# AIOS Nexus Constitution

> Version: 5.0.0
> Last Updated: ${new Date().toISOString().split('T')[0]}

## Core Principles

### 1. CLI First
All operations should be executable via command line. The CLI is the primary interface.

### 2. Agent Authority
Trust agent expertise and decisions. Agents are specialized for specific tasks.

### 3. Story-Driven Development
Work from stories in \`docs/stories/\`. Each story has clear acceptance criteria.

### 4. No Invention
Implement only what acceptance criteria require. Do not add unrequested features.

### 5. Quality First
Run quality gates before completing any task:
- \`npm run lint\`
- \`npm run typecheck\`
- \`npm test\`

### 6. Absolute Imports
Use absolute import paths for clarity and maintainability.

## Quality Gates

\`\`\`yaml
gates:
  pre-push:
    - name: lint
      command: npm run lint
      severity: BLOCK
    - name: typecheck
      command: npm run typecheck
      severity: BLOCK
    - name: test
      command: npm test
      severity: BLOCK
\`\`\`

## Workflow

1. Start from a story in \`docs/stories/\`
2. Implement only acceptance criteria
3. Update checklist (\`[ ]\` → \`[x]\`)
4. Run quality gates
5. Mark story as complete
`;

  await fs.writeFile(path.join(aiosRoot, 'constitution.md'), constitution);
}

async function createConfig(aiosRoot) {
  const config = `# AIOS Nexus Configuration
# Version: 5.0.0

project:
  name: my-project
  type: fullstack

framework:
  name: aios-nexus
  version: 5.0.0

context:
  root: .context
  dirs:
    - docs
    - agents
    - skills
    - plans
    - workflows

sync:
  targets:
    - claude
    - cursor
  auto: false

workflow:
  defaultScale: MEDIUM
  phases:
    - P
    - R
    - E
    - V
    - C

quality:
  gates:
    lint: npm run lint
    typecheck: npm run typecheck
    test: npm test

language: en-US
`;

  await fs.writeFile(path.join(aiosRoot, 'core-config.yaml'), config);
}

async function createReadme(targetDir) {
  const readmePath = path.join(targetDir, 'AIOS.md');

  const readme = `# AIOS Nexus Project

This project is configured with AIOS Nexus - a unified AI development framework.

## Quick Start

\`\`\`bash
# Sync with your IDE
aios-nexus sync

# Start a workflow
aios-nexus workflow start "My Feature" --scale MEDIUM

# View status
aios-nexus workflow status
\`\`\`

## Structure

\`\`\`
.
├── .context/           # Source of Truth
│   ├── docs/          # Documentation
│   ├── agents/        # Agent definitions
│   ├── skills/        # Skills library
│   ├── plans/         # PREVC plans
│   └── workflows/     # Workflow definitions
├── .aios-core/        # Framework config
│   ├── constitution.md
│   └── core-config.yaml
└── AIOS.md            # This file
\`\`\`

## Commands

| Command | Description |
|---------|-------------|
| \`aios-nexus init\` | Initialize project |
| \`aios-nexus sync\` | Sync with IDEs |
| \`aios-nexus workflow\` | Manage workflows |
| \`aios-nexus agent\` | Manage agents |
| \`aios-nexus scaffold\` | AI-powered scaffolding |

## Quality Gates

Run before committing:
\`\`\`bash
npm run lint
npm run typecheck
npm test
\`\`\`
`;

  await fs.writeFile(readmePath, readme);
}

async function createSampleStory(contextRoot) {
  const storiesDir = path.join(contextRoot, 'docs', 'stories');
  await fs.ensureDir(storiesDir);

  const story = `# Sample Story

## Description
This is a sample story demonstrating the AIOS Nexus story format.

## Acceptance Criteria
- [ ] Criterion 1 is met
- [ ] Criterion 2 is met
- [ ] Criterion 3 is met

## Technical Notes
- Implementation details go here
- Consider edge cases
- Add performance considerations

## Definition of Done
- [ ] Code implemented
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Code reviewed
`;

  await fs.writeFile(path.join(storiesDir, '001-sample-story.md'), story);
}

module.exports = { initCommand };
