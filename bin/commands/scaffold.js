/**
 * AIOS Nexus - Scaffold CLI Command
 *
 * CLI interface for AI scaffolding
 * Version: 5.0.0
 */

const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const boxen = require('boxen').default;
const fs = require('fs-extra');
const path = require('path');
const { AIScaffolder } = require(path.join(__dirname, '../../src/core/scaffolder');

/**
 * Main scaffold command handler
 */
async function scaffoldCommand(action, options) {
  const scaffolder = new AIScaffolder();

  switch (action) {
    case 'analyze':
      await analyzeProject(scaffolder, options);
      break;
    case 'generate':
      await generateContent(scaffolder, options);
      break;
    case 'preview':
      await previewContent(scaffolder, options);
      break;
    case 'fill':
      await fillSpecific(scaffolder, options);
      break;
    case 'wizard':
      await runWizard(scaffolder, options);
      break;
    default:
      console.log(chalk.yellow(`Unknown action: ${action}`));
      console.log('Available actions: analyze, generate, preview, fill, wizard');
  }
}

/**
 * Analyze project
 */
async function analyzeProject(scaffolder, options) {
  const spinner = ora('Analyzing project...').start();

  try {
    const { analysis } = await scaffolder.analyzeAndGenerate({ generate: false });
    spinner.succeed('Analysis complete');

    displayAnalysis(analysis);
  } catch (error) {
    spinner.fail('Analysis failed');
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Generate content
 */
async function generateContent(scaffolder, options) {
  const spinner = ora('Analyzing and generating content...').start();

  try {
    const { analysis, generated } = await scaffolder.analyzeAndGenerate(options);

    spinner.text = 'Writing files...';

    // Write generated content
    const written = await scaffolder.writeContent(generated, options);

    spinner.succeed(`Generated ${written.length} files`);

    console.log(chalk.green.bold('\n✅ Content generated successfully'));
    console.log(chalk.gray('━'.repeat(40)));

    written.forEach((file) => {
      console.log(chalk.blue(`  ✓ ${file}`));
    });

    console.log(chalk.gray('━'.repeat(40)));
    console.log(chalk.cyan('\nNext steps:'));
    console.log('  1. Review generated content in .context/');
    console.log('  2. Run `aios-nexus sync` to sync to IDEs');
  } catch (error) {
    spinner.fail('Generation failed');
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Preview content
 */
async function previewContent(scaffolder, options) {
  try {
    await scaffolder.preview(options);
  } catch (error) {
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Fill specific content
 */
async function fillSpecific(scaffolder, options) {
  const { target, file } = options;

  if (!target) {
    console.log(chalk.yellow('Please specify --target (docs, agents, skills, workflows)'));
    return;
  }

  const spinner = ora(`Filling ${target}...`).start();

  try {
    const content = await scaffolder.fillFile(target, file, options);

    if (content) {
      console.log(chalk.green('\nGenerated content:'));
      console.log(chalk.gray('─'.repeat(40)));
      console.log(content);
    } else {
      spinner.fail('No content generated');
    }
  } catch (error) {
    spinner.fail('Fill failed');
    console.log(chalk.red(`\n❌ Error: ${error.message}`));
  }
}

/**
 * Interactive wizard
 */
async function runWizard(scaffolder, options) {
  console.log(
    boxen(
      chalk.cyan.bold('🧙 AI Scaffolding Wizard') +
        '\n' +
        chalk.gray('━'.repeat(30)) +
        '\n' +
        chalk.white('This wizard will guide you through\ngenerating context for your project.'),
      { padding: 1, borderStyle: 'round' }
    )
  );

  // Step 1: Analyze
  const { shouldAnalyze } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldAnalyze',
      message: 'Start by analyzing your project?',
      default: true,
    },
  ]);

  if (shouldAnalyze) {
    const spinner = ora('Analyzing project...').start();
    const { analysis } = await scaffolder.analyzeAndGenerate({ generate: false });
    spinner.succeed('Analysis complete');

    displayAnalysis(analysis);

    // Step 2: What to generate
    const { generateTargets } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'generateTargets',
        message: 'What would you like to generate?',
        choices: [
          { name: 'Documentation (docs/)', value: 'docs', checked: true },
          { name: 'Agent recommendations (agents/)', value: 'agents', checked: true },
          { name: 'Skill recommendations (skills/)', value: 'skills', checked: true },
          { name: 'Workflow recommendations (workflows/)', value: 'workflows', checked: false },
        ],
      },
    ]);

    if (generateTargets.length === 0) {
      console.log(chalk.yellow('\nNo targets selected. Exiting.'));
      return;
    }

    // Step 3: Generate
    const { shouldGenerate } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldGenerate',
        message: 'Generate selected content?',
        default: true,
      },
    ]);

    if (shouldGenerate) {
      const genSpinner = ora('Generating content...').start();

      const { generated } = await scaffolder.analyzeAndGenerate({
        docs: generateTargets.includes('docs'),
        agents: generateTargets.includes('agents'),
        skills: generateTargets.includes('skills'),
        workflows: generateTargets.includes('workflows'),
      });

      genSpinner.succeed('Content generated');

      // Step 4: Write
      const { shouldWrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldWrite',
          message: 'Write content to .context/ directory?',
          default: true,
        },
      ]);

      if (shouldWrite) {
        const writeSpinner = ora('Writing files...').start();
        const written = await scaffolder.writeContent(generated);
        writeSpinner.succeed(`Wrote ${written.length} files`);

        console.log(chalk.green.bold('\n🎉 Scaffolding complete!'));

        // Step 5: Sync
        const { shouldSync } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'shouldSync',
            message: 'Sync to IDEs now?',
            default: false,
          },
        ]);

        if (shouldSync) {
          console.log(chalk.cyan('\nRun: aios-nexus sync'));
        }
      }
    }
  }
}

/**
 * Display analysis results
 */
function displayAnalysis(analysis) {
  console.log(
    boxen(chalk.cyan.bold('📊 Project Analysis') + '\n' + chalk.gray('━'.repeat(36)), {
      padding: 1,
      borderStyle: 'round',
    })
  );

  // Tech Stack
  console.log(chalk.white.bold('\n🔧 Tech Stack:'));
  if (analysis.techStack.frameworks.length > 0) {
    console.log(chalk.blue(`  Frameworks: ${analysis.techStack.frameworks.join(', ')}`));
  }
  console.log(
    chalk.blue(`  Languages: ${analysis.techStack.languages.join(', ') || 'None detected'}`)
  );
  if (analysis.techStack.databases.length > 0) {
    console.log(chalk.blue(`  Databases: ${analysis.techStack.databases.join(', ')}`));
  }
  if (analysis.techStack.tools.length > 0) {
    console.log(chalk.blue(`  Tools: ${analysis.techStack.tools.slice(0, 5).join(', ')}`));
  }

  // Structure
  console.log(chalk.white.bold('\n📁 Structure:'));
  console.log(chalk.blue(`  Type: ${analysis.structure.type}`));
  if (analysis.structure.architecture) {
    console.log(chalk.blue(`  Architecture: ${analysis.structure.architecture}`));
  }
  console.log(chalk.blue(`  Total files: ${analysis.structure.totalFiles}`));

  // Patterns
  if (analysis.patterns && analysis.patterns.length > 0) {
    console.log(chalk.white.bold('\n🎨 Patterns:'));
    analysis.patterns.forEach((p) => {
      console.log(chalk.blue(`  • ${p}`));
    });
  }

  // Symbols summary
  if (analysis.symbols) {
    console.log(chalk.white.bold('\n📝 Symbols:'));
    console.log(chalk.blue(`  Classes: ${analysis.symbols.classes.length}`));
    console.log(chalk.blue(`  Functions: ${analysis.symbols.functions.length}`));
    console.log(chalk.blue(`  Interfaces: ${analysis.symbols.interfaces.length}`));
  }
}

module.exports = { scaffoldCommand };
