---
description: Deployment command for production releases. Pre-flight checks and deployment execution.
---

# /deploy - Production Deployment

$ARGUMENTS

---

## Purpose

This command activates DEPLOY mode for safe and reliable production deployments. Use when releasing applications to production environments.

---

## Behavior

When `/deploy` is triggered:

1. **Pre-deployment checks**
   - Verify code quality
   - Run automated tests
   - Check security vulnerabilities

2. **Build preparation**
   - Optimize build process
   - Generate production assets
   - Configure environment variables

3. **Deployment execution**
   - Execute deployment strategy
   - Monitor deployment progress
   - Verify deployment success

4. **Post-deployment**
   - Run smoke tests
   - Monitor performance
   - Prepare rollback plan

---

## Output Format

```markdown
## 🚀 Deploy: [Application/Version]

### Pre-Deployment Checklist

#### Code Quality
- [ ] All tests passing
- [ ] Code coverage meets requirements
- [ ] No security vulnerabilities
- [ ] Linting checks passed

#### Build Verification
- [ ] Production build successful
- [ ] Assets optimized
- [ ] Environment variables configured
- [ ] Dependencies audited

---

### Deployment Strategy

#### Target Environment
- **Environment:** [Production/Staging]
- **Region:** [Deployment region]
- **URL:** [Application URL]

#### Deployment Method
- **Strategy:** [Blue-Green/Canary/Rolling]
- **Downtime:** [Expected downtime]
- **Rollback Plan:** [Rollback strategy]

---

### Execution Steps

#### Step 1: Build
```bash
[Build commands]
```

#### Step 2: Deploy
```bash
[Deploy commands]
```

#### Step 3: Verify
```bash
[Verification commands]
```

---

## 📊 Deployment Status

### Build Status
- [Build status and details]

### Deployment Progress
- [Deployment progress and logs]

### Health Checks
- [Application health status]
- [Performance metrics]
- [Error rates]

---

## 🔧 Deployment Commands

```bash
# Build for production
npm run build

# Deploy to production
npm run deploy

# Check deployment status
npm run deploy:status

# Rollback deployment
npm run deploy:rollback
```

---

## 📋 Deployment Checklist

- [ ] Pre-deployment checks completed
- [ ] Build process successful
- [ ] Deployment executed
- [ ] Health checks passing
- [ ] Monitoring enabled
- [ ] Rollback plan ready
```

---

## Examples

```
/deploy production release
/deploy hotfix to staging
/deploy canary deployment
/deploy emergency rollback
```

---

## Key Principles

- **Safety first** - thorough pre-deployment checks
- **Automated processes** - minimize human error
- **Monitoring enabled** - track deployment health
- **Rollback ready** - always have recovery plan
