/**
 * AIOS Nexus - Sync Engine
 *
 * Multi-IDE synchronization engine
 * Version: 5.0.0
 */

const EventEmitter = require('events');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');

const { IDEAdapters } = require('./adapters');
const { ContentTransformer } = require('./transformer');
const { ParityValidator } = require('./validator');

class SyncEngine extends EventEmitter {
  constructor(config = {}) {
    super();

    this.config = {
      contextRoot: config.contextRoot || path.join(process.cwd(), '.context'),
      root: config.root || process.cwd(),
      targets: config.targets || [
        'claude',
        'cursor',
        'windsurf',
        'codex',
        'gemini',
        'copilot',
        'antigravity',
        'vscode',
      ],
      ...config,
    };

    this.adapters = new IDEAdapters(this.config);
    this.transformer = new ContentTransformer();
    this.validator = new ParityValidator();

    this.syncResults = {};
  }

  /**
   * Sync to all IDEs
   */
  async syncAll(options = {}) {
    const { force = false, dryRun = false } = options;

    console.log(chalk.cyan.bold('\n🔄 Syncing to all IDEs'));
    console.log(chalk.gray('━'.repeat(40)));

    const results = {};

    for (const target of this.config.targets) {
      results[target] = await this.syncTarget(target, { force, dryRun });
    }

    this.syncResults = results;
    this.emit('sync:complete', results);

    this.displaySummary(results);

    return results;
  }

  /**
   * Sync to specific IDE
   */
  async syncTarget(target, options = {}) {
    const { force = false, dryRun = false } = options;

    const spinner = ora(`Syncing to ${target}...`).start();

    try {
      // Get adapter for target
      const adapter = this.adapters.get(target);

      if (!adapter) {
        spinner.fail(`Unknown target: ${target}`);
        return { success: false, error: 'Unknown target' };
      }

      // Check if target is enabled
      if (!adapter.isEnabled()) {
        spinner.warn(`${target} is disabled`);
        return { success: false, error: 'Target disabled' };
      }

      // Read source context
      const sourceContent = await this.readSourceContent();

      // Transform content for target
      spinner.text = `Transforming content for ${target}...`;
      const transformed = await this.transformer.transform(sourceContent, target);

      // Get target paths
      const targetPaths = adapter.getTargetPaths();

      if (dryRun) {
        spinner.info(`Dry run for ${target}`);
        return {
          success: true,
          dryRun: true,
          files: Object.keys(transformed),
          targetPaths,
        };
      }

      // Write to target
      spinner.text = `Writing to ${target}...`;
      const written = await this.writeToTarget(transformed, targetPaths, { force });

      spinner.succeed(`Synced to ${target} (${written.length} files)`);

      return {
        success: true,
        files: written,
        targetPaths,
      };
    } catch (error) {
      spinner.fail(`Failed to sync to ${target}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Validate sync integrity
   */
  async validate(options = {}) {
    const { strict = false } = options;

    console.log(chalk.cyan.bold('\n🔍 Validating Sync Integrity'));
    console.log(chalk.gray('━'.repeat(40)));

    const results = {};

    for (const target of this.config.targets) {
      const adapter = this.adapters.get(target);
      if (!adapter || !adapter.isEnabled()) continue;

      const validation = await this.validator.validate(target, {
        contextRoot: this.config.contextRoot,
        targetRoot: adapter.getTargetRoot(),
        strict,
      });

      results[target] = validation;

      if (validation.valid) {
        console.log(chalk.green(`  ✓ ${target}: Valid`));
      } else {
        console.log(chalk.red(`  ✗ ${target}: ${validation.issues.length} issues`));
        validation.issues.forEach((issue) => {
          console.log(chalk.gray(`      • ${issue}`));
        });
      }
    }

    const allValid = Object.values(results).every((r) => r.valid);

    console.log(chalk.gray('━'.repeat(40)));

    if (allValid) {
      console.log(chalk.green.bold('\n✅ All targets valid'));
    } else {
      console.log(chalk.yellow.bold('\n⚠️ Some targets have issues'));
    }

    return { valid: allValid, results };
  }

  /**
   * Watch for changes and auto-sync
   */
  async watch(options = {}) {
    const chokidar = require('chokidar');

    console.log(chalk.cyan.bold('\n👁️ Watching for changes...'));
    console.log(chalk.gray('━'.repeat(40)));
    console.log(chalk.gray(`Watching: ${this.config.contextRoot}`));
    console.log(chalk.gray('Press Ctrl+C to stop'));
    console.log(chalk.gray('━'.repeat(40)));

    const watcher = chokidar.watch(this.config.contextRoot, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on('all', async (event, filePath) => {
      console.log(chalk.blue(`\n📝 Change detected: ${event} ${path.basename(filePath)}`));

      // Debounce and sync
      await this.syncAll(options);
    });

    return watcher;
  }

  /**
   * Read source content from .context/
   */
  async readSourceContent() {
    const content = {
      agents: {},
      skills: {},
      workflows: {},
      docs: {},
      plans: {},
    };

    for (const type of Object.keys(content)) {
      const typePath = path.join(this.config.contextRoot, type);

      if (await fs.pathExists(typePath)) {
        const files = await fs.readdir(typePath);

        for (const file of files) {
          if (file.endsWith('.md')) {
            const filePath = path.join(typePath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            content[type][file] = fileContent;
          }
        }
      }
    }

    return content;
  }

  /**
   * Write transformed content to target
   */
  async writeToTarget(transformed, targetPaths, options = {}) {
    const { force = false } = options;
    const written = [];

    for (const [filePath, content] of Object.entries(transformed)) {
      const fullPath = path.join(this.config.root, filePath);

      // Check if file exists and force is false
      if (!force && (await fs.pathExists(fullPath))) {
        continue;
      }

      // Ensure directory exists
      await fs.ensureDir(path.dirname(fullPath));

      // Write file
      await fs.writeFile(fullPath, content);
      written.push(filePath);
    }

    return written;
  }

  /**
   * Display sync summary
   */
  displaySummary(results) {
    console.log(chalk.gray('\n━'.repeat(40)));
    console.log(chalk.cyan.bold('📊 Sync Summary'));
    console.log(chalk.gray('━'.repeat(40)));

    let totalFiles = 0;
    let successCount = 0;
    let failCount = 0;

    for (const [target, result] of Object.entries(results)) {
      if (result.success) {
        successCount++;
        totalFiles += result.files?.length || 0;
        console.log(chalk.green(`  ✓ ${target}: ${result.files?.length || 0} files`));
      } else {
        failCount++;
        console.log(chalk.red(`  ✗ ${target}: ${result.error}`));
      }
    }

    console.log(chalk.gray('━'.repeat(40)));
    console.log(
      `Total: ${successCount} succeeded, ${failCount} failed, ${totalFiles} files written`
    );
  }

  /**
   * Get sync status
   */
  getSyncStatus() {
    return this.syncResults;
  }

  /**
   * Get available targets
   */
  getAvailableTargets() {
    return this.config.targets;
  }

  /**
   * Enable/disable target
   */
  setTargetEnabled(target, enabled) {
    const adapter = this.adapters.get(target);
    if (adapter) {
      adapter.setEnabled(enabled);
    }
  }
}

module.exports = { SyncEngine };
