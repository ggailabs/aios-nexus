---
name: secure-coding
description: Secure coding practices and implementation. OWASP secure coding guidelines, input validation, output encoding, and security best practices.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Secure Coding Practices

> **Security by Default** - Write secure code from the start, not as an afterthought
> **Philosophy:** Every line of code should be secure by design

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For secure coding: Start with PRINCIPLES (1), then move to SPECIFICS.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-security-principles.md` | 🔴 **CRITICAL** | Core security principles, threat modeling | All secure coding |
| `2-input-validation.md` | 🔴 **CRITICAL** | Input sanitization, validation patterns | User input handling |
| `3-output-encoding.md` | 🔴 **CRITICAL** | XSS prevention, output escaping | Data output |
| `4-authentication-security.md` | 🟠 **HIGH** | Secure auth, session management | Authentication |
| `5-authorization-patterns.md` | 🟠 **HIGH** | Access control, permissions | Authorization |
| `6-cryptography-basics.md` | 🟡 **MEDIUM** | Encryption, hashing, key management | Data protection |
| `7-error-handling.md` | 🟡 **MEDIUM** | Secure error messages, logging | Error management |

---

## 🚀 Quick Decision Tree

**What's your security challenge?**

```
🔒 User Input
  → Read Section 1: Security Principles
  → Check: Input validation needs
  → Read Section 2: Input Validation

📤 Data Output
  → Read Section 1: Security Principles
  → Check: XSS prevention needs
  → Read Section 3: Output Encoding

🔐 Authentication
  → Read Section 1: Security Principles
  → Check: Auth security requirements
  → Read Section 4: Authentication Security

🛡️ Authorization
  → Read Section 1: Security Principles
  → Check: Access control needs
  → Read Section 5: Authorization Patterns

🔐 Data Protection
  → Read Section 1: Security Principles
  → Check: Encryption needs
  → Read Section 6: Cryptography Basics

⚠️ Error Handling
  → Read Section 1: Security Principles
  → Check: Error security
  → Read Section 7: Error Handling
```

---

## 📊 Secure Coding Checklist

### Input Validation
- [ ] All user input is validated
- [ ] Input length limits are enforced
- [ ] Input format is validated
- [ ] Special characters are handled
- [ ] SQL injection protection is implemented

### Output Encoding
- [ ] All output is encoded
- [ ] XSS protection is implemented
- [ ] Content-Type headers are set
- [ ] CSP headers are configured
- [ ] Template engines are used safely

### Authentication Security
- [ ] Passwords are hashed and salted
- [ ] Multi-factor auth is implemented
- [ ] Session management is secure
- [ ] Login attempts are limited
- [ ] Password policies are enforced

### Authorization Patterns
- [ ] Principle of least privilege is applied
- [ ] Access controls are implemented
- [ ] Role-based access is used
- [ ] Permission checks are comprehensive
- [ ] Admin functions are protected

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| Security auditing | `security-audit` |
| API security | `api-design` |
| Database security | `database-design` |
| Frontend security | `frontend-design` |
| Deployment security | `deployment-procedures` |

---

## ✅ Security Standards

### Code Quality
- [ ] Security code reviews are conducted
- [ ] Static analysis is performed
- [ ] Dependencies are scanned
- [ ] Security testing is automated

### Data Protection
- [ ] Sensitive data is encrypted
- [ ] Data in transit is protected
- [ ] Data at rest is encrypted
- [ ] Key management is secure
- [ ] Data retention policies exist

### Compliance
- [ ] OWASP Top 10 is addressed
- [ ] Industry regulations are followed
- [ ] Security policies are documented
- [ ] Incident response plan exists
- [ ] Security training is provided

---

## 🎯 How to Use This Skill

### For New Development:
1. Apply security principles from start
2. Implement input validation
3. Use secure output encoding
4. Follow authentication best practices
5. Implement proper authorization

### For Security Reviews:
1. Review security principles
2. Check input validation
3. Verify output encoding
4. Audit authentication
5. Test authorization

### For Security Fixes:
1. Identify security vulnerability
2. Apply appropriate fix pattern
3. Test security improvements
4. Document security changes
5. Update security practices

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Security Principles
→ Section 2: Input Validation
→ Section 3: Output Encoding

**Intermediate:**
→ Section 4: Authentication Security
→ Section 5: Authorization Patterns
→ Section 6: Cryptography Basics

**Advanced:**
→ Section 7: Error Handling
→ Advanced security patterns
→ Security architecture design

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Never trust input** - Validate all user input
2. **Always encode output** - Prevent XSS attacks
3. **Use secure authentication** - Protect user accounts
4. **Implement proper authorization** - Control access
5. **Encrypt sensitive data** - Protect information

**Security Mindset:**

- Every input is potentially malicious
- Every output needs encoding
- Every authentication must be secure
- Every authorization must be checked
- Every error must be handled safely

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
