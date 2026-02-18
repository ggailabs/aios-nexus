---
name: architecture
description: Architectural decision-making framework. Requirements analysis, trade-off evaluation, ADR documentation. Use when making architecture decisions or analyzing system design.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Architecture Decision Framework

> **Strategic System Design** - Requirements-driven architecture with documented trade-offs
> **Philosophy:** Simplicity first, complexity only when proven necessary

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For new architectures: Start with ANALYSIS (1-3), then move to PATTERNS.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-context-discovery.md` | 🔴 **CRITICAL** | Requirements analysis, project classification | Starting architecture design |
| `2-trade-off-analysis.md` | 🔴 **CRITICAL** | ADR templates, decision framework | Documenting architectural decisions |
| `3-pattern-selection.md` | 🟠 **HIGH** | Decision trees, anti-patterns | Choosing architectural patterns |
| `4-examples.md` | 🟡 **MEDIUM** | MVP, SaaS, Enterprise examples | Reference implementations |
| `5-patterns-reference.md` | 🟡 **MEDIUM** | Quick pattern lookup | Pattern comparison |

---

## 🚀 Quick Decision Tree

**What's your architectural challenge?**

```
🏗️ New System Design
  → Read Section 1: Context Discovery
  → Check: Requirements, constraints, scale
  → Read Section 2: Trade-off Analysis

🔄 Existing System Analysis
  → Read Section 1: Context Discovery
  → Check: Current architecture, pain points
  → Read Section 3: Pattern Selection

📋 Decision Documentation
  → Read Section 2: Trade-off Analysis
  → Check: ADR template, decision framework
  → Document architectural decisions

🎯 Pattern Selection
  → Read Section 3: Pattern Selection
  → Check: Decision trees, anti-patterns
  → Choose appropriate patterns
```

---

## 📊 Architecture Pattern Selection Guide

**Use this decision matrix:**

| Requirement | Monolith | Microservices | Serverless | Event-Driven |
| ------------ | -------- | -------------- | ---------- | ------------- |
| Simple MVP | ✅ Best | ❌ Overkill | ❌ Complex | ❌ Overkill |
| Rapid Development | ✅ Best | ❌ Complex | ✅ Good | ❌ Complex |
| Team Scaling | ❌ Limited | ✅ Best | ✅ Good | ✅ Good |
| Independent Deployment | ❌ No | ✅ Best | ✅ Best | ✅ Good |
| Cost Optimization | ✅ Best | ❌ Expensive | ✅ Best | ❌ Complex |
| High Scalability | ❌ Limited | ✅ Best | ✅ Best | ✅ Good |
| Complex Business Logic | ✅ Good | ✅ Best | ❌ Limited | ✅ Best |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| Database design | `database-design` |
| API design | `api-design` |
| Performance optimization | `performance-profiling` |
| Security patterns | `security-audit` |
| Deployment | `deployment-procedures` |

---

## ✅ Architecture Checklist

Before finalizing architecture:

**Critical (Must Have):**

- [ ] Requirements clearly understood
- [ ] Constraints identified
- [ ] Scale requirements defined
- [ ] Team structure considered
- [ ] Technology stack selected

**High Priority:**

- [ ] Trade-offs documented
- [ ] Patterns selected with rationale
- [ ] ADRs written for key decisions
- [ ] Security considerations addressed
- [ ] Performance requirements defined

**Medium Priority:**

- [ ] Migration strategy planned
- [ ] Monitoring strategy defined
- [ ] Disaster recovery planned
- [ ] Compliance requirements met
- [ ] Future extensibility considered

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Over-engineer for future requirements
- ❌ Choose patterns based on trends
- ❌ Skip trade-off analysis
- ❌ Ignore team capabilities
- ❌ Forget about operational complexity
- ❌ Skip documentation
- ❌ Ignore constraints

**DO:**

- ✅ Start simple, add complexity as needed
- ✅ Choose patterns based on actual requirements
- ✅ Document all trade-offs and decisions
- ✅ Consider team size and expertise
- ✅ Plan for operational overhead
- ✅ Document architectural decisions
- ✅ Respect all constraints

---

## 🎯 How to Use This Skill

### For New Systems:

1. Discover context and requirements
2. Analyze constraints and trade-offs
3. Select appropriate patterns
4. Document architectural decisions
5. Validate with stakeholders

### For Existing Systems:

1. Analyze current architecture
2. Identify pain points and constraints
3. Evaluate improvement options
4. Plan evolution strategy
5. Document changes and rationale

### For Decision Making:

1. Frame the architectural decision
2. Identify options and trade-offs
3. Evaluate against requirements
4. Document decision with ADR
5. Communicate to stakeholders

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Context Discovery
→ Section 2: Trade-off Analysis
→ Basic pattern selection

**Intermediate:**
→ Section 3: Pattern Selection
→ Section 4: Examples
→ Complex trade-off analysis

**Advanced:**
→ Section 5: Patterns Reference
→ Multi-system architecture
→ Enterprise patterns

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Requirements drive architecture** - Not the other way around
2. **Simplicity is key** - Start simple, add complexity when needed
3. **Document decisions** - ADRs capture architectural rationale
4. **Consider trade-offs** - Every decision has pros and cons
5. **Plan for operations** - Architecture includes running the system

**Architecture Mindset:**

- Every requirement shapes the architecture
- Every pattern has trade-offs
- Every decision needs documentation
- Every constraint influences design
- Every system evolves over time

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
