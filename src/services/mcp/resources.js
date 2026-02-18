/**
 * AIOS Nexus - MCP Resource Registry
 *
 * Registers all MCP resources for the server
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');

class ResourceRegistry {
  constructor(config, server) {
    this.config = config;
    this.server = server;
    this.registeredCount = 0;
  }

  async register() {
    this.registerDocsResource();
    this.registerAgentsResource();
    this.registerSkillsResource();
    this.registerPlansResource();
    this.registerWorkflowsResource();
    this.registerConstitutionResource();
    this.registerConfigResource();
    this.registerCodebaseMapResource();
    this.registerWorkflowStateResource();
    this.registerAgentRegistryResource();

    this.registeredCount = 10;
  }

  registerDocsResource() {
    this.server.resource('context://docs', 'Documentation', async (uri) => {
      const docsPath = path.join(this.config.contextRoot, 'docs');
      if (!(await fs.pathExists(docsPath))) {
        return {
          contents: [
            { uri, text: '# Documentation\n\nDirectory not found. Run init-context first.' },
          ],
        };
      }

      const content = await this.listDirectory(docsPath, 'Documentation');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerAgentsResource() {
    this.server.resource('context://agents', 'Agents', async (uri) => {
      const agentsPath = path.join(this.config.contextRoot, 'agents');
      if (!(await fs.pathExists(agentsPath))) {
        return {
          contents: [{ uri, text: '# Agents\n\nDirectory not found. Run init-context first.' }],
        };
      }

      const content = await this.listAgents(agentsPath);
      return { contents: [{ uri, text: content }] };
    });
  }

  registerSkillsResource() {
    this.server.resource('context://skills', 'Skills', async (uri) => {
      const skillsPath = path.join(this.config.contextRoot, 'skills');
      if (!(await fs.pathExists(skillsPath))) {
        return {
          contents: [{ uri, text: '# Skills\n\nDirectory not found. Run init-context first.' }],
        };
      }

      const content = await this.listDirectory(skillsPath, 'Skills');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerPlansResource() {
    this.server.resource('context://plans', 'Plans', async (uri) => {
      const plansPath = path.join(this.config.contextRoot, 'plans');
      if (!(await fs.pathExists(plansPath))) {
        return {
          contents: [{ uri, text: '# Plans\n\nDirectory not found. Run init-context first.' }],
        };
      }

      const content = await this.listDirectory(plansPath, 'Plans');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerWorkflowsResource() {
    this.server.resource('context://workflows', 'Workflows', async (uri) => {
      const workflowsPath = path.join(this.config.contextRoot, 'workflows');
      if (!(await fs.pathExists(workflowsPath))) {
        return {
          contents: [{ uri, text: '# Workflows\n\nDirectory not found. Run init-context first.' }],
        };
      }

      const content = await this.listDirectory(workflowsPath, 'Workflows');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerConstitutionResource() {
    this.server.resource('aios://constitution', 'AIOS Constitution', async (uri) => {
      const constitutionPath = path.join(this.config.aiosRoot, 'constitution-v2.md');
      if (!(await fs.pathExists(constitutionPath))) {
        return {
          contents: [{ uri, text: '# Constitution not found. Run init-context first.' }],
        };
      }

      const content = await fs.readFile(constitutionPath, 'utf-8');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerConfigResource() {
    this.server.resource('aios://config', 'AIOS Configuration', async (uri) => {
      const configPath = path.join(this.config.aiosRoot, 'core-config-v2.yaml');
      if (!(await fs.pathExists(configPath))) {
        return {
          contents: [{ uri, text: '# Config not found. Run init-context first.' }],
        };
      }

      const content = await fs.readFile(configPath, 'utf-8');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerCodebaseMapResource() {
    this.server.resource('aios://codebase-map', 'Codebase Map', async (uri) => {
      const mapPath = path.join(this.config.contextRoot, 'docs', 'codebase-map.json');
      if (!(await fs.pathExists(mapPath))) {
        return {
          contents: [
            {
              uri,
              text: JSON.stringify(
                { error: 'Codebase map not found. Run scaffold analyze.' },
                null,
                2
              ),
            },
          ],
        };
      }

      const content = await fs.readFile(mapPath, 'utf-8');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerWorkflowStateResource() {
    this.server.resource('aios://workflow-state', 'Workflow State', async (uri) => {
      const statePath = path.join(process.cwd(), '.ai', 'workflow-state.json');
      if (!(await fs.pathExists(statePath))) {
        return {
          contents: [{ uri, text: JSON.stringify({ status: 'No active workflow' }, null, 2) }],
        };
      }

      const content = await fs.readFile(statePath, 'utf-8');
      return { contents: [{ uri, text: content }] };
    });
  }

  registerAgentRegistryResource() {
    this.server.resource('aios://agent-registry', 'Agent Registry', async (uri) => {
      const agentsPath = path.join(this.config.contextRoot, 'agents');
      const agents = await this.getAgentRegistry(agentsPath);
      return { contents: [{ uri, text: JSON.stringify(agents, null, 2) }] };
    });
  }

  async listDirectory(dirPath, title) {
    if (!(await fs.pathExists(dirPath))) {
      return `# ${title}\n\nDirectory not found. Run init-context first.`;
    }

    const files = await fs.readdir(dirPath);
    const items = files.filter((f) => !f.startsWith('.'));

    let content = `# ${title}\n\n`;
    content += `Location: \`${dirPath}\`\n\n`;

    if (items.length === 0) {
      content += '_No items found._\n';
    } else {
      content += `## Items (${items.length})\n\n`;
      for (const item of items) {
        const stat = await fs.stat(path.join(dirPath, item));
        if (stat.isDirectory()) {
          content += `- 📁 **${item}/**\n`;
        } else {
          content += `- 📄 ${item}\n`;
        }
      }
    }

    return content;
  }

  async listAgents(agentsPath) {
    if (!(await fs.pathExists(agentsPath))) {
      return '# Agents\n\nDirectory not found. Run init-context first.';
    }

    const files = await fs.readdir(agentsPath);
    const agents = files.filter((f) => f.endsWith('.md') && f !== 'README.md');

    let content = '# Available Agents\n\n';
    content += `Total: ${agents.length}\n\n`;

    for (const file of agents) {
      const agentId = file.replace('.md', '');
      const filePath = path.join(agentsPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');

      const titleMatch = fileContent.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : agentId;

      content += `## @${agentId}\n\n`;
      content += `**${title}**\n\n`;

      const descMatch = fileContent.match(/^>\s*(.+)$/m);
      if (descMatch) {
        content += `${descMatch[1]}\n\n`;
      }

      content += `[View full agent →](context://agents/${file})\n\n`;
    }

    return content;
  }

  async getAgentRegistry(agentsPath) {
    if (!(await fs.pathExists(agentsPath))) {
      return { agents: [], error: 'Agents directory not found' };
    }

    const files = await fs.readdir(agentsPath);
    const agents = [];

    for (const file of files.filter((f) => f.endsWith('.md') && f !== 'README.md')) {
      const agentId = file.replace('.md', '');
      const filePath = path.join(agentsPath, file);
      const content = await fs.readFile(filePath, 'utf-8');

      const titleMatch = content.match(/^#\s+(.+)$/m);
      const roleMatch = content.match(/\*\*Role:\*\*\s*(.+)/);
      const focusMatch = content.match(/\*\*Focus:\*\*\s*(.+)/);

      agents.push({
        id: agentId,
        title: titleMatch ? titleMatch[1] : agentId,
        role: roleMatch ? roleMatch[1] : 'Unknown',
        focus: focusMatch ? focusMatch[1] : 'General',
        resource: `context://agents/${file}`,
      });
    }

    return { agents, total: agents.length };
  }

  count() {
    return this.registeredCount;
  }
}

module.exports = { ResourceRegistry };
