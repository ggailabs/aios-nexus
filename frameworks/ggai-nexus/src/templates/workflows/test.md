---
description: Test generation and test running command. Creates and executes tests for code validation.
---

# /test - Testing Workflow

$ARGUMENTS

---

## Purpose

This command activates TEST mode for comprehensive testing strategy and execution. Use when creating tests, running test suites, or validating code quality.

---

## Behavior

When `/test` is triggered:

1. **Test planning**
   - Identify testing requirements
   - Determine test types needed
   - Plan test coverage strategy

2. **Test generation**
   - Create unit tests
   - Generate integration tests
   - Set up end-to-end tests

3. **Test execution**
   - Run test suites
   - Analyze coverage reports
   - Identify failing tests

4. **Test refinement**
   - Debug failing tests
   - Improve test coverage
   - Optimize test performance

---

## Output Format

```markdown
## 🧪 Test: [Component/Feature Name]

### Test Strategy
[Overall testing approach and coverage goals]

---

### Test Types

#### Unit Tests
- [Component name]: [test description]
- [Function name]: [test description]

#### Integration Tests
- [Integration point]: [test description]
- [API endpoint]: [test description]

#### End-to-End Tests
- [User flow]: [test description]
- [Critical path]: [test description]

---

### Test Execution

#### Running Tests
```bash
[unit test commands]
[integration test commands]
[e2e test commands]
```

#### Coverage Report
```
[Coverage statistics]
```

---

## 📊 Test Results

### Passed Tests
- [List of passing tests]

### Failed Tests
- [List of failing tests with error details]

### Coverage Analysis
- [Coverage breakdown by file/module]

---

## 🔧 Test Commands

```bash
# Run all tests
npm test

# Run specific test file
npm test -- [test-file]

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 📋 Test Checklist

- [ ] Unit tests written
- [ ] Integration tests created
- [ ] E2E tests implemented
- [ ] Coverage targets met
- [ ] All tests passing
- [ ] Performance tests run
```

---

## Examples

```
/test user authentication
/test api endpoints
/test component rendering
/test data validation
```

---

## Key Principles

- **Comprehensive coverage** - test all critical paths
- **Maintainable tests** - write clear, focused tests
- **Automated execution** - integrate with CI/CD
- **Continuous improvement** - regularly review and improve tests
