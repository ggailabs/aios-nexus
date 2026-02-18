# GGAI Nexus

AI-powered development environment setup with multi-IDE support and intelligent scaffolding.

## 🚀 Quick Start

```bash
npx ggai-nexus
```

## 📋 Features

- **Multi-IDE Support**: Windsurf, Cursor, Antigravity, VS Code
- **AI-Powered Scaffolding**: Analyzes your codebase and generates custom content
- **Multi-Language Interface**: Portuguese, English, Spanish
- **Hybrid CLI/TUI**: Beautiful terminal interface with CLI fallback
- **Smart Content Generation**: Personalized agents, skills, and workflows

## 🎯 Usage

### Interactive Mode (Default)
```bash
npx ggai-nexus
```

### Terminal UI Mode
```bash
npx ggai-nexus --tui
```

### Quick Setup
```bash
npx ggai-nexus --quick --ide=windsurf --type=frontend
```

### Specify Language
```bash
npx ggai-nexus --language=pt-BR
```

## 🛠️ Supported IDEs

| IDE | Target Directory | Status |
|-----|------------------|---------|
| 🌊 Windsurf | `.windsurf/` | ✅ Supported |
| 🎯 Cursor | `.cursor/` | ✅ Supported |
| 🚀 Antigravity | `.agent/` | ✅ Supported |
| 💻 VS Code | `.vscode/` | ✅ Supported |

## 📦 Generated Content

### 📝 Documentation
- Architecture documentation based on your project
- Component structure guides
- Development patterns specific to your tech stack

### 🤖 AI Agents
- Framework-specific specialists
- Code review agents
- Performance optimization experts
- Testing specialists

### ⚡ Skills
- Development patterns for your stack
- Testing strategies
- Performance optimization techniques
- Best practice guides

### 🔄 Workflows
- Development workflows
- Code review processes
- Deployment procedures
- Best practice workflows

## 🌍 Languages

- 🇧🇷 Português (Brasil)
- 🇺🇸 English (US)
- 🇪🇸 Español (España)

## 🔧 Options

```bash
Options:
  -t, --tui              Use Terminal User Interface
  -l, --language <lang>  Set interface language (pt-BR, es-ES, en-US)
  -q, --quick            Quick setup with defaults
  --ide <ide>            Specify IDE (windsurf, cursor, antigravity, vscode)
  --type <type>          Specify project type (frontend, backend, fullstack, docs)
  --no-ai                Skip AI scaffolding
  --dev                  Development mode
  -h, --help             Display help
```

## 📁 Project Structure

After running GGAI Nexus, you'll get a structure like this:

```
.windsurf/                    # or .cursor/, .agent/, .vscode/
├── docs/                     # Generated documentation
│   ├── architecture.md       # Project architecture
│   ├── components.md         # Component guides
│   └── data-flow.md          # Data flow documentation
├── agents/                   # AI agents
│   ├── specialist.md         # Framework specialist
│   ├── reviewer.md           # Code reviewer
│   └── tester.md             # Testing specialist
├── skills/                   # Development skills
│   ├── patterns/             # Development patterns
│   ├── testing/              # Testing strategies
│   └── optimization/         # Performance tips
├── workflows/                # Development workflows
│   ├── development.md        # Development workflow
│   ├── review.md             # Review process
│   └── deployment.md         # Deployment workflow
└── README.md                 # Usage guide
```

## 🎨 Examples

### Basic Setup
```bash
npx ggai-nexus
```
Follow the interactive prompts to set up your development environment.

### Quick Windsurf Setup
```bash
npx ggai-nexus --quick --ide=windsurf --type=frontend
```
Instant setup for Windsurf with frontend focus.

### Portuguese Interface
```bash
npx ggai-nexus --language=pt-BR --tui
```
Beautiful TUI interface in Portuguese.

## 🔍 How It Works

1. **Analysis**: GGAI Nexus analyzes your project structure, dependencies, and frameworks
2. **Generation**: Creates personalized content based on your tech stack
3. **Integration**: Sets up the right directory structure for your IDE
4. **Optimization**: Generates agents, skills, and workflows tailored to your project

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details.

---

Made with ❤️ by GGAI Nexus
