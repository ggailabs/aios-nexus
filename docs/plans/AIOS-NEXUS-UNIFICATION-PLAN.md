# Plano de Unificação: AIOS Nexus

> **Versão:** 1.0.0
> **Data:** 2026-02-18
> **Status:** ✅ COMPLETO - Todas as 7 fases finalizadas
> **Author:** Guilherme Giorgi
> **Organization:** Genesis Grid AI Labs
> **Autor:** GG.AI Labs + AIOS Team

---

## Visão Geral

**Nome:** AIOS Nexus  
**Arquitetura:** Híbrida (`.context/` + `.aios-core/`)  
**Workflow:** PREVC + Story-Driven (híbrido)  
**Features Prioritárias:** Multi-IDE Sync, AI Scaffolding, MCP Server, Quality Gates

### Frameworks Unificados

| Framework             | Principais Contribuições                                |
| --------------------- | ------------------------------------------------------- |
| **AIOS Core 4.2.13**  | Constitution, Quality Gates, Multi-IDE Sync, 11 Agentes |
| **GGAI Nexus**        | TUI React/Ink, AI Scaffolding, Multi-Language           |
| **AI-Coders Context** | MCP Server, PREVC Workflow, Semantic Analysis           |
| **Antigravity Kit**   | 36 Skills, 20 Agentes, UI/UX Pro Max                    |

---

## Estrutura de Diretórios

```
aios-nexus/
├── .context/                    # FONTE DA VERDADE (AI-Coders)
│   ├── docs/                    # Documentação do codebase
│   ├── agents/                  # Playbooks de agentes
│   ├── skills/                  # Expertise sob demanda
│   ├── plans/                   # Planos PREVC
│   └── workflows/               # Workflows executáveis
│
├── .aios-core/                  # CONFIGS + FRAMEWORK
│   ├── constitution.md          # Princípios NON-NEGOTIABLE
│   ├── core-config.yaml         # Configuração central
│   ├── development/
│   │   ├── agents/              # Definições YAML de agentes
│   │   ├── tasks/               # Tasks executáveis
│   │   ├── templates/           # Templates de documentos
│   │   └── checklists/          # Checklists de validação
│   ├── infrastructure/
│   │   ├── scripts/             # Scripts de CLI
│   │   ├── contracts/           # Contratos de compatibilidade
│   │   └── mcp/                 # MCP Server
│   └── hooks/                   # Hooks de ciclo de vida
│
├── bin/                         # CLI Entry Points
│   ├── aios-nexus.js            # CLI principal
│   ├── aios-context.js          # MCP Server
│   └── aios-scaffold.js         # AI Scaffolding
│
├── src/
│   ├── cli/                     # CLI Implementation
│   │   ├── commands/            # Comandos do CLI
│   │   └── tui/                 # Terminal UI (React/Ink)
│   ├── core/
│   │   ├── scaffolder.js        # AI-Powered Scaffolding
│   │   ├── detector.js          # IDE Detection
│   │   └── generator.js         # Content Generation
│   ├── services/
│   │   ├── mcp/                 # MCP Server Implementation
│   │   ├── sync/                # Multi-IDE Sync
│   │   ├── llm/                 # LLM Clients
│   │   └── workflow/            # Workflow Engine
│   └── locales/                 # i18n (PT, EN, ES)
│
└── packages/                    # Workspaces
    ├── installer/               # Instalador NPX
    ├── mcp-server/              # MCP Server Package
    └── tui-components/          # Componentes TUI reutilizáveis
```

---

## Agentes Unificados (15)

| Agente          | ID              | Fontes Mescladas                             | Foco                     |
| --------------- | --------------- | -------------------------------------------- | ------------------------ |
| Orchestrator    | `orchestrator`  | AIOS-master, orchestrator                    | Coordenação multi-agente |
| Architect       | `architect`     | architect, database-architect                | Arquitetura técnica      |
| Developer       | `developer`     | dev, frontend-specialist, backend-specialist | Implementação fullstack  |
| QA              | `qa`            | qa, test-engineer, qa-automation-engineer    | Qualidade e testes       |
| DevOps          | `devops`        | devops, devops-engineer                      | CI/CD e infraestrutura   |
| Security        | `security`      | security-auditor, penetration-tester         | Segurança                |
| Data Engineer   | `data-engineer` | data-engineer, database-architect            | Dados e DB               |
| Product Manager | `pm`            | pm, product-manager                          | Estratégia de produto    |
| Product Owner   | `po`            | po, product-owner                            | Backlog e priorização    |
| Scrum Master    | `sm`            | sm                                           | Facilitação ágil         |
| Analyst         | `analyst`       | analyst, code-archaeologist                  | Análise de código        |
| Reviewer        | `reviewer`      | code-reviewer, debugger                      | Code review e debug      |
| Writer          | `writer`        | documentation-writer                         | Documentação             |
| Optimizer       | `optimizer`     | performance-optimizer                        | Performance              |
| Mobile          | `mobile`        | mobile-developer                             | Apps móveis              |

---

## Sistema de Skills

```
.context/skills/
├── frontend/
│   ├── react-nextjs.md
│   ├── vue-nuxt.md
│   ├── angular.md
│   ├── tailwind.md
│   └── ui-ux-pro-max/
├── backend/
│   ├── nodejs.md
│   ├── python.md
│   ├── nestjs.md
│   └── api-design.md
├── database/
│   ├── sql-optimization.md
│   ├── prisma.md
│   ├── supabase.md
│   └── mongodb.md
├── devops/
│   ├── docker.md
│   ├── kubernetes.md
│   ├── ci-cd.md
│   └── monitoring.md
├── security/
│   ├── owasp.md
│   ├── red-team.md
│   └── secure-coding.md
├── quality/
│   ├── testing-patterns.md
│   ├── code-review.md
│   └── clean-code.md
└── platform/
    ├── mcp-builder.md
    ├── mobile-development.md
    └── game-development.md
```

---

## Workflow Híbrido PREVC + Story

### Fases PREVC (Planejamento)

| Fase | Nome     | Agente                | Output                |
| ---- | -------- | --------------------- | --------------------- |
| P    | Plan     | @pm, @analyst         | PRD, Specs            |
| R    | Review   | @architect, @security | Architecture Doc, ADR |
| E    | Execute  | @developer            | Story, Code           |
| V    | Validate | @qa, @reviewer        | QA Gate, Report       |
| C    | Confirm  | @devops               | Release, Docs         |

### Fases Story (Execução)

| Fase      | Agente     | Status      | Output            |
| --------- | ---------- | ----------- | ----------------- |
| Create    | @sm        | Draft       | Story File        |
| Validate  | @po        | Ready       | Validation Report |
| Implement | @developer | In Progress | Code + Tests      |
| Review    | @qa        | Done        | QA Gate           |

### Scale-Adaptive Routing

| Escala | Fases PREVC       | Fases Story        | Caso de Uso      |
| ------ | ----------------- | ------------------ | ---------------- |
| QUICK  | E → V             | -                  | Bug fix, typo    |
| SMALL  | P → E → V         | -                  | Feature simples  |
| MEDIUM | P → R → E → V     | SM → DEV → QA      | Feature regular  |
| LARGE  | P → R → E → V → C | SM → PO → DEV → QA | Sistema complexo |

---

## Quality Gates

```yaml
gates:
  pre-push:
    - name: lint
      command: npm run lint
      severity: BLOCK
    - name: typecheck
      command: npm run typecheck
      severity: BLOCK
    - name: test
      command: npm test
      severity: BLOCK

  story-complete:
    - name: acceptance-criteria
      check: all_acs_verified
      severity: BLOCK
    - name: code-review
      check: reviewer_approved
      severity: BLOCK

  release:
    - name: build
      command: npm run build
      severity: BLOCK
    - name: changelog
      check: changelog_updated
      severity: WARN
```

---

## Multi-IDE Sync

### Diretórios por IDE

| IDE            | Diretório              | Arquivos                              |
| -------------- | ---------------------- | ------------------------------------- |
| Claude Code    | `.claude/`             | CLAUDE.md, commands/, hooks/, skills/ |
| Cursor         | `.cursor/`             | rules/, mcp.json                      |
| Windsurf       | `.windsurf/`           | rules/, skills/, workflows/           |
| Codex CLI      | `AGENTS.md`, `.codex/` | agents/, skills/                      |
| Gemini CLI     | `.gemini/`             | rules/, commands/, hooks/             |
| GitHub Copilot | `.github/`             | copilot-instructions.md               |
| AntiGravity    | `.agent/`              | agents/, skills/, workflows/          |
| VS Code        | `.vscode/`             | settings.json, mcp.json               |

### CLI de Sync

```bash
aios-nexus sync                  # Todas as IDEs
aios-nexus sync --ide=claude     # IDE específica
aios-nexus sync --validate       # Validar
aios-nexus sync --watch          # Watch mode
```

---

## MCP Server Tools

| Tool               | Descrição                |
| ------------------ | ------------------------ |
| `init-context`     | Inicializar scaffolding  |
| `fill-scaffold`    | Preencher com AI         |
| `sync-ide`         | Sincronizar para IDEs    |
| `start-workflow`   | Iniciar workflow PREVC   |
| `advance-workflow` | Avançar fase             |
| `get-status`       | Obter status do workflow |

---

## CLI Commands

```bash
# Inicialização
aios-nexus init [project-name]
aios-nexus install

# Context
aios-nexus context init
aios-nexus context fill
aios-nexus context update

# Sync
aios-nexus sync [options]

# Workflow
aios-nexus workflow start <name>
aios-nexus workflow status
aios-nexus workflow advance

# Agent
aios-nexus agent list
aios-nexus agent activate <id>

# Scaffold
aios-nexus scaffold analyze
aios-nexus scaffold generate
aios-nexus scaffold preview
```

---

## Cronograma

| Fase  | Descrição                      | Duração     | Status      |
| ----- | ------------------------------ | ----------- | ----------- |
| **1** | Fundação (estrutura + agentes) | 2-3 semanas | ✅ Completo |
| **2** | Motor de Workflow              | 2 semanas   | ✅ Completo |
| **3** | AI Scaffolding Engine          | 2 semanas   | ✅ Completo |
| **4** | Multi-IDE Sync Engine          | 1-2 semanas | ✅ Completo |
| **5** | MCP Server Integration         | 2 semanas   | ✅ Completo |
| **6** | CLI & TUI                      | 1-2 semanas | ✅ Completo |
| **7** | Testes & Documentação          | 1 semana    | ✅ Completo |

**Total: 11-15 semanas**

---

## Migração

Para projetos AIOS 4.x existentes:

```bash
aios-nexus migrate --from=aios
```

Converterá automaticamente:

- `.aios-core/` → preservado
- `.claude/`, `.cursor/` → re-sincronizado
- `docs/stories/` → migrado para workflow

---

## Decisões Tomadas

- [x] Nome: **AIOS Nexus**
- [x] Arquitetura: **Híbrida** (.context/ + .aios-core/)
- [x] Workflow: **PREVC + Story-Driven**
- [x] Agentes: **15 unificados**
- [x] Features: Multi-IDE Sync, AI Scaffolding, MCP Server, Quality Gates
- [x] Estrutura de diretórios: **Aprovada**

---

## Próximos Passos

1. [x] Criar estrutura de diretórios base
2. [x] Migrar e unificar definições de agentes
3. [x] Implementar motor de workflow PREVC
4. [x] Implementar AI Scaffolding Engine
5. [x] Implementar Multi-IDE Sync Engine
6. [x] Integrar MCP Server
7. [x] Desenvolver CLI + TUI
8. [x] Testes e documentação

## ✅ Projeto Finalizado

O AIOS Nexus está completo e pronto para uso. Todas as 7 fases foram implementadas com sucesso.

---

_Planejado e implementado por Guilherme Giorgi_
_Genesis Grid AI Labs - https://ggailabs.com_
_Contato: contato@ggailabs.com_
_AIOS Nexus - Framework Unificado de Desenvolvimento com IA_
