/**
 * AIOS Nexus - Migrate Command
 *
 * Migrate from legacy frameworks
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function migrateCommand(options) {
  console.log(chalk.cyan.bold('\n🔄 AIOS Nexus Migration\n'));

  const targetDir = process.cwd();

  let sourceFramework = options.from;

  if (!sourceFramework) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Which framework are you migrating from?',
        choices: [
          { name: 'AIOS Core 4.x', value: 'aios-4.x' },
          { name: 'AI-Coders Context', value: 'ai-coders' },
          { name: 'Antigravity Kit', value: 'antigravity' },
          { name: 'GGAI Nexus', value: 'ggai-nexus' },
        ],
      },
    ]);
    sourceFramework = answer.framework;
  }

  const spinner = ora(`Migrating from ${sourceFramework}...`).start();

  try {
    if (options.backup) {
      spinner.text = 'Creating backup...';
      await createBackup(targetDir);
    }

    switch (sourceFramework) {
      case 'aios-4.x':
        await migrateFromAIOS4(targetDir, spinner);
        break;
      case 'ai-coders':
        await migrateFromAICoders(targetDir, spinner);
        break;
      case 'antigravity':
        await migrateFromAntigravity(targetDir, spinner);
        break;
      case 'ggai-nexus':
        await migrateFromGGAINexus(targetDir, spinner);
        break;
      default:
        spinner.fail(`Unknown framework: ${sourceFramework}`);
        return;
    }

    spinner.succeed('Migration completed successfully!');

    console.log(chalk.cyan.bold('\n📋 Migration Summary:'));
    console.log(chalk.gray('  • .context/ directory created'));
    console.log(chalk.gray('  • .aios-core/ directory created'));
    console.log(chalk.gray('  • Configuration migrated'));
    console.log(chalk.gray('  • Run `aios-nexus sync` to sync with your IDE\n'));
  } catch (error) {
    spinner.fail('Migration failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function createBackup(targetDir) {
  const backupDir = path.join(targetDir, '.aios-backup-' + Date.now());
  await fs.ensureDir(backupDir);

  const dirsToBackup = ['.aios-core', '.context', '.claude', '.cursor', '.windsurf'];

  for (const dir of dirsToBackup) {
    const sourcePath = path.join(targetDir, dir);
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, path.join(backupDir, dir));
    }
  }

  console.log(chalk.gray(`  Backup created: ${backupDir}`));
}

async function migrateFromAIOS4(targetDir, spinner) {
  spinner.text = 'Migrating from AIOS Core 4.x...';

  const contextRoot = path.join(targetDir, '.context');
  const aiosRoot = path.join(targetDir, '.aios-core');

  const oldAIOSRoot = path.join(targetDir, '.aios-core');

  if (await fs.pathExists(oldAIOSRoot)) {
    spinner.text = 'Preserving existing .aios-core...';
  } else {
    await fs.ensureDir(aiosRoot);
  }

  await fs.ensureDir(contextRoot);
  await fs.ensureDir(path.join(contextRoot, 'docs'));
  await fs.ensureDir(path.join(contextRoot, 'agents'));
  await fs.ensureDir(path.join(contextRoot, 'skills'));
  await fs.ensureDir(path.join(contextRoot, 'plans'));
  await fs.ensureDir(path.join(contextRoot, 'workflows'));

  const storiesDir = path.join(targetDir, 'docs', 'stories');
  if (await fs.pathExists(storiesDir)) {
    spinner.text = 'Migrating stories...';
    const targetStoriesDir = path.join(contextRoot, 'docs', 'stories');
    await fs.ensureDir(targetStoriesDir);
    await fs.copy(storiesDir, targetStoriesDir);
  }

  const agentsDir = path.join(oldAIOSRoot, 'development', 'agents');
  if (await fs.pathExists(agentsDir)) {
    spinner.text = 'Migrating agents...';
    const targetAgentsDir = path.join(contextRoot, 'agents');
    const files = await fs.readdir(agentsDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        await fs.copy(path.join(agentsDir, file), path.join(targetAgentsDir, file));
      }
    }
  }
}

async function migrateFromAICoders(targetDir, spinner) {
  spinner.text = 'Migrating from AI-Coders Context...';

  const oldContextRoot = path.join(targetDir, '.context');
  const contextRoot = path.join(targetDir, '.context');
  const aiosRoot = path.join(targetDir, '.aios-core');

  if (await fs.pathExists(oldContextRoot)) {
    spinner.text = 'Context directory already exists, preserving...';
  } else {
    await fs.ensureDir(contextRoot);
    await fs.ensureDir(path.join(contextRoot, 'docs'));
    await fs.ensureDir(path.join(contextRoot, 'agents'));
    await fs.ensureDir(path.join(contextRoot, 'skills'));
    await fs.ensureDir(path.join(contextRoot, 'plans'));
    await fs.ensureDir(path.join(contextRoot, 'workflows'));
  }

  await fs.ensureDir(aiosRoot);

  const workflowPath = path.join(targetDir, '.context', 'workflows');
  if (await fs.pathExists(workflowPath)) {
    spinner.text = 'Preserving workflows...';
  }
}

async function migrateFromAntigravity(targetDir, spinner) {
  spinner.text = 'Migrating from Antigravity Kit...';

  const contextRoot = path.join(targetDir, '.context');
  const aiosRoot = path.join(targetDir, '.aios-core');

  await fs.ensureDir(contextRoot);
  await fs.ensureDir(path.join(contextRoot, 'docs'));
  await fs.ensureDir(path.join(contextRoot, 'agents'));
  await fs.ensureDir(path.join(contextRoot, 'skills'));
  await fs.ensureDir(path.join(contextRoot, 'plans'));
  await fs.ensureDir(path.join(contextRoot, 'workflows'));

  await fs.ensureDir(aiosRoot);

  const agentDir = path.join(targetDir, '.agent');
  if (await fs.pathExists(agentDir)) {
    spinner.text = 'Migrating .agent directory...';

    const oldAgentsDir = path.join(agentDir, 'agents');
    if (await fs.pathExists(oldAgentsDir)) {
      const targetAgentsDir = path.join(contextRoot, 'agents');
      const files = await fs.readdir(oldAgentsDir);
      for (const file of files) {
        if (file.endsWith('.md')) {
          await fs.copy(path.join(oldAgentsDir, file), path.join(targetAgentsDir, file));
        }
      }
    }

    const oldSkillsDir = path.join(agentDir, 'skills');
    if (await fs.pathExists(oldSkillsDir)) {
      const targetSkillsDir = path.join(contextRoot, 'skills');
      await fs.copy(oldSkillsDir, targetSkillsDir);
    }
  }
}

async function migrateFromGGAINexus(targetDir, spinner) {
  spinner.text = 'Migrating from GGAI Nexus...';

  const contextRoot = path.join(targetDir, '.context');
  const aiosRoot = path.join(targetDir, '.aios-core');

  await fs.ensureDir(contextRoot);
  await fs.ensureDir(aiosRoot);

  const oldContextDir = path.join(targetDir, 'context');
  if (await fs.pathExists(oldContextDir)) {
    spinner.text = 'Migrating context directory...';
    await fs.copy(oldContextDir, contextRoot);
  }
}

module.exports = { migrateCommand };
