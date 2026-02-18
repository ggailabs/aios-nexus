---
description: Preview server start, stop, and status check. Local development server management.
---

# /preview - Development Server Management

$ARGUMENTS

---

## Purpose

This command manages local development servers for previewing applications during development.

---

## Behavior

When `/preview` is triggered:

1. **Server management**
   - Start development server
   - Check server status
   - Stop server if needed

2. **Configuration**
   - Set up environment
   - Configure ports
   - Handle conflicts

3. **Monitoring**
   - Track server health
   - Display logs
   - Provide access information

---

## Output Format

```markdown
## 🖥️ Development Server Status

**Action:** [start/stop/status]
**Application:** [App name]
**Environment:** [Development/Staging]

---

### 🚀 Server Information

**Status:** [Running/Stopped/Error]
**URL:** [Local access URL]
**Port:** [Port number]
**Process ID:** [PID]
**Uptime:** [Time running]

---

### ⚙️ Configuration

**Environment Variables:**
- [VAR1]=[value]
- [VAR2]=[value]
- [VAR3]=[value]

**Build Configuration:**
- **Mode:** [Development/Production]
- **Hot Reload:** [Enabled/Disabled]
- **Source Maps:** [Enabled/Disabled]

---

### 📊 Resource Usage

**Memory:** [Current usage]
**CPU:** [Current usage]
**Network:** [Port activity]

---

### 📋 Available Actions

#### Start Server
```bash
/preview start --port=3000 --env=development
```

#### Stop Server
```bash
/preview stop
```

#### Check Status
```bash
/preview status
```

#### Restart Server
```bash
/preview restart
```

---

### 🔗 Access Information

#### Local Access
- **URL:** [http://localhost:port]
- **Status:** [Accessible/Blocked]

#### Network Access
- **URL:** [http://network-ip:port]
- **Status:** [Accessible/Blocked]

#### Tunnel Access (if available)
- **URL:** [Public tunnel URL]
- **Status:** [Active/Inactive]

---

### 📝 Recent Logs

```
[Most recent server logs]
[Error messages if any]
[Startup information]
[Access logs]
```

---

### 🐛 Troubleshooting

#### Common Issues

**Port Already in Use**
- **Solution:** Change port or stop conflicting service
- **Command:** `/preview start --port=3001`

**Environment Variables Missing**
- **Solution:** Check .env file configuration
- **Command:** `/preview --env-check`

**Build Errors**
- **Solution:** Check compilation logs
- **Command:** `/preview --logs=build`

**Module Not Found**
- **Solution:** Install missing dependencies
- **Command:** `/preview --install-deps`

---

### 📊 Server Metrics

#### Performance
- **Response Time:** [Average response time]
- **Throughput:** [Requests per second]
- **Error Rate:** [Percentage of errors]

#### Development
- **Build Time:** [Compilation duration]
- **Reload Speed:** [Hot reload time]
- **Bundle Size:** [Current bundle size]

---

## 🎯 Examples

```
/preview start
/preview start --port=8080
/preview status
/preview stop
/preview restart --env=staging
```

---

## Key Principles

- **Quick setup** - Start servers with minimal configuration
- **Clear status** - Always show server state and access info
- **Easy management** - Simple commands for server control
- **Helpful errors** - Provide clear troubleshooting guidance
- **Development focus** - Optimized for development workflow
