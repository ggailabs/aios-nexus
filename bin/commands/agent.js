/**
 * AIOS Nexus - Agent Command
 *
 * Manage AI agents
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');

async function agentCommand(action, options) {
  const contextRoot = path.join(process.cwd(), '.context');
  const agentsPath = path.join(contextRoot, 'agents');

  switch (action) {
    case 'list':
    case 'ls':
      await listAgents(agentsPath);
      break;

    case 'get':
      await getAgent(agentsPath, options.id);
      break;

    case 'activate':
      await activateAgent(agentsPath, options.id);
      break;

    case 'create':
      await createAgent(agentsPath, options);
      break;

    default:
      console.log(chalk.yellow(`Unknown action: ${action}`));
      console.log(chalk.gray('Available actions: list, get, activate, create'));
  }
}

async function listAgents(agentsPath) {
  const spinner = ora('Loading agents...').start();

  if (!(await fs.pathExists(agentsPath))) {
    spinner.fail('Agents directory not found. Run `aios-nexus init` first.');
    return;
  }

  const files = await fs.readdir(agentsPath);
  const agents = files.filter((f) => f.endsWith('.md') && f !== 'README.md');

  spinner.stop();

  console.log(chalk.cyan.bold('\n🤖 Available Agents\n'));
  console.log(chalk.gray('━'.repeat(50)));

  for (const file of agents) {
    const agentId = file.replace('.md', '');
    const content = await fs.readFile(path.join(agentsPath, file), 'utf-8');

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : agentId;

    const roleMatch = content.match(/\*\*Role:\*\*\s*(.+)/);
    const role = roleMatch ? roleMatch[1] : 'General';

    console.log(chalk.white(`  @${agentId}`));
    console.log(chalk.gray(`    ${title}`));
    console.log(chalk.dim(`    Role: ${role}`));
    console.log();
  }

  console.log(chalk.gray('━'.repeat(50)));
  console.log(chalk.gray(`Total: ${agents.length} agents`));
}

async function getAgent(agentsPath, agentId) {
  if (!agentId) {
    console.log(chalk.red('Error: Agent ID required. Use --id <agent-id>'));
    return;
  }

  const agentPath = path.join(agentsPath, `${agentId}.md`);

  if (!(await fs.pathExists(agentPath))) {
    console.log(chalk.red(`Agent not found: ${agentId}`));
    return;
  }

  const content = await fs.readFile(agentPath, 'utf-8');

  console.log(chalk.cyan.bold(`\n🤖 Agent: @${agentId}\n`));
  console.log(chalk.gray('━'.repeat(50)));
  console.log(content);
  console.log(chalk.gray('\n━'.repeat(50)));
}

async function activateAgent(agentsPath, agentId) {
  if (!agentId) {
    console.log(chalk.red('Error: Agent ID required. Use --id <agent-id>'));
    return;
  }

  const agentPath = path.join(agentsPath, `${agentId}.md`);

  if (!(await fs.pathExists(agentPath))) {
    console.log(chalk.red(`Agent not found: ${agentId}`));
    return;
  }

  const content = await fs.readFile(agentPath, 'utf-8');

  console.log(chalk.cyan.bold(`\n🤖 Agent Activated: @${agentId}\n`));
  console.log(chalk.gray('━'.repeat(50)));

  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    console.log(chalk.white.bold(titleMatch[1]));
    console.log();
  }

  const commands = ['*help', '*status', '*exit'];
  console.log(chalk.white('Commands:'));
  commands.forEach((cmd) => {
    console.log(chalk.gray(`  ${cmd}`));
  });

  console.log(chalk.gray('\n━'.repeat(50)));
  console.log(chalk.gray('\nAgent is now active. Use *exit to deactivate.\n'));
  console.log(content);
}

async function createAgent(agentsPath, options) {
  const { id } = options;

  if (!id) {
    console.log(chalk.red('Error: Agent ID required. Use --id <agent-id>'));
    return;
  }

  const agentPath = path.join(agentsPath, `${id}.md`);

  if (await fs.pathExists(agentPath)) {
    console.log(chalk.red(`Agent already exists: ${id}`));
    return;
  }

  const template = `# ${id.charAt(0).toUpperCase() + id.slice(1)} Agent

> Expert in ${id} tasks

**Role:** ${id} specialist

**Focus:** ${id}-related tasks and decisions

## Capabilities

- Capability 1
- Capability 2
- Capability 3

## Guidelines

1. Guideline 1
2. Guideline 2
3. Guideline 3

## Tools

- Tool 1
- Tool 2
- Tool 3

## Examples

\`\`\`
Example usage
\`\`\`
`;

  await fs.writeFile(agentPath, template);
  console.log(chalk.green(`Agent created: @${id}`));
  console.log(chalk.gray(`Location: ${agentPath}`));
}

module.exports = { agentCommand };
