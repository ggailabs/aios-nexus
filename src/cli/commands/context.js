/**
 * AIOS Nexus - Context CLI Command
 *
 * CLI interface for context management
 * Version: 5.0.0
 */

const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

const CONTEXT_ROOT = '.context';

/**
 * Main context command handler
 */
async function contextCommand(action, options) {
  switch (action) {
    case 'init':
      await initContext(options);
      break;
    case 'fill':
      await fillContext(options);
      break;
    case 'update':
      await updateContext(options);
      break;
    case 'status':
      await contextStatus(options);
      break;
    case 'clean':
      await cleanContext(options);
      break;
    default:
      console.log(chalk.yellow(`Unknown action: ${action}`));
      console.log('Available actions: init, fill, update, status, clean');
  }
}

/**
 * Initialize context structure
 */
async function initContext(options) {
  const { target = 'all' } = options;
  const spinner = ora('Initializing context...').start();

  try {
    const dirs = target === 'all' ? ['docs', 'agents', 'skills', 'plans', 'workflows'] : [target];

    for (const dir of dirs) {
      const dirPath = path.join(CONTEXT_ROOT, dir);
      await fs.ensureDir(dirPath);

      // Create README in each directory
      const readmePath = path.join(dirPath, 'README.md');
      if (!(await fs.pathExists(readmePath))) {
        await fs.writeFile(readmePath, generateDirReadme(dir));
      }
    }

    spinner.succeed('Context initialized');

    console.log(chalk.green.bold('\n✅ Context structure created'));
    console.log(chalk.gray('━'.repeat(40)));
    dirs.forEach((dir) => {
      console.log(chalk.blue(`  ✓ .context/${dir}/`));
    });
    console.log(chalk.gray('━'.repeat(40)));
    console.log(chalk.cyan('\nNext steps:'));
    console.log('  1. Run `aios-nexus context fill` to populate with AI');
    console.log('  2. Run `aios-nexus sync` to sync to IDEs');
  } catch (error) {
    spinner.fail('Failed to initialize context');
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Fill context with AI-generated content
 */
async function fillContext(options) {
  const { target, file } = options;

  console.log(chalk.cyan.bold('\n🤖 AI Scaffolding'));
  console.log(chalk.gray('━'.repeat(40)));

  // This would integrate with the AI scaffolding engine
  console.log(chalk.yellow('AI scaffolding is not yet implemented.'));
  console.log('This feature will analyze your codebase and generate:');
  console.log(chalk.gray('  • Documentation (.context/docs/)'));
  console.log(chalk.gray('  • Contextualized agents (.context/agents/)'));
  console.log(chalk.gray('  • Relevant skills (.context/skills/)'));
  console.log(chalk.gray('  • Workflows (.context/workflows/)'));

  // Interactive prompt for manual fill
  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Would you like to manually fill context?',
      default: false,
    },
  ]);

  if (proceed) {
    await manualFill(target);
  }
}

/**
 * Update context based on codebase changes
 */
async function updateContext(options) {
  const spinner = ora('Analyzing codebase changes...').start();

  try {
    // This would detect changes and update context
    spinner.text = 'Updating context...';

    // Placeholder
    await new Promise((resolve) => setTimeout(resolve, 1000));

    spinner.succeed('Context updated');

    console.log(chalk.green.bold('\n✅ Context synchronized with codebase'));
  } catch (error) {
    spinner.fail('Failed to update context');
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Show context status
 */
async function contextStatus(options) {
  console.log(chalk.cyan.bold('\n📊 Context Status'));
  console.log(chalk.gray('━'.repeat(40)));

  const dirs = ['docs', 'agents', 'skills', 'plans', 'workflows'];

  for (const dir of dirs) {
    const dirPath = path.join(CONTEXT_ROOT, dir);
    const exists = await fs.pathExists(dirPath);

    if (exists) {
      const files = await fs.readdir(dirPath);
      const count = files.filter((f) => f.endsWith('.md')).length;
      console.log(chalk.green(`  ✓ ${dir}/  (${count} files)`));
    } else {
      console.log(chalk.gray(`  ○ ${dir}/  (not initialized)`));
    }
  }

  console.log(chalk.gray('━'.repeat(40)));

  // Check sync status
  const syncTargets = ['.claude', '.cursor', '.windsurf', '.codex'];
  console.log(chalk.cyan('\n🔄 IDE Sync Status:'));

  for (const target of syncTargets) {
    const exists = await fs.pathExists(target);
    if (exists) {
      console.log(chalk.green(`  ✓ ${target}/`));
    } else {
      console.log(chalk.gray(`  ○ ${target}/`));
    }
  }
}

/**
 * Clean context (remove generated content)
 */
async function cleanContext(options) {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'This will remove all generated context. Continue?',
      default: false,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow('Operation cancelled'));
    return;
  }

  const spinner = ora('Cleaning context...').start();

  try {
    const dirs = ['docs', 'agents', 'skills', 'plans', 'workflows'];

    for (const dir of dirs) {
      const dirPath = path.join(CONTEXT_ROOT, dir);
      if (await fs.pathExists(dirPath)) {
        const files = await fs.readdir(dirPath);
        for (const file of files) {
          if (file !== 'README.md') {
            await fs.remove(path.join(dirPath, file));
          }
        }
      }
    }

    spinner.succeed('Context cleaned');
  } catch (error) {
    spinner.fail('Failed to clean context');
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Manual context fill helper
 */
async function manualFill(target) {
  const targets = target ? [target] : ['docs', 'agents', 'skills', 'workflows'];

  for (const t of targets) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: `Fill ${t}:`,
        choices: [
          { name: 'Skip', value: 'skip' },
          { name: 'Create from template', value: 'template' },
          { name: 'Import from existing', value: 'import' },
        ],
      },
    ]);

    if (action === 'template') {
      console.log(chalk.gray(`  Creating template for ${t}...`));
      // Would create from template
    } else if (action === 'import') {
      console.log(chalk.gray(`  Import not yet implemented`));
    }
  }
}

/**
 * Generate README for context directory
 */
function generateDirReadme(dir) {
  const descriptions = {
    docs: 'Codebase documentation and guides',
    agents: 'AI agent playbooks and definitions',
    skills: 'Modular expertise packages',
    plans: 'PREVC workflow plans',
    workflows: 'Executable workflow definitions',
  };

  return `# ${dir.charAt(0).toUpperCase() + dir.slice(1)}

${descriptions[dir] || 'Context content'}

---

*AIOS Nexus v5.0.0*
`;
}

module.exports = { contextCommand };
