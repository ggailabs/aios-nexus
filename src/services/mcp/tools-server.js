/**
 * AIOS Nexus - MCP Tools Registration (Server API)
 *
 * Registers all MCP tools using the low-level Server API
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const yaml = require('yaml');

const sdkServerPath = require.resolve('@modelcontextprotocol/sdk/server');
const sdkDir = sdkServerPath.split('/dist/')[0];
const typesPath = path.join(sdkDir, 'dist/cjs/types.js');
const { ListToolsRequestSchema, CallToolRequestSchema } = require(typesPath);

const { WorkflowEngine } = require('../workflow');
const { Scaffolder } = require('../../core/scaffolder');
const { SyncEngine } = require('../sync');

function registerTools(server, config) {
  const workflowEngine = new WorkflowEngine({ contextRoot: config.contextRoot });
  const scaffolder = new Scaffolder({
    contextRoot: config.contextRoot,
    aiosRoot: config.aiosRoot,
  });
  const syncEngine = new SyncEngine({ contextRoot: config.contextRoot });

  const tools = [
    {
      name: 'init-context',
      description: 'Initialize .context/ scaffolding structure',
      inputSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['docs', 'agents', 'skills', 'plans', 'workflows', 'all'],
            default: 'all',
          },
          force: { type: 'boolean', default: false },
        },
      },
      handler: async (args) => {
        const { type = 'all', force = false } = args;
        const contextRoot = config.contextRoot;

        const directories = {
          all: ['docs', 'agents', 'skills', 'plans', 'workflows'],
          docs: ['docs'],
          agents: ['agents'],
          skills: ['skills'],
          plans: ['plans'],
          workflows: ['workflows'],
        };

        const dirs = directories[type] || directories.all;

        for (const dir of dirs) {
          const dirPath = path.join(contextRoot, dir);
          if (force || !(await fs.pathExists(dirPath))) {
            await fs.ensureDir(dirPath);
          }
        }

        return `✅ Context scaffolding initialized\n📁 Location: ${contextRoot}\n📂 Directories: ${dirs.join(', ')}`;
      },
    },

    {
      name: 'start-workflow',
      description: 'Start a PREVC workflow',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Workflow name' },
          description: { type: 'string', description: 'Workflow description' },
          scale: {
            type: 'string',
            enum: ['QUICK', 'SMALL', 'MEDIUM', 'LARGE'],
            default: 'MEDIUM',
          },
        },
        required: ['name'],
      },
      handler: async (args) => {
        const { name, description = '', scale = 'MEDIUM' } = args;

        const workflow = await workflowEngine.start(name, {
          description,
          scale,
        });

        return `🚀 Workflow Started\n━━━━━━━━━━━━━━━━━━━━━━━━\nID: ${workflow.id}\nName: ${workflow.name}\nScale: ${workflow.scale}\nPhases: ${workflow.phases.join(' → ')}\nCurrent: ${workflow.currentPhase}`;
      },
    },

    {
      name: 'advance-workflow',
      description: 'Advance workflow to next phase',
      inputSchema: {
        type: 'object',
        properties: {
          force: { type: 'boolean', default: false },
        },
      },
      handler: async (args) => {
        const { force = false } = args;
        const result = await workflowEngine.advance({ force });

        if (!result.advanced) {
          return `❌ Cannot advance: Quality gate failed\nUse --force to override`;
        }

        return `⏭️ Workflow Advanced\n━━━━━━━━━━━━━━━━━━━━━━━━\nPhase: ${result.phase}\nProgress: ${result.workflow.currentPhaseIndex + 1}/${result.workflow.phases.length}`;
      },
    },

    {
      name: 'workflow-status',
      description: 'Get current workflow status',
      inputSchema: { type: 'object', properties: {} },
      handler: async () => {
        const status = await workflowEngine.status();

        if (!status) {
          return `📋 No active workflow\nUse start-workflow to begin`;
        }

        return `📊 Workflow Status\n━━━━━━━━━━━━━━━━━━━━━━━━\nID: ${status.id}\nName: ${status.name}\nScale: ${status.scale}\nStatus: ${status.status}\nCurrent Phase: ${status.currentPhase}\nProgress: ${status.progress}%`;
      },
    },

    {
      name: 'complete-workflow',
      description: 'Complete the current workflow',
      inputSchema: { type: 'object', properties: {} },
      handler: async () => {
        const result = await workflowEngine.complete();

        return `✅ Workflow Completed\n━━━━━━━━━━━━━━━━━━━━━━━━\nName: ${result.workflow.name}\nDuration: ${workflowEngine.calculateDuration(result.workflow.startTime, result.workflow.endTime)}\nArtifacts: ${result.workflow.artifacts.length}`;
      },
    },

    {
      name: 'cancel-workflow',
      description: 'Cancel the current workflow',
      inputSchema: {
        type: 'object',
        properties: {
          reason: { type: 'string', description: 'Cancellation reason' },
        },
      },
      handler: async (args) => {
        const { reason = '' } = args;
        const result = await workflowEngine.cancel(reason);
        return `⚠️ Workflow Cancelled: ${result.workflow.name}\nReason: ${reason || 'N/A'}`;
      },
    },

    {
      name: 'sync-ide',
      description: 'Sync .context/ to IDE targets',
      inputSchema: {
        type: 'object',
        properties: {
          ide: {
            type: 'string',
            enum: [
              'claude',
              'cursor',
              'windsurf',
              'codex',
              'gemini',
              'copilot',
              'antigravity',
              'vscode',
              'all',
            ],
            default: 'all',
          },
          force: { type: 'boolean', default: false },
        },
      },
      handler: async (args) => {
        const { ide = 'all', force = false } = args;

        const result = await syncEngine.sync({ ide, force });

        return `🔄 IDE Sync Results\n━━━━━━━━━━━━━━━━━━━━━━━━\nTarget: ${ide}\nFiles synced: ${result.synced}\nFiles skipped: ${result.skipped}`;
      },
    },

    {
      name: 'validate-context',
      description: 'Validate context integrity',
      inputSchema: {
        type: 'object',
        properties: {
          strict: { type: 'boolean', default: false },
        },
      },
      handler: async (args) => {
        const { strict = false } = args;
        const contextRoot = config.contextRoot;

        const requiredDirs = ['docs', 'agents', 'skills', 'plans', 'workflows'];
        const checks = [];

        for (const dir of requiredDirs) {
          const exists = await fs.pathExists(path.join(contextRoot, dir));
          checks.push({ name: `Directory: ${dir}`, passed: exists });
        }

        const valid = strict ? checks.every((c) => c.passed) : true;

        let output = `🔍 Context Validation\n━━━━━━━━━━━━━━━━━━━━━━━━\nValid: ${valid ? '✅' : '❌'}\nMode: ${strict ? 'Strict' : 'Lenient'}\n\n`;
        checks.forEach((c) => {
          output += `${c.passed ? '✅' : '❌'} ${c.name}\n`;
        });

        return output;
      },
    },

    {
      name: 'get-agent',
      description: 'Get agent details by ID',
      inputSchema: {
        type: 'object',
        properties: {
          agentId: { type: 'string', description: 'Agent ID' },
        },
        required: ['agentId'],
      },
      handler: async (args) => {
        const { agentId } = args;
        const agentPath = path.join(config.contextRoot, 'agents', `${agentId}.md`);

        if (!(await fs.pathExists(agentPath))) {
          return `❌ Agent not found: ${agentId}`;
        }

        const content = await fs.readFile(agentPath, 'utf-8');
        return `🤖 Agent: ${agentId}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${content}`;
      },
    },

    {
      name: 'get-config',
      description: 'Get configuration value',
      inputSchema: {
        type: 'object',
        properties: {
          section: { type: 'string', description: 'Config section' },
        },
      },
      handler: async (args) => {
        const { section } = args;
        const configPath = path.join(config.aiosRoot, 'core-config-v2.yaml');

        if (!(await fs.pathExists(configPath))) {
          return `❌ Config not found: ${configPath}`;
        }

        const content = await fs.readFile(configPath, 'utf-8');
        const parsed = yaml.parse(content);

        if (section) {
          const value = section.split('.').reduce((obj, key) => obj?.[key], parsed);
          return `⚙️ Config: ${section}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${JSON.stringify(value, null, 2)}`;
        }

        return `⚙️ AIOS Nexus Config\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${JSON.stringify(parsed, null, 2)}`;
      },
    },

    {
      name: 'fill-scaffold',
      description: 'Fill scaffold files with AI content',
      inputSchema: {
        type: 'object',
        properties: {
          target: {
            type: 'string',
            enum: ['docs', 'agents', 'skills', 'plans', 'workflows', 'all'],
            default: 'docs',
          },
          limit: { type: 'number', default: 10 },
        },
      },
      handler: async (args) => {
        const { target = 'docs', limit = 10 } = args;
        const results = await scaffolder.fill({ target, offset: 0, limit });

        return `🤖 Scaffold Fill Results\n━━━━━━━━━━━━━━━━━━━━━━━━\nTarget: ${target}\nFiles processed: ${results.processed}\nFiles pending: ${results.pending}`;
      },
    },

    {
      name: 'get-map',
      description: 'Get codebase map section',
      inputSchema: {
        type: 'object',
        properties: {
          section: { type: 'string', default: 'all' },
        },
      },
      handler: async (args) => {
        const { section = 'all' } = args;
        const map = await scaffolder.getMap(section);

        return `🗺️ Codebase Map: ${section}\n━━━━━━━━━━━━━━━━━━━━━━━━\n${JSON.stringify(map, null, 2)}`;
      },
    },

    {
      name: 'record-decision',
      description: 'Record a decision in the workflow',
      inputSchema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Decision title' },
          description: { type: 'string', description: 'Decision description' },
        },
        required: ['title', 'description'],
      },
      handler: async (args) => {
        const { title, description } = args;

        const decision = await workflowEngine.recordDecision({
          title,
          description,
        });

        return `📝 Decision Recorded: ${title}\nID: ${decision.id}`;
      },
    },
  ];

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const tool = tools.find((t) => t.name === name);

    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }

    try {
      const result = await tool.handler(args || {});
      return {
        content: [{ type: 'text', text: result }],
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error: ${error.message}` }],
        isError: true,
      };
    }
  });
}

module.exports = { registerTools };
