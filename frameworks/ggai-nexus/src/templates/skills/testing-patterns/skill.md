---
name: testing-patterns
description: Testing patterns and principles. Unit, integration, mocking strategies, and comprehensive test coverage.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Testing Patterns Expert

> **Comprehensive Testing Strategy** - Best practices for building reliable, maintainable test suites
> **Philosophy:** Test behavior, not implementation. Focus on confidence, not coverage percentage.

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For new projects: Start with FUNDAMENTALS (1-3), then move to ADVANCED.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-unit-testing.md` | 🔴 **CRITICAL** | Test structure, assertions, test doubles | New test suites |
| `2-integration-testing.md` | 🔴 **CRITICAL** | Component integration, API testing, database testing | Multi-component features |
| `3-mocking-strategies.md` | 🟠 **HIGH** | Mocks, stubs, spies, fakes | External dependencies |
| `4-test-organization.md` | 🟡 **MEDIUM** | Test structure, naming, utilities | Large test suites |
| `5-coverage-strategies.md` | 🟡 **MEDIUM** | Coverage metrics, meaningful coverage | Quality assurance |
| `6-e2e-testing.md` | 🟠 **HIGH** | User flows, critical paths, browser automation | Production readiness |
| `7-performance-testing.md` | 🟡 **MEDIUM** | Load testing, stress testing, benchmarks | Performance validation |
| `8-test-automation.md` | 🟡 **MEDIUM** | CI/CD integration, test pipelines | Continuous integration |

---

## 🚀 Quick Decision Tree

**What's your testing challenge?**

```
🧪 Writing unit tests
  → Read Section 1: Unit Testing
  → Check: Test structure, assertions, test doubles

🔗 Testing component integration
  → Read Section 2: Integration Testing
  → Check: Component interaction, API integration

🎭 Mocking external dependencies
  → Read Section 3: Mocking Strategies
  → Check: Mocks, stubs, spies, fakes

📁 Organizing large test suites
  → Read Section 4: Test Organization
  → Check: Test structure, naming, utilities

📊 Improving test coverage
  → Read Section 5: Coverage Strategies
  → Check: Meaningful coverage, quality metrics

🌐 Testing user workflows
  → Read Section 6: E2E Testing
  → Check: Critical paths, browser automation

⚡ Performance validation needed
  → Read Section 7: Performance Testing
  → Check: Load testing, benchmarks

🔄 CI/CD integration
  → Read Section 8: Test Automation
  → Check: Pipeline setup, test automation
```

---

## 📊 Testing Pyramid

**Use this balanced approach:**

```
        🔺 E2E Tests (10%)
       /\\\
      /\\\\\\\
     /\\\\\\\\\\\
    🔺 Integration Tests (20%)
   /\\\
  /\\\\\\
 🔺 Unit Tests (70%)
```

**Guidelines:**
- **70% Unit Tests** - Fast, isolated, comprehensive
- **20% Integration Tests** - Component interaction, API contracts
- **10% E2E Tests** - Critical user paths, production scenarios

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| API design | `api-design` |
| Database design | `database-design` |
| Performance optimization | `performance-profiling` |
| Security patterns | `security-audit` |
| Deployment procedures | `deployment-procedures` |

---

## ✅ Testing Checklist

Before releasing to production:

**Critical (Must Have):**

- [ ] Core functionality covered by unit tests
- [ ] Critical paths tested with integration tests
- [ ] Key user flows validated with E2E tests
- [ ] External dependencies properly mocked
- [ ] Tests run consistently in CI/CD

**High Priority:**

- [ ] Test coverage meets quality standards
- [ ] Performance tests for critical paths
- [ ] Error scenarios tested
- [ ] Accessibility testing completed
- [ ] Cross-browser testing done

**Medium Priority:**

- [ ] Load testing for scaling scenarios
- [ ] Security testing implemented
- [ ] Usability testing completed
- [ ] Documentation for testing setup
- [ ] Test data management strategy

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Test implementation details
- ❌ Use fragile selectors in E2E tests
- ❌ Skip error scenario testing
- ❌ Mock everything indiscriminately
- ❌ Focus on coverage percentage over quality
- ❌ Write slow, complex unit tests
- ❌ Ignore test flakiness

**DO:**

- ✅ Test behavior and outcomes
- ✅ Use stable, semantic selectors
- ✅ Test error scenarios thoroughly
- ✅ Mock only external dependencies
- ✅ Focus on meaningful test coverage
- ✅ Keep unit tests fast and simple
- ✅ Investigate and fix flaky tests

---

## 🎯 How to Use This Skill

### For New Projects:

1. Set up testing framework and utilities
2. Write unit tests for core logic
3. Add integration tests for components
4. Implement E2E tests for critical paths
5. Configure CI/CD automation

### For Existing Projects:

1. Audit current test coverage
2. Identify gaps in testing strategy
3. Add missing test types
4. Improve test organization
5. Optimize test performance

### For Test Quality:

1. Review test effectiveness
2. Eliminate flaky tests
3. Improve test organization
4. Add meaningful assertions
5. Enhance test documentation

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Unit Testing
→ Section 2: Integration Testing
→ Section 3: Mocking Strategies

**Intermediate:**
→ Section 4: Test Organization
→ Section 5: Coverage Strategies
→ Section 6: E2E Testing

**Advanced:**
→ Section 7: Performance Testing
→ Section 8: Test Automation
→ All sections integration

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Test behavior, not implementation** - Focus on what, not how
2. **Make tests reliable** - Eliminate flakiness and inconsistency
3. **Keep tests fast** - Optimize for developer productivity
4. **Test critical paths** - Prioritize important user workflows
5. **Automate everything** - Integrate testing into development workflow

**Testing Mindset:**

- Every test should tell a story
- Every assertion should have a purpose
- Every mock should have a reason
- Every failure should be informative
- Every test should add confidence

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
