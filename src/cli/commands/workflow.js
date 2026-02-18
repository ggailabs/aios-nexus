/**
 * AIOS Nexus - Workflow CLI Command
 *
 * CLI interface for workflow management
 * Version: 5.0.0
 */

const chalk = require('chalk');
const boxen = require('boxen');
const ora = require('ora');
const inquirer = require('inquirer');
const { WorkflowEngine } = require('../../services/workflow');

const engine = new WorkflowEngine();

/**
 * Main workflow command handler
 */
async function workflowCommand(action, options) {
  switch (action) {
    case 'start':
      await startWorkflow(options);
      break;
    case 'status':
      await statusWorkflow(options);
      break;
    case 'advance':
      await advanceWorkflow(options);
      break;
    case 'complete':
      await completeWorkflow(options);
      break;
    case 'cancel':
      await cancelWorkflow(options);
      break;
    case 'list':
      await listWorkflows(options);
      break;
    case 'history':
      await showHistory(options);
      break;
    case 'stats':
      await showStats(options);
      break;
    default:
      console.log(chalk.yellow(`Unknown action: ${action}`));
      console.log(
        'Available actions: start, status, advance, complete, cancel, list, history, stats'
      );
  }
}

/**
 * Start a new workflow
 */
async function startWorkflow(options) {
  const { name, description, scale } = options;

  // Interactive mode if no name provided
  if (!name) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Workflow name:',
        validate: (input) => input.length > 0 || 'Name is required',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description (optional):',
      },
      {
        type: 'list',
        name: 'scale',
        message: 'Select scale:',
        choices: [
          { name: 'QUICK (E→V) - 5min - Bug fixes, typos', value: 'QUICK' },
          { name: 'SMALL (P→E→V) - 15min - Simple features', value: 'SMALL' },
          { name: 'MEDIUM (P→R→E→V) - 30min - Regular features', value: 'MEDIUM' },
          { name: 'LARGE (P→R→E→V→C) - 60min - Complex systems', value: 'LARGE' },
        ],
        default: 'MEDIUM',
      },
    ]);

    Object.assign(options, answers);
  }

  try {
    const workflow = await engine.start(options.name || name, {
      description: options.description || description,
      scale: options.scale || scale,
    });

    console.log(chalk.green(`\n✅ Workflow started: ${workflow.id}`));
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Show workflow status
 */
async function statusWorkflow(options) {
  const status = await engine.status();

  if (!status) {
    console.log(chalk.yellow('\n⚠️ No active workflow'));
    console.log(chalk.gray('Start a new workflow with: aios-nexus workflow start'));
    return;
  }

  const progressBar = createProgressBar(status.progress);

  console.log(
    boxen(
      chalk.cyan.bold('📊 Workflow Status') +
        '\n' +
        chalk.gray('━'.repeat(36)) +
        '\n' +
        `📋 Name: ${chalk.white(status.name)}\n` +
        `🆔 ID: ${chalk.gray(status.id)}\n` +
        `📊 Scale: ${chalk.yellow(status.scale)}\n` +
        `📍 Phase: ${chalk.cyan(status.currentPhase)}\n` +
        `⏱️ Duration: ${status.duration}\n` +
        `📁 Artifacts: ${status.artifacts.length}\n` +
        `\n${progressBar}\n` +
        `Progress: ${status.progress}%`,
      { padding: 1, borderStyle: 'round' }
    )
  );

  // Show phase timeline
  console.log(chalk.cyan.bold('\n📅 Phase Timeline:'));
  status.phases.forEach((phase, index) => {
    const isCurrent = index === status.currentPhaseIndex;
    const isPast = index < status.currentPhaseIndex;

    if (isPast) {
      console.log(chalk.green(`  ✓ ${phase}`));
    } else if (isCurrent) {
      console.log(chalk.cyan.bold(`  ▶ ${phase} (current)`));
    } else {
      console.log(chalk.gray(`  ○ ${phase}`));
    }
  });
}

/**
 * Advance workflow to next phase
 */
async function advanceWorkflow(options) {
  const { force, notes } = options;

  try {
    const result = await engine.advance({ force, notes });

    if (result.advanced) {
      console.log(chalk.green(`\n✅ Advanced to phase: ${result.phase}`));
    } else {
      console.log(chalk.yellow('\n⚠️ Cannot advance - gate checks failed'));
    }
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Complete workflow
 */
async function completeWorkflow(options) {
  try {
    const result = await engine.complete();

    if (result.completed) {
      console.log(chalk.green.bold('\n🎉 Workflow completed successfully!'));
    }
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Cancel workflow
 */
async function cancelWorkflow(options) {
  const { reason } = options;

  try {
    const result = await engine.cancel(reason);

    console.log(chalk.yellow('\n⚠️ Workflow cancelled'));
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * List workflows
 */
async function listWorkflows(options) {
  const { active, history } = await engine.list();

  console.log(chalk.cyan.bold('\n📋 Workflows\n'));

  if (active) {
    console.log(chalk.green.bold('Active:'));
    console.log(`  ${active.name} (${active.scale}) - ${active.currentPhase}`);
  } else {
    console.log(chalk.gray('No active workflow'));
  }

  if (history.length > 0) {
    console.log(chalk.cyan.bold('\nHistory:'));
    history.slice(0, 10).forEach((w) => {
      const icon = w.status === 'completed' ? chalk.green('✓') : chalk.yellow('⚠');
      console.log(`  ${icon} ${w.name} (${w.scale}) - ${w.status}`);
    });
  }
}

/**
 * Show workflow history
 */
async function showHistory(options) {
  const { history } = await engine.list();

  console.log(chalk.cyan.bold('\n📜 Workflow History\n'));

  if (history.length === 0) {
    console.log(chalk.gray('No workflow history'));
    return;
  }

  history.forEach((w, index) => {
    const icon =
      w.status === 'completed'
        ? chalk.green('✓')
        : w.status === 'cancelled'
          ? chalk.yellow('⚠')
          : chalk.red('✗');
    console.log(`${icon} ${w.name}`);
    console.log(chalk.gray(`   Scale: ${w.scale} | Status: ${w.status}`));
    console.log(chalk.gray(`   Started: ${w.startTime}`));
    if (w.endTime) {
      console.log(chalk.gray(`   Ended: ${w.endTime}`));
    }
    console.log();
  });
}

/**
 * Show workflow statistics
 */
async function showStats(options) {
  const stats = await engine.state.getStats();

  console.log(
    boxen(
      chalk.cyan.bold('📊 Workflow Statistics') +
        '\n' +
        chalk.gray('━'.repeat(32)) +
        '\n' +
        `Total: ${stats.total}\n` +
        `Running: ${chalk.cyan(stats.running)}\n` +
        `Completed: ${chalk.green(stats.completed)}\n` +
        `Cancelled: ${chalk.yellow(stats.cancelled)}\n` +
        chalk.gray('━'.repeat(32)) +
        '\n' +
        'By Scale:\n' +
        `  QUICK: ${stats.byScale.QUICK}\n` +
        `  SMALL: ${stats.byScale.SMALL}\n` +
        `  MEDIUM: ${stats.byScale.MEDIUM}\n` +
        `  LARGE: ${stats.byScale.LARGE}`,
      { padding: 1, borderStyle: 'round' }
    )
  );
}

/**
 * Create progress bar
 */
function createProgressBar(percentage, width = 20) {
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;

  return chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty)) + ` ${percentage}%`;
}

module.exports = { workflowCommand };
