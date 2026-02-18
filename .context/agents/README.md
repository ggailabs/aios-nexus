# AIOS Nexus Agents

> **15 Specialized AI Agents for Full-Stack Development**
>
> **Author:** Guilherme Giorgi | **Genesis Grid AI Labs**

---

## Overview

AIOS Nexus provides 15 specialized AI agents, each designed for specific phases of the development lifecycle. Agents are organized by their primary workflow phase:

| Phase            | Agents                                                 |
| ---------------- | ------------------------------------------------------ |
| **P** (Plan)     | @orchestrator, @pm, @po, @sm, @analyst                 |
| **R** (Review)   | @architect, @security, @reviewer, @optimizer, @analyst |
| **E** (Execute)  | @developer, @data-engineer, @mobile                    |
| **V** (Validate) | @qa, @reviewer, @security, @optimizer                  |
| **C** (Confirm)  | @devops, @writer                                       |

---

## Agent Directory

| Agent                               | Icon | Archetype    | Primary Phase | Description                                  |
| ----------------------------------- | ---- | ------------ | ------------- | -------------------------------------------- |
| [Orchestrator](./orchestrator.md)   | 🎭   | Orchestrator | P             | Master coordinator for multi-agent workflows |
| [Architect](./architect.md)         | 🏗️   | Visionary    | R             | Technical architecture and system design     |
| [Developer](./developer.md)         | 💻   | Builder      | E             | Full-stack implementation specialist         |
| [QA](./qa.md)                       | ✅   | Guardian     | V             | Quality assurance and testing                |
| [DevOps](./devops.md)               | 🚀   | Optimizer    | C             | CI/CD and deployment                         |
| [Security](./security.md)           | 🔒   | Guardian     | R/V           | Security audits and penetration testing      |
| [Data Engineer](./data-engineer.md) | 📊   | Architect    | P/R/E         | Database design and data pipelines           |
| [Product Manager](./pm.md)          | 📋   | Balancer     | P             | Product strategy and requirements            |
| [Product Owner](./po.md)            | 🎯   | Visionary    | P             | Backlog management and story validation      |
| [Scrum Master](./sm.md)             | 🌊   | Facilitator  | P             | Agile facilitation and story creation        |
| [Analyst](./analyst.md)             | 🔍   | Explorer     | P/R           | Business analysis and codebase exploration   |
| [Reviewer](./reviewer.md)           | 👀   | Guardian     | R/V           | Code review and debugging                    |
| [Writer](./writer.md)               | 📝   | Creator      | C             | Technical documentation                      |
| [Optimizer](./optimizer.md)         | ⚡   | Optimizer    | R/V           | Performance optimization                     |
| [Mobile](./mobile.md)               | 📱   | Builder      | E/V           | Mobile application development               |

---

## Agent Activation

### CLI Activation

```bash
# Activate an agent
aios-nexus agent activate <agent-id>

# Example
aios-nexus agent activate developer
```

### IDE Activation

| IDE         | Activation Method                   |
| ----------- | ----------------------------------- |
| Claude Code | `/orchestrator`, `/developer`, etc. |
| Cursor      | `@orchestrator`, `@developer`, etc. |
| Windsurf    | Select from agent menu              |
| Codex CLI   | `/skills` → `aios-developer`        |

---

## Agent Workflow Participation

### PREVC Workflow

```
P (Plan)    → @orchestrator, @pm, @po, @sm, @analyst
R (Review)  → @architect, @security, @reviewer, @optimizer
E (Execute) → @developer, @data-engineer, @mobile
V (Validate) → @qa, @reviewer, @security, @optimizer
C (Confirm) → @devops, @writer
```

### Story Workflow

```
Create    → @sm
Validate  → @po
Implement → @developer
Review    → @qa
Deploy    → @devops
```

---

## Agent Capabilities Matrix

| Agent         | Code | Design | Test | Deploy | Document | Review |
| ------------- | :--: | :----: | :--: | :----: | :------: | :----: |
| Orchestrator  |  -   |   -    |  -   |   -    |    ✓     |   ✓    |
| Architect     |  -   |   ✓    |  -   |   -    |    ✓     |   ✓    |
| Developer     |  ✓   |   -    |  ✓   |   -    |    ✓     |   -    |
| QA            |  -   |   -    |  ✓   |   -    |    ✓     |   ✓    |
| DevOps        |  -   |   -    |  ✓   |   ✓    |    ✓     |   -    |
| Security      |  -   |   -    |  ✓   |   -    |    ✓     |   ✓    |
| Data Engineer |  ✓   |   ✓    |  -   |   -    |    ✓     |   -    |
| PM            |  -   |   ✓    |  -   |   -    |    ✓     |   -    |
| PO            |  -   |   -    |  -   |   -    |    ✓     |   ✓    |
| SM            |  -   |   -    |  -   |   -    |    ✓     |   -    |
| Analyst       |  -   |   -    |  -   |   -    |    ✓     |   ✓    |
| Reviewer      |  -   |   -    |  -   |   -    |    ✓     |   ✓    |
| Writer        |  -   |   -    |  -   |   -    |    ✓     |   -    |
| Optimizer     |  ✓   |   -    |  ✓   |   -    |    ✓     |   ✓    |
| Mobile        |  ✓   |   ✓    |  ✓   |   ✓    |    ✓     |   -    |

---

## Handoff Protocol

When agents hand off work to each other, use this format:

```yaml
handoff:
  from: <source-agent>
  to: <target-agent>
  context: <relevant-context>
  task: <specific-task>
  artifacts:
    - <file-path-1>
    - <file-path-2>
  notes: <additional-information>
```

---

## Sources

These agents were unified from multiple frameworks:

| Source Framework  | Contributed Agents                                             |
| ----------------- | -------------------------------------------------------------- |
| AIOS Core 4.2.13  | dev, qa, architect, devops, pm, po, sm, analyst, data-engineer |
| Antigravity Kit   | orchestrator, security, optimizer, mobile, reviewer, writer    |
| AI-Coders Context | code-reviewer (merged into reviewer)                           |

---

_AIOS Nexus Agents v5.0.0_
