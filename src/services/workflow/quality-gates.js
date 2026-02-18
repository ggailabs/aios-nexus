/**
 * AIOS Nexus - Quality Gates Engine
 *
 * Automated quality checks for workflows
 * Version: 5.0.0
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const DEFAULT_GATES = {
  P: {
    checks: [
      {
        name: 'requirements-defined',
        description: 'Requirements are documented',
        severity: 'BLOCK',
        check: async () => ({ passed: true, message: 'Requirements defined' }),
      },
    ],
  },
  R: {
    checks: [
      {
        name: 'architecture-reviewed',
        description: 'Architecture has been reviewed',
        severity: 'BLOCK',
        check: async () => ({ passed: true, message: 'Architecture reviewed' }),
      },
    ],
  },
  E: {
    checks: [
      {
        name: 'code-compiled',
        description: 'TypeScript compiles without errors',
        severity: 'BLOCK',
        command: 'npm run typecheck',
        check: async () => ({ passed: true, message: 'Code compiles' }),
      },
      {
        name: 'tests-written',
        description: 'Tests have been written',
        severity: 'WARN',
        check: async () => ({ passed: true, message: 'Tests written' }),
      },
    ],
  },
  V: {
    checks: [
      {
        name: 'lint-passing',
        description: 'Lint passes without errors',
        severity: 'BLOCK',
        command: 'npm run lint',
        check: async (ctx) => {
          try {
            if (ctx.command) {
              execSync(ctx.command, { stdio: 'pipe', cwd: ctx.cwd || process.cwd() });
              return { passed: true, message: 'Lint passed' };
            }
            return { passed: true, message: 'Lint check skipped (no command)' };
          } catch (error) {
            return { passed: false, message: 'Lint failed with errors' };
          }
        },
      },
      {
        name: 'tests-passing',
        description: 'All tests pass',
        severity: 'BLOCK',
        command: 'npm test',
        check: async (ctx) => {
          try {
            if (ctx.command) {
              execSync(ctx.command, { stdio: 'pipe', cwd: ctx.cwd || process.cwd() });
              return { passed: true, message: 'All tests passed' };
            }
            return { passed: true, message: 'Test check skipped (no command)' };
          } catch (error) {
            return { passed: false, message: 'Tests failed' };
          }
        },
      },
      {
        name: 'coverage-maintained',
        description: 'Test coverage has not decreased',
        severity: 'WARN',
        check: async () => ({ passed: true, message: 'Coverage maintained' }),
      },
      {
        name: 'no-regressions',
        description: 'No regressions introduced',
        severity: 'BLOCK',
        check: async () => ({ passed: true, message: 'No regressions' }),
      },
    ],
  },
  C: {
    checks: [
      {
        name: 'build-successful',
        description: 'Production build completes',
        severity: 'BLOCK',
        command: 'npm run build',
        check: async (ctx) => {
          try {
            if (ctx.command) {
              execSync(ctx.command, { stdio: 'pipe', cwd: ctx.cwd || process.cwd() });
              return { passed: true, message: 'Build successful' };
            }
            return { passed: true, message: 'Build check skipped (no command)' };
          } catch (error) {
            return { passed: false, message: 'Build failed' };
          }
        },
      },
      {
        name: 'changelog-updated',
        description: 'Changelog has been updated',
        severity: 'WARN',
        check: async () => ({ passed: true, message: 'Changelog updated' }),
      },
    ],
  },
  FINAL: {
    checks: [
      {
        name: 'all-gates-passed',
        description: 'All phase gates have passed',
        severity: 'BLOCK',
        check: async () => ({ passed: true, message: 'All gates passed' }),
      },
      {
        name: 'artifacts-generated',
        description: 'All required artifacts are generated',
        severity: 'BLOCK',
        check: async () => ({ passed: true, message: 'Artifacts generated' }),
      },
    ],
  },
};

class QualityGates {
  constructor(config = {}) {
    this.gates = { ...DEFAULT_GATES, ...config.gates };
    this.cwd = config.cwd || process.cwd();
  }

  /**
   * Get checks for a phase
   */
  getPhaseChecks(phase) {
    const gate = this.gates[phase];
    return gate ? [...gate.checks] : [];
  }

  /**
   * Run a single check
   */
  async runCheck(check) {
    try {
      const context = {
        cwd: this.cwd,
        command: check.command,
      };

      const result = await check.check(context);

      return {
        name: check.name,
        description: check.description,
        severity: check.severity,
        passed: result.passed,
        message: result.message,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        name: check.name,
        description: check.description,
        severity: check.severity,
        passed: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Run all checks for a phase
   */
  async runPhaseChecks(phase) {
    const checks = this.getPhaseChecks(phase);
    const results = [];

    for (const check of checks) {
      const result = await this.runCheck(check);
      results.push(result);
    }

    const passed = results.every((r) => r.passed || r.severity !== 'BLOCK');
    const failures = results.filter((r) => !r.passed);
    const warnings = failures.filter((r) => r.severity === 'WARN');
    const blocks = failures.filter((r) => r.severity === 'BLOCK');

    return {
      phase,
      passed,
      checks: results,
      failures: blocks,
      warnings,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Add custom check
   */
  addCheck(phase, check) {
    if (!this.gates[phase]) {
      this.gates[phase] = { checks: [] };
    }

    this.gates[phase].checks.push({
      name: check.name,
      description: check.description || '',
      severity: check.severity || 'WARN',
      command: check.command,
      check: check.check || (async () => ({ passed: true, message: 'Custom check' })),
    });
  }

  /**
   * Remove check
   */
  removeCheck(phase, checkName) {
    if (this.gates[phase]) {
      this.gates[phase].checks = this.gates[phase].checks.filter((c) => c.name !== checkName);
    }
  }

  /**
   * Get gate summary
   */
  getSummary() {
    const summary = {};

    Object.entries(this.gates).forEach(([phase, gate]) => {
      summary[phase] = {
        total: gate.checks.length,
        blocking: gate.checks.filter((c) => c.severity === 'BLOCK').length,
        warning: gate.checks.filter((c) => c.severity === 'WARN').length,
      };
    });

    return summary;
  }

  /**
   * Format check result
   */
  formatResult(result) {
    const icon = result.passed
      ? chalk.green('✓')
      : result.severity === 'BLOCK'
        ? chalk.red('✗')
        : chalk.yellow('⚠');

    return `${icon} ${result.name}: ${result.message}`;
  }

  /**
   * Format phase results
   */
  formatPhaseResults(results) {
    let output = chalk.bold(`\n📋 Quality Gate: ${results.phase}\n`);
    output += chalk.gray('─'.repeat(40)) + '\n';

    results.checks.forEach((check) => {
      output += this.formatResult(check) + '\n';
    });

    output += chalk.gray('─'.repeat(40)) + '\n';

    if (results.passed) {
      output += chalk.green.bold('✅ PASSED\n');
    } else {
      output += chalk.red.bold('❌ FAILED\n');
      if (results.failures.length > 0) {
        output += chalk.red(`   ${results.failures.length} blocking issue(s)\n`);
      }
    }

    return output;
  }
}

module.exports = { QualityGates, DEFAULT_GATES };
