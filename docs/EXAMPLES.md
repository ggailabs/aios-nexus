# AIOS Nexus - Exemplos de Uso

**Author:** Guilherme Giorgi  
**Organization:** Genesis Grid AI Labs  
**Website:** https://ggailabs.com  
**Email:** contato@ggailabs.com

## Exemplo 1: Iniciando um Novo Projeto

```bash
# Criar novo projeto
aios-nexus init my-app

# Entrar no diretório
cd my-app

# Ver estrutura criada
ls -la .context/
ls -la .aios-core/
```

## Exemplo 2: Workflow PREVC Completo

```bash
# 1. Iniciar workflow
aios-nexus workflow start "Implementar autenticação JWT"

# Output:
# 🚀 Workflow Started
# ━━━━━━━━━━━━━━━━━━━━━━━━
# ID: workflow-abc123
# Name: Implementar autenticação JWT
# Scale: MEDIUM
# Phases: P → R → E → V
# Current: P

# 2. Verificar status
aios-nexus workflow status

# Output:
# 📊 Workflow Status
# ━━━━━━━━━━━━━━━━━━━━━━━━
# 📋 Name: Implementar autenticação JWT
# 📍 Phase: P (Plan)
# Progress: 25%

# 3. Avançar para próxima fase
aios-nexus workflow advance

# Output:
# ⏭️ Workflow Advanced
# Phase: R (Review)

# 4. Continuar avançando
aios-nexus workflow advance  # R → E
aios-nexus workflow advance  # E → V

# 5. Completar workflow
aios-nexus workflow complete

# Output:
# ✅ Workflow Completed
# Duration: 45m
# Artifacts: 3
```

## Exemplo 3: Trabalhando com Agentes

```bash
# Listar agentes disponíveis
aios-nexus agent list

# Ver detalhes de um agente
aios-nexus agent get architect

# Output:
# 🤖 Agent: @architect
# ━━━━━━━━━━━━━━━━━━━━━━━━
#
# # Architect Agent
#
# > Expert in technical architecture
#
# **Role:** Technical Architect
# **Focus:** System design, patterns, scalability
```

## Exemplo 4: Sincronização Multi-IDE

```bash
# Preview do que será sincronizado
aios-nexus sync --dry-run

# Sincronizar todas as IDEs
aios-nexus sync

# Output:
# 🔄 Syncing to all IDEs
# ━━━━━━━━━━━━━━━━━━━━━━━━
# ✅ claude: 12 files synced
# ✅ cursor: 10 files synced
# ✅ windsurf: 8 files synced

# Sincronizar IDE específica
aios-nexus sync --ide=claude

# Validar paridade
aios-nexus sync --validate
```

## Exemplo 5: AI Scaffolding

```bash
# Analisar projeto
aios-nexus scaffold analyze

# Output:
# 🔍 Project Analysis
# ━━━━━━━━━━━━━━━━━━━━━━━━
# Framework: React 18
# Language: TypeScript
# Database: PostgreSQL
# Styling: TailwindCSS
# Testing: Jest, Cypress

# Gerar contexto
aios-nexus scaffold generate

# Preview sem escrever
aios-nexus scaffold preview
```

## Exemplo 6: MCP Server com Claude Code

### Configuração

Adicione ao `claude_desktop_config.json`:

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

### Uso no Claude

```
User: Inicie um workflow para implementar user dashboard

Claude: Vou iniciar um workflow PREVC para isso.
[Claude usa tool: start-workflow]

🚀 Workflow iniciado!
- ID: workflow-xyz789
- Nome: Implementar user dashboard
- Escala: MEDIUM
- Fases: P → R → E → V
- Fase atual: Plan

User: Qual o status do workflow?

Claude: [Claude usa tool: workflow-status]

📊 Status atual:
- Fase: Plan (25%)
- Próxima: Review
```

## Exemplo 7: Validação de Contexto

```bash
# Validar configuração
aios-nexus validate

# Output:
# 🔍 Validation Results
# ━━━━━━━━━━━━━━━━━━━━━━━━
# ✅ Status: VALID
#
# ⚠️ Warnings:
#   • Missing lint script in package.json
#   • Consider running 'aios-nexus sync'

# Modo estrito
aios-nexus validate --strict

# Auto-corrigir problemas
aios-nexus validate --fix
```

## Exemplo 8: Migração de Framework Legado

```bash
# Migrar de AIOS Core 4.x
aios-nexus migrate --from=aios-4.x --backup

# Output:
# 🔄 Migrating from AIOS Core 4.x...
# ✓ Creating backup...
# ✓ Preserving .aios-core...
# ✓ Migrating stories...
# ✓ Migrating agents...
# ✅ Migration completed!
```

## Exemplo 9: TUI Mode

```bash
# Iniciar TUI interativa
aios-tui

# Ou usar flag --tui
aios-nexus init --tui
```

## Exemplo 10: Gravação de Decisões

```bash
# Durante um workflow ativo
aios-nexus workflow start "API REST"

# Registrar decisão arquitetural
# (via MCP tool ou CLI)
# record-decision:
#   title: "Usar PostgreSQL em vez de MongoDB"
#   description: "PostgreSQL oferece melhor consistência para dados relacionais"
#   alternatives: ["MongoDB", "MySQL", "SQLite"]
```

## Scripts npm Recomendados

Adicione ao `package.json`:

```json
{
  "scripts": {
    "aios:init": "aios-nexus init",
    "aios:sync": "aios-nexus sync",
    "aios:validate": "aios-nexus validate",
    "aios:workflow": "aios-nexus workflow status",
    "aios:agents": "aios-nexus agent list",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "prepush": "npm run lint && npm run typecheck && npm test"
  }
}
```

## Workflow de Desenvolvimento Recomendado

```bash
# 1. Iniciar feature
aios-nexus workflow start "Feature X" --scale=MEDIUM

# 2. Planejar (Phase P)
# - Criar specs
# - Identificar dependências
aios-nexus workflow advance

# 3. Review (Phase R)
# - Review de arquitetura
# - Review de segurança
aios-nexus workflow advance

# 4. Execute (Phase E)
# - Implementar código
# - Escrever testes
aios-nexus workflow advance

# 5. Validate (Phase V)
npm run lint
npm run typecheck
npm test
aios-nexus workflow advance

# 6. Completar
aios-nexus workflow complete

# 7. Sincronizar
aios-nexus sync
```
