---
name: app-builder
description: Main application building orchestrator. Creates full-stack applications from natural language requests. Determines project type, selects tech stack, coordinates agents.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent
---

# App Builder - Application Building Orchestrator

> **Comprehensive Application Development** - Build full-stack applications from natural language requests
> **Philosophy:** Analyze requirements, select optimal stack, coordinate specialized agents

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For new projects: Start with PROJECT ANALYSIS (1-3), then move to SCAFFOLDING.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-project-detection.md` | 🔴 **CRITICAL** | Keyword matrix, project type detection | Starting new project |
| `2-tech-stack.md` | 🔴 **CRITICAL** | 2026 default stack, alternatives | Choosing technologies |
| `3-agent-coordination.md` | 🟠 **HIGH** | Agent pipeline, execution order | Coordinating multi-agent work |
| `4-scaffolding.md` | 🔴 **CRITICAL** | Directory structure, core files | Creating project structure |
| `5-feature-building.md` | 🟠 **HIGH** | Feature analysis, error handling | Adding features to existing project |
| `6-templates/` | 🟡 **MEDIUM** | Project templates | Quick scaffolding |

---

## 🚀 Quick Decision Tree

**What type of application are you building?**

```
🌐 Web Application
  → Read Section 1: Project Detection
  → Check: Frontend vs Backend vs Full-stack
  → Select appropriate template

📱 Mobile Application
  → Read Section 1: Project Detection
  → Check: React Native vs Flutter vs Native
  → Choose mobile template

🖥️ Desktop Application
  → Read Section 1: Project Detection
  → Check: Electron vs Tauri vs Native
  → Select desktop template

⚙️ API/Backend Service
  → Read Section 1: Project Detection
  → Check: REST vs GraphQL vs gRPC
  → Choose API template

🔧 CLI Tool
  → Read Section 1: Project Detection
  → Check: Node.js vs Python vs Go
  → Select CLI template
```

---

## 📊 Project Type Selection Guide

**Use this decision matrix:**

| Requirement | Next.js | Express | FastAPI | React Native | Flutter | Electron |
| ------------ | ------- | ------- | ------- | ------------ | ------- | -------- |
| Full-stack Web | ✅ Best | ❌ Limited | ❌ Limited | ❌ No | ❌ No | ❌ No |
| REST API | ❌ Overkill | ✅ Best | ✅ Good | ❌ No | ❌ No | ❌ No |
| Mobile App | ❌ No | ❌ No | ❌ No | ✅ Best | ✅ Good | ❌ No |
| Desktop App | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ✅ Best |
| CLI Tool | ❌ No | ✅ Good | ✅ Good | ❌ No | ❌ No | ✅ Good |
| SaaS Product | ✅ Best | ❌ Limited | ❌ Limited | ❌ No | ❌ No | ❌ No |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| API design | `api-design` |
| Database design | `database-design` |
| Frontend design | `frontend-design` |
| Deployment | `deployment-procedures` |
| Architecture | `architecture` |

---

## ✅ App Builder Checklist

Before starting development:

**Critical (Must Have):**

- [ ] Project requirements clearly defined
- [ ] Target platform identified
- [ ] Tech stack selected
- [ ] Development environment ready
- [ ] Project structure planned

**High Priority:**

- [ ] Database schema designed
- [ ] API endpoints planned
- [ ] Authentication strategy chosen
- [ ] Testing framework selected
- [ ] Deployment target identified

**Medium Priority:**

- [ ] CI/CD pipeline planned
- [ ] Monitoring strategy defined
- [ ] Documentation structure planned
- [ ] Performance requirements identified
- [ ] Security measures planned

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Start coding without requirements analysis
- ❌ Choose tech stack based on trends only
- ❌ Skip project structure planning
- ❌ Ignore scalability requirements
- ❌ Forget about testing strategy
- ❌ Over-engineer simple applications
- ❌ Skip documentation planning

**DO:**

- ✅ Analyze requirements thoroughly
- ✅ Choose tech stack based on project needs
- ✅ Plan project structure carefully
- ✅ Consider scalability from start
- ✅ Include testing in development plan
- ✅ Keep solutions simple and focused
- ✅ Plan documentation from beginning

---

## 🎯 How to Use This Skill

### For New Projects:

1. Analyze project requirements
2. Detect project type and complexity
3. Select appropriate tech stack
4. Plan project structure
5. Coordinate specialized agents

### For Feature Development:

1. Analyze feature requirements
2. Plan implementation approach
3. Coordinate relevant agents
4. Review and integrate changes
5. Test and validate implementation

### For Project Migration:

1. Analyze existing project structure
2. Identify migration requirements
3. Plan migration strategy
4. Execute migration steps
5. Validate migrated functionality

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Project Detection
→ Section 2: Tech Stack Selection
→ Section 4: Scaffolding

**Intermediate:**
→ Section 3: Agent Coordination
→ Section 5: Feature Building
→ Template customization

**Advanced:**
→ Section 6: Advanced Templates
→ Multi-project coordination
→ Complex architecture patterns

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Requirements first** - Understand before building
2. **Right tool for the job** - Choose tech stack wisely
3. **Plan before code** - Structure matters
4. **Coordinate effectively** - Use specialized agents
5. **Iterate quickly** - Build, test, refine

**App Builder Mindset:**

- Every project has unique requirements
- Every tech stack has trade-offs
- Every feature needs careful planning
- Every agent has specific expertise
- Every iteration improves the product

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
