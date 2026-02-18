# AIOS Nexus Plans

> **PREVC workflow plans**

---

## Overview

Plans are structured documents that track workflow execution. Each plan is linked to a workflow and records decisions, artifacts, and phase progress.

---

## Plan Structure

```markdown
---
plan:
  id: plan-[id]
  name: [Plan Name]
  workflow: [workflow-id]
  scale: QUICK | SMALL | MEDIUM | LARGE
  status: in_progress | completed | cancelled
  created: [timestamp]
  updated: [timestamp]
---

# Plan: [Name]

## Objective

[What this plan aims to achieve]

## Scope

[What is included and excluded]

---

## Phase Progress

### P - Plan

- [ ] Requirements gathered
- [ ] Specifications written
- [ ] Stories defined

### R - Review

- [ ] Architecture reviewed
- [ ] Security reviewed
- [ ] Approach approved

### E - Execute

- [ ] Implementation complete
- [ ] Tests written
- [ ] Documentation updated

### V - Validate

- [ ] Tests passing
- [ ] QA review complete
- [ ] No regressions

### C - Confirm

- [ ] Build successful
- [ ] Deployed
- [ ] Changelog updated

---

## Decisions

| Date | Decision | Rationale | Phase |
| ---- | -------- | --------- | ----- |
| ...  | ...      | ...       | ...   |

---

## Artifacts

| Type     | Path                   | Phase |
| -------- | ---------------------- | ----- |
| document | /docs/spec.md          | P     |
| code     | /src/feature/          | E     |
| test     | /tests/feature.test.js | E     |

---

## Notes

[Additional notes and context]
```

---

## Plan Lifecycle

```
Created → In Progress → Completed
                  ↓
              Cancelled
```

---

## Using Plans

### CLI

```bash
# Plans are automatically created with workflows
aios-nexus workflow start "Feature X" --scale=MEDIUM

# View plan
aios-nexus workflow status

# Update plan
aios-nexus workflow advance --notes="Approved by team"
```

### Linking Plans

Plans can be linked to external tracking:

```yaml
links:
  jira: PROJ-123
  github: owner/repo#456
  epic: epic-1.0
```

---

_AIOS Nexus Plans v5.0.0_
