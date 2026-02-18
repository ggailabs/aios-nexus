---
description: Coordinate multiple agents for complex tasks. Use for multi-perspective analysis, comprehensive reviews, or tasks requiring different domain expertise.
---

# /orchestrate - Multi-Agent Coordination

$ARGUMENTS

---

## Purpose

This command activates ORCHESTRATION MODE for coordinating specialized agents to solve complex problems requiring multiple perspectives and expertise areas.

---

## Behavior

When `/orchestrate` is triggered:

1. **Task analysis**
   - Break down complex problem
   - Identify required expertise areas
   - Select appropriate agents

2. **Agent coordination**
   - Deploy minimum 3 different agents
   - Manage agent interactions
   - Synthesize results

3. **Integration**
   - Combine agent outputs
   - Resolve conflicts
   - Create unified solution

---

## 🔴 CRITICAL: Minimum Agent Requirement

> ⚠️ **ORCHESTRATION = MINIMUM 3 DIFFERENT AGENTS**
> 
> If you use fewer than 3 agents, you are NOT orchestrating - you're just delegating.
> 
> **Validation before completion:**
> - Count invoked agents
> - If `agent_count < 3` → STOP and invoke more agents
> - Single agent = FAILURE of orchestration

### Agent Selection Matrix

| Task Type | REQUIRED Agents (minimum) |
|-----------|---------------------------|
| **Web App** | frontend-specialist, backend-specialist, test-engineer |
| **API** | backend-specialist, security-auditor, test-engineer |
| **UI/Design** | frontend-specialist, performance-optimizer, accessibility-expert |
| **Database** | database-architect, backend-specialist, security-auditor |
| **Full Stack** | project-planner, frontend-specialist, backend-specialist, devops-engineer |
| **Debug** | debugger, explorer-agent, test-engineer |
| **Security** | security-auditor, penetration-tester, devops-engineer |
| **Architecture** | system-architect, database-architect, security-auditor |

---

## Output Format

```markdown
## 🎯 Orchestration: [Task Description]

### 1. Task Analysis

**Complexity:** [Simple/Medium/Complex]
**Required Expertise:** [List of expertise areas]
**Estimated Agents:** [Number and type of agents]

---

### 2. Agent Selection & Deployment

#### Agent 1: [Agent Name]
**Expertise:** [Area of specialization]
**Responsibility:** [Specific task portion]
**Expected Output:** [Deliverable]

#### Agent 2: [Agent Name]
**Expertise:** [Area of specialization]
**Responsibility:** [Specific task portion]
**Expected Output:** [Deliverable]

#### Agent 3: [Agent Name]
**Expertise:** [Area of specialization]
**Responsibility:** [Specific task portion]
**Expected Output:** [Deliverable]

---

### 3. Coordination Strategy

**Sequence:** [Order of agent execution]
**Dependencies:** [Agent dependencies]
**Communication:** [How agents will interact]
**Integration:** [How outputs will be combined]

---

### 4. Execution Log

#### Agent 1 Execution
**Start Time:** [Timestamp]
**Progress:** [Status updates]
**Output:** [Results delivered]

#### Agent 2 Execution
**Start Time:** [Timestamp]
**Progress:** [Status updates]
**Output:** [Results delivered]

#### Agent 3 Execution
**Start Time:** [Timestamp]
**Progress:** [Status updates]
**Output:** [Results delivered]

---

### 5. Integration & Synthesis

**Combined Results:** [Unified output]
**Conflict Resolution:** [How disagreements were handled]
**Quality Assurance:** [Validation of integrated solution]

---

### 6. Final Deliverable

**Solution:** [Complete solution description]
**Components:** [List of solution components]
**Next Steps:** [Implementation or follow-up actions]

---

## 📊 Orchestration Metrics

- **Agents Deployed:** [Number]
- **Execution Time:** [Duration]
- **Success Rate:** [Agent success percentage]
- **Integration Quality:** [Quality assessment]

---

## 🎯 Examples

```
/orchestrate design and implement full-stack e-commerce platform
/orchestrate security audit of microservices architecture
/orchestrate performance optimization of React application
/orchestrate database migration strategy for large-scale system
```

---

## Key Principles

- **Minimum 3 agents** - True orchestration requires multiple perspectives
- **Clear responsibilities** - Each agent has specific expertise area
- **Effective coordination** - Manage agent interactions and dependencies
- **Quality integration** - Combine outputs into cohesive solution
- **Conflict resolution** - Handle disagreements between agents
- **Documentation** - Track orchestration process and outcomes
