/**
 * AIOS Nexus - Validate Command
 *
 * Validate AIOS Nexus configuration and context
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');

async function validateCommand(options) {
  const spinner = ora('Validating AIOS Nexus...').start();

  const results = {
    valid: true,
    errors: [],
    warnings: [],
    fixes: [],
  };

  try {
    const targetDir = process.cwd();
    const contextRoot = path.join(targetDir, '.context');
    const aiosRoot = path.join(targetDir, '.aios-core');

    await validateContextDir(contextRoot, results, options.strict);
    await validateAIOSDir(aiosRoot, results, options.strict);
    await validatePackageJson(targetDir, results);
    await validateIDESync(targetDir, results);

    spinner.stop();

    printResults(results);

    if (options.fix && results.fixes.length > 0) {
      await applyFixes(results.fixes);
    }

    if (!results.valid) {
      process.exit(1);
    }
  } catch (error) {
    spinner.fail('Validation failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function validateContextDir(contextRoot, results, strict) {
  const requiredDirs = ['docs', 'agents', 'skills', 'plans', 'workflows'];

  if (!(await fs.pathExists(contextRoot))) {
    results.errors.push({
      type: 'missing-context',
      message: '.context/ directory not found',
      fix: { type: 'mkdir', path: contextRoot },
    });
    results.valid = false;
    return;
  }

  for (const dir of requiredDirs) {
    const dirPath = path.join(contextRoot, dir);
    if (!(await fs.pathExists(dirPath))) {
      if (strict) {
        results.errors.push({
          type: 'missing-dir',
          message: `Missing directory: .context/${dir}`,
          fix: { type: 'mkdir', path: dirPath },
        });
        results.valid = false;
      } else {
        results.warnings.push(`Missing directory: .context/${dir}`);
      }
    }
  }
}

async function validateAIOSDir(aiosRoot, results, strict) {
  if (!(await fs.pathExists(aiosRoot))) {
    results.errors.push({
      type: 'missing-aios',
      message: '.aios-core/ directory not found',
      fix: { type: 'mkdir', path: aiosRoot },
    });
    results.valid = false;
    return;
  }

  const constitutionPath = path.join(aiosRoot, 'constitution.md');
  if (!(await fs.pathExists(constitutionPath))) {
    results.warnings.push('Missing constitution.md');
  }

  const configPath = path.join(aiosRoot, 'core-config.yaml');
  if (!(await fs.pathExists(configPath))) {
    results.warnings.push('Missing core-config.yaml');
  }
}

async function validatePackageJson(targetDir, results) {
  const packageJsonPath = path.join(targetDir, 'package.json');

  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);

    if (!packageJson.scripts?.lint) {
      results.warnings.push('Missing lint script in package.json');
    }
    if (!packageJson.scripts?.test) {
      results.warnings.push('Missing test script in package.json');
    }
  }
}

async function validateIDESync(targetDir, results) {
  const ideDirs = [
    { name: 'Claude Code', path: '.claude' },
    { name: 'Cursor', path: '.cursor' },
    { name: 'Windsurf', path: '.windsurf' },
    { name: 'Codex', path: '.codex' },
    { name: 'Gemini', path: '.gemini' },
  ];

  for (const ide of ideDirs) {
    const idePath = path.join(targetDir, ide.path);
    if (await fs.pathExists(idePath)) {
      results.warnings.push(
        `${ide.name} sync directory exists - consider running 'aios-nexus sync'`
      );
    }
  }
}

function printResults(results) {
  console.log(chalk.cyan.bold('\n🔍 Validation Results\n'));
  console.log(chalk.gray('━'.repeat(40)));

  if (results.valid) {
    console.log(chalk.green.bold('✅ Status: VALID'));
  } else {
    console.log(chalk.red.bold('❌ Status: INVALID'));
  }

  if (results.errors.length > 0) {
    console.log(chalk.red.bold('\n❌ Errors:'));
    results.errors.forEach((e) => {
      console.log(chalk.red(`  • ${e.message}`));
    });
  }

  if (results.warnings.length > 0) {
    console.log(chalk.yellow.bold('\n⚠️ Warnings:'));
    results.warnings.forEach((w) => {
      console.log(chalk.yellow(`  • ${w}`));
    });
  }

  if (results.fixes.length > 0) {
    console.log(chalk.blue.bold('\n🔧 Available Fixes:'));
    console.log(chalk.gray('  Run with --fix to apply'));
  }

  console.log(chalk.gray('\n━'.repeat(40)));
}

async function applyFixes(fixes) {
  const spinner = ora('Applying fixes...').start();

  for (const fix of fixes) {
    if (fix.type === 'mkdir') {
      await fs.ensureDir(fix.path);
    }
  }

  spinner.succeed(`Applied ${fixes.length} fixes`);
}

module.exports = { validateCommand };
