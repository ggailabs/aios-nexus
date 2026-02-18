---
description: Create project plan using project-planner agent. No code writing - only plan file generation.
---

# /plan - Project Planning Workflow

$ARGUMENTS

---

## Purpose

This command activates PLAN mode for creating comprehensive project plans, specifications, and roadmaps without writing any code.

---

## Behavior

When `/plan` is triggered:

1. **Requirements analysis**
   - Understand project goals
   - Identify constraints
   - Define scope

2. **Planning phase**
   - Create project structure
   - Define milestones
   - Plan resources

3. **Documentation**
   - Generate plan files
   - Create specifications
   - Document decisions

---

## Output Format

```markdown
## 📋 Project Plan: [Project Name]

### 1. Executive Summary

**Project Goal:** [High-level objective]
**Success Criteria:** [Measurable outcomes]
**Timeline:** [Estimated duration]
**Budget:** [Resource requirements]

---

### 2. Requirements Analysis

#### Functional Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

#### Non-Functional Requirements
- [Performance requirement]
- [Security requirement]
- [Scalability requirement]

#### Constraints
- [Technical constraint]
- [Time constraint]
- [Resource constraint]

---

### 3. Project Scope

#### In Scope
- [Feature 1]
- [Feature 2]
- [Feature 3]

#### Out of Scope
- [Feature 4]
- [Feature 5]
- [Feature 6]

#### Assumptions
- [Assumption 1]
- [Assumption 2]

---

### 4. Architecture Overview

**System Architecture:** [High-level design]
**Technology Stack:** [Technologies to be used]
**Data Flow:** [Information flow diagram]
**Integration Points:** [External systems]

---

### 5. Development Plan

#### Phase 1: Foundation
**Duration:** [Time period]
**Deliverables:**
- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

**Dependencies:** [What needs to be completed first]

#### Phase 2: Core Features
**Duration:** [Time period]
**Deliverables:**
- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

**Dependencies:** [Previous phase completion]

#### Phase 3: Enhancement
**Duration:** [Time period]
**Deliverables:**
- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

**Dependencies:** [Previous phase completion]

---

### 6. Resource Planning

#### Team Structure
- **Project Manager:** [Role and responsibilities]
- **Lead Developer:** [Role and responsibilities]
- **UI/UX Designer:** [Role and responsibilities]
- **QA Engineer:** [Role and responsibilities]

#### Skill Requirements
- [Skill 1]: [Proficiency level]
- [Skill 2]: [Proficiency level]
- [Skill 3]: [Proficiency level]

#### Tools & Infrastructure
- [Tool 1]: [Purpose]
- [Tool 2]: [Purpose]
- [Tool 3]: [Purpose]

---

### 7. Risk Assessment

#### High Risks
- **Risk 1:** [Description]
  - **Impact:** [Severity]
  - **Probability:** [Likelihood]
  - **Mitigation:** [Strategy]

- **Risk 2:** [Description]
  - **Impact:** [Severity]
  - **Probability:** [Likelihood]
  - **Mitigation:** [Strategy]

#### Medium Risks
- **Risk 3:** [Description]
  - **Impact:** [Severity]
  - **Probability:** [Likelihood]
  - **Mitigation:** [Strategy]

---

### 8. Quality Assurance

#### Testing Strategy
- **Unit Testing:** [Approach]
- **Integration Testing:** [Approach]
- **End-to-End Testing:** [Approach]
- **Performance Testing:** [Approach]

#### Quality Metrics
- **Code Coverage:** [Target percentage]
- **Bug Density:** [Target rate]
- **Performance:** [Target metrics]
- **Security:** [Compliance requirements]

---

### 9. Success Metrics

#### Key Performance Indicators
- **User Adoption:** [Target]
- **Performance:** [Target]
- **Reliability:** [Target]
- **User Satisfaction:** [Target]

#### Measurement Methods
- [Method 1]
- [Method 2]
- [Method 3]

---

### 10. Next Steps

#### Immediate Actions
1. [Action 1]
2. [Action 2]
3. [Action 3]

#### First Week
- [Task 1]
- [Task 2]
- [Task 3]

#### First Month
- [Milestone 1]
- [Milestone 2]
- [Milestone 3]

---

## 📊 Project Summary

**Total Duration:** [Overall timeline]
**Team Size:** [Number of team members]
**Estimated Cost:** [Budget estimate]
**Risk Level:** [Overall risk assessment]

---

## 🎯 Examples

```
/plan create e-commerce platform with React and Node.js
/plan migrate monolith application to microservices
/plan design mobile app for food delivery service
/plan implement real-time chat application
```

---

## Key Principles

- **Plan before code** - Comprehensive planning prevents rework
- **Clear scope** - Define what's in and out of scope
- **Risk awareness** - Identify and plan for potential issues
- **Resource planning** - Ensure adequate resources are available
- **Quality focus** - Build quality in from the beginning
