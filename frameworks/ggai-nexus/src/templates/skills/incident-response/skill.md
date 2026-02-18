---
name: incident-response
description: Security incident response procedures and management. Detection, containment, eradication, and recovery from security incidents.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Incident Response

> **Rapid Security Response** - Minimize damage, restore operations, learn from incidents
> **Philosophy:** Prepare, detect, respond, recover, improve

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read ONLY sections relevant to your task!** Check content map below and load what you need.

> 🔴 **For incident response: Start with PREPARATION (1-3), then move to RESPONSE.**

---

## 📑 Content Map

| File | Priority | Topics | When to Read |
| ----- | -------- | ------- | ------------ |
| `1-incident-preparation.md` | 🔴 **CRITICAL** | Planning, tools, team structure | All incident response |
| `2-detection-monitoring.md` | 🔴 **CRITICAL** | SIEM, alerts, threat intelligence | Detection phase |
| `3-incident-classification.md` | 🔴 **CRITICAL** | Severity assessment, triage | Classification |
| `4-containment-strategies.md` | 🟠 **HIGH** | Isolation, blocking, quarantine | Containment |
| `5-eradication-procedures.md` | 🟠 **HIGH** | Malware removal, system cleanup | Eradication |
| `6-recovery-processes.md` | 🟠 **HIGH** | System restoration, validation | Recovery |
| `7-post-incident-analysis.md` | 🟡 **MEDIUM** | Lessons learned, improvements | Analysis |
| `8-communication-management.md` | 🟡 **MEDIUM** | Stakeholder communication, reporting | Communication |

---

## 🚀 Quick Decision Tree

**What's your incident response need?**

```
🛡️ Preparation
  → Read Section 1: Incident Preparation
  → Check: Team structure and tools
  → Read Section 2: Detection & Monitoring

🚨 Detection
  → Read Section 2: Detection & Monitoring
  → Check: Alert systems and SIEM
  → Read Section 3: Incident Classification

⚡ Classification
  → Read Section 3: Incident Classification
  → Check: Severity assessment needs
  → Read Section 4: Containment Strategies

🔒 Containment
  → Read Section 4: Containment Strategies
  → Check: Isolation procedures
  → Read Section 5: Eradication Procedures

🧹 Eradication
  → Read Section 5: Eradication Procedures
  → Check: Malware removal needs
  → Read Section 6: Recovery Processes

🔄 Recovery
  → Read Section 6: Recovery Processes
  → Check: System restoration
  → Read Section 7: Post-Incident Analysis

📊 Analysis
  → Read Section 7: Post-Incident Analysis
  → Check: Lessons learned
  → Read Section 8: Communication Management
```

---

## 📊 Incident Response Framework

### Incident Lifecycle
| Phase | Duration | Activities | Success Metrics |
| ------ | --------- | ----------- | --------------- |
| **Preparation** | Ongoing | Planning, training, tools | Response readiness |
| **Detection** | Minutes | Alert analysis, correlation | Mean time to detect |
| **Analysis** | Hours | Investigation, classification | Mean time to analyze |
| **Containment** | Hours | Isolation, blocking | Mean time to contain |
| **Eradication** | Hours-Days | Cleanup, removal | Mean time to eradicate |
| **Recovery** | Days | Restoration, validation | Mean time to recover |
| **Lessons Learned** | Weeks | Analysis, improvements | Incident reduction |

### Severity Classification
| Severity | Impact | Response Time | Examples |
| -------- | ------- | ------------- | -------- |
| **Critical** | Business critical | < 1 hour | Ransomware, data breach |
| **High** | Significant impact | < 4 hours | DDoS, system compromise |
| **Medium** | Moderate impact | < 24 hours | Malware infection, data loss |
| **Low** | Minimal impact | < 72 hours | Phishing, policy violation |

---

## 🔗 Related Skills

| Need | Skill |
| ----- | ----- |
| Security auditing | `security-audit` |
| Penetration testing | `penetration-testing` |
| Secure coding | `secure-coding` |
| Deployment security | `deployment-procedures` |
| Performance monitoring | `performance-profiling` |

---

## ✅ Incident Response Checklist

### Preparation Phase
- [ ] Incident response team is established
- [ ] Response procedures are documented
- [ ] Communication channels are defined
- [ ] Tools and systems are configured
- [ ] Training and drills are conducted

### Detection Phase
- [ ] Monitoring systems are active
- [ ] Alert thresholds are configured
- [ ] Threat intelligence is integrated
- [ ] Log collection is comprehensive
- [ ] Anomaly detection is implemented

### Analysis Phase
- [ ] Incident is properly classified
- [ ] Scope is accurately assessed
- [ ] Root cause is identified
- [ ] Impact is evaluated
- [ ] Evidence is preserved

### Containment Phase
- [ ] Affected systems are isolated
- [ ] Malicious activity is blocked
- [ ] Access is restricted
- [ ] Data is protected
- [ ] Spread is prevented

### Eradication Phase
- [ ] Malware is completely removed
- [ ] Vulnerabilities are patched
- [ ] Backdoors are eliminated
- [ ] Systems are hardened
- [ ] Compromised credentials are changed

### Recovery Phase
- [ ] Systems are restored safely
- [ ] Data integrity is verified
- [ ] Services are fully operational
- [ ] Performance is validated
- [ ] Monitoring is intensified

### Post-Incident Phase
- [ ] Root cause analysis is completed
- [ ] Lessons learned are documented
- [ ] Improvements are implemented
- [ ] Stakeholders are informed
- [ ] Procedures are updated

---

## 🎯 How to Use This Skill

### For Incident Planning:
1. Establish response team structure
2. Develop response procedures
3. Configure monitoring and alerting
4. Conduct training and drills
5. Document communication plans

### During Incidents:
1. Detect and classify incident
2. Contain the threat
3. Eradicate malicious activity
4. Recover affected systems
5. Analyze and improve

### For Post-Incident:
1. Conduct root cause analysis
2. Document lessons learned
3. Implement improvements
4. Update procedures
5. Share knowledge

---

## 📚 Learning Path

**Beginner:**
→ Section 1: Incident Preparation
→ Section 2: Detection & Monitoring
→ Section 3: Incident Classification

**Intermediate:**
→ Section 4: Containment Strategies
→ Section 5: Eradication Procedures
→ Section 6: Recovery Processes

**Advanced:**
→ Section 7: Post-Incident Analysis
→ Section 8: Communication Management
→ Advanced incident response

---

## 🎓 Best Practices Summary

**Golden Rules:**

1. **Preparation is key** - Prepare before incidents happen
2. **Speed matters** - Respond quickly to minimize damage
3. **Documentation is critical** - Document everything
4. **Communication is essential** - Keep stakeholders informed
5. **Learn and improve** - Use incidents to strengthen security

**Incident Response Mindset:**

- Every incident is an opportunity to improve
- Every minute counts during response
- Every decision should be documented
- Every stakeholder needs communication
- Every lesson should be shared

---

**Generated by GGAI Nexus**
**Date:** January 2026
**Version:** 1.0.0
