---
name: deployment-procedures
description: Production deployment principles and decision-making. Safe deployment workflows, rollback strategies, and verification.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Deployment Procedures

> **Safe Production Deployments** - Zero-downtime releases with confidence
> **Philosophy:** Deploy safely, monitor continuously, rollback quickly

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For deployments: Start with PLANNING (1-3), then move to EXECUTION.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-deployment-planning.md` | 🔴 **CRITICAL** | Strategy selection, risk assessment, pre-flight | Planning deployments |
| `2-deployment-strategies.md` | 🔴 **CRITICAL** | Blue-green, canary, rolling, feature flags | Choosing deployment method |
| `3-ci-cd-pipelines.md` | 🔴 **CRITICAL** | Pipeline design, automation, quality gates | CI/CD implementation |
| `4-monitoring-verification.md` | 🟠 **HIGH** | Health checks, metrics, alerting | Post-deployment monitoring |
| `5-rollback-procedures.md` | 🟠 **HIGH** | Rollback strategies, emergency procedures | Recovery planning |
| `6-infrastructure-setup.md` | 🟡 **MEDIUM** | Environment configuration, scaling | Infrastructure preparation |

---

## 🚀 Quick Decision Tree

**What's your deployment challenge?**

```
🚀 New Deployment Strategy
  → Read Section 1: Deployment Planning
  → Check: Risk tolerance, team size, complexity
  → Read Section 2: Deployment Strategies

⚙️ CI/CD Pipeline Setup
  → Read Section 1: Deployment Planning
  → Check: Automation needs, quality requirements
  → Read Section 3: CI/CD Pipelines

🔍 Post-Deployment Issues
  → Read Section 4: Monitoring & Verification
  → Check: Health checks, metrics, alerting
  → Read Section 5: Rollback Procedures

🏗️ Infrastructure Preparation
  → Read Section 1: Deployment Planning
  → Check: Environment needs, scaling requirements
  → Read Section 6: Infrastructure Setup

🚨 Emergency Rollback
  → Read Section 5: Rollback Procedures
  → Check: Rollback triggers, recovery steps
  → Execute emergency procedures
```

---

## 📊 Deployment Strategy Selection Guide

**Use this decision matrix:**

| Requirement | Blue-Green | Canary | Rolling | Feature Flags |
| ------------ | ---------- | ------- | ------- | ------------- |
| Zero Downtime | ✅ Best | ✅ Good | ❌ Limited | ✅ Best |
| Risk Mitigation | ✅ Best | ✅ Best | ❌ Limited | ✅ Good |
| Quick Rollback | ✅ Best | ✅ Good | ❌ Limited | ✅ Best |
| Resource Usage | ❌ High | ✅ Good | ✅ Best | ✅ Good |
| Complexity | 🟡 Medium | 🔴 High | ✅ Best | 🟡 Medium |
| Team Size | Small | Large | Any | Any |
| Traffic Volume | Medium | High | Any | Any |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| Architecture | `architecture` |
| Performance | `performance-profiling` |
| Security | `security-audit` |
| Testing | `testing-patterns` |
| API design | `api-design` |

---

## ✅ Deployment Checklist

Before deploying to production:

**Critical (Must Have):**

- [ ] Deployment strategy selected
- [ ] Rollback plan documented
- [ ] Health checks implemented
- [ ] Monitoring configured
- [ ] Team trained on procedures

**High Priority:**

- [ ] Pre-deployment checks completed
- [ ] Staging environment validated
- [ ] Performance tests passed
- [ ] Security scans completed
- [ ] Documentation updated

**Medium Priority:**

- [ ] Load testing completed
- [ ] Disaster recovery tested
- [ ] Communication plan ready
- [ ] Post-deployment monitoring active
- [ ] Success criteria defined

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Deploy without rollback plan
- ❌ Skip staging environment testing
- ❌ Ignore monitoring and alerting
- ❌ Deploy during peak traffic
- ❌ Skip team communication
- ❌ Forget about performance testing
- ❌ Deploy without health checks

**DO:**

- ✅ Always have rollback strategy
- ✅ Test in staging first
- ✅ Monitor everything
- ✅ Deploy during low-traffic periods
- ✅ Communicate with all stakeholders
- ✅ Performance test before production
- ✅ Implement comprehensive health checks

---

## 🎯 How to Use This Skill

### For New Deployments:

1. Assess deployment requirements and risks
2. Select appropriate deployment strategy
3. Design and implement CI/CD pipeline
4. Configure monitoring and alerting
5. Document procedures and train team

### For Deployment Issues:

1. Identify deployment failure point
2. Assess impact and urgency
3. Execute rollback if necessary
4. Investigate root cause
5. Implement preventive measures

### For Process Improvement:

1. Analyze current deployment processes
2. Identify bottlenecks and risks
3. Implement automation where possible
4. Improve monitoring and verification
5. Train team on best practices

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Deployment Planning
→ Section 2: Deployment Strategies
→ Basic CI/CD concepts

**Intermediate:**
→ Section 3: CI/CD Pipelines
→ Section 4: Monitoring & Verification
→ Advanced deployment strategies

**Advanced:**
→ Section 5: Rollback Procedures
→ Section 6: Infrastructure Setup
• Enterprise deployment patterns

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Safety first** - Always have rollback strategy
2. **Automate everything** - Reduce human error
3. **Monitor continuously** - Know what's happening
4. **Test thoroughly** - Validate before production
5. **Communicate clearly** - Keep everyone informed

**Deployment Mindset:**

- Every deployment carries risk
- Every rollback should be quick
- Every monitoring signal matters
- Every team member has a role
- Every deployment is a learning opportunity

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
