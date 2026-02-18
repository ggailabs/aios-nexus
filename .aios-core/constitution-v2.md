# AIOS Nexus Constitution

> **Version:** 2.0.0 | **Ratified:** 2026-02-18 | **Framework:** AIOS Nexus
> **Author:** Guilherme Giorgi | **Organization:** Genesis Grid AI Labs

Este documento define os princípios fundamentais e inegociáveis do AIOS Nexus. Todos os agentes, tasks, e workflows DEVEM respeitar estes princípios. Violações são bloqueadas automaticamente via gates.

---

## Core Principles

### I. CLI First (NON-NEGOTIABLE)

O CLI é a fonte da verdade onde toda inteligência, execução, e automação vivem.

**Regras:**

- MUST: Toda funcionalidade nova DEVE funcionar 100% via CLI antes de qualquer UI
- MUST: Dashboards apenas observam, NUNCA controlam ou tomam decisões
- MUST: A UI NUNCA é requisito para operação do sistema
- MUST: Ao decidir onde implementar, sempre CLI > Observability > UI

**Hierarquia:**

```
CLI (Máxima) → Observability (Secundária) → UI (Terciária)
```

---

### II. Context Engineering (NON-NEGOTIABLE)

`.context/` é a fonte da verdade para todo o conteúdo gerado e sincronizado.

**Regras:**

- MUST: Todo agente, skill, workflow DEVE ser definido em `.context/`
- MUST: Alterações devem ser feitas na fonte, nunca nos targets
- MUST: Sync deve ser executado após qualquer mudança
- MUST: Validate deve passar antes de commit

**Estrutura:**

```
.context/
├── docs/       → Documentação do codebase
├── agents/     → Playbooks de agentes (15)
├── skills/     → Expertise sob demanda
├── plans/      → Planos PREVC
└── workflows/  → Workflows executáveis
```

---

### III. Agent Authority (NON-NEGOTIABLE)

Cada agente tem autoridades exclusivas que não podem ser violadas.

**Regras:**

- MUST: Apenas @devops pode executar `git push` para remote
- MUST: Apenas @devops pode criar Pull Requests
- MUST: Apenas @devops pode criar releases e tags
- MUST: Apenas @qa pode aprovar quality gates
- MUST: Apenas @architect pode criar ADRs
- MUST: Agentes DEVEM delegar para o agente apropriado quando fora de seu escopo

**Exclusividades:**

| Autoridade             | Agente Exclusivo |
| ---------------------- | ---------------- |
| git push               | @devops          |
| PR creation            | @devops          |
| Release/Tag            | @devops          |
| Quality Gate approval  | @qa              |
| Architecture decisions | @architect       |
| Story creation         | @sm              |
| Story validation       | @po              |
| Security audit         | @security        |

---

### IV. PREVC Workflow (MUST)

Todo desenvolvimento segue o workflow PREVC com escala adaptativa.

**Regras:**

- MUST: Nenhum código é escrito sem passar por PREVC
- MUST: Escala deve ser detectada automaticamente
- MUST: Gates devem ser respeitados em cada fase
- MUST: Documentação deve ser atualizada em cada fase

**Fases:**
| Fase | Nome | Propósito |
|------|------|-----------|
| P | Plan | Definir o que construir |
| R | Review | Validar a abordagem |
| E | Execute | Implementar |
| V | Validate | Verificar funcionamento |
| C | Confirm | Publicar e documentar |

**Scale Routing:**
| Escala | Fases | Uso |
|--------|-------|-----|
| QUICK | E → V | Bug fixes, typos |
| SMALL | P → E → V | Features simples |
| MEDIUM | P → R → E → V | Features regulares |
| LARGE | P → R → E → V → C | Sistemas complexos |

---

### V. Quality First (MUST)

Qualidade não é negociável. Todo código passa por múltiplos gates antes de merge.

**Regras:**

- MUST: `npm run lint` passa sem erros
- MUST: `npm run typecheck` passa sem erros
- MUST: `npm test` passa sem falhas
- MUST: `npm run build` completa com sucesso
- MUST: Security scan não reporta CRITICAL issues
- MUST: Coverage não diminui

**Gate Severities:**
| Severidade | Comportamento | Uso |
|------------|---------------|-----|
| BLOCK | Impede execução | CRITICAL, HIGH |
| WARN | Permite com alerta | MEDIUM |
| INFO | Apenas reporta | LOW |

---

### VI. Multi-IDE Sync (MUST)

Todo conteúdo deve ser sincronizável para múltiplas IDEs.

**Regras:**

- MUST: `.context/` é a fonte única da verdade
- MUST: Sync deve ser executável via CLI
- MUST: Validate deve verificar paridade
- MUST: Novas IDEs devem ser facilmente adicionáveis

**IDEs Suportadas:**

- Claude Code (`.claude/`)
- Cursor (`.cursor/`)
- Windsurf (`.windsurf/`)
- Codex CLI (`.codex/`, `AGENTS.md`)
- Gemini CLI (`.gemini/`)
- GitHub Copilot (`.github/`)
- AntiGravity (`.agent/`)
- VS Code (`.vscode/`)

---

### VII. No Invention (MUST)

Especificações não inventam - apenas derivam dos requisitos.

**Regras:**

- MUST: Todo statement em spec DEVE rastrear para requisito
- MUST NOT: Adicionar features não presentes nos requisitos
- MUST NOT: Assumir detalhes não pesquisados
- MUST NOT: Especificar tecnologias não validadas

---

### VIII. AI Scaffolding (SHOULD)

IA deve auxiliar no preenchimento de contexto quando possível.

**Regras:**

- SHOULD: Analisar codebase para gerar contexto
- SHOULD: Detectar tech stack automaticamente
- SHOULD: Sugerir agentes relevantes
- SHOULD: Preencher templates com informações extraídas

---

## Governance

### Amendment Process

1. Proposta de mudança documentada com justificativa
2. Review por @architect e @pm
3. Aprovação requer consenso
4. Mudança implementada com atualização de versão
5. Propagação para templates e tasks dependentes

### Versioning

- **MAJOR:** Remoção ou redefinição incompatível de princípio
- **MINOR:** Novo princípio ou expansão significativa
- **PATCH:** Clarificações, correções de texto, refinamentos

### Compliance

- Todos os PRs DEVEM verificar compliance com Constitution
- Gates automáticos BLOQUEIAM violações de princípios NON-NEGOTIABLE
- Gates automáticos ALERTAM violações de princípios MUST
- Violações de SHOULD são reportadas mas não bloqueiam

---

## References

- **Agent Definitions:** `.context/agents/`
- **Skills Library:** `.context/skills/`
- **Workflow Definitions:** `.context/workflows/`
- **Quality Gates:** `.aios-core/infrastructure/contracts/`
- **Sync Configuration:** `.aios-core/core-config.yaml`

---

_AIOS Nexus Constitution v2.0.0_
_CLI First | Context Engineering | Quality First | Multi-IDE_
