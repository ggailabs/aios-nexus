/**
 * AIOS Nexus - MCP Prompts Registration (Server API)
 *
 * Registers all MCP prompts using the low-level Server API
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');

const sdkServerPath = require.resolve('@modelcontextprotocol/sdk/server');
const sdkDir = sdkServerPath.split('/dist/')[0];
const typesPath = path.join(sdkDir, 'dist/cjs/types.js');
const { ListPromptsRequestSchema, GetPromptRequestSchema } = require(typesPath);

function registerPrompts(server, config) {
  const prompts = [
    {
      name: 'aios-constitution',
      description: 'Remind the AI about AIOS constitution and principles',
      arguments: [],
      handler: async () => constitutionPrompt(),
    },

    {
      name: 'prevc-workflow',
      description: 'Start a PREVC workflow with proper phases',
      arguments: [
        { name: 'task', description: 'Task description', required: true },
        { name: 'scale', description: 'Workflow scale', required: false },
      ],
      handler: async (args) => prevcPrompt(args),
    },

    {
      name: 'agent-activate',
      description: 'Activate an agent persona',
      arguments: [{ name: 'agent', description: 'Agent ID', required: true }],
      handler: async (args) => await agentPrompt(args, config),
    },

    {
      name: 'code-review',
      description: 'Perform a structured code review',
      arguments: [{ name: 'files', description: 'Files to review', required: true }],
      handler: async (args) => codeReviewPrompt(args),
    },

    {
      name: 'feature-plan',
      description: 'Plan a new feature using PREVC methodology',
      arguments: [{ name: 'feature', description: 'Feature description', required: true }],
      handler: async (args) => featurePlanPrompt(args),
    },

    {
      name: 'debug-session',
      description: 'Start a structured debugging session',
      arguments: [{ name: 'issue', description: 'Issue description', required: true }],
      handler: async (args) => debugPrompt(args),
    },

    {
      name: 'refactor-plan',
      description: 'Plan a refactoring initiative',
      arguments: [{ name: 'scope', description: 'Scope of refactoring', required: true }],
      handler: async (args) => refactorPrompt(args),
    },

    {
      name: 'test-strategy',
      description: 'Create a testing strategy',
      arguments: [{ name: 'feature', description: 'Feature to test', required: true }],
      handler: async (args) => testStrategyPrompt(args),
    },
  ];

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    prompts: prompts.map((p) => ({
      name: p.name,
      description: p.description,
      arguments: p.arguments,
    })),
  }));

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const prompt = prompts.find((p) => p.name === name);

    if (!prompt) {
      throw new Error(`Unknown prompt: ${name}`);
    }

    const content = await prompt.handler(args || {});

    return {
      description: prompt.description,
      messages: [
        {
          role: 'user',
          content: { type: 'text', text: content },
        },
      ],
    };
  });
}

function constitutionPrompt() {
  return `# AIOS Nexus Constitution

You are operating under the AIOS Nexus framework. Adhere to these principles:

## Core Principles

1. **CLI First** - All operations should be CLI-driven
2. **Agent Authority** - Trust agent expertise and decisions
3. **Story-Driven Development** - Work from stories in docs/stories/
4. **No Invention** - Implement only what acceptance criteria require
5. **Quality First** - Run quality gates before completing work
6. **Absolute Imports** - Use absolute import paths

## Quality Gates

Before completing any task:
- \`npm run lint\` - Code style
- \`npm run typecheck\` - Type safety
- \`npm test\` - Test coverage

_Remember: No invention, quality first, story-driven._`;
}

function prevcPrompt(args) {
  const { task, scale = 'MEDIUM' } = args || {};

  const phases = {
    QUICK: ['E', 'V'],
    SMALL: ['P', 'E', 'V'],
    MEDIUM: ['P', 'R', 'E', 'V'],
    LARGE: ['P', 'R', 'E', 'V', 'C'],
  };

  const phaseNames = { P: 'Plan', R: 'Review', E: 'Execute', V: 'Validate', C: 'Confirm' };
  const workflowPhases = phases[scale] || phases.MEDIUM;

  return `# PREVC Workflow: ${task || 'Task'}

## Scale: ${scale}
## Phases: ${workflowPhases.map((p) => phaseNames[p]).join(' → ')}

Follow the PREVC workflow for this task. Use \`advance-workflow\` tool to progress between phases.`;
}

async function agentPrompt(args, config) {
  const { agent } = args || {};

  if (!agent) {
    return `# Agent Activation\n\nSpecify an agent ID to activate. Available agents can be found in \`.context/agents/\`.`;
  }

  const agentPath = path.join(config.contextRoot, 'agents', `${agent}.md`);

  if (await fs.pathExists(agentPath)) {
    const content = await fs.readFile(agentPath, 'utf-8');
    return `# Agent Activation: @${agent}\n\n${content}\n\n---\n_Activate this agent by following its guidelines._`;
  }

  return `# Agent Not Found: @${agent}\n\nAvailable agents can be found in \`.context/agents/\`.`;
}

function codeReviewPrompt(args) {
  const { files } = args || {};

  return `# Code Review Request

## Files to Review
\`\`\`
${files || 'No files specified'}
\`\`\`

## Review Checklist

### 1. Code Quality
- [ ] Code is readable and well-organized
- [ ] Functions/methods are focused and small
- [ ] No code duplication (DRY principle)
- [ ] Proper error handling

### 2. Architecture
- [ ] Follows project conventions
- [ ] Proper separation of concerns
- [ ] No circular dependencies

### 3. Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Proper authentication/authorization

### 4. Performance
- [ ] No obvious performance issues
- [ ] Efficient algorithms used

### 5. Testing
- [ ] Unit tests present
- [ ] Edge cases covered

_Provide detailed feedback for each category._`;
}

function featurePlanPrompt(args) {
  const { feature } = args || {};

  return `# Feature Planning: ${feature || 'Feature'}

### Planning Template

#### 1. Problem Statement
What problem does this feature solve?

#### 2. Proposed Solution
How will this feature address the problem?

#### 3. Technical Design
- Architecture changes needed
- New components/modules
- API changes

#### 4. Implementation Plan
- [ ] Create technical spec
- [ ] Set up tests
- [ ] Implement core functionality
- [ ] Add error handling
- [ ] Write documentation

#### 5. Success Criteria
- [ ] Feature works as expected
- [ ] Tests pass
- [ ] Documentation complete

_Fill out this template for a complete feature plan._`;
}

function debugPrompt(args) {
  const { issue } = args || {};

  return `# Debug Session: ${issue || 'Issue'}

## Debug Protocol

### 1. Reproduce
- [ ] Identify reproduction steps
- [ ] Create minimal test case
- [ ] Document expected vs actual behavior

### 2. Isolate
- [ ] Binary search for problematic code
- [ ] Check recent changes (git log)
- [ ] Review error messages

### 3. Hypothesize
- List possible causes

### 4. Test
- For each hypothesis:
  - [ ] Design test to verify
  - [ ] Execute test
  - [ ] Document results

### 5. Fix
- [ ] Implement fix
- [ ] Add regression test
- [ ] Verify fix

_Follow this structured approach to debug the issue._`;
}

function refactorPrompt(args) {
  const { scope, goals } = args || {};

  return `# Refactoring Plan: ${scope || 'Scope'}

## Goals
${goals || 'Improve code quality and maintainability'}

### Refactoring Checklist

#### 1. Analysis
- [ ] Identify code smells
- [ ] Map dependencies
- [ ] Document current behavior
- [ ] Create safety net (tests)

#### 2. Planning
- [ ] Define refactoring scope
- [ ] Identify incremental steps
- [ ] Plan rollback strategy

#### 3. Execution
- [ ] One change at a time
- [ ] Run tests after each change
- [ ] Commit frequently

#### 4. Verification
- [ ] All tests pass
- [ ] No behavior changes
- [ ] Documentation updated

_Remember: Refactoring should not change behavior, only structure._`;
}

function testStrategyPrompt(args) {
  const { feature, type = 'all' } = args || {};

  return `# Test Strategy: ${feature || 'Feature'}

## Test Type: ${type}

### Testing Pyramid

#### 1. Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Fast execution
- High coverage target (80%+)

#### 2. Integration Tests
- Test component interactions
- Use real dependencies where possible
- Critical paths coverage

#### 3. End-to-End Tests
- Test complete user flows
- Full environment
- Happy path + critical errors

### Coverage Goals

| Type | Target |
|------|--------|
| Statements | 80% |
| Branches | 75% |
| Functions | 85% |
| Lines | 80% |

_Create comprehensive tests following this strategy._`;
}

module.exports = { registerPrompts };
