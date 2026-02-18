# AIOS Nexus Skills Library

> **Modular expertise on-demand for AI agents**

---

## Overview

Skills are modular knowledge packages that agents can load to gain specific expertise. Each skill is a self-contained markdown file with domain-specific knowledge, patterns, and best practices.

---

## Skills Directory

### Frontend

| Skill           | Description                      |
| --------------- | -------------------------------- |
| `react-nextjs`  | React and Next.js patterns       |
| `vue-nuxt`      | Vue and Nuxt patterns            |
| `angular`       | Angular patterns                 |
| `tailwind`      | Tailwind CSS utilities           |
| `ui-ux-pro-max` | 50 styles, 21 palettes, 50 fonts |

### Backend

| Skill        | Description                  |
| ------------ | ---------------------------- |
| `nodejs`     | Node.js best practices       |
| `python`     | Python and FastAPI patterns  |
| `nestjs`     | NestJS modules and DI        |
| `api-design` | REST, GraphQL, tRPC patterns |

### Database

| Skill              | Description            |
| ------------------ | ---------------------- |
| `sql-optimization` | SQL query optimization |
| `prisma`           | Prisma ORM patterns    |
| `supabase`         | Supabase integration   |
| `mongodb`          | MongoDB patterns       |

### DevOps

| Skill        | Description           |
| ------------ | --------------------- |
| `docker`     | Docker and containers |
| `kubernetes` | K8s orchestration     |
| `ci-cd`      | CI/CD pipelines       |
| `monitoring` | Observability         |

### Security

| Skill            | Description                |
| ---------------- | -------------------------- |
| `owasp`          | OWASP Top 10               |
| `red-team`       | Offensive security         |
| `secure-coding`  | Secure coding practices    |
| `security-audit` | Security audit methodology |

### Quality

| Skill              | Description             |
| ------------------ | ----------------------- |
| `testing-patterns` | Testing strategies      |
| `code-review`      | Code review checklist   |
| `clean-code`       | Clean code principles   |
| `tdd-workflow`     | Test-driven development |

### Platform

| Skill                | Description           |
| -------------------- | --------------------- |
| `mcp-builder`        | MCP server creation   |
| `mobile-development` | React Native, Flutter |
| `game-development`   | Game dev patterns     |

---

## Skill Template

```markdown
---
type: skill
name: [Skill Name]
category: [frontend|backend|database|devops|security|quality|platform]
description: [Brief description]
prerequisites:
  - [Required skill or knowledge]
---

# [Skill Name]

## Overview

[What this skill covers]

## Quick Reference

[Quick lookup tables, commands, patterns]

## Deep Dive

[Detailed explanations]

## Code Examples

[Practical code snippets]

## Best Practices

[Do's and don'ts]

## Common Issues

[Troubleshooting guide]

## Resources

[Links and references]
```

---

## Usage

Skills are automatically loaded by agents based on task context:

```yaml
# Agent definition
skills:
  - testing-patterns
  - code-review
  - clean-code
```

Or explicitly requested:

```bash
aios-nexus skill load <skill-name>
```

---

## Sources

Skills were consolidated from:

- Antigravity Kit (36 skills)
- AIOS Core (framework-specific patterns)
- AI-Coders Context (testing patterns)
- GGAI Nexus (generated skills)

---

_AIOS Nexus Skills v5.0.0_
