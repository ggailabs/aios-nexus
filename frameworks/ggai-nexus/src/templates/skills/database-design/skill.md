---
name: database-design
description: Database design principles and decision-making. Schema design, indexing strategy, ORM selection, serverless databases.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Database Design Expert

> **Comprehensive Database Design** - Best practices for building efficient, scalable databases
> **Philosophy:** Design for data integrity, optimize for performance, plan for scale

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For new databases: Start with FUNDAMENTALS (1-3), then move to OPTIMIZATION.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-schema-design.md` | 🔴 **CRITICAL** | Normalization, relationships, constraints | New databases |
| `2-indexing-strategy.md` | 🔴 **CRITICAL** | Primary keys, foreign keys, composite indexes | Performance optimization |
| `3-orm-selection.md` | 🟠 **HIGH** | ORMs vs raw SQL, migration tools | Framework integration |
| `4-query-optimization.md` | 🟡 **MEDIUM** | Query patterns, execution plans, optimization | Slow queries |
| `5-data-migration.md` | 🟡 **MEDIUM** | Migration strategies, zero-downtime changes | Schema evolution |
| `6-scaling-patterns.md` | 🟠 **HIGH** | Vertical/horizontal scaling, sharding, replication | Growth planning |
| `7-security-patterns.md` | 🟠 **HIGH** | Data encryption, access control, auditing | Security requirements |
| `8-serverless-databases.md` | 🟡 **MEDIUM** | Serverless options, connection management | Cloud architectures |

---

## 🚀 Quick Decision Tree

**What's your database challenge?**

```
🏗️ Designing new database
  → Read Section 1: Schema Design
  → Check: Normalization, relationships, constraints

📈 Slow query performance
  → Read Section 2: Indexing Strategy
  → Check: Query patterns, index types, execution plans

🔧 Framework integration needed
  → Read Section 3: ORM Selection
  → Check: ORM features, migration tools, type safety

🐛 Query optimization needed
  → Read Section 4: Query Optimization
  → Check: Execution plans, query patterns, optimization

🔄 Schema changes required
  → Read Section 5: Data Migration
  → Check: Migration strategies, zero-downtime changes

📊 Scaling requirements
  → Read Section 6: Scaling Patterns
  → Check: Vertical/horizontal scaling, sharding

🔒 Security concerns
  → Read Section 7: Security Patterns
  → Check: Encryption, access control, auditing

☁️ Cloud/serverless architecture
  → Read Section 8: Serverless Databases
  → Check: Connection management, cost optimization
```

---

## 📊 Database Selection Guide

**Use this decision matrix:**

| Requirement | PostgreSQL | MySQL | MongoDB | DynamoDB | Recommendation |
| ------------ | ---------- | ------ | -------- | --------- | ------------- |
| ACID compliance | ✅ Best | ✅ Good | ❌ Limited | ❌ Limited | **PostgreSQL** |
| Document storage | ❌ Limited | ❌ Limited | ✅ Best | ✅ Good | **MongoDB** |
| Serverless | ❌ Limited | ❌ Limited | ❌ Limited | ✅ Best | **DynamoDB** |
| Complex queries | ✅ Best | ✅ Good | ❌ Limited | ❌ Limited | **PostgreSQL** |
| Horizontal scaling | ✅ Good | ✅ Good | ✅ Best | ✅ Best | **MongoDB/DynamoDB** |
| JSON support | ✅ Best | ✅ Good | ✅ Best | ✅ Good | **PostgreSQL/MongoDB** |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| API design | `api-design` |
| Performance optimization | `performance-profiling` |
| Security patterns | `security-audit` |
| Testing strategies | `testing-patterns` |
| Deployment procedures | `deployment-procedures` |

---

## ✅ Database Design Checklist

Before deploying your database:

**Critical (Must Have):**

- [ ] Proper normalization (1NF, 2NF, 3NF)
- [ ] Primary keys defined
- [ ] Foreign key constraints
- [ ] Data validation rules
- [ ] Backup strategy

**High Priority:**

- [ ] Indexing strategy implemented
- [ ] Query optimization completed
- [ ] Migration scripts ready
- [ ] Security measures in place
- [ ] Monitoring configured

**Medium Priority:**

- [ ] Scaling plan documented
- [ ] Performance testing completed
- [ ] Documentation comprehensive
- [ ] Disaster recovery plan
- [ ] Connection pooling configured

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Skip normalization completely
- ❌ Use SELECT * in production
- ❌ Forget indexes on foreign keys
- ❌ Store large blobs in main tables
- ❌ Ignore connection pooling
- ❌ Skip data validation
- ❌ Use N+1 query patterns

**DO:**

- ✅ Normalize data properly
- ✅ Select only needed columns
- ✅ Index foreign key relationships
- ✅ Store large files separately
- ✅ Use connection pooling
- ✅ Validate all inputs
- ✅ Optimize query patterns

---

## 🎯 How to Use This Skill

### For New Databases:

1. Design schema with proper normalization
2. Plan indexing strategy
3. Choose appropriate ORM
4. Implement security measures
5. Plan for scaling

### For Database Optimization:

1. Analyze slow queries
2. Review indexing strategy
3. Optimize query patterns
4. Implement caching
5. Monitor performance

### For Database Migration:

1. Plan migration strategy
2. Write migration scripts
3. Test in staging environment
4. Execute zero-downtime migration
5. Verify data integrity

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Schema Design
→ Section 2: Indexing Strategy
→ Section 7: Security Basics

**Intermediate:**
→ Section 3: ORM Selection
→ Section 4: Query Optimization
→ Section 5: Data Migration

**Advanced:**
→ Section 6: Scaling Patterns
→ Section 8: Serverless Databases
→ All sections integration

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Data integrity first** - Ensure consistency and accuracy
2. **Performance matters** - Optimize for real-world usage
3. **Plan for scale** - Design for future growth
4. **Security always** - Protect your data assets
5. **Document everything** - Make your design understandable

**Database Design Mindset:**

- Every table should have a clear purpose
- Every relationship should be properly defined
- Every index should serve a query pattern
- Every migration should be reversible
- Every query should be optimized

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
