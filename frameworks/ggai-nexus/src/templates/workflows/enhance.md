---
description: Add or update features in existing application. Used for iterative development and feature enhancement.
---

# /enhance - Feature Enhancement

$ARGUMENTS

---

## Purpose

This command activates ENHANCE mode for adding new features or improving existing functionality. Use when extending an application with new capabilities.

---

## Behavior

When `/enhance` is triggered:

1. **Current state analysis**
   - Examine existing codebase
   - Understand current architecture
   - Identify integration points

2. **Feature planning**
   - Define feature requirements
   - Plan implementation approach
   - Consider impact on existing code

3. **Integration strategy**
   - Design integration with existing systems
   - Plan data flow changes
   - Consider backward compatibility

4. **Implementation guidance**
   - Provide step-by-step enhancement process
   - Generate necessary code components
   - Plan testing strategy

---

## Output Format

```markdown
## ⚡ Enhance: [Feature Name]

### Current State Analysis
[Analysis of existing relevant code]

---

### Feature Requirements
[Detailed feature specifications]

---

### Integration Plan

#### New Components
[List of components to create]

#### Modified Components
[List of existing components to modify]

#### Data Flow Changes
[Changes to data flow and state management]

---

### Implementation Steps

#### Step 1: Preparation
[Setup and preparation tasks]

#### Step 2: Core Implementation
[Main feature implementation]

#### Step 3: Integration
[Integration with existing code]

#### Step 4: Testing & Refinement
[Testing and refinement steps]

---

## 🔄 Integration Checklist

- [ ] Existing components analyzed
- [ ] New components created
- [ ] Integration points identified
- [ ] Data flow updated
- [ ] Tests written
- [ ] Backward compatibility verified
```

---

## Examples

```
/enhance user authentication system
/enhance real-time notifications
/enhance data export functionality
/enhance mobile responsive design
```

---

## Key Principles

- **Understand first** - analyze existing code before changes
- **Minimal disruption** - integrate smoothly with existing features
- **Maintain consistency** - follow existing patterns and conventions
- **Test thoroughly** - ensure new features don't break existing functionality
