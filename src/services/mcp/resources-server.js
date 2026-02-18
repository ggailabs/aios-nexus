/**
 * AIOS Nexus - MCP Resources Registration (Server API)
 *
 * Registers all MCP resources using the low-level Server API
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');

const sdkServerPath = require.resolve('@modelcontextprotocol/sdk/server');
const sdkDir = sdkServerPath.split('/dist/')[0];
const typesPath = path.join(sdkDir, 'dist/cjs/types.js');
const { ListResourcesRequestSchema, ReadResourceRequestSchema } = require(typesPath);

function registerResources(server, config) {
  const resources = [
    { uri: 'context://docs', name: 'Documentation', description: 'Context documentation' },
    { uri: 'context://agents', name: 'Agents', description: 'Context agents' },
    { uri: 'context://skills', name: 'Skills', description: 'Context skills' },
    { uri: 'context://plans', name: 'Plans', description: 'Context plans' },
    { uri: 'context://workflows', name: 'Workflows', description: 'Context workflows' },
    { uri: 'aios://constitution', name: 'Constitution', description: 'AIOS constitution' },
    { uri: 'aios://config', name: 'Config', description: 'AIOS configuration' },
    { uri: 'aios://codebase-map', name: 'Codebase Map', description: 'Generated codebase map' },
    { uri: 'aios://workflow-state', name: 'Workflow State', description: 'Current workflow state' },
    { uri: 'aios://agent-registry', name: 'Agent Registry', description: 'All available agents' },
  ];

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: resources.map((r) => ({
      uri: r.uri,
      name: r.name,
      description: r.description,
      mimeType: 'text/plain',
    })),
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    try {
      const content = await readResource(uri, config);
      return {
        contents: [{ uri, mimeType: 'text/plain', text: content }],
      };
    } catch (error) {
      return {
        contents: [{ uri, mimeType: 'text/plain', text: `Error: ${error.message}` }],
      };
    }
  });
}

async function readResource(uri, config) {
  const [type, subpath] = uri.split('://');

  if (type === 'context') {
    return await readContextResource(subpath, config);
  } else if (type === 'aios') {
    return await readAIOSResource(subpath, config);
  }

  throw new Error(`Unknown resource type: ${type}`);
}

async function readContextResource(subpath, config) {
  const contextRoot = config.contextRoot;
  const [category] = subpath.split('/');

  switch (category) {
    case 'docs': {
      const docsPath = path.join(contextRoot, 'docs');
      return await listDirectory(docsPath, 'Documentation');
    }

    case 'agents': {
      const agentsPath = path.join(contextRoot, 'agents');
      return await listAgents(agentsPath);
    }

    case 'skills': {
      const skillsPath = path.join(contextRoot, 'skills');
      return await listDirectory(skillsPath, 'Skills');
    }

    case 'plans': {
      const plansPath = path.join(contextRoot, 'plans');
      return await listDirectory(plansPath, 'Plans');
    }

    case 'workflows': {
      const workflowsPath = path.join(contextRoot, 'workflows');
      return await listDirectory(workflowsPath, 'Workflows');
    }

    default:
      throw new Error(`Unknown context category: ${category}`);
  }
}

async function readAIOSResource(subpath, config) {
  const aiosRoot = config.aiosRoot;
  const contextRoot = config.contextRoot;

  switch (subpath) {
    case 'constitution': {
      const constitutionPath = path.join(aiosRoot, 'constitution-v2.md');
      if (await fs.pathExists(constitutionPath)) {
        return await fs.readFile(constitutionPath, 'utf-8');
      }
      return '# Constitution not found. Run init-context first.';
    }

    case 'config': {
      const configPath = path.join(aiosRoot, 'core-config-v2.yaml');
      if (await fs.pathExists(configPath)) {
        return await fs.readFile(configPath, 'utf-8');
      }
      return '# Config not found. Run init-context first.';
    }

    case 'codebase-map': {
      const mapPath = path.join(contextRoot, 'docs', 'codebase-map.json');
      if (await fs.pathExists(mapPath)) {
        return await fs.readFile(mapPath, 'utf-8');
      }
      return JSON.stringify({ error: 'Codebase map not found.' }, null, 2);
    }

    case 'workflow-state': {
      const statePath = path.join(process.cwd(), '.ai', 'workflow-state.json');
      if (await fs.pathExists(statePath)) {
        return await fs.readFile(statePath, 'utf-8');
      }
      return JSON.stringify({ status: 'No active workflow' }, null, 2);
    }

    case 'agent-registry': {
      const agentsPath = path.join(contextRoot, 'agents');
      const agents = await getAgentRegistry(agentsPath);
      return JSON.stringify(agents, null, 2);
    }

    default:
      throw new Error(`Unknown AIOS resource: ${subpath}`);
  }
}

async function listDirectory(dirPath, title) {
  if (!(await fs.pathExists(dirPath))) {
    return `# ${title}\n\nDirectory not found. Run init-context first.`;
  }

  const files = await fs.readdir(dirPath);
  const items = files.filter((f) => !f.startsWith('.'));

  let content = `# ${title}\n\nLocation: \`${dirPath}\`\n\n`;

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

async function listAgents(agentsPath) {
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

    content += `## @${agentId}\n\n**${title}**\n\n`;
  }

  return content;
}

async function getAgentRegistry(agentsPath) {
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

    agents.push({
      id: agentId,
      title: titleMatch ? titleMatch[1] : agentId,
      role: roleMatch ? roleMatch[1] : 'Unknown',
    });
  }

  return { agents, total: agents.length };
}

module.exports = { registerResources };
