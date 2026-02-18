/**
 * AIOS Nexus - MCP Prompt Registry
 *
 * Registers all MCP prompts for the server
 * Version: 5.0.0
 */

const path = require('path');
const fs = require('fs-extra');
const { z } = require('zod');

class PromptRegistry {
  constructor(config, server) {
    this.config = config;
    this.server = server;
    this.registeredCount = 0;
  }

  async register() {
    this.registerConstitutionPrompt();
    this.registerPREVCPrompt();
    this.registerAgentPrompt();
    this.registerCodeReviewPrompt();
    this.registerFeaturePlanPrompt();
    this.registerDebugPrompt();
    this.registerRefactorPrompt();
    this.registerTestStrategyPrompt();

    this.registeredCount = 8;
  }

  registerConstitutionPrompt() {
    this.server.prompt(
      'aios-constitution',
      'Remind the AI about AIOS constitution and principles',
      {},
      async () => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: this.constitutionPrompt() },
            },
          ],
        };
      }
    );
  }

  registerPREVCPrompt() {
    this.server.prompt(
      'prevc-workflow',
      'Start a PREVC workflow with proper phases',
      {
        task: z.string().describe('Task description'),
        scale: z.enum(['QUICK', 'SMALL', 'MEDIUM', 'LARGE']).optional().default('MEDIUM'),
      },
      async (args) => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: this.prevcPrompt(args) },
            },
          ],
        };
      }
    );
  }

  registerAgentPrompt() {
    this.server.prompt(
      'agent-activate',
      'Activate an agent persona',
      {
        agent: z.string().describe('Agent ID (e.g., architect, developer, qa)'),
      },
      async (args) => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: await this.agentPrompt(args) },
            },
          ],
        };
      }
    );
  }

  registerCodeReviewPrompt() {
    this.server.prompt(
      'code-review',
      'Perform a structured code review',
      {
        files: z.string().describe('Files to review'),
      },
      async (args) => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: this.codeReviewPrompt(args) },
            },
          ],
        };
      }
    );
  }

  registerFeaturePlanPrompt() {
    this.server.prompt(
      'feature-plan',
      'Plan a new feature using PREVC methodology',
      {
        feature: z.string().describe('Feature description'),
        complexity: z.enum(['low', 'medium', 'high']).optional().default('medium'),
      },
      async (args) => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: this.featurePlanPrompt(args) },
            },
          ],
        };
      }
    );
  }

  registerDebugPrompt() {
    this.server.prompt(
      'debug-session',
      'Start a structured debugging session',
      {
        issue: z.string().describe('Issue description'),
      },
      async (args) => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: this.debugPrompt(args) },
            },
          ],
        };
      }
    );
  }

  registerRefactorPrompt() {
    this.server.prompt(
      'refactor-plan',
      'Plan a refactoring initiative',
      {
        scope: z.string().describe('Scope of refactoring'),
        goals: z.string().optional().describe('Refactoring goals'),
      },
      async (args) => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: this.refactorPrompt(args) },
            },
          ],
        };
      }
    );
  }

  registerTestStrategyPrompt() {
    this.server.prompt(
      'test-strategy',
      'Create a testing strategy',
      {
        feature: z.string().describe('Feature to test'),
        type: z.enum(['unit', 'integration', 'e2e', 'all']).optional().default('all'),
      },
      async (args) => {
        return {
          messages: [
            {
              role: 'user',
              content: { type: 'text', text: this.testStrategyPrompt(args) },
            },
          ],
        };
      }
    );
  }

  constitutionPrompt() {
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

## Workflow

1. Start from a story in \`docs/stories/\`
2. Implement only acceptance criteria
3. Update checklist (\`[ ]\` → \`[x]\`)
4. Run quality gates
5. Mark story as complete

_Remember: No invention, quality first, story-driven._`;
  }

  prevcPrompt(args) {
    const { task, scale = 'MEDIUM' } = args;

    const phases = {
      QUICK: ['E', 'V'],
      SMALL: ['P', 'E', 'V'],
      MEDIUM: ['P', 'R', 'E', 'V'],
      LARGE: ['P', 'R', 'E', 'V', 'C'],
    };

    const phaseNames = {
      P: 'Plan',
      R: 'Review',
      E: 'Execute',
      V: 'Validate',
      C: 'Confirm',
    };

    const workflowPhases = phases[scale] || phases.MEDIUM;

    return `# PREVC Workflow: ${task}

## Scale: ${scale}
## Phases: ${workflowPhases.map((p) => phaseNames[p]).join(' → ')}

### Instructions

Follow the PREVC workflow for this task:

${workflowPhases
  .map((p) => {
    switch (p) {
      case 'P':
        return `#### P - Plan
- Analyze requirements
- Create technical specification
- Identify dependencies and risks`;
      case 'R':
        return `#### R - Review
- Architecture review
- Security assessment
- Technical debt check`;
      case 'E':
        return `#### E - Execute
- Implement solution
- Write tests
- Document changes`;
      case 'V':
        return `#### V - Validate
- Run quality gates (lint, typecheck, test)
- Verify acceptance criteria
- Code review`;
      case 'C':
        return `#### C - Confirm
- Deploy to staging
- Update documentation
- Create release notes`;
    }
  })
  .join('\n\n')}

## Task
${task}

---
_Use \`advance-workflow\` tool to progress between phases._`;
  }

  async agentPrompt(args) {
    const { agent } = args;

    const agentPath = path.join(this.config.contextRoot, 'agents', `${agent}.md`);

    if (await fs.pathExists(agentPath)) {
      const content = await fs.readFile(agentPath, 'utf-8');
      return `# Agent Activation: @${agent}

${content}

---
_Activate this agent by following its guidelines. Use \`*exit\` to deactivate._`;
    }

    return `# Agent Not Found: @${agent}

Available agents can be found in \`.context/agents/\`.

Use \`get-agent\` tool to retrieve agent details.`;
  }

  codeReviewPrompt(args) {
    const { files } = args;

    return `# Code Review Request

## Files to Review
\`\`\`
${files}
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
- [ ] Appropriate design patterns

### 3. Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] No SQL injection risks
- [ ] Proper authentication/authorization

### 4. Performance
- [ ] No obvious performance issues
- [ ] Efficient algorithms used
- [ ] No memory leaks
- [ ] Proper resource cleanup

### 5. Testing
- [ ] Unit tests present
- [ ] Edge cases covered
- [ ] Tests are meaningful
- [ ] No flaky tests

### 6. Documentation
- [ ] Public APIs documented
- [ ] Complex logic explained
- [ ] README updated if needed

---
_Provide detailed feedback for each category._`;
  }

  featurePlanPrompt(args) {
    const { feature, complexity = 'medium' } = args;

    return `# Feature Planning: ${feature}

## Complexity: ${complexity}

### Planning Template

#### 1. Problem Statement
What problem does this feature solve?

#### 2. Proposed Solution
How will this feature address the problem?

#### 3. Technical Design
- Architecture changes needed
- New components/modules
- API changes
- Database changes (if any)

#### 4. Implementation Plan
- [ ] Create technical spec
- [ ] Set up tests
- [ ] Implement core functionality
- [ ] Add error handling
- [ ] Write documentation
- [ ] Review and refactor

#### 5. Dependencies
- External packages needed
- Internal modules affected
- Configuration changes

#### 6. Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| ... | ... |

#### 7. Success Criteria
- [ ] Feature works as expected
- [ ] Tests pass
- [ ] Documentation complete
- [ ] No regressions

---
_Fill out this template for a complete feature plan._`;
  }

  debugPrompt(args) {
    const { issue } = args;

    return `# Debug Session: ${issue}

## Debug Protocol

### 1. Reproduce
- [ ] Identify reproduction steps
- [ ] Create minimal test case
- [ ] Document expected vs actual behavior

### 2. Isolate
- [ ] Binary search for problematic code
- [ ] Check recent changes (git log)
- [ ] Review error messages and stack traces

### 3. Hypothesize
- List possible causes:
  1. ...
  2. ...
  3. ...

### 4. Test
- For each hypothesis:
  - [ ] Design test to verify
  - [ ] Execute test
  - [ ] Document results

### 5. Fix
- [ ] Implement fix
- [ ] Add regression test
- [ ] Verify fix doesn't break other things

### 6. Document
- Root cause:
- Fix applied:
- Prevention measures:

---
_Follow this structured approach to debug the issue._`;
  }

  refactorPrompt(args) {
    const { scope, goals } = args;

    return `# Refactoring Plan: ${scope}

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
- [ ] Estimate effort per step
- [ ] Plan rollback strategy

#### 3. Execution
- [ ] One change at a time
- [ ] Run tests after each change
- [ ] Commit frequently
- [ ] Update documentation

#### 4. Verification
- [ ] All tests pass
- [ ] No behavior changes
- [ ] Code metrics improved
- [ ] Documentation updated

### Common Refactoring Patterns

- Extract Method
- Extract Variable
- Rename Variable/Method
- Move Method
- Inline Method
- Replace Conditional with Polymorphism
- Extract Interface

---
_Remember: Refactoring should not change behavior, only structure._`;
  }

  testStrategyPrompt(args) {
    const { feature, type = 'all' } = args;

    return `# Test Strategy: ${feature}

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
- Medium execution time
- Critical paths coverage

#### 3. End-to-End Tests
- Test complete user flows
- Full environment
- Slow execution
- Happy path + critical errors

### Test Cases Template

\`\`\`javascript
describe('${feature}', () => {
  describe('Happy Path', () => {
    it('should ...', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Error Cases', () => {
    it('should handle ...', () => {
      // Test error handling
    });
  });

  describe('Edge Cases', () => {
    it('should handle ...', () => {
      // Test boundary conditions
    });
  });
});
\`\`\`

### Coverage Goals

| Type | Target |
|------|--------|
| Statements | 80% |
| Branches | 75% |
| Functions | 85% |
| Lines | 80% |

---
_Create comprehensive tests following this strategy._`;
  }

  count() {
    return this.registeredCount;
  }
}

module.exports = { PromptRegistry };
