---
description: Display agent and project status. Progress tracking and status board for development teams.
---

# /status - Project Status Dashboard

$ARGUMENTS

---

## Purpose

This command displays the current status of agents, project progress, and development metrics for team visibility and progress tracking.

---

## Behavior

When `/status` is triggered:

1. **Collect current state**
   - Agent activities and status
   - Project progress metrics
   - Recent changes and updates

2. **Generate status report**
   - Create comprehensive overview
   - Highlight blockers and issues
   - Show progress toward goals

3. **Provide insights**
   - Identify trends
   - Suggest improvements
   - Flag concerns

---

## Output Format

```markdown
## 📊 Project Status Dashboard

**Generated:** [Current timestamp]
**Project:** [Project name]
**Status:** [Overall health status]

---

### 🎯 Overview

**Progress:** [Percentage complete]
**Health Score:** [0-100]
**Blockers:** [Number of active blockers]
**Team Velocity:** [Current velocity]

---

### 👥 Agent Status

#### Active Agents
- **[Agent 1]:** [Status] - [Current task]
- **[Agent 2]:** [Status] - [Current task]
- **[Agent 3]:** [Status] - [Current task]

#### Idle Agents
- **[Agent 4]:** Available for assignment
- **[Agent 5]:** Available for assignment

#### Blocked Agents
- **[Agent 6]:** Blocked by [blocker]
- **[Agent 7]:** Blocked by [blocker]

---

### 📈 Progress Metrics

#### Sprint Progress
**Sprint:** [Current sprint number]
**Start Date:** [Sprint start]
**End Date:** [Sprint end]
**Completed:** [X/Y] story points

#### Milestones
- **[Milestone 1]:** ✅ Completed [Date]
- **[Milestone 2]:** 🔄 In Progress [X%]
- **[Milestone 3]:** ⏳ Not Started [Est. Date]

#### Key Metrics
- **Code Coverage:** [Percentage]
- **Bug Count:** [Open/Closed]
- **Performance Score:** [Score]
- **Security Score:** [Score]

---

### 🚨 Blockers & Issues

#### Critical Blockers
1. **[Blocker 1]**
   - **Impact:** [Description]
   - **Owner:** [Responsible person]
   - **ETA:** [Expected resolution]

2. **[Blocker 2]**
   - **Impact:** [Description]
   - **Owner:** [Responsible person]
   - **ETA:** [Expected resolution]

#### Active Issues
- **[Issue 1]:** [Priority] - [Status]
- **[Issue 2]:** [Priority] - [Status]
- **[Issue 3]:** [Priority] - [Status]

---

### 🔄 Recent Activity

#### Last 24 Hours
- **[Time]:** [Activity 1]
- **[Time]:** [Activity 2]
- **[Time]:** [Activity 3]

#### Last 7 Days
- **[Date]:** [Major achievement 1]
- **[Date]:** [Major achievement 2]
- **[Date]:** [Issue resolved]

---

### 📋 Upcoming

#### This Week
- **[Task 1]:** [Due date] - [Assignee]
- **[Task 2]:** [Due date] - [Assignee]
- **[Task 3]:** [Due date] - [Assignee]

#### Next Sprint
- **[Feature 1]:** Planned
- **[Feature 2]:** Planned
- **[Feature 3]:** Planned

---

### 🎯 Goals & KPIs

#### Sprint Goals
- [ ] **[Goal 1]:** [Progress]
- [ ] **[Goal 2]:** [Progress]
- [ ] **[Goal 3]:** [Progress]

#### Quarterly Objectives
- **[Objective 1]:** [X%] complete
- **[Objective 2]:** [X%] complete
- **[Objective 3]:** [X%] complete

---

### 💡 Insights & Recommendations

#### Positive Trends
- **[Trend 1]:** [Description and impact]
- **[Trend 2]:** [Description and impact]

#### Areas of Concern
- **[Concern 1]:** [Description and suggested action]
- **[Concern 2]:** [Description and suggested action]

#### Recommendations
1. **[Recommendation 1]:** [Reasoning]
2. **[Recommendation 2]:** [Reasoning]
3. **[Recommendation 3]:** [Reasoning]

---

## 📊 Health Indicators

| Metric | Status | Trend |
|--------|--------|-------|
| **Velocity** | 🟢 Good | ↗️ Improving |
| **Quality** | 🟡 Fair | → Stable |
| **Delivery** | 🟢 Good | ↗️ Improving |
| **Team Morale** | 🟢 Good | → Stable |

---

## 🎯 Examples

```
/status
/status --detailed
/status --agent frontend-specialist
/status --milestone
```

---

## Key Principles

- **Transparency** - Make status visible to all team members
- **Accuracy** - Provide real, actionable information
- **Timeliness** - Update status regularly
- **Context** - Explain what the status means
- **Actionability** - Include next steps and recommendations
