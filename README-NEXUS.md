# AIOS Nexus

> **Framework Unificado de Desenvolvimento com IA**
> Version 5.0.0
>
> **Author:** Guilherme Giorgi | **Genesis Grid AI Labs**

AIOS Nexus é um framework completo para desenvolvimento assistido por IA, desenvolvido por **Guilherme Giorgi** na **Genesis Grid AI Labs**, unificando as melhores práticas de AIOS Core, GGAI Nexus, AI-Coders Context e Antigravity Kit.

## Características

### 🔄 PREVC Workflow

Sistema de workflow adaptativo por escala:

- **QUICK** (E→V): Bug fixes, typos (~5 min)
- **SMALL** (P→E→V): Features simples (~15 min)
- **MEDIUM** (P→R→E→V): Features regulares (~30 min)
- **LARGE** (P→R→E→V→C): Sistemas complexos (~1h+)

### 🤖 15 Agentes Unificados

| Agente          | Foco                     |
| --------------- | ------------------------ |
| `orchestrator`  | Coordenação multi-agente |
| `architect`     | Arquitetura técnica      |
| `developer`     | Implementação fullstack  |
| `qa`            | Qualidade e testes       |
| `devops`        | CI/CD e infraestrutura   |
| `security`      | Segurança                |
| `data-engineer` | Dados e bancos           |
| `pm`            | Estratégia de produto    |
| `po`            | Backlog e priorização    |
| `sm`            | Facilitação ágil         |
| `analyst`       | Análise de código        |
| `reviewer`      | Code review              |
| `writer`        | Documentação             |
| `optimizer`     | Performance              |
| `mobile`        | Apps móveis              |

### 🔌 MCP Server

Model Context Protocol server completo:

- **22 Tools**: init-context, start-workflow, sync-ide, etc.
- **10 Resources**: context://docs, aios://config, etc.
- **8 Prompts**: prevc-workflow, code-review, etc.

### 📦 Multi-IDE Sync

Sincronização automática para 8 IDEs:

- Claude Code (`.claude/`)
- Cursor (`.cursor/`)
- Windsurf (`.windsurf/`)
- Codex CLI (`.codex/`)
- Gemini CLI (`.gemini/`)
- GitHub Copilot (`.github/`)
- AntiGravity (`.agent/`)
- VS Code (`.vscode/`)

### 🏗️ AI Scaffolding

Análise e geração automática de contexto:

- Detecção de tech stack
- Análise de símbolos
- Geração de documentação
- Recomendação de agentes

## Instalação

```bash
# Via npm
npm install -g aios-core

# Ou usar diretamente
npx aios-nexus init my-project
```

## Quick Start

```bash
# Inicializar novo projeto
aios-nexus init my-project

# Ou instalar em projeto existente
cd existing-project
aios-nexus install

# Sincronizar com IDEs
aios-nexus sync

# Iniciar workflow
aios-nexus workflow start "Minha Feature"
```

## Comandos CLI

### Inicialização

```bash
aios-nexus init [project-name]    # Novo projeto
aios-nexus install                # Instalar em projeto existente
aios-nexus migrate --from=aios-4.x # Migrar de framework legado
```

### Workflow

```bash
aios-nexus workflow start <name>   # Iniciar workflow
aios-nexus workflow status         # Ver status
aios-nexus workflow advance        # Avançar fase
aios-nexus workflow complete       # Completar
aios-nexus workflow cancel         # Cancelar
```

### Context

```bash
aios-nexus context init            # Inicializar .context/
aios-nexus context fill            # Preencher com AI
aios-nexus context validate        # Validar
```

### Sync

```bash
aios-nexus sync                    # Sync todas IDEs
aios-nexus sync --ide=claude       # Sync IDE específica
aios-nexus sync --validate         # Validar paridade
aios-nexus sync --dry-run          # Preview
```

### Agentes

```bash
aios-nexus agent list              # Listar agentes
aios-nexus agent get <id>          # Ver detalhes
aios-nexus agent activate <id>     # Ativar agente
```

### Scaffolding

```bash
aios-nexus scaffold analyze        # Analisar codebase
aios-nexus scaffold generate       # Gerar contexto
aios-nexus scaffold preview        # Preview
```

### MCP Server

```bash
aios-nexus mcp                     # Iniciar MCP server
aios-context                       # Alias para MCP server
```

## Estrutura do Projeto

```
project/
├── .context/                 # FONTE DA VERDADE
│   ├── docs/                # Documentação
│   │   ├── codebase-map.json
│   │   └── stories/
│   ├── agents/              # 15 agentes
│   │   ├── architect.md
│   │   ├── developer.md
│   │   └── ...
│   ├── skills/              # Skills por domínio
│   │   ├── frontend/
│   │   ├── backend/
│   │   └── ...
│   ├── plans/               # Planos PREVC
│   └── workflows/           # Workflows
│
├── .aios-core/              # CONFIGS
│   ├── constitution.md      # Princípios
│   └── core-config.yaml     # Configuração
│
├── .claude/                 # Claude Code (synced)
├── .cursor/                 # Cursor (synced)
├── .windsurf/               # Windsurf (synced)
└── .codex/                  # Codex CLI (synced)
```

## Quality Gates

Antes de commitar, sempre execute:

```bash
npm run lint        # Code style
npm run typecheck   # Type safety
npm test            # Testes
```

## MCP Tools Disponíveis

| Tool               | Descrição              |
| ------------------ | ---------------------- |
| `init-context`     | Inicializar .context/  |
| `fill-scaffold`    | Preencher com AI       |
| `start-workflow`   | Iniciar workflow PREVC |
| `advance-workflow` | Avançar fase           |
| `workflow-status`  | Status atual           |
| `sync-ide`         | Sincronizar IDEs       |
| `validate-context` | Validar contexto       |
| `get-agent`        | Obter agente           |
| `get-config`       | Obter configuração     |

## MCP Resources

| Resource              | Descrição        |
| --------------------- | ---------------- |
| `context://docs`      | Documentação     |
| `context://agents`    | Lista de agentes |
| `context://skills`    | Skills           |
| `aios://constitution` | Constituição     |
| `aios://config`       | Configuração     |
| `aios://codebase-map` | Mapa do codebase |

## MCP Prompts

| Prompt              | Uso                     |
| ------------------- | ----------------------- |
| `aios-constitution` | Lembrar princípios      |
| `prevc-workflow`    | Iniciar workflow        |
| `agent-activate`    | Ativar agente           |
| `code-review`       | Code review estruturado |
| `feature-plan`      | Planejar feature        |
| `debug-session`     | Sessão de debug         |

## Configuração do MCP Server

Adicione ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aios-nexus": {
      "command": "node",
      "args": ["/path/to/aios-core/bin/aios-context.js"]
    }
  }
}
```

## Desenvolvimento

```bash
# Setup
git clone https://github.com/synkra/aios-core
cd aios-core
npm install

# Testes
npm test

# Lint
npm run lint

# Type check
npm run typecheck
```

## Migração

De AIOS Core 4.x:

```bash
aios-nexus migrate --from=aios-4.x
```

De AI-Coders Context:

```bash
aios-nexus migrate --from=ai-coders
```

De Antigravity Kit:

```bash
aios-nexus migrate --from=antigravity
```

## Constituição

Princípios NON-NEGOTIABLE:

1. **CLI First** - Todas operações via CLI
2. **Agent Authority** - Confiar na expertise dos agentes
3. **Story-Driven** - Trabalhar a partir de stories
4. **No Invention** - Implementar apenas acceptance criteria
5. **Quality First** - Quality gates antes de completar
6. **Absolute Imports** - Imports absolutos

## Licença

MIT © 2025-2026 Guilherme Giorgi, Genesis Grid AI Labs

---

**AIOS Nexus** - Framework Unificado de Desenvolvimento com IA

**Created by:** Guilherme Giorgi  
**Organization:** Genesis Grid AI Labs  
**Website:** https://ggailabs.com  
**Email:** contato@ggailabs.com
