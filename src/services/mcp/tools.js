/**
 * AIOS Nexus - MCP Tool Registry
 *
 * Registers all MCP tools for the server
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const yaml = require('yaml');
const { z } = require('zod');

const { WorkflowEngine } = require('../workflow');
const { Scaffolder } = require('../../core/scaffolder');
const { SyncEngine } = require('../sync');

class ToolRegistry {
  constructor(config, server) {
    this.config = config;
    this.server = server;
    this.registeredCount = 0;

    this.workflowEngine = null;
    this.scaffolder = null;
    this.syncEngine = null;
  }

  async register() {
    this.workflowEngine = new WorkflowEngine({
      contextRoot: this.config.contextRoot,
    });

    this.scaffolder = new Scaffolder({
      contextRoot: this.config.contextRoot,
      aiosRoot: this.config.aiosRoot,
    });

    this.syncEngine = new SyncEngine({
      contextRoot: this.config.contextRoot,
    });

    this.registerAllTools();
  }

  registerAllTools() {
    this.registerInitContext();
    this.registerFillScaffold();
    this.registerFillSingle();
    this.registerListToFill();
    this.registerGetMap();
    this.registerBuildSemantic();
    this.registerScaffoldPlan();
    this.registerSyncIde();
    this.registerValidateSync();
    this.registerStartWorkflow();
    this.registerAdvanceWorkflow();
    this.registerWorkflowStatus();
    this.registerCompleteWorkflow();
    this.registerCancelWorkflow();
    this.registerRecordDecision();
    this.registerAddArtifact();
    this.registerGetAgent();
    this.registerOrchestrateAgents();
    this.registerGetSkill();
    this.registerValidateContext();
    this.registerGetConfig();
    this.registerUpdateConfig();

    this.registeredCount = 22;
  }

  registerInitContext() {
    this.server.tool(
      'init-context',
      'Initialize .context/ scaffolding structure',
      {
        type: z
          .enum(['docs', 'agents', 'skills', 'plans', 'workflows', 'all'])
          .optional()
          .default('all'),
        force: z.boolean().optional().default(false),
        semantic: z.boolean().optional().default(false),
        autoFill: z.boolean().optional().default(false),
      },
      async (args) => {
        const { type = 'all', force = false, semantic = false, autoFill = false } = args;
        const contextRoot = this.config.contextRoot;

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

        let output = `✅ Context scaffolding initialized\n`;
        output += `📁 Location: ${contextRoot}\n`;
        output += `📂 Directories: ${dirs.join(', ')}\n`;

        if (semantic) {
          output += `\n🔍 Semantic analysis enabled`;
        }

        if (autoFill) {
          output += `\n🤖 Auto-fill will be triggered`;
          const results = await this.scaffolder.analyze();
          output += `\n   Detected: ${results.techStack?.frameworks?.join(', ') || 'Unknown'}`;
        }

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerFillScaffold() {
    this.server.tool(
      'fill-scaffold',
      'Fill scaffold files with AI-generated content',
      {
        target: z
          .enum(['docs', 'agents', 'skills', 'plans', 'workflows', 'all'])
          .optional()
          .default('docs'),
        offset: z.number().optional().default(0),
        limit: z.number().optional().default(10),
      },
      async (args) => {
        const { target = 'docs', offset = 0, limit = 10 } = args;
        const results = await this.scaffolder.fill({ target, offset, limit });

        let output = `🤖 Scaffold Fill Results\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += `Target: ${target}\n`;
        output += `Files processed: ${results.processed}\n`;
        output += `Files pending: ${results.pending}\n`;

        if (results.files && results.files.length > 0) {
          output += `\nProcessed files:\n`;
          results.files.forEach((f) => {
            output += `  ✅ ${f}\n`;
          });
        }

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerFillSingle() {
    this.server.tool(
      'fill-single',
      'Fill a single scaffold file',
      {
        filePath: z.string().describe('Absolute path to scaffold file'),
      },
      async (args) => {
        const { filePath } = args;
        const result = await this.scaffolder.fillSingle(filePath);
        return {
          content: [{ type: 'text', text: `✅ Filled: ${filePath}\n${result.message || ''}` }],
        };
      }
    );
  }

  registerListToFill() {
    this.server.tool(
      'list-to-fill',
      'List files that need filling',
      {
        target: z
          .enum(['docs', 'agents', 'skills', 'plans', 'workflows', 'all'])
          .optional()
          .default('all'),
      },
      async (args) => {
        const { target = 'all' } = args;
        const pending = await this.scaffolder.listPending(target);

        let output = `📋 Pending Files to Fill\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += `Total: ${pending.length}\n\n`;

        pending.forEach((f, i) => {
          output += `${i + 1}. ${f}\n`;
        });

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerGetMap() {
    this.server.tool(
      'get-map',
      'Get codebase map section',
      {
        section: z
          .enum([
            'all',
            'stack',
            'structure',
            'architecture',
            'symbols',
            'symbols.classes',
            'symbols.interfaces',
            'symbols.functions',
            'symbols.types',
            'symbols.enums',
            'publicAPI',
            'dependencies',
            'stats',
          ])
          .optional()
          .default('all'),
      },
      async (args) => {
        const { section = 'all' } = args;
        const map = await this.scaffolder.getMap(section);

        let output = `🗺️ Codebase Map: ${section}\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += JSON.stringify(map, null, 2);

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerBuildSemantic() {
    this.server.tool(
      'build-semantic',
      'Build semantic context for focused analysis',
      {
        contextType: z
          .enum(['documentation', 'playbook', 'plan', 'compact'])
          .optional()
          .default('documentation'),
        targetFile: z.string().optional(),
      },
      async (args) => {
        const { contextType = 'documentation', targetFile } = args;
        const result = await this.scaffolder.buildSemantic({ contextType, targetFile });

        return {
          content: [{ type: 'text', text: `🔍 Semantic Context Built\n${result.summary}` }],
        };
      }
    );
  }

  registerScaffoldPlan() {
    this.server.tool(
      'scaffold-plan',
      'Create a plan template for PREVC workflow',
      {
        planName: z.string().describe('Name of the plan'),
        title: z.string().optional().describe('Plan title'),
        summary: z.string().optional().describe('Plan summary/goal'),
        autoFill: z.boolean().optional().default(false),
      },
      async (args) => {
        const { planName, title, summary, autoFill = false } = args;

        const result = await this.scaffolder.scaffoldPlan({
          planName,
          title: title || planName,
          summary,
          autoFill,
        });

        return {
          content: [
            { type: 'text', text: `📋 Plan Created: ${planName}\n📁 Location: ${result.path}` },
          ],
        };
      }
    );
  }

  registerSyncIde() {
    this.server.tool(
      'sync-ide',
      'Sync .context/ to IDE targets',
      {
        ide: z
          .enum([
            'claude',
            'cursor',
            'windsurf',
            'codex',
            'gemini',
            'copilot',
            'antigravity',
            'vscode',
            'all',
          ])
          .optional()
          .default('all'),
        force: z.boolean().optional().default(false),
        dryRun: z.boolean().optional().default(false),
        skipDocs: z.boolean().optional().default(false),
        skipAgents: z.boolean().optional().default(false),
      },
      async (args) => {
        const {
          ide = 'all',
          force = false,
          dryRun = false,
          skipDocs = false,
          skipAgents = false,
        } = args;

        const result = await this.syncEngine.sync({
          ide,
          force,
          dryRun,
          skipDocs,
          skipAgents,
        });

        let output = `🔄 IDE Sync Results\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += `Target: ${ide}\n`;
        output += `Dry run: ${dryRun ? 'Yes' : 'No'}\n`;
        output += `Files synced: ${result.synced}\n`;
        output += `Files skipped: ${result.skipped}\n`;

        if (result.errors && result.errors.length > 0) {
          output += `\n❌ Errors:\n`;
          result.errors.forEach((e) => {
            output += `  - ${e}\n`;
          });
        }

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerValidateSync() {
    this.server.tool('validate-sync', 'Validate IDE sync parity', {}, async () => {
      const result = await this.syncEngine.validate();

      let output = `🔍 Sync Validation Results\n`;
      output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      output += `Valid: ${result.valid ? '✅' : '❌'}\n`;
      output += `IDEs checked: ${result.idesChecked}\n`;

      if (result.issues && result.issues.length > 0) {
        output += `\n⚠️ Issues:\n`;
        result.issues.forEach((i) => {
          output += `  - ${i}\n`;
        });
      }

      return { content: [{ type: 'text', text: output }] };
    });
  }

  registerStartWorkflow() {
    this.server.tool(
      'start-workflow',
      'Start a PREVC workflow',
      {
        name: z.string().describe('Workflow name'),
        description: z.string().optional().describe('Workflow description'),
        scale: z.enum(['QUICK', 'SMALL', 'MEDIUM', 'LARGE']).optional().default('MEDIUM'),
        autonomous: z.boolean().optional().default(false),
      },
      async (args) => {
        const { name, description = '', scale = 'MEDIUM', autonomous = false } = args;

        const workflow = await this.workflowEngine.start(name, {
          description,
          scale,
          autonomous,
        });

        let output = `🚀 Workflow Started\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += `ID: ${workflow.id}\n`;
        output += `Name: ${workflow.name}\n`;
        output += `Scale: ${workflow.scale}\n`;
        output += `Phases: ${workflow.phases.join(' → ')}\n`;
        output += `Current: ${workflow.currentPhase}\n`;

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerAdvanceWorkflow() {
    this.server.tool(
      'advance-workflow',
      'Advance workflow to next phase',
      {
        force: z.boolean().optional().default(false),
        outputs: z.array(z.string()).optional(),
      },
      async (args) => {
        const { force = false, outputs = [] } = args;
        const result = await this.workflowEngine.advance({ force, outputs });

        if (!result.advanced) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Cannot advance: Quality gate failed\nUse --force to override`,
              },
            ],
          };
        }

        let output = `⏭️ Workflow Advanced\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += `Phase: ${result.phase}\n`;
        output += `Progress: ${result.workflow.currentPhaseIndex + 1}/${result.workflow.phases.length}\n`;

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerWorkflowStatus() {
    this.server.tool('workflow-status', 'Get current workflow status', {}, async () => {
      const status = await this.workflowEngine.status();

      if (!status) {
        return {
          content: [{ type: 'text', text: `📋 No active workflow\nUse start-workflow to begin` }],
        };
      }

      let output = `📊 Workflow Status\n`;
      output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      output += `ID: ${status.id}\n`;
      output += `Name: ${status.name}\n`;
      output += `Scale: ${status.scale}\n`;
      output += `Status: ${status.status}\n`;
      output += `Current Phase: ${status.currentPhase}\n`;
      output += `Progress: ${status.progress}%\n`;
      output += `Duration: ${status.duration}\n`;
      output += `Artifacts: ${status.artifacts.length}\n`;

      return { content: [{ type: 'text', text: output }] };
    });
  }

  registerCompleteWorkflow() {
    this.server.tool('complete-workflow', 'Complete the current workflow', {}, async () => {
      const result = await this.workflowEngine.complete();

      let output = `✅ Workflow Completed\n`;
      output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      output += `Name: ${result.workflow.name}\n`;
      output += `Duration: ${this.workflowEngine.calculateDuration(result.workflow.startTime, result.workflow.endTime)}\n`;
      output += `Artifacts: ${result.workflow.artifacts.length}\n`;
      output += `Decisions: ${result.workflow.decisions.length}\n`;

      return { content: [{ type: 'text', text: output }] };
    });
  }

  registerCancelWorkflow() {
    this.server.tool(
      'cancel-workflow',
      'Cancel the current workflow',
      {
        reason: z.string().optional().describe('Cancellation reason'),
      },
      async (args) => {
        const { reason = '' } = args;
        const result = await this.workflowEngine.cancel(reason);

        return {
          content: [
            {
              type: 'text',
              text: `⚠️ Workflow Cancelled: ${result.workflow.name}\nReason: ${reason || 'N/A'}`,
            },
          ],
        };
      }
    );
  }

  registerRecordDecision() {
    this.server.tool(
      'record-decision',
      'Record a decision in the workflow',
      {
        title: z.string().describe('Decision title'),
        description: z.string().describe('Decision description'),
        alternatives: z.array(z.string()).optional(),
        phase: z.enum(['P', 'R', 'E', 'V', 'C']).optional(),
      },
      async (args) => {
        const { title, description, alternatives = [], phase } = args;

        const decision = await this.workflowEngine.recordDecision({
          title,
          description,
          alternatives,
          phase,
        });

        return {
          content: [{ type: 'text', text: `📝 Decision Recorded: ${title}\nID: ${decision.id}` }],
        };
      }
    );
  }

  registerAddArtifact() {
    this.server.tool(
      'add-artifact',
      'Add an artifact to the workflow',
      {
        name: z.string().describe('Artifact name'),
        type: z.string().describe('Artifact type (code, doc, test, etc)'),
        path: z.string().optional().describe('Artifact file path'),
        description: z.string().optional(),
      },
      async (args) => {
        const { name, type, path: artifactPath, description } = args;

        const artifact = await this.workflowEngine.addArtifact({
          name,
          type,
          path: artifactPath,
          description,
        });

        return {
          content: [{ type: 'text', text: `📦 Artifact Added: ${name}\nID: ${artifact.id}` }],
        };
      }
    );
  }

  registerGetAgent() {
    this.server.tool(
      'get-agent',
      'Get agent details by ID',
      {
        agentId: z.string().describe('Agent ID (e.g., architect, developer)'),
      },
      async (args) => {
        const { agentId } = args;

        const agentPath = path.join(this.config.contextRoot, 'agents', `${agentId}.md`);
        if (!(await fs.pathExists(agentPath))) {
          return {
            content: [{ type: 'text', text: `❌ Agent not found: ${agentId}` }],
            isError: true,
          };
        }

        const content = await fs.readFile(agentPath, 'utf-8');

        return {
          content: [
            { type: 'text', text: `🤖 Agent: ${agentId}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${content}` },
          ],
        };
      }
    );
  }

  registerOrchestrateAgents() {
    this.server.tool(
      'orchestrate-agents',
      'Select agents for a task/phase/role',
      {
        task: z.string().describe('Task description'),
        phase: z.enum(['P', 'R', 'E', 'V', 'C']).optional(),
        role: z
          .enum(['planner', 'designer', 'architect', 'developer', 'qa', 'reviewer', 'documenter'])
          .optional(),
      },
      async (args) => {
        const { task, phase, role } = args;

        const agents = await this.scaffolder.orchestrateAgents({ task, phase, role });

        let output = `🎭 Agent Orchestration\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += `Task: ${task}\n`;
        output += `Recommended agents:\n`;

        agents.forEach((a, i) => {
          output += `  ${i + 1}. ${a.id} - ${a.role}\n`;
        });

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerGetSkill() {
    this.server.tool(
      'get-skill',
      'Get skill content by ID',
      {
        skillId: z.string().describe('Skill ID'),
      },
      async (args) => {
        const { skillId } = args;

        const skillPath = path.join(this.config.contextRoot, 'skills', `${skillId}.md`);
        if (!(await fs.pathExists(skillPath))) {
          return {
            content: [{ type: 'text', text: `❌ Skill not found: ${skillId}` }],
            isError: true,
          };
        }

        const content = await fs.readFile(skillPath, 'utf-8');

        return {
          content: [
            { type: 'text', text: `🎯 Skill: ${skillId}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${content}` },
          ],
        };
      }
    );
  }

  registerValidateContext() {
    this.server.tool(
      'validate-context',
      'Validate context integrity',
      {
        strict: z.boolean().optional().default(false),
      },
      async (args) => {
        const { strict = false } = args;
        const contextRoot = this.config.contextRoot;

        const results = {
          valid: true,
          checks: [],
        };

        const requiredDirs = ['docs', 'agents', 'skills', 'plans', 'workflows'];

        for (const dir of requiredDirs) {
          const exists = await fs.pathExists(path.join(contextRoot, dir));
          results.checks.push({
            name: `Directory: ${dir}`,
            passed: exists,
          });
          if (!exists && strict) {
            results.valid = false;
          }
        }

        let output = `🔍 Context Validation\n`;
        output += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        output += `Valid: ${results.valid ? '✅' : '❌'}\n`;
        output += `Mode: ${strict ? 'Strict' : 'Lenient'}\n\n`;

        results.checks.forEach((c) => {
          output += `${c.passed ? '✅' : '❌'} ${c.name}\n`;
        });

        return { content: [{ type: 'text', text: output }] };
      }
    );
  }

  registerGetConfig() {
    this.server.tool(
      'get-config',
      'Get configuration value',
      {
        section: z.string().optional().describe('Config section (dot notation)'),
      },
      async (args) => {
        const { section } = args;
        const configPath = path.join(this.config.aiosRoot, 'core-config-v2.yaml');

        if (!(await fs.pathExists(configPath))) {
          return { content: [{ type: 'text', text: `❌ Config not found: ${configPath}` }] };
        }

        const content = await fs.readFile(configPath, 'utf-8');
        const config = yaml.parse(content);

        if (section) {
          const value = this.getNestedValue(config, section);
          return {
            content: [
              {
                type: 'text',
                text: `⚙️ Config: ${section}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${JSON.stringify(value, null, 2)}`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: `⚙️ AIOS Nexus Config\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${JSON.stringify(config, null, 2)}`,
            },
          ],
        };
      }
    );
  }

  registerUpdateConfig() {
    this.server.tool(
      'update-config',
      'Update configuration value',
      {
        section: z.string().describe('Config section (dot notation)'),
        value: z.any().describe('Value to set'),
      },
      async (args) => {
        const { section, value } = args;

        const configPath = path.join(this.config.aiosRoot, 'core-config-v2.yaml');
        let config = {};

        if (await fs.pathExists(configPath)) {
          const content = await fs.readFile(configPath, 'utf-8');
          config = yaml.parse(content);
        }

        this.setNestedValue(config, section, value);
        await fs.writeFile(configPath, yaml.stringify(config));

        return { content: [{ type: 'text', text: `✅ Config updated: ${section}` }] };
      }
    );
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((curr, key) => curr?.[key], obj);
  }

  setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((curr, key) => {
      if (!curr[key]) curr[key] = {};
      return curr[key];
    }, obj);
    target[lastKey] = value;
  }

  count() {
    return this.registeredCount;
  }
}

module.exports = { ToolRegistry };
