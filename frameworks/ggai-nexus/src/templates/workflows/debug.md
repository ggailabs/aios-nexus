---
description: Debugging command. Activates DEBUG mode for systematic problem investigation.
---

# /debug - Systematic Problem Investigation

$ARGUMENTS

---

## Purpose

This command activates DEBUG mode for systematic investigation of issues, errors, or unexpected behavior.

---

## Behavior

When `/debug` is triggered:

1. **Gather information**
   - Error message
   - Reproduction steps
   - Expected vs actual behavior
   - Recent changes

2. **Form hypotheses**
   - List possible causes
   - Order by likelihood

3. **Investigate systematically**
   - Test each hypothesis
   - Check logs, data flow
   - Use elimination method

4. **Fix and prevent**
   - Apply fix
   - Explain root cause
   - Add prevention measures

---

## Output Format

```markdown
## 🔍 Debug: [Issue]

### 1. Symptom
[What's happening]

### 2. Information Gathering
**Error Message:**
[Error details]

**Reproduction Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What's actually happening]

**Recent Changes:**
- [Change 1]
- [Change 2]

---

### 3. Hypotheses

#### Hypothesis A: [Most likely]
[Cause description]
**Evidence:** [Supporting data]
**Test:** [How to verify]

#### Hypothesis B: [Second likely]
[Cause description]
**Evidence:** [Supporting data]
**Test:** [How to verify]

#### Hypothesis C: [Less likely]
[Cause description]
**Evidence:** [Supporting data]
**Test:** [How to verify]

---

### 4. Investigation

#### Testing Hypothesis A
[Investigation steps and results]

#### Testing Hypothesis B
[Investigation steps and results]

#### Testing Hypothesis C
[Investigation steps and results]

---

### 5. Root Cause

**Primary Cause:** [Main issue identified]
**Contributing Factors:** [Secondary issues]

---

### 6. Solution

#### Fix Applied
[Description of the fix]

#### Prevention Measures
- [Measure 1]
- [Measure 2]
- [Measure 3]

---

## 🎯 Next Steps

1. [Action 1]
2. [Action 2]
3. [Action 3]

## 📋 Verification

- [ ] Fix verified in development
- [ ] Fix tested in staging
- [ ] Monitoring updated
- [ ] Documentation updated
```

---

## Examples

```
/debug authentication not working
/debug slow database queries
/debug memory leak in production
/debug API timeout errors
```

---

## Key Principles

- **Systematic approach** - Follow methodical process
- **Evidence-based** - Use data, not assumptions
- **Root cause focus** - Find and fix the source
- **Prevention mindset** - Stop future occurrences
- **Documentation** - Record findings and solutions
