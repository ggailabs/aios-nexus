---
name: api-design
description: API design principles and decision-making. REST vs GraphQL vs tRPC selection, response formats, versioning, pagination.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# API Design Expert

> **Comprehensive API Design** - Best practices for building robust, scalable APIs
> **Philosophy:** Design for developers first, optimize for performance and maintainability

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For new APIs: Start with FUNDAMENTALS (1-3), then move to SPECIFICS.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-fundamentals-rest.md` | 🔴 **CRITICAL** | REST principles, HTTP methods, status codes | New REST APIs |
| `2-fundamentals-graphql.md` | 🔴 **CRITICAL** | GraphQL schema, resolvers, queries | GraphQL APIs |
| `3-fundamentals-trpc.md` | 🟠 **HIGH** | tRPC setup, procedures, types | TypeScript projects |
| `4-response-formats.md` | 🟡 **MEDIUM** | JSON, XML, response standards | Response design |
| `5-versioning-strategies.md` | 🟡 **MEDIUM** | URL versioning, header versioning | API evolution |
| `6-pagination-patterns.md` | 🟡 **MEDIUM** | Offset, cursor, keyset pagination | Large datasets |
| `7-security-auth.md` | 🟠 **HIGH** | Authentication, authorization, security | All APIs |
| `8-performance-optimization.md` | 🟡 **MEDIUM** | Caching, rate limiting, optimization | Production APIs |

---

## 🚀 Quick Decision Tree

**What type of API are you building?**

```
🌐 Simple CRUD operations
  → Read Section 1: REST Fundamentals
  → Check: HTTP methods, status codes, resource naming

📊 Complex data requirements
  → Read Section 2: GraphQL Fundamentals
  → Check: Schema design, resolvers, queries

⚡ TypeScript-first project
  → Read Section 3: tRPC Fundamentals
  → Check: Type safety, procedures, client setup

📦 Response format standardization
  → Read Section 4: Response Formats
  → Check: JSON structure, error handling

🔄 API evolution needed
  → Read Section 5: Versioning Strategies
  → Check: URL versioning, backward compatibility

📄 Large datasets
  → Read Section 6: Pagination Patterns
  → Check: Offset vs cursor pagination

🔒 Security requirements
  → Read Section 7: Security & Authentication
  → Check: JWT, OAuth, rate limiting

⚡ Performance optimization
  → Read Section 8: Performance Optimization
  → Check: Caching, compression, monitoring
```

---

## 📊 API Type Selection Guide

**Use this decision matrix:**

| Requirement | REST | GraphQL | tRPC | Recommendation |
| ------------ | ------ | -------- | ----- | ------------- |
| Simple CRUD | ✅ Best | ❌ Overkill | ❌ Overkill | **REST** |
| Complex queries | ❌ Limited | ✅ Best | ❌ Limited | **GraphQL** |
| TypeScript project | ✅ Good | ✅ Good | ✅ Best | **tRPC** |
| Mobile apps | ✅ Good | ✅ Best | ❌ Limited | **GraphQL** |
| Public API | ✅ Best | ✅ Good | ❌ Limited | **REST** |
| Internal tools | ✅ Good | ❌ Overkill | ✅ Best | **tRPC** |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| Database design | `database-design` |
| Security patterns | `security-audit` |
| Performance optimization | `performance-profiling` |
| Testing strategies | `testing-patterns` |
| Documentation | `documentation-templates` |

---

## ✅ API Design Checklist

Before releasing your API:

**Critical (Must Have):**

- [ ] Clear resource naming conventions
- [ ] Proper HTTP method usage
- [ ] Consistent response formats
- [ ] Error handling strategy
- [ ] Authentication/authorization

**High Priority:**

- [ ] API versioning strategy
- [ ] Rate limiting implementation
- [ ] Request/response validation
- [ ] Documentation completeness
- [ ] Testing coverage

**Medium Priority:**

- [ ] Pagination for large datasets
- [ ] Caching strategy
- [ ] Monitoring and logging
- [ ] Performance optimization
- [ ] SDK/client libraries

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Use inconsistent naming (user vs users vs User)
- ❌ Return wrong HTTP status codes
- ❌ Skip error handling
- ❌ Ignore authentication/authorization
- ❌ Build without versioning strategy
- ❌ Use nested resources excessively
- ❌ Skip input validation

**DO:**

- ✅ Use consistent naming conventions
- ✅ Return appropriate HTTP status codes
- ✅ Implement comprehensive error handling
- ✅ Secure your endpoints properly
- ✅ Plan for API evolution
- ✅ Keep resource structure simple
- ✅ Validate all inputs

---

## 🎯 How to Use This Skill

### For New APIs:

1. Choose API type (REST/GraphQL/tRPC)
2. Read relevant fundamentals section
3. Design schema/resources
4. Implement security measures
5. Add performance optimizations

### For API Reviews:

1. Check against checklist above
2. Verify consistency patterns
3. Test security measures
4. Validate error handling
5. Review documentation

### For API Evolution:

1. Plan versioning strategy
2. Ensure backward compatibility
3. Document breaking changes
4. Communicate changes to users
5. Monitor adoption metrics

---

## 📚 Learning Path

**Beginner:**
→ Section 1: REST Fundamentals
→ Section 4: Response Formats
→ Section 7: Security Basics

**Intermediate:**
→ Section 2: GraphQL Fundamentals
→ Section 5: Versioning Strategies
→ Section 6: Pagination Patterns

**Advanced:**
→ Section 3: tRPC Fundamentals
→ Section 8: Performance Optimization
→ All sections integration

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Design for developers** - Make your API intuitive and well-documented
2. **Be consistent** - Use predictable patterns throughout
3. **Plan for evolution** - Design for future changes
4. **Security first** - Never ship without proper security
5. **Performance matters** - Optimize for real-world usage

**API Design Mindset:**

- Every endpoint should have a clear purpose
- Every response should be predictable
- Every error should be informative
- Every change should be versioned
- Every user should be authenticated

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
