---
name: penetration-testing
description: Ethical hacking and penetration testing methodologies. Security assessment techniques, vulnerability discovery, and exploit analysis.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Penetration Testing

> **Ethical Security Assessment** - Find vulnerabilities before attackers do
> **Philosophy:** Think like an attacker to build stronger defenses

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For penetration testing: Start with METHODOLOGY (1-3), then move to TECHNIQUES.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-penetration-methodology.md` | 🔴 **CRITICAL** | Testing methodology, scope, rules | All pen testing |
| `2-reconnaissance.md` | 🔴 **CRITICAL** | Information gathering, OSINT | Initial phase |
| `3-vulnerability-assessment.md` | 🔴 **CRITICAL** | Scanning, analysis, classification | Discovery phase |
| `4-web-application-testing.md` | 🟠 **HIGH** | OWASP WSTG, web app testing | Web applications |
| `5-network-penetration.md` | 🟠 **HIGH** | Network scanning, exploitation | Network security |
| `6-social-engineering.md` | 🟡 **MEDIUM** | Human factors, phishing | People security |
| `7-exploitation-techniques.md` | 🟡 **MEDIUM** | Exploit development, privilege escalation | Exploitation |
| `8-reporting-remediation.md` | 🟠 **HIGH** | Report writing, remediation guidance | Documentation |

---

## 🚀 Quick Decision Tree

**What's your penetration testing target?**

```
🌐 Web Application
  → Read Section 1: Penetration Methodology
  → Check: Web app security needs
  → Read Section 4: Web Application Testing

🖥️ Network Infrastructure
  → Read Section 1: Penetration Methodology
  → Check: Network security assessment
  → Read Section 5: Network Penetration

👥 Organization Security
  → Read Section 1: Penetration Methodology
  → Check: People security assessment
  → Read Section 6: Social Engineering

🔍 Vulnerability Discovery
  → Read Section 1: Penetration Methodology
  → Check: System assessment needs
  → Read Section 3: Vulnerability Assessment

📝 Information Gathering
  → Read Section 1: Penetration Methodology
  → Check: Reconnaissance needs
  → Read Section 2: Reconnaissance

🛠️ Exploitation
  → Read Section 1: Penetration Methodology
  → Check: Exploit development needs
  → Read Section 7: Exploitation Techniques
```

---

## 📊 Penetration Testing Framework

### Testing Phases
| Phase | Duration | Activities | Deliverables |
| ------ | --------- | ----------- | ------------ |
| **Planning** | 10% | Scope definition, rules of engagement | Test plan, authorization |
| **Reconnaissance** | 20% | Information gathering, mapping | Target profile, attack surface |
| **Vulnerability Assessment** | 30% | Scanning, analysis, classification | Vulnerability list, risk matrix |
| **Exploitation** | 25% | Exploit development, testing | Proof of concepts, access gained |
| **Reporting** | 15% | Documentation, remediation | Final report, recommendations |

### Risk Classification
| Severity | Description | Example | Response Time |
| -------- | ----------- | ------- | ------------- |
| **Critical** | Immediate threat, easy exploit | Remote code execution | < 24 hours |
| **High** | Significant risk, moderate exploit | SQL injection, XSS | < 72 hours |
| **Medium** | Moderate risk, difficult exploit | Information disclosure | < 1 week |
| **Low** | Minimal risk, theoretical | Missing security headers | < 1 month |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| Security auditing | `security-audit` |
| Secure coding | `secure-coding` |
| API security | `api-design` |
| Database security | `database-design` |
| Infrastructure security | `deployment-procedures` |

---

## ✅ Penetration Testing Checklist

### Planning Phase
- [ ] Scope is clearly defined
- [ ] Rules of engagement are established
- [ ] Authorization is documented
- [ ] Legal requirements are met
- [ ] Team roles are assigned

### Reconnaissance Phase
- [ ] Public information is gathered
- [ ] Network ranges are identified
- [ ] Services are enumerated
- [ ] Technologies are identified
- [ ] Attack surface is mapped

### Vulnerability Assessment
- [ ] Automated scanning is performed
- [ ] Manual testing is conducted
- [ ] False positives are filtered
- [ ] Vulnerabilities are classified
- [ ] Risk assessment is completed

### Exploitation Phase
- [ ] Exploits are safely tested
- [ ] Privilege escalation is attempted
- [ ] Persistence mechanisms are tested
- [ ] Data access is validated
- [ ] Impact is assessed

### Reporting Phase
- [ ] Findings are documented
- [ ] Evidence is preserved
- [ ] Remediation steps are provided
- [ ] Risk levels are assigned
- [ ] Executive summary is prepared

---

## 🎯 How to Use This Skill

### For Security Assessments:
1. Define scope and objectives
2. Conduct reconnaissance
3. Perform vulnerability assessment
4. Test exploitation scenarios
5. Document findings and recommendations

### For Red Team Exercises:
1. Plan attack scenarios
2. Execute simulated attacks
3. Test detection capabilities
3. Report on security posture
4. Recommend improvements

### For Security Testing:
1. Identify testing requirements
2. Select appropriate tools and techniques
3. Execute security tests
4. Analyze results
5. Provide remediation guidance

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Penetration Methodology
→ Section 2: Reconnaissance
→ Section 3: Vulnerability Assessment

**Intermediate:**
→ Section 4: Web Application Testing
→ Section 5: Network Penetration
→ Section 8: Reporting & Remediation

**Advanced:**
→ Section 6: Social Engineering
→ Section 7: Exploitation Techniques
→ Advanced penetration testing

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Legal compliance** - Always have proper authorization
2. **Methodical approach** - Follow structured methodology
3. **Documentation** - Document everything thoroughly
4. **Responsible disclosure** - Report findings responsibly
5. **Continuous learning** - Stay updated on threats

**Penetration Testing Mindset:**

- Every system has vulnerabilities
- Every finding needs validation
- Every report must be actionable
- Every test should be reproducible
- Every recommendation should be practical

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
