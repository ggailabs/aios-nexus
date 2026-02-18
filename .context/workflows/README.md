# AIOS Nexus Workflows

> **Executable workflow definitions**

---

## Overview

Workflows are multi-step processes that orchestrate agents and tasks. Each workflow is a YAML file defining phases, agents, and outputs.

---

## PREVC Workflow

The core workflow of AIOS Nexus, following the PREVC methodology:

```
P → R → E → V → C
Plan → Review → Execute → Validate → Confirm
```

---

## Scale-Based Variants

| Scale  | Phases            | Use Case         |
| ------ | ----------------- | ---------------- |
| QUICK  | E → V             | Bug fixes, typos |
| SMALL  | P → E → V         | Simple features  |
| MEDIUM | P → R → E → V     | Regular features |
| LARGE  | P → R → E → V → C | Complex systems  |

---

## Workflow Template

```yaml
name: [workflow-name]
description: [brief description]
scale: QUICK | SMALL | MEDIUM | LARGE

phases:
  - id: P
    name: Plan
    agents: [pm, analyst]
    tasks: [gather-requirements, create-spec]
    outputs: [prd, specs]
    gates: [requirements-defined]

  - id: R
    name: Review
    agents: [architect, security]
    tasks: [review-architecture, security-review]
    outputs: [architecture-doc, adr]
    gates: [architecture-approved]

  - id: E
    name: Execute
    agents: [developer]
    tasks: [implement, write-tests]
    outputs: [code, tests]
    gates: [tests-pass, lint-pass]

  - id: V
    name: Validate
    agents: [qa, reviewer]
    tasks: [run-tests, code-review]
    outputs: [qa-report, review-feedback]
    gates: [all-tests-pass, review-approved]

  - id: C
    name: Confirm
    agents: [devops, writer]
    tasks: [deploy, document]
    outputs: [release, docs]
    gates: [build-success, changelog-updated]

hooks:
  pre-phase: [validate-context]
  post-phase: [sync-artifacts]
  on-complete: [notify-stakeholders]
```

---

## Available Workflows

### Feature Development

```yaml
name: feature-development
scale: MEDIUM
description: Develop a new feature with full PREVC cycle
```

### Bug Fix

```yaml
name: bug-fix
scale: QUICK
description: Fix a bug with minimal overhead
```

### System Design

```yaml
name: system-design
scale: LARGE
description: Design and implement a new system
```

### Refactoring

```yaml
name: refactoring
scale: MEDIUM
description: Refactor code with quality gates
```

---

## Using Workflows

### CLI

```bash
# Start a workflow
aios-nexus workflow start "Add user authentication" --scale=MEDIUM

# Check status
aios-nexus workflow status

# Advance phase
aios-nexus workflow advance

# Complete workflow
aios-nexus workflow complete
```

### MCP

```
"start a workflow for implementing user authentication"
"what's the current workflow status?"
"advance to next phase"
```

---

## Custom Workflows

Create custom workflows in `.context/workflows/`:

```yaml
# .context/workflows/my-workflow.yaml
name: my-custom-workflow
description: Custom workflow for my team
scale: MEDIUM

phases:
  - id: P
    agents: [pm]
    tasks: [create-spec]

  - id: E
    agents: [developer]
    tasks: [implement]

  - id: V
    agents: [qa]
    tasks: [test]

customGates:
  - name: team-approval
    severity: BLOCK
```

---

_AIOS Nexus Workflows v5.0.0_
