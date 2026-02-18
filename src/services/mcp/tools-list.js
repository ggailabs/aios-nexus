/**
 * AIOS Nexus - MCP Tools List
 *
 * All available MCP tools definitions
 * Version: 5.0.0
 */

const TOOLS = [
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
          description: 'Type of scaffolding to initialize',
        },
        force: {
          type: 'boolean',
          default: false,
          description: 'Force overwrite existing files',
        },
        semantic: {
          type: 'boolean',
          default: false,
          description: 'Enable semantic analysis',
        },
        autoFill: {
          type: 'boolean',
          default: false,
          description: 'Auto-fill with AI content',
        },
      },
    },
  },
  {
    name: 'fill-scaffold',
    description: 'Fill scaffold files with AI-generated content',
    inputSchema: {
      type: 'object',
      properties: {
        target: {
          type: 'string',
          enum: ['docs', 'agents', 'skills', 'plans', 'workflows', 'all'],
          default: 'docs',
          description: 'Target scaffolding to fill',
        },
        offset: {
          type: 'number',
          default: 0,
          description: 'Skip first N files',
        },
        limit: {
          type: 'number',
          default: 10,
          description: 'Max files to process',
        },
      },
    },
  },
  {
    name: 'fill-single',
    description: 'Fill a single scaffold file',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: {
          type: 'string',
          description: 'Absolute path to scaffold file',
        },
      },
      required: ['filePath'],
    },
  },
  {
    name: 'list-to-fill',
    description: 'List files that need filling',
    inputSchema: {
      type: 'object',
      properties: {
        target: {
          type: 'string',
          enum: ['docs', 'agents', 'skills', 'plans', 'workflows', 'all'],
          default: 'all',
          description: 'Target scaffolding to check',
        },
      },
    },
  },
  {
    name: 'get-map',
    description: 'Get codebase map section',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: [
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
          ],
          default: 'all',
          description: 'Map section to retrieve',
        },
      },
    },
  },
  {
    name: 'build-semantic',
    description: 'Build semantic context for focused analysis',
    inputSchema: {
      type: 'object',
      properties: {
        contextType: {
          type: 'string',
          enum: ['documentation', 'playbook', 'plan', 'compact'],
          default: 'documentation',
          description: 'Type of semantic context',
        },
        targetFile: {
          type: 'string',
          description: 'Target file for focused context',
        },
        options: {
          type: 'object',
          properties: {
            useLSP: { type: 'boolean' },
            maxContextLength: { type: 'number' },
            includeDocumentation: { type: 'boolean' },
            includeSignatures: { type: 'boolean' },
          },
        },
      },
    },
  },
  {
    name: 'scaffold-plan',
    description: 'Create a plan template for PREVC workflow',
    inputSchema: {
      type: 'object',
      properties: {
        planName: {
          type: 'string',
          description: 'Name of the plan',
        },
        title: {
          type: 'string',
          description: 'Plan title',
        },
        summary: {
          type: 'string',
          description: 'Plan summary/goal',
        },
        autoFill: {
          type: 'boolean',
          default: false,
          description: 'Auto-fill with codebase content',
        },
      },
      required: ['planName'],
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
          description: 'Target IDE',
        },
        force: {
          type: 'boolean',
          default: false,
          description: 'Force overwrite',
        },
        dryRun: {
          type: 'boolean',
          default: false,
          description: 'Preview without writing',
        },
        skipDocs: {
          type: 'boolean',
          default: false,
          description: 'Skip docs sync',
        },
        skipAgents: {
          type: 'boolean',
          default: false,
          description: 'Skip agents sync',
        },
      },
    },
  },
  {
    name: 'validate-sync',
    description: 'Validate IDE sync parity',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'start-workflow',
    description: 'Start a PREVC workflow',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Workflow name',
        },
        description: {
          type: 'string',
          description: 'Workflow description',
        },
        scale: {
          type: 'string',
          enum: ['QUICK', 'SMALL', 'MEDIUM', 'LARGE'],
          default: 'MEDIUM',
          description: 'Workflow scale',
        },
        autonomous: {
          type: 'boolean',
          default: false,
          description: 'Skip workflow gates',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'advance-workflow',
    description: 'Advance workflow to next phase',
    inputSchema: {
      type: 'object',
      properties: {
        force: {
          type: 'boolean',
          default: false,
          description: 'Force advancement',
        },
        outputs: {
          type: 'array',
          items: { type: 'string' },
          description: 'Artifact paths produced',
        },
      },
    },
  },
  {
    name: 'workflow-status',
    description: 'Get current workflow status',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'complete-workflow',
    description: 'Complete the current workflow',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'cancel-workflow',
    description: 'Cancel the current workflow',
    inputSchema: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'Cancellation reason',
        },
      },
    },
  },
  {
    name: 'record-decision',
    description: 'Record a decision in the workflow',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Decision title',
        },
        description: {
          type: 'string',
          description: 'Decision description',
        },
        alternatives: {
          type: 'array',
          items: { type: 'string' },
          description: 'Considered alternatives',
        },
        phase: {
          type: 'string',
          enum: ['P', 'R', 'E', 'V', 'C'],
          description: 'PREVC phase',
        },
      },
      required: ['title', 'description'],
    },
  },
  {
    name: 'add-artifact',
    description: 'Add an artifact to the workflow',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Artifact name',
        },
        type: {
          type: 'string',
          description: 'Artifact type (code, doc, test, etc)',
        },
        path: {
          type: 'string',
          description: 'Artifact file path',
        },
        description: {
          type: 'string',
          description: 'Artifact description',
        },
      },
      required: ['name', 'type'],
    },
  },
  {
    name: 'get-agent',
    description: 'Get agent details by ID',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: {
          type: 'string',
          description: 'Agent ID (e.g., architect, developer)',
        },
      },
      required: ['agentId'],
    },
  },
  {
    name: 'orchestrate-agents',
    description: 'Select agents for a task/phase/role',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description: 'Task description',
        },
        phase: {
          type: 'string',
          enum: ['P', 'R', 'E', 'V', 'C'],
          description: 'PREVC phase',
        },
        role: {
          type: 'string',
          enum: ['planner', 'designer', 'architect', 'developer', 'qa', 'reviewer', 'documenter'],
          description: 'PREVC role',
        },
      },
      required: ['task'],
    },
  },
  {
    name: 'get-skill',
    description: 'Get skill content by ID',
    inputSchema: {
      type: 'object',
      properties: {
        skillId: {
          type: 'string',
          description: 'Skill ID',
        },
      },
      required: ['skillId'],
    },
  },
  {
    name: 'validate-context',
    description: 'Validate context integrity',
    inputSchema: {
      type: 'object',
      properties: {
        strict: {
          type: 'boolean',
          default: false,
          description: 'Strict validation mode',
        },
      },
    },
  },
  {
    name: 'get-config',
    description: 'Get configuration value',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'Config section (dot notation)',
        },
      },
    },
  },
  {
    name: 'update-config',
    description: 'Update configuration value',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          description: 'Config section (dot notation)',
        },
        value: {
          description: 'Value to set',
        },
      },
      required: ['section', 'value'],
    },
  },
];

module.exports = TOOLS;
