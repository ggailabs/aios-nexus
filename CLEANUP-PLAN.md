# Plano de Limpeza - AIOS Nexus

## Situação Atual

```
frameworks/     141MB  ← REMOVER (frameworks originais unificados)
packages/       908KB  ← REMOVER (pacotes legados)
.aios-core/      14MB  ← LIMPAR (manter só constitution-v2.md e core-config-v2.yaml)
tests/          4.8MB  ← LIMPAR (manter só testes do Nexus)
docs/           7.6MB  ← LIMPAR (manter só docs do Nexus)
.context/       136KB  ← MANTER (agentes do Nexus)
src/            388KB  ← MANTER (código Nexus)
bin/            284KB  ← MANTER (CLIs Nexus)
```

---

## O que REMOVER

### Diretórios Completos

```
frameworks/              # 141MB - Frameworks originais (ai-coders, antigravity, ggai-nexus)
packages/                # Pacotes legados
.aios/                   # Diretório antigo
.antigravity/            # Legado
pro/                     # Diretório pro antigo
.docker/                 # Docker legado
.claude/                 # Será gerado via sync
.cursor/                 # Será gerado via sync
.codex/                  # Será gerado via sync
.gemini/                 # Será gerado via sync
.windsurf/               # Será gerado via sync
```

### Dentro de `.aios-core/` REMOVER:

```
.aios-core/cli/          # CLI antigo
.aios-core/core/         # Core antigo
.aios-core/data/         # Dados antigos
.aios-core/development/  # Agentes antigos
.aios-core/docs/         # Docs antigos
.aios-core/elicitation/  # Legado
.aios-core/hooks/        # Hooks antigos
.aios-core/infrastructure/  # Scripts antigos
.aios-core/manifests/    # Manifests antigos
.aios-core/monitor/      # Monitor antigo
.aios-core/presets/      # Presets antigos
.aios-core/product/      # Produto antigo
.aios-core/quality/      # Quality antigo
.aios-core/schemas/      # Schemas antigos
.aios-core/scripts/      # Scripts antigos
.aios-core/utils/        # Utils antigos
.aios-core/workflow-intelligence/  # Legado

# Arquivos antigos
.aios-core/constitution.md       # Usar constitution-v2.md
.aios-core/core-config.yaml      # Usar core-config-v2.yaml
.aios-core/framework-config.yaml
.aios-core/install-manifest.yaml
.aios-core/local-config.yaml.template
.aios-core/project-config.yaml
.aios-core/user-guide.md
.aios-core/working-in-the-brownfield.md
.aios-core/index.js
.aios-core/index.esm.js
.aios-core/package.json
```

### Arquivos Raiz REMOVER:

```
AGENTS.md                # Legado
CHANGELOG.md             # Usar CHANGELOG-NEXUS.md
CODE_OF_CONDUCT.md       # Recriar se necessário
CONTRIBUTING.md          # Recriar se necessário
README.md                # Usar README-NEXUS.md
.env.example             # Legado
.coderabbit.yaml         # Legado
.gitmodules              # Legado
package.json.nexus       # Já foi integrado
```

### Dentro de `tests/` REMOVER (legado):

```
tests/agents/
tests/benchmarks/
tests/clickup/
tests/code-intel/
tests/config/
tests/core/
tests/e2e/
tests/fixtures/          # Manter só fixtures do Nexus
tests/health-check/
tests/hooks/
tests/ide-sync/
tests/infrastructure/
tests/installer/
tests/integration/       # Manter só integration do Nexus
tests/license/
tests/macos/
tests/packages/
tests/performance/
tests/pro/
tests/regression/
tests/security/
tests/synapse/
tests/template-engine/
tests/templates/
tests/tools/
tests/updater/
tests/wizard/

# Arquivos legados
tests/epic-verification.test.js
tests/pro-recover.test.js
tests/pro-wizard.test.js
tests/story-update-hook.test.js
tests/setup.js           # Manter se usado pelo Nexus
```

### Dentro de `docs/` REMOVER (legado):

```
docs/agents/             # Usar .context/agents/
docs/archived/           # Arquivados
docs/commands/           # Legado
docs/guides/             # Legado (recriar se necessário)
docs/infrastructure/     # Legado
docs/pro/                # Legado
docs/schemas/            # Legado
docs/scripts/            # Legado
docs/templates/          # Legado
docs/tests/              # Legado

# Manter
docs/plans/              # Plano do Nexus
docs/EXAMPLES.md         # Exemplos do Nexus
```

---

## O que MANTER

### Estrutura Final:

```
aios-nexus/
├── .context/                    # Agentes + estrutura
│   ├── agents/                  # 15 agentes
│   ├── docs/                    # Documentação
│   ├── skills/                  # Skills
│   ├── plans/                   # Planos PREVC
│   └── workflows/               # Workflows
│
├── .aios-core/                  # Só configs essenciais
│   ├── constitution-v2.md       # Constituição
│   └── core-config-v2.yaml      # Configuração
│
├── bin/                         # CLIs
│   ├── aios-nexus.js
│   ├── aios-context.js
│   └── aios-tui.js
│
├── src/                         # Código fonte
│   ├── cli/
│   ├── core/
│   ├── services/
│   └── index.js
│
├── tests/                       # Testes do Nexus
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── docs/                        # Documentação
│   ├── plans/
│   └── EXAMPLES.md
│
├── scripts/
│   └── postinstall.js
│
├── .github/                     # Manter workflows úteis
├── .husky/                      # Se usar
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── jest.config.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md                    # Renomeado de README-NEXUS.md
└── CHANGELOG.md                 # Renomeado de CHANGELOG-NEXUS.md
```

---

## Tamanho Esperado

```
Antes:  ~170MB
Depois: ~5MB
```

---

## Comandos para Executar

```bash
# 1. Remover frameworks originais (141MB)
rm -rf frameworks/

# 2. Remover pacotes legados
rm -rf packages/

# 3. Remover diretórios legados
rm -rf .aios/ .antigravity/ pro/ .docker/
rm -rf .claude/ .cursor/ .codex/ .gemini/ .windsurf/

# 4. Limpar .aios-core/ (manter só v2)
cd .aios-core/
rm -rf cli/ core/ data/ development/ docs/ elicitation/ hooks/ infrastructure/
rm -rf manifests/ monitor/ presets/ product/ quality/ schemas/ scripts/ utils/ workflow-intelligence/
rm -f constitution.md core-config.yaml framework-config.yaml install-manifest.yaml
rm -f local-config.yaml.template project-config.yaml user-guide.md working-in-the-brownfield.md
rm -f index.js index.esm.js package.json
cd ..

# 5. Renomear arquivos principais
mv README-NEXUS.md README.md
mv CHANGELOG-NEXUS.md CHANGELOG.md

# 6. Remover arquivos legados da raiz
rm -f AGENTS.md CODE_OF_CONDUCT.md CONTRIBUTING.md .env.example .coderabbit.yaml .gitmodules package.json.nexus

# 7. Limpar tests (manter só Nexus)
cd tests/
rm -rf agents/ benchmarks/ clickup/ code-intel/ config/ core/ e2e/
rm -rf health-check/ hooks/ ide-sync/ infrastructure/ installer/ license/
rm -rf macos/ packages/ performance/ pro/ regression/ security/
rm -rf synapse/ template-engine/ templates/ tools/ updater/ wizard/
rm -f epic-verification.test.js pro-recover.test.js pro-wizard.test.js story-update-hook.test.js
cd ..

# 8. Limpar docs (manter só Nexus)
cd docs/
rm -rf agents/ archived/ commands/ guides/ infrastructure/ pro/ schemas/ scripts/ templates/ tests/
cd ..
```

---

## Após Limpeza

```bash
# Validar que tudo funciona
npm install
npm test
node bin/aios-nexus.js --help
```
