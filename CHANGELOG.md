# AIOS Nexus - Changelog

All notable changes to AIOS Nexus will be documented in this file.

**Author:** Guilherme Giorgi  
**Organization:** Genesis Grid AI Labs  
**Website:** https://genesisgrid.ai

## [5.0.0] - 2026-02-18

### Added

#### Core Features

- **PREVC Workflow System**: Adaptive workflow with 4 scales (QUICK, SMALL, MEDIUM, LARGE)
- **15 Unified Agents**: Merged from AIOS Core, AI-Coders, and Antigravity Kit
- **MCP Server**: Full Model Context Protocol implementation
- **Multi-IDE Sync**: Synchronization for 8 IDE targets
- **AI Scaffolding**: Codebase analysis and context generation

#### CLI Commands

- `aios-nexus init` - Initialize new project
- `aios-nexus install` - Install in existing project
- `aios-nexus sync` - Multi-IDE synchronization
- `aios-nexus validate` - Configuration validation
- `aios-nexus workflow` - PREVC workflow management
- `aios-nexus agent` - Agent management
- `aios-nexus scaffold` - AI-powered scaffolding
- `aios-nexus migrate` - Framework migration
- `aios-nexus mcp` - MCP server startup

#### MCP Server Tools (22)

- `init-context` - Initialize .context/ scaffolding
- `fill-scaffold` - Fill with AI-generated content
- `fill-single` - Fill single scaffold file
- `list-to-fill` - List pending files
- `get-map` - Get codebase map section
- `build-semantic` - Build semantic context
- `scaffold-plan` - Create plan template
- `sync-ide` - Sync to IDE targets
- `validate-sync` - Validate sync parity
- `start-workflow` - Start PREVC workflow
- `advance-workflow` - Advance to next phase
- `workflow-status` - Get workflow status
- `complete-workflow` - Complete workflow
- `cancel-workflow` - Cancel workflow
- `record-decision` - Record decision
- `add-artifact` - Add artifact to workflow
- `get-agent` - Get agent details
- `orchestrate-agents` - Select agents for task
- `get-skill` - Get skill content
- `validate-context` - Validate context integrity
- `get-config` - Get configuration
- `update-config` - Update configuration

#### MCP Resources (10)

- `context://docs` - Documentation
- `context://agents` - Agents list
- `context://skills` - Skills
- `context://plans` - Plans
- `context://workflows` - Workflows
- `aios://constitution` - AIOS constitution
- `aios://config` - Configuration
- `aios://codebase-map` - Codebase map
- `aios://workflow-state` - Workflow state
- `aios://agent-registry` - Agent registry

#### MCP Prompts (8)

- `aios-constitution` - Remind AI about principles
- `prevc-workflow` - Start PREVC workflow
- `agent-activate` - Activate agent persona
- `code-review` - Structured code review
- `feature-plan` - Plan new feature
- `debug-session` - Debug session
- `refactor-plan` - Refactoring plan
- `test-strategy` - Testing strategy

#### TUI Components

- Header with status indicators
- Interactive menu
- Workflow view
- Agent view
- Status view

#### Agents (15)

- `orchestrator` - Multi-agent coordination
- `architect` - Technical architecture
- `developer` - Fullstack implementation
- `qa` - Quality and testing
- `devops` - CI/CD and infrastructure
- `security` - Security auditing
- `data-engineer` - Data and databases
- `pm` - Product management
- `po` - Product ownership
- `sm` - Scrum mastering
- `analyst` - Code analysis
- `reviewer` - Code review
- `writer` - Documentation
- `optimizer` - Performance optimization
- `mobile` - Mobile development

#### Directory Structure

- `.context/` - Source of truth
  - `docs/` - Documentation
  - `agents/` - Agent definitions
  - `skills/` - Skills library
  - `plans/` - PREVC plans
  - `workflows/` - Workflow definitions
- `.aios-core/` - Framework configuration
  - `constitution.md` - Principles
  - `core-config.yaml` - Configuration

### Changed

- Unified 4 frameworks into single cohesive system
- Migrated from multiple agent definitions to 15 unified agents
- Consolidated configuration into single YAML file

### Technical Details

#### Dependencies Added

- `@modelcontextprotocol/sdk` - MCP implementation
- `ink@4` - TUI framework
- `react@18` - UI components
- `ink-text-input@5` - Text inputs
- `ink-spinner@5` - Spinners
- `boxen` - Styled boxes
- `inquirer` - Interactive prompts
- `ora` - CLI spinners
- `zod` - Schema validation
- `yaml` - YAML parsing

#### Test Coverage

- Unit tests for WorkflowEngine
- Unit tests for Scaffolder
- Unit tests for SyncEngine
- Integration tests for CLI

### Migration Support

- AIOS Core 4.x migration
- AI-Coders Context migration
- Antigravity Kit migration
- GGAI Nexus migration

### Documentation

- README-NEXUS.md - Main documentation
- EXAMPLES.md - Usage examples
- AIOS-NEXUS-UNIFICATION-PLAN.md - Implementation plan

---

## Previous Versions

### [4.2.13] - AIOS Core

- 11 specialized agents
- Multi-IDE sync (4 IDEs)
- Story-driven development
- Quality gates

### [1.x] - AI-Coders Context

- PREVC workflow system
- MCP server implementation
- Semantic analysis

### [1.x] - Antigravity Kit

- 36 skills
- 20 agents
- UI/UX Pro Max

### [1.x] - GGAI Nexus

- TUI React/Ink
- Multi-language support
- AI scaffolding
