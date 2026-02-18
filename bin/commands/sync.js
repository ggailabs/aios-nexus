/**
 * AIOS Nexus - Sync CLI Command
 *
 * CLI interface for multi-IDE sync
 * Version: 5.0.0
 */

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen').default;
const inquirer = require('inquirer');
const { SyncEngine } = require(path.join(__dirname, '../../src/services/sync'));

/**
 * Main sync command handler
 */
async function syncCommand(options) {
  const engine = new SyncEngine();

  const { ide = null, validate = false, watch = false, dryRun = false, force = false } = options;

  if (validate) {
    return await runValidate(engine, options);
  }

  if (watch) {
    return await runWatch(engine, options);
  }

  if (ide) {
    return await syncSingleIDE(engine, ide, { force, dryRun });
  }

  return await syncAllIDEs(engine, { force, dryRun });
}

/**
 * Sync all IDEs
 */
async function syncAllIDEs(engine, options) {
  console.log(chalk.cyan.bold('\n🔄 Syncing to all IDEs'));
  console.log(chalk.gray('━'.repeat(40)));

  const results = await engine.syncAll(options);

  const successCount = Object.values(results).filter((r) => r.success).length;
  const failCount = Object.values(results).filter((r) => !r.success).length;

  if (successCount > 0) {
    console.log(chalk.green.bold(`\n✅ Synced to ${successCount} IDE(s)`));
  }

  if (failCount > 0) {
    console.log(chalk.yellow.bold(`\n⚠️ ${failCount} IDE(s) failed`));
  }

  return results;
}

/**
 * Sync single IDE
 */
async function syncSingleIDE(engine, ide, options) {
  console.log(chalk.cyan.bold(`\n🔄 Syncing to ${ide}`));
  console.log(chalk.gray('━'.repeat(40)));

  const result = await engine.syncTarget(ide, options);

  if (result.success) {
    console.log(chalk.green.bold('\n✅ Sync complete'));
    if (result.files) {
      console.log(chalk.gray(`Files written: ${result.files.length}`));
    }
  } else {
    console.log(chalk.red.bold(`\n❌ Sync failed: ${result.error}`));
  }

  return result;
}

/**
 * Run validation
 */
async function runValidate(engine, options) {
  const { strict = false } = options;

  const result = await engine.validate({ strict });

  return result;
}

/**
 * Run watch mode
 */
async function runWatch(engine, options) {
  console.log(
    boxen(
      chalk.cyan.bold('👁️ Watch Mode Active') +
        '\n' +
        chalk.gray('━'.repeat(30)) +
        '\n' +
        chalk.white('Watching for changes in .context/\n') +
        chalk.gray('Press Ctrl+C to stop'),
      { padding: 1, borderStyle: 'round' }
    )
  );

  const watcher = await engine.watch(options);

  // Keep process alive
  return new Promise(() => {
    process.on('SIGINT', () => {
      console.log(chalk.yellow('\n\nStopping watch mode...'));
      watcher.close();
      process.exit(0);
    });
  });
}

/**
 * Interactive sync wizard
 */
async function syncWizard() {
  const engine = new SyncEngine();

  console.log(
    boxen(chalk.cyan.bold('🔄 Sync Wizard') + '\n' + chalk.gray('━'.repeat(30)), {
      padding: 1,
      borderStyle: 'round',
    })
  );

  // Step 1: Select IDEs
  const { selectedIDEs } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedIDEs',
      message: 'Select IDEs to sync:',
      choices: [
        { name: 'Claude Code', value: 'claude', checked: true },
        { name: 'Cursor', value: 'cursor', checked: true },
        { name: 'Windsurf', value: 'windsurf', checked: false },
        { name: 'Codex CLI', value: 'codex', checked: false },
        { name: 'Gemini CLI', value: 'gemini', checked: false },
        { name: 'GitHub Copilot', value: 'copilot', checked: false },
        { name: 'AntiGravity', value: 'antigravity', checked: false },
        { name: 'VS Code', value: 'vscode', checked: false },
      ],
    },
  ]);

  if (selectedIDEs.length === 0) {
    console.log(chalk.yellow('\nNo IDEs selected. Exiting.'));
    return;
  }

  // Step 2: Options
  const { forceSync, dryRunSync } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'forceSync',
      message: 'Force overwrite existing files?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'dryRunSync',
      message: 'Dry run (preview only)?',
      default: false,
    },
  ]);

  // Step 3: Execute
  console.log(chalk.cyan.bold('\n🔄 Syncing...'));

  for (const ide of selectedIDEs) {
    await engine.syncTarget(ide, { force: forceSync, dryRun: dryRunSync });
  }

  console.log(chalk.green.bold('\n✅ Sync complete!'));
}

/**
 * Show sync status
 */
async function showSyncStatus() {
  const engine = new SyncEngine();

  console.log(chalk.cyan.bold('\n📊 Sync Status'));
  console.log(chalk.gray('━'.repeat(40)));

  const adapters = engine.adapters.getAll();

  for (const adapter of adapters) {
    const status = adapter.enabled ? chalk.green('✓ enabled') : chalk.gray('○ disabled');
    console.log(`  ${adapter.name}: ${status}`);
  }

  console.log(chalk.gray('━'.repeat(40)));
}

module.exports = { syncCommand, syncWizard, showSyncStatus };
