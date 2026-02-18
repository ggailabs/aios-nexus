/**
 * AIOS Nexus - Workflow Engine
 *
 * PREVC Workflow System: Plan → Review → Execute → Validate → Confirm
 * Version: 5.0.0
 *
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 */

const EventEmitter = require('events');
const path = require('path');
const fs = require('fs-extra');
const yaml = require('yaml');
const chalk = require('chalk');

const { PhaseSystem } = require('./phases');
const { ScaleRouter } = require('./scale-router');
const { WorkflowState } = require('./state');
const { QualityGates } = require('./quality-gates');

class WorkflowEngine extends EventEmitter {
  constructor(config = {}) {
    super();

    this.config = {
      contextRoot: config.contextRoot || path.join(process.cwd(), '.context'),
      stateFile: config.stateFile || path.join(process.cwd(), '.ai', 'workflow-state.json'),
      autoSave: config.autoSave !== false,
      ...config,
    };

    this.phases = new PhaseSystem();
    this.scaleRouter = new ScaleRouter();
    this.state = new WorkflowState(this.config.stateFile);
    this.qualityGates = new QualityGates();

    this.currentWorkflow = null;
    this.history = [];
  }

  /**
   * Start a new workflow
   */
  async start(name, options = {}) {
    const {
      description = '',
      scale = this.scaleRouter.detectScale(options),
      autoAdvance = false,
    } = options;

    const workflowId = this.generateId(name);
    const phases = this.scaleRouter.getPhases(scale);

    const workflow = {
      id: workflowId,
      name,
      description,
      scale,
      phases,
      currentPhase: phases[0],
      currentPhaseIndex: 0,
      status: 'running',
      startTime: new Date().toISOString(),
      endTime: null,
      artifacts: [],
      decisions: [],
      gates: {},
    };

    this.currentWorkflow = workflow;
    await this.state.save(workflow);

    this.emit('workflow:started', workflow);

    console.log(chalk.green.bold('\n🚀 Workflow Started'));
    console.log(chalk.gray('━'.repeat(40)));
    console.log(`📋 Name: ${chalk.cyan(name)}`);
    console.log(`📊 Scale: ${chalk.yellow(scale)}`);
    console.log(`🔄 Phases: ${chalk.blue(phases.join(' → '))}`);
    if (description) {
      console.log(`📝 Description: ${description}`);
    }
    console.log(chalk.gray('━'.repeat(40)));

    // Show current phase info
    await this.showPhaseInfo(workflow.currentPhase);

    return workflow;
  }

  /**
   * Advance to next phase
   */
  async advance(options = {}) {
    if (!this.currentWorkflow) {
      throw new Error('No active workflow. Start a workflow first.');
    }

    const { force = false, notes = '' } = options;
    const currentPhase = this.currentWorkflow.currentPhase;

    // Run quality gate for current phase
    const gateResult = await this.runPhaseGate(currentPhase);

    if (!gateResult.passed && !force) {
      console.log(chalk.red.bold('\n❌ Phase Gate Failed'));
      console.log(chalk.gray('━'.repeat(40)));
      gateResult.failures.forEach((f) => {
        console.log(chalk.red(`  • ${f.check}: ${f.message}`));
      });
      console.log(chalk.gray('\nUse --force to advance anyway.'));
      return { advanced: false, gateResult };
    }

    // Get next phase
    const nextIndex = this.currentWorkflow.currentPhaseIndex + 1;

    if (nextIndex >= this.currentWorkflow.phases.length) {
      return await this.complete();
    }

    const nextPhase = this.currentWorkflow.phases[nextIndex];

    // Record transition
    this.currentWorkflow.history = this.currentWorkflow.history || [];
    this.currentWorkflow.history.push({
      from: currentPhase,
      to: nextPhase,
      timestamp: new Date().toISOString(),
      notes,
      gateResult,
    });

    // Update workflow
    this.currentWorkflow.currentPhase = nextPhase;
    this.currentWorkflow.currentPhaseIndex = nextIndex;
    this.currentWorkflow.gates[currentPhase] = gateResult;

    await this.state.save(this.currentWorkflow);

    this.emit('workflow:advanced', {
      workflow: this.currentWorkflow,
      from: currentPhase,
      to: nextPhase,
    });

    console.log(chalk.green.bold('\n⏭️ Phase Advanced'));
    console.log(chalk.gray('━'.repeat(40)));
    console.log(`  ${chalk.gray(currentPhase)} → ${chalk.cyan.bold(nextPhase)}`);
    console.log(
      `  Progress: [${this.currentWorkflow.phases
        .map((p, i) =>
          i < nextIndex ? chalk.green(p) : i === nextIndex ? chalk.cyan.bold(p) : chalk.gray(p)
        )
        .join(' → ')}]`
    );
    console.log(chalk.gray('━'.repeat(40)));

    // Show next phase info
    await this.showPhaseInfo(nextPhase);

    return { advanced: true, phase: nextPhase, workflow: this.currentWorkflow };
  }

  /**
   * Complete the workflow
   */
  async complete() {
    if (!this.currentWorkflow) {
      throw new Error('No active workflow.');
    }

    // Run final quality gate
    const finalGate = await this.runFinalGate();

    this.currentWorkflow.status = 'completed';
    this.currentWorkflow.endTime = new Date().toISOString();
    this.currentWorkflow.gates.final = finalGate;

    await this.state.save(this.currentWorkflow);

    const duration = this.calculateDuration(
      this.currentWorkflow.startTime,
      this.currentWorkflow.endTime
    );

    this.emit('workflow:completed', this.currentWorkflow);

    console.log(chalk.green.bold('\n✅ Workflow Completed'));
    console.log(chalk.gray('━'.repeat(40)));
    console.log(`📋 Name: ${this.currentWorkflow.name}`);
    console.log(`📊 Scale: ${this.currentWorkflow.scale}`);
    console.log(`⏱️ Duration: ${duration}`);
    console.log(`📁 Artifacts: ${this.currentWorkflow.artifacts.length}`);
    console.log(chalk.gray('━'.repeat(40)));

    const completed = this.currentWorkflow;
    this.currentWorkflow = null;
    this.history.push(completed);

    return { completed: true, workflow: completed };
  }

  /**
   * Cancel the current workflow
   */
  async cancel(reason = '') {
    if (!this.currentWorkflow) {
      throw new Error('No active workflow.');
    }

    this.currentWorkflow.status = 'cancelled';
    this.currentWorkflow.endTime = new Date().toISOString();
    this.currentWorkflow.cancelReason = reason;

    await this.state.save(this.currentWorkflow);

    this.emit('workflow:cancelled', this.currentWorkflow);

    console.log(chalk.yellow.bold('\n⚠️ Workflow Cancelled'));
    console.log(chalk.gray('━'.repeat(40)));
    if (reason) {
      console.log(`Reason: ${reason}`);
    }
    console.log(chalk.gray('━'.repeat(40)));

    const cancelled = this.currentWorkflow;
    this.currentWorkflow = null;

    return { cancelled: true, workflow: cancelled };
  }

  /**
   * Get current workflow status
   */
  async status() {
    if (!this.currentWorkflow) {
      // Try to load from state
      const saved = await this.state.load();
      if (saved && saved.status === 'running') {
        this.currentWorkflow = saved;
      } else {
        return null;
      }
    }

    return {
      id: this.currentWorkflow.id,
      name: this.currentWorkflow.name,
      description: this.currentWorkflow.description,
      scale: this.currentWorkflow.scale,
      phases: this.currentWorkflow.phases,
      currentPhase: this.currentWorkflow.currentPhase,
      currentPhaseIndex: this.currentWorkflow.currentPhaseIndex,
      status: this.currentWorkflow.status,
      startTime: this.currentWorkflow.startTime,
      duration: this.calculateDuration(this.currentWorkflow.startTime, new Date().toISOString()),
      artifacts: this.currentWorkflow.artifacts,
      gates: this.currentWorkflow.gates,
      progress: this.calculateProgress(),
    };
  }

  /**
   * Record a decision in the workflow
   */
  async recordDecision(decision) {
    if (!this.currentWorkflow) {
      throw new Error('No active workflow.');
    }

    const entry = {
      id: this.generateId('decision'),
      phase: this.currentWorkflow.currentPhase,
      timestamp: new Date().toISOString(),
      ...decision,
    };

    this.currentWorkflow.decisions.push(entry);
    await this.state.save(this.currentWorkflow);

    this.emit('workflow:decision', entry);

    return entry;
  }

  /**
   * Add an artifact to the workflow
   */
  async addArtifact(artifact) {
    if (!this.currentWorkflow) {
      throw new Error('No active workflow.');
    }

    const entry = {
      id: this.generateId('artifact'),
      phase: this.currentWorkflow.currentPhase,
      timestamp: new Date().toISOString(),
      ...artifact,
    };

    this.currentWorkflow.artifacts.push(entry);
    await this.state.save(this.currentWorkflow);

    this.emit('workflow:artifact', entry);

    return entry;
  }

  /**
   * Run quality gate for a phase
   */
  async runPhaseGate(phase) {
    const checks = this.qualityGates.getPhaseChecks(phase);
    const results = {
      passed: true,
      failures: [],
      warnings: [],
      timestamp: new Date().toISOString(),
    };

    for (const check of checks) {
      try {
        const result = await this.qualityGates.runCheck(check);
        if (!result.passed) {
          if (check.severity === 'BLOCK') {
            results.passed = false;
            results.failures.push({
              check: check.name,
              message: result.message,
              severity: check.severity,
            });
          } else {
            results.warnings.push({
              check: check.name,
              message: result.message,
              severity: check.severity,
            });
          }
        }
      } catch (error) {
        results.warnings.push({
          check: check.name,
          message: error.message,
          severity: 'WARN',
        });
      }
    }

    return results;
  }

  /**
   * Run final quality gate
   */
  async runFinalGate() {
    return await this.runPhaseGate('FINAL');
  }

  /**
   * Show phase information
   */
  async showPhaseInfo(phase) {
    const info = this.phases.getPhaseInfo(phase);

    console.log(chalk.cyan.bold(`\n📍 Current Phase: ${info.name}`));
    console.log(chalk.gray('─'.repeat(40)));
    console.log(chalk.white(info.description));
    console.log(chalk.gray('\n👥 Agents:'));
    info.agents.forEach((agent) => {
      console.log(`   ${chalk.blue(`@${agent}`)}`);
    });
    console.log(chalk.gray('\n📤 Outputs:'));
    info.outputs.forEach((output) => {
      console.log(`   • ${output}`);
    });
    console.log(chalk.gray('─'.repeat(40)));
  }

  /**
   * Calculate progress percentage
   */
  calculateProgress() {
    if (!this.currentWorkflow) return 0;

    const totalPhases = this.currentWorkflow.phases.length;
    const currentIndex = this.currentWorkflow.currentPhaseIndex;

    return Math.round(((currentIndex + 1) / totalPhases) * 100);
  }

  /**
   * Calculate duration between timestamps
   */
  calculateDuration(start, end) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diffMs = endTime - startTime;

    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  /**
   * Generate unique ID
   */
  generateId(prefix = 'workflow') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `${prefix}-${timestamp}-${random}`;
  }

  /**
   * List all workflows (active and history)
   */
  async list() {
    const saved = await this.state.listAll();
    return {
      active: this.currentWorkflow,
      history: [...this.history, ...saved.filter((w) => w.status !== 'running')],
    };
  }
}

module.exports = { WorkflowEngine };
