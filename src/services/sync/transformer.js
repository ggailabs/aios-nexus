/**
 * AIOS Nexus - Content Transformer
 *
 * Transform context content for different IDEs
 * Version: 5.0.0
 */

const path = require('path');
const yaml = require('yaml');

class ContentTransformer {
  constructor(config = {}) {
    this.config = config;

    // Transformation rules per IDE
    this.transformers = {
      claude: this.transformForClaude.bind(this),
      cursor: this.transformForCursor.bind(this),
      windsurf: this.transformForWindsurf.bind(this),
      codex: this.transformForCodex.bind(this),
      gemini: this.transformForGemini.bind(this),
      copilot: this.transformForCopilot.bind(this),
      antigravity: this.transformForAntigravity.bind(this),
      vscode: this.transformForVSCode.bind(this),
    };
  }

  /**
   * Transform content for target IDE
   */
  async transform(sourceContent, target) {
    const transformer = this.transformers[target];

    if (!transformer) {
      throw new Error(`No transformer for target: ${target}`);
    }

    return await transformer(sourceContent);
  }

  /**
   * Transform for Claude Code
   */
  async transformForClaude(content) {
    const transformed = {};

    // CLAUDE.md main file
    transformed['.claude/CLAUDE.md'] = this.generateClaudeMain(content);

    // Agent commands
    for (const [name, agentContent] of Object.entries(content.agents)) {
      transformed[`.claude/commands/AIOS/agents/${name}`] = agentContent;
    }

    // Skills
    for (const [name, skillContent] of Object.entries(content.skills)) {
      transformed[`.claude/skills/${name}`] = skillContent;
    }

    return transformed;
  }

  /**
   * Transform for Cursor
   */
  async transformForCursor(content) {
    const transformed = {};

    // Consolidated rules file
    transformed['.cursor/rules'] = this.generateCursorRules(content);

    // MCP config
    transformed['.cursor/mcp.json'] = this.generateMCPConfig();

    return transformed;
  }

  /**
   * Transform for Windsurf
   */
  async transformForWindsurf(content) {
    const transformed = {};

    // Rules
    transformed['.windsurf/rules'] = this.generateWindsurfRules(content);

    // Agents as skills
    for (const [name, agentContent] of Object.entries(content.agents)) {
      transformed[`.windsurf/skills/${name}`] = agentContent;
    }

    // Workflows
    for (const [name, workflowContent] of Object.entries(content.workflows)) {
      transformed[`.windsurf/workflows/${name}`] = workflowContent;
    }

    return transformed;
  }

  /**
   * Transform for Codex CLI
   */
  async transformForCodex(content) {
    const transformed = {};

    // AGENTS.md at root
    transformed['AGENTS.md'] = this.generateCodexAgentsMd(content);

    // Agent files
    for (const [name, agentContent] of Object.entries(content.agents)) {
      transformed[`.codex/agents/${name}`] = agentContent;
    }

    // Skills
    for (const [name, skillContent] of Object.entries(content.skills)) {
      transformed[`.codex/skills/${name}`] = skillContent;
    }

    return transformed;
  }

  /**
   * Transform for Gemini CLI
   */
  async transformForGemini(content) {
    const transformed = {};

    // Rules
    transformed['.gemini/rules.md'] = this.generateGeminiRules(content);

    // Agent commands (TOML format would be generated separately)
    for (const [name, agentContent] of Object.entries(content.agents)) {
      transformed[`.gemini/rules/AIOS/agents/${name}`] = agentContent;
    }

    return transformed;
  }

  /**
   * Transform for GitHub Copilot
   */
  async transformForCopilot(content) {
    const transformed = {};

    // Single instructions file
    transformed['.github/copilot-instructions.md'] = this.generateCopilotInstructions(content);

    return transformed;
  }

  /**
   * Transform for AntiGravity
   */
  async transformForAntigravity(content) {
    const transformed = {};

    // Agents
    for (const [name, agentContent] of Object.entries(content.agents)) {
      transformed[`.agent/agents/${name}`] = agentContent;
    }

    // Skills
    for (const [name, skillContent] of Object.entries(content.skills)) {
      transformed[`.agent/skills/${name}`] = skillContent;
    }

    // Workflows
    for (const [name, workflowContent] of Object.entries(content.workflows)) {
      transformed[`.agent/workflows/${name}`] = workflowContent;
    }

    return transformed;
  }

  /**
   * Transform for VS Code
   */
  async transformForVSCode(content) {
    const transformed = {};

    // Settings with AI context
    transformed['.vscode/settings.json'] = this.generateVSCodeSettings(content);

    // MCP config
    transformed['.vscode/mcp.json'] = this.generateMCPConfig();

    return transformed;
  }

  // ========================================
  // GENERATOR METHODS
  // ========================================

  /**
   * Generate CLAUDE.md main file
   */
  generateClaudeMain(content) {
    return `# CLAUDE.md - AIOS Nexus

Este arquivo configura o comportamento do Claude Code ao trabalhar neste repositório.

---

## Constitution

O AIOS Nexus possui uma **Constitution formal** com princípios inegociáveis e gates automáticos.

**Documento completo:** \`.aios-core/constitution-v2.md\`

**Princípios fundamentais:**

| Artigo | Princípio | Severidade |
|--------|-----------|------------|
| I | CLI First | NON-NEGOTIABLE |
| II | Context Engineering | NON-NEGOTIABLE |
| III | Agent Authority | NON-NEGOTIABLE |
| IV | PREVC Workflow | MUST |
| V | Quality First | MUST |
| VI | Multi-IDE Sync | MUST |
| VII | No Invention | MUST |
| VIII | AI Scaffolding | SHOULD |

---

## Agentes Disponíveis

Use slash commands para ativar agentes:

${
  Object.keys(content.agents)
    .map((name) => `- \`/${name.replace('.md', '')}\` - ${this.getAgentDescription(name)}`)
    .join('\n') || '- Veja .claude/commands/AIOS/agents/'
}

---

## Workflow PREVC

\`\`\`
P → R → E → V → C
Plan → Review → Execute → Validate → Confirm
\`\`\`

### Escala Adaptativa

| Escala | Fases | Uso |
|--------|-------|-----|
| QUICK | E → V | Bug fixes |
| SMALL | P → E → V | Features simples |
| MEDIUM | P → R → E → V | Features regulares |
| LARGE | P → R → E → V → C | Sistemas complexos |

---

## Comandos

\`\`\`bash
# Workflow
aios-nexus workflow start <name>
aios-nexus workflow status
aios-nexus workflow advance

# Sync
aios-nexus sync

# Scaffold
aios-nexus scaffold analyze
aios-nexus scaffold generate
\`\`\`

---

## Quality Gates

- \`npm run lint\` - Deve passar
- \`npm run typecheck\` - Deve passar
- \`npm test\` - Deve passar

---

*AIOS Nexus v5.0.0*
`;
  }

  /**
   * Generate Cursor rules
   */
  generateCursorRules(content) {
    return `# AIOS Nexus Rules

## Context Engineering

Este projeto usa \`.context/\` como fonte da verdade.

\`\`\`
.context/
├── docs/       # Documentação
├── agents/     # Agentes IA
├── skills/     # Skills especializadas
├── plans/      # Planos PREVC
└── workflows/  # Workflows executáveis
\`\`\`

## Agentes

${
  Object.keys(content.agents)
    .map((name) => `- @${name.replace('.md', '')}`)
    .join('\n') || 'Veja .context/agents/'
}

## Workflow PREVC

Plan → Review → Execute → Validate → Confirm

## Quality Gates

- Lint: npm run lint
- TypeCheck: npm run typecheck
- Tests: npm test

---

*AIOS Nexus v5.0.0*
`;
  }

  /**
   * Generate Windsurf rules
   */
  generateWindsurfRules(content) {
    return `# AIOS Nexus - Windsurf Rules

## Overview

Framework unificado de desenvolvimento com IA.

## Agents

Available in .windsurf/skills/

## Workflow

PREVC: Plan → Review → Execute → Validate → Confirm

---

*AIOS Nexus v5.0.0*
`;
  }

  /**
   * Generate Codex AGENTS.md
   */
  generateCodexAgentsMd(content) {
    return `# AGENTS.md - AIOS Nexus

## AI Context References

- Context root: \`.context/\`
- Agents: \`.context/agents/\`
- Skills: \`.context/skills/\`

## Available Agents

${
  Object.keys(content.agents)
    .map((name) => `- \`${name.replace('.md', '')}\`: See .codex/agents/${name}`)
    .join('\n') || 'See .codex/agents/'
}

## Workflow

PREVC: Plan → Review → Execute → Validate → Confirm

## Quick Start

\`\`\`bash
aios-nexus workflow start <name>
aios-nexus sync
\`\`\`

---

*AIOS Nexus v5.0.0*
`;
  }

  /**
   * Generate Gemini rules
   */
  generateGeminiRules(content) {
    return `# AIOS Nexus - Gemini Rules

## Context

Source: \`.context/\`

## Agents

Use: /aios-<agent-name>

${
  Object.keys(content.agents)
    .map((name) => `- /aios-${name.replace('.md', '')}`)
    .join('\n') || 'See .gemini/rules/AIOS/agents/'
}

## Workflow

PREVC: Plan → Review → Execute → Validate → Confirm

---

*AIOS Nexus v5.0.0*
`;
  }

  /**
   * Generate Copilot instructions
   */
  generateCopilotInstructions(content) {
    return `# AIOS Nexus - GitHub Copilot Instructions

## Context Engineering

This project uses \`.context/\` as the source of truth for AI context.

## Workflow

Follow PREVC methodology:
1. Plan - Define what to build
2. Review - Validate approach
3. Execute - Implement
4. Validate - Test and verify
5. Confirm - Deploy and document

## Quality Gates

- Run \`npm run lint\` before commits
- Run \`npm run typecheck\` before commits
- Run \`npm test\` before commits

## Agents

${
  Object.keys(content.agents)
    .map((name) => `- ${name.replace('.md', '')}`)
    .join('\n') || 'See .context/agents/'
}

---

*AIOS Nexus v5.0.0*
`;
  }

  /**
   * Generate VS Code settings
   */
  generateVSCodeSettings(content) {
    return JSON.stringify(
      {
        'editor.formatOnSave': true,
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.codeActionsOnSave': {
          'source.fixAll.eslint': 'explicit',
        },
        'typescript.preferences.importModuleSpecifier': 'relative',
        'files.associations': {
          '*.md': 'markdown',
          '.context/**/*': 'markdown',
        },
      },
      null,
      2
    );
  }

  /**
   * Generate MCP config
   */
  generateMCPConfig() {
    return JSON.stringify(
      {
        mcpServers: {
          context7: {
            url: 'https://mcp.context7.com/sse',
          },
        },
      },
      null,
      2
    );
  }

  /**
   * Get agent description from content
   */
  getAgentDescription(name) {
    // Extract description from frontmatter or first line
    return name.replace('.md', '').replace('-', ' ');
  }
}

module.exports = { ContentTransformer };
