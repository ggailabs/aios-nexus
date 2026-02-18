/**
 * AIOS Nexus - Parity Validator
 *
 * Validates sync integrity between source and targets
 * Version: 5.0.0
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

class ParityValidator {
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Validate target parity
   */
  async validate(target, options = {}) {
    const { contextRoot, targetRoot, strict = false } = options;

    const issues = [];
    const warnings = [];

    try {
      // Check target exists
      if (!(await fs.pathExists(targetRoot))) {
        return {
          valid: false,
          issues: ['Target directory does not exist'],
          warnings: [],
        };
      }

      // Check source exists
      if (!(await fs.pathExists(contextRoot))) {
        return {
          valid: false,
          issues: ['Source context directory does not exist'],
          warnings: [],
        };
      }

      // Compare file counts
      const sourceFiles = await this.countFiles(contextRoot);
      const targetFiles = await this.countFiles(targetRoot);

      if (sourceFiles === 0) {
        issues.push('No source files found');
      }

      if (targetFiles === 0 && sourceFiles > 0) {
        issues.push('Target has no files but source has content');
      }

      // Strict mode: check file hashes
      if (strict) {
        const sourceHashes = await this.getDirectoryHashes(contextRoot);
        const targetHashes = await this.getDirectoryHashes(targetRoot);

        // Check for missing files
        for (const [file, hash] of Object.entries(sourceHashes)) {
          const targetFile = this.mapToTarget(file, target);
          if (!targetHashes[targetFile] && !targetHashes[file]) {
            warnings.push(`Missing in target: ${file}`);
          }
        }
      }

      // Check required files
      const requiredFiles = this.getRequiredFiles(target);
      for (const required of requiredFiles) {
        const requiredPath = path.join(targetRoot, required);
        if (!(await fs.pathExists(requiredPath))) {
          if (strict) {
            issues.push(`Missing required file: ${required}`);
          } else {
            warnings.push(`Missing recommended file: ${required}`);
          }
        }
      }

      return {
        valid: issues.length === 0,
        issues,
        warnings,
        stats: {
          sourceFiles,
          targetFiles,
        },
      };
    } catch (error) {
      return {
        valid: false,
        issues: [`Validation error: ${error.message}`],
        warnings: [],
      };
    }
  }

  /**
   * Count files in directory
   */
  async countFiles(dir) {
    if (!(await fs.pathExists(dir))) return 0;

    let count = 0;
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        count += await this.countFiles(path.join(dir, item.name));
      } else if (item.isFile() && item.name.endsWith('.md')) {
        count++;
      }
    }

    return count;
  }

  /**
   * Get file hashes for directory
   */
  async getDirectoryHashes(dir) {
    const hashes = {};

    if (!(await fs.pathExists(dir))) return hashes;

    const processDir = async (currentDir, baseDir) => {
      const items = await fs.readdir(currentDir, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(currentDir, item.name);

        if (item.isDirectory()) {
          await processDir(fullPath, baseDir);
        } else if (item.isFile() && item.name.endsWith('.md')) {
          const content = await fs.readFile(fullPath, 'utf-8');
          const hash = crypto.createHash('md5').update(content).digest('hex');
          const relativePath = path.relative(baseDir, fullPath);
          hashes[relativePath] = hash;
        }
      }
    };

    await processDir(dir, dir);
    return hashes;
  }

  /**
   * Map source file to target
   */
  mapToTarget(sourceFile, target) {
    // Simple mapping - can be extended per IDE
    return sourceFile;
  }

  /**
   * Get required files for target
   */
  getRequiredFiles(target) {
    const required = {
      claude: ['CLAUDE.md'],
      cursor: ['rules'],
      codex: ['AGENTS.md'],
      copilot: ['copilot-instructions.md'],
      vscode: ['settings.json'],
    };

    return required[target] || [];
  }

  /**
   * Compare two directories
   */
  async compare(sourceDir, targetDir) {
    const sourceHashes = await this.getDirectoryHashes(sourceDir);
    const targetHashes = await this.getDirectoryHashes(targetDir);

    const comparison = {
      added: [],
      removed: [],
      modified: [],
      unchanged: [],
    };

    // Check source files
    for (const [file, hash] of Object.entries(sourceHashes)) {
      if (!targetHashes[file]) {
        comparison.added.push(file);
      } else if (targetHashes[file] !== hash) {
        comparison.modified.push(file);
      } else {
        comparison.unchanged.push(file);
      }
    }

    // Check for removed files
    for (const file of Object.keys(targetHashes)) {
      if (!sourceHashes[file]) {
        comparison.removed.push(file);
      }
    }

    return comparison;
  }

  /**
   * Generate parity report
   */
  async generateReport(targets, options = {}) {
    const report = {
      timestamp: new Date().toISOString(),
      targets: {},
    };

    for (const target of targets) {
      const validation = await this.validate(target, options);
      report.targets[target] = {
        valid: validation.valid,
        issues: validation.issues.length,
        warnings: validation.warnings.length,
        stats: validation.stats,
      };
    }

    return report;
  }
}

module.exports = { ParityValidator };
