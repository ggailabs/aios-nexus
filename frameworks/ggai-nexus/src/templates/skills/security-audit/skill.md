---
name: security-audit
description: Advanced vulnerability analysis principles. OWASP 2025, Supply Chain Security, attack surface mapping, risk prioritization.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Security Audit Expert

> **Comprehensive Security Analysis** - Proactive vulnerability detection and risk management
> **Philosophy:** Security by design, defense in depth, continuous monitoring

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For security audits: Start with ASSESSMENT (1-3), then move to SPECIFICS.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-security-assessment.md` | 🔴 **CRITICAL** | Risk assessment, threat modeling, scope | All security audits |
| `2-owasp-top-10.md` | 🔴 **CRITICAL** | OWASP 2025, common vulnerabilities | Web application security |
| `3-attack-surface.md` | 🔴 **CRITICAL** | Surface mapping, entry points, exposure | Attack surface analysis |
| `4-authentication-security.md` | 🟠 **HIGH** | Auth mechanisms, session management | Authentication systems |
| `5-data-protection.md` | 🟠 **HIGH** | Encryption, data classification, privacy | Data handling security |
| `6-infrastructure-security.md` | 🟠 **HIGH** | Network security, container security | Infrastructure audits |
| `7-supply-chain-security.md` | 🟡 **MEDIUM** | Dependency scanning, third-party risks | Supply chain analysis |

---

## 🚀 Quick Decision Tree

**What's your security concern?**

```
🔍 Security Audit
  → Read Section 1: Security Assessment
  → Check: Risk assessment, threat modeling
  → Read Section 2: OWASP Top 10

🔐 Authentication Issues
  → Read Section 1: Security Assessment
  → Check: Auth mechanisms, session management
  → Read Section 4: Authentication Security

🗄️ Data Protection
  → Read Section 1: Security Assessment
  → Check: Data classification, encryption
  → Read Section 5: Data Protection

🌐 Network Security
  → Read Section 1: Security Assessment
  → Check: Network exposure, firewall rules
  → Read Section 6: Infrastructure Security

📦 Supply Chain
  → Read Section 1: Security Assessment
  → Check: Dependencies, third-party code
  → Read Section 7: Supply Chain Security
```

---

## 📊 Security Risk Matrix

**Use this risk assessment framework:**

| Impact/Likelihood | Low | Medium | High | Critical |
| ---------------- | ---- | ------ | ---- | -------- |
| **Low** | 🟡 Low | 🟠 Medium | 🔴 High | 🔴 Critical |
| **Medium** | 🟠 Medium | 🔴 High | 🔴 Critical | 🔴 Critical |
| **High** | 🔴 High | 🔴 Critical | 🔴 Critical | 🔴 Critical |
| **Critical** | 🔴 Critical | 🔴 Critical | 🔴 Critical | 🔴 Critical |

**Risk Priority Order:**
1. 🔴 Critical - Immediate action required
2. 🔴 High - Address within 24 hours
3. 🟠 Medium - Address within 1 week
4. 🟡 Low - Address in next sprint

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| API security | `api-design` |
| Database security | `database-design` |
| Performance | `performance-profiling` |
| Architecture | `architecture` |
| Testing | `testing-patterns` |

---

## ✅ Security Audit Checklist

Before completing audit:

**Critical (Must Have):**

- [ ] Threat model completed
- [ ] Attack surface mapped
- [ ] OWASP Top 10 reviewed
- [ ] Authentication mechanisms tested
- [ ] Data protection validated

**High Priority:**

- [ ] Infrastructure security reviewed
- [ ] Supply chain analyzed
- [ ] Access controls verified
- [ ] Logging and monitoring checked
- [ ] Incident response plan tested

**Medium Priority:**

- [ ] Compliance requirements met
- [ ] Security training documented
- [ ] Third-party assessments reviewed
- [ ] Disaster recovery tested
- [ ] Security policies updated

---

## ❌ Anti-Patterns (Common Mistakes)

**DON'T:**

- ❌ Skip threat modeling
- ❌ Ignore low-severity vulnerabilities
- ❌ Forget about supply chain security
- ❌ Assume security through obscurity
- ❌ Skip regular security audits
- ❌ Ignore security training
- ❌ Forget about monitoring

**DO:**

- ✅ Model threats systematically
- ✅ Address all vulnerabilities by priority
- ✅ Scan dependencies regularly
- ✅ Practice defense in depth
- ✅ Conduct regular security audits
- ✅ Train team on security
- ✅ Monitor security continuously

---

## 🎯 How to Use This Skill

### For Security Audits:

1. Define audit scope and objectives
2. Conduct threat modeling
3. Map attack surface
4. Test for vulnerabilities
5. Document findings and recommendations

### For Risk Assessment:

1. Identify assets and their value
2. Analyze threats and vulnerabilities
3. Assess likelihood and impact
4. Calculate risk scores
5. Prioritize remediation efforts

### For Security Reviews:

1. Review security architecture
2. Test security controls
3. Validate compliance requirements
4. Assess security processes
5. Provide improvement recommendations

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Security Assessment
→ Section 2: OWASP Top 10
→ Basic vulnerability testing

**Intermediate:**
→ Section 3: Attack Surface Analysis
→ Section 4: Authentication Security
→ Advanced vulnerability assessment

**Advanced:**
→ Section 5: Data Protection
→ Section 6: Infrastructure Security
→ Section 7: Supply Chain Security

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Security by design** - Build security in from the start
2. **Defense in depth** - Use multiple layers of security
3. **Least privilege** - Grant minimum necessary access
4. **Continuous monitoring** - Security is an ongoing process
5. **Risk-based approach** - Prioritize by impact and likelihood

**Security Mindset:**

- Every input is potentially malicious
- Every system has vulnerabilities
- Every user is a potential risk vector
- Every change affects security posture
- Every incident is a learning opportunity

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
