/**
 * AIOS Nexus - Install Command
 *
 * Install AIOS Nexus in existing project
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function installCommand(options) {
  const spinner = ora('Installing AIOS Nexus...').start();

  try {
    const targetDir = process.cwd();
    const contextRoot = path.join(targetDir, '.context');
    const aiosRoot = path.join(targetDir, '.aios-core');

    const packageJsonPath = path.join(targetDir, 'package.json');
    const hasPackageJson = await fs.pathExists(packageJsonPath);

    if (!hasPackageJson) {
      spinner.warn('No package.json found. Running in standalone mode.');
    }

    spinner.stop();

    const answers = await inquirer.prompt([
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
        ],
      },
      {
        type: 'confirm',
        name: 'addScripts',
        message: 'Add npm scripts to package.json?',
        default: true,
        when: hasPackageJson,
      },
    ]);

    spinner.start('Creating directories...');

    await fs.ensureDir(contextRoot);
    await fs.ensureDir(path.join(contextRoot, 'docs'));
    await fs.ensureDir(path.join(contextRoot, 'agents'));
    await fs.ensureDir(path.join(contextRoot, 'skills'));
    await fs.ensureDir(path.join(contextRoot, 'plans'));
    await fs.ensureDir(path.join(contextRoot, 'workflows'));

    await fs.ensureDir(aiosRoot);

    spinner.text = 'Creating configuration files...';
    await createConstitution(aiosRoot);
    await createConfig(aiosRoot, answers.ides);

    if (answers.addScripts && hasPackageJson) {
      spinner.text = 'Adding npm scripts...';
      await addScripts(packageJsonPath);
    }

    spinner.succeed('AIOS Nexus installed successfully!');

    console.log(chalk.cyan.bold('\n📋 IDEs configured:'));
    answers.ides.forEach((ide) => {
      console.log(chalk.gray(`  • ${ide}`));
    });

    console.log(chalk.cyan.bold('\n📋 Next Steps:'));
    console.log(chalk.gray('  1. Run `aios-nexus sync` to sync with your IDE'));
    console.log(chalk.gray('  2. Run `aios-nexus scaffold analyze` to analyze your codebase\n'));
  } catch (error) {
    spinner.fail('Installation failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function createConstitution(aiosRoot) {
  const constitution = `# AIOS Nexus Constitution

> Version: 5.0.0

## Core Principles

1. **CLI First** - All operations via command line
2. **Agent Authority** - Trust agent expertise
3. **Story-Driven** - Work from stories in docs/stories/
4. **No Invention** - Only implement acceptance criteria
5. **Quality First** - Run quality gates before completion
6. **Absolute Imports** - Use absolute import paths

## Quality Gates

\`\`\`bash
npm run lint
npm run typecheck
npm test
\`\`\`
`;

  await fs.writeFile(path.join(aiosRoot, 'constitution.md'), constitution);
}

async function createConfig(aiosRoot, ides) {
  const config = `# AIOS Nexus Configuration
# Version: 5.0.0

framework:
  name: aios-nexus
  version: 5.0.0

context:
  root: .context

sync:
  targets:
${ides.map((ide) => `    - ${ide}`).join('\n')}
  auto: false

workflow:
  defaultScale: MEDIUM

quality:
  gates:
    lint: npm run lint
    typecheck: npm run typecheck
    test: npm test
`;

  await fs.writeFile(path.join(aiosRoot, 'core-config.yaml'), config);
}

async function addScripts(packageJsonPath) {
  const packageJson = await fs.readJson(packageJsonPath);

  packageJson.scripts = {
    ...packageJson.scripts,
    'aios:init': 'aios-nexus init',
    'aios:sync': 'aios-nexus sync',
    'aios:validate': 'aios-nexus validate',
    'aios:workflow': 'aios-nexus workflow status',
  };

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

module.exports = { installCommand };
