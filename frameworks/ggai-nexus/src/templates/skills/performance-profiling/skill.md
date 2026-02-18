---
name: performance-profiling
description: Performance profiling principles. Measurement, analysis, and optimization techniques.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Performance Profiling

> **Data-Driven Optimization** - Measure, analyze, optimize - in that order
> **Philosophy:** You can't optimize what you don't measure

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For performance issues: Start with MEASUREMENT (1-2), then move to OPTIMIZATION.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-measurement.md` | 🔴 **CRITICAL** | Core Web Vitals, profiling tools, baseline | All performance work |
| `2-analysis.md` | 🔴 **CRITICAL** | Bottleneck identification, data interpretation | Analyzing performance data |
| `3-frontend-optimization.md` | 🟠 **HIGH** | Bundle size, rendering, JavaScript optimization | Frontend performance |
| `4-backend-optimization.md` | 🟠 **HIGH** | Database queries, caching, API performance | Backend performance |
| `5-monitoring.md` | 🟡 **MEDIUM** | Real User Monitoring, alerting, trends | Production monitoring |

---

## 🚀 Quick Decision Tree

**What's your performance challenge?**

```
📊 Slow Loading
  → Read Section 1: Measurement
  → Check: Core Web Vitals, bundle size
  → Read Section 3: Frontend Optimization

🐌 Slow Interactions
  → Read Section 1: Measurement
  → Check: INP, JavaScript execution
  → Read Section 3: Frontend Optimization

🗄️ Slow API Responses
  → Read Section 1: Measurement
  → Check: Response times, database queries
  → Read Section 4: Backend Optimization

📈 Performance Regression
  → Read Section 1: Measurement
  → Check: Before/after comparison
  → Read Section 2: Analysis

🔍 Unknown Issues
  → Read Section 1: Measurement
  → Check: Comprehensive profiling
  → Read Section 2: Analysis
```

---

## 📊 Performance Metrics Guide

**Core Web Vitals Targets:**

| Metric | Good | Needs Improvement | Poor | Impact |
| ------ | ---- | ---------------- | ---- | ------ |
| **LCP** | < 2.5s | 2.5s - 4.0s | > 4.0s | Loading experience |
| **INP** | < 200ms | 200ms - 500ms | > 500ms | Interactivity |
| **CLS** | < 0.1 | 0.1 - 0.25 | > 0.25 | Visual stability |

**Additional Key Metrics:**

| Metric | Target | Tool | Importance |
| ------ | ------ | ---- | --------- |
| **FCP** | < 1.8s | Lighthouse | Perceived speed |
| **TTI** | < 3.8s | Lighthouse | Interactivity |
| **TBT** | < 200ms | Lighthouse | Blocking time |
| **FMP** | < 2.0s | Custom | Content visibility |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| React optimization | `react-performance` |
| Database optimization | `database-design` |
| API optimization | `api-design` |
| Frontend design | `frontend-design` |
| Architecture | `architecture` |

---

## ✅ Performance Profiling Checklist

Before optimization:

**Critical (Must Have):**

- [ ] Performance baseline established
- [ ] Core Web Vitals measured
- [ ] Bottlenecks identified
- [ ] User impact quantified
- [ ] Business impact assessed

**High Priority:**

- [ ] Profiling tools configured
- [ ] Monitoring in place
- [ ] Performance budget set
- [ ] Regression tests ready
- [ ] Team trained on tools

**Medium Priority:**

- [ ] Automated alerts configured
- [ ] Performance budgets enforced
- [ ] Regular audits scheduled
- [ ] Documentation maintained
- [ ] Performance culture established

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Optimize without measuring first
- ❌ Focus on micro-optimizations
- ❌ Ignore user experience impact
- ❌ Skip performance budgets
- ❌ Forget about mobile performance
- ❌ Optimize in production only
- ❌ Ignore monitoring

**DO:**

- ✅ Measure before optimizing
- ✅ Focus on high-impact improvements
- ✅ Prioritize user experience
- ✅ Set and enforce performance budgets
- ✅ Consider mobile constraints
- ✅ Optimize throughout development
- ✅ Monitor continuously

---

## 🎯 How to Use This Skill

### For Performance Issues:

1. Establish performance baseline
2. Identify specific bottlenecks
3. Prioritize by user impact
4. Implement targeted optimizations
5. Validate improvements

### For Performance Monitoring:

1. Set up comprehensive monitoring
2. Define performance budgets
3. Configure automated alerts
4. Establish review processes
5. Create performance culture

### For Performance Budgets:

1. Define budget metrics and targets
2. Implement budget enforcement
3. Track budget compliance
4. Handle budget violations
5. Adjust budgets as needed

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Measurement
→ Section 2: Analysis
→ Basic optimization techniques

**Intermediate:**
→ Section 3: Frontend Optimization
→ Section 4: Backend Optimization
→ Advanced analysis techniques

**Advanced:**
→ Section 5: Monitoring
→ Performance architecture
• Enterprise performance strategies

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Measure first** - You can't optimize what you don't measure
2. **User experience matters** - Performance affects user satisfaction
3. **Budget discipline** - Set and enforce performance budgets
4. **Continuous monitoring** - Performance is an ongoing process
5. **Data-driven decisions** - Use data, not assumptions

**Performance Mindset:**

- Every millisecond counts for users
- Every optimization should be measured
- Every regression should be caught early
- Every team member owns performance
- Every decision has performance implications

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
