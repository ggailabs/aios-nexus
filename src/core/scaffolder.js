/**
 * AIOS Nexus - AI Scaffolder
 *
 * AI-powered scaffolding for context generation
 * Version: 5.0.0
 *
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 */

const EventEmitter = require('events');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');

const { TechStackDetector } = require('./detector');
const { CodebaseAnalyzer } = require('./analyzer');
const { ContentGenerator } = require('./generator');
const { LLMClientFactory } = require('../services/llm/factory');

class AIScaffolder extends EventEmitter {
  constructor(config = {}) {
    super();

    this.config = {
      root: config.root || process.cwd(),
      contextRoot: config.contextRoot || path.join(process.cwd(), '.context'),
      provider: config.provider || 'anthropic',
      model: config.model || 'claude-sonnet-4-20250514',
      maxTokens: config.maxTokens || 4096,
      ...config,
    };

    this.detector = new TechStackDetector(this.config);
    this.analyzer = new CodebaseAnalyzer(this.config);
    this.generator = null; // Lazy init with LLM
    this.llm = null; // Lazy init
  }

  /**
   * Initialize scaffolder with LLM
   */
  async initialize() {
    if (!this.llm) {
      this.llm = LLMClientFactory.create(this.config.provider, {
        model: this.config.model,
        maxTokens: this.config.maxTokens,
      });

      this.generator = new ContentGenerator({
        ...this.config,
        llm: this.llm,
      });
    }
  }

  /**
   * Analyze project and generate context
   */
  async analyzeAndGenerate(options = {}) {
    const spinner = ora('Analyzing project...').start();

    try {
      // Step 1: Detect tech stack
      spinner.text = 'Detecting tech stack...';
      const techStack = await this.detector.detect();
      this.emit('analysis:techstack', techStack);

      // Step 2: Analyze codebase structure
      spinner.text = 'Analyzing codebase structure...';
      const structure = await this.analyzer.analyzeStructure();
      this.emit('analysis:structure', structure);

      // Step 3: Analyze symbols and APIs
      spinner.text = 'Analyzing symbols and APIs...';
      const symbols = await this.analyzer.analyzeSymbols();
      this.emit('analysis:symbols', symbols);

      // Step 4: Analyze patterns
      spinner.text = 'Detecting patterns...';
      const patterns = await this.analyzer.detectPatterns();
      this.emit('analysis:patterns', patterns);

      spinner.succeed('Analysis complete');

      // Combine analysis
      const analysis = {
        techStack,
        structure,
        symbols,
        patterns,
        timestamp: new Date().toISOString(),
        projectRoot: this.config.root,
      };

      // Generate content if requested
      if (options.generate !== false) {
        return await this.generateContent(analysis, options);
      }

      return { analysis, generated: null };
    } catch (error) {
      spinner.fail('Analysis failed');
      throw error;
    }
  }

  /**
   * Generate context content from analysis
   */
  async generateContent(analysis, options = {}) {
    await this.initialize();

    const spinner = ora('Generating context content...').start();
    const generated = {};

    try {
      // Generate documentation
      if (options.docs !== false) {
        spinner.text = 'Generating documentation...';
        generated.docs = await this.generator.generateDocs(analysis);
        this.emit('generated:docs', generated.docs);
      }

      // Generate agent recommendations
      if (options.agents !== false) {
        spinner.text = 'Generating agent recommendations...';
        generated.agents = await this.generator.generateAgentRecommendations(analysis);
        this.emit('generated:agents', generated.agents);
      }

      // Generate skill recommendations
      if (options.skills !== false) {
        spinner.text = 'Generating skill recommendations...';
        generated.skills = await this.generator.generateSkillRecommendations(analysis);
        this.emit('generated:skills', generated.skills);
      }

      // Generate workflow recommendations
      if (options.workflows !== false) {
        spinner.text = 'Generating workflow recommendations...';
        generated.workflows = await this.generator.generateWorkflowRecommendations(analysis);
        this.emit('generated:workflows', generated.workflows);
      }

      spinner.succeed('Content generation complete');

      return { analysis, generated };
    } catch (error) {
      spinner.fail('Content generation failed');
      throw error;
    }
  }

  /**
   * Quick project analysis
   */
  async quickAnalysis() {
    const techStack = await this.detector.detect();
    const structure = await this.analyzer.quickStructure();

    return {
      techStack,
      structure,
      summary: this.generateSummary(techStack, structure),
    };
  }

  /**
   * Generate summary of project
   */
  generateSummary(techStack, structure) {
    const parts = [];

    if (techStack.frameworks.length > 0) {
      parts.push(`${techStack.frameworks[0]} project`);
    }

    if (techStack.languages.length > 0) {
      parts.push(`using ${techStack.languages.join(', ')}`);
    }

    if (structure.type) {
      parts.push(`(${structure.type} architecture)`);
    }

    return parts.join(' ') || 'Unknown project type';
  }

  /**
   * Fill specific context file
   */
  async fillFile(targetType, fileName, options = {}) {
    await this.initialize();

    const analysis = await this.quickAnalysis();
    const content = await this.generator.generateFile(targetType, fileName, analysis, options);

    return content;
  }

  /**
   * Preview generated content
   */
  async preview(options = {}) {
    const { analysis } = await this.analyzeAndGenerate({ generate: false, ...options });

    console.log(chalk.cyan.bold('\n📊 Project Analysis Preview'));
    console.log(chalk.gray('━'.repeat(40)));

    // Tech Stack
    console.log(chalk.white.bold('\n🔧 Tech Stack:'));
    if (analysis.techStack.frameworks.length > 0) {
      console.log(chalk.blue(`  Frameworks: ${analysis.techStack.frameworks.join(', ')}`));
    }
    if (analysis.techStack.languages.length > 0) {
      console.log(chalk.blue(`  Languages: ${analysis.techStack.languages.join(', ')}`));
    }
    if (analysis.techStack.databases.length > 0) {
      console.log(chalk.blue(`  Databases: ${analysis.techStack.databases.join(', ')}`));
    }

    // Structure
    console.log(chalk.white.bold('\n📁 Structure:'));
    console.log(chalk.blue(`  Type: ${analysis.structure.type}`));
    console.log(chalk.blue(`  Directories: ${analysis.structure.directories.length}`));
    console.log(chalk.blue(`  Files: ${analysis.structure.files.length}`));

    // Patterns
    console.log(chalk.white.bold('\n🎨 Patterns:'));
    analysis.patterns.forEach((p) => {
      console.log(chalk.blue(`  • ${p}`));
    });

    console.log(chalk.gray('\n━'.repeat(40)));
    console.log(chalk.gray('Run with --generate to create context files.'));

    return analysis;
  }

  /**
   * Write generated content to files
   */
  async writeContent(generated, options = {}) {
    const spinner = ora('Writing content to files...').start();
    const written = [];

    try {
      // Write docs
      if (generated.docs) {
        const docsPath = path.join(this.config.contextRoot, 'docs');
        await fs.ensureDir(docsPath);

        for (const [name, content] of Object.entries(generated.docs)) {
          const filePath = path.join(docsPath, `${name}.md`);
          await fs.writeFile(filePath, content);
          written.push(filePath);
        }
      }

      spinner.succeed(`Wrote ${written.length} files`);

      return written;
    } catch (error) {
      spinner.fail('Failed to write content');
      throw error;
    }
  }
}

module.exports = { AIScaffolder, Scaffolder: AIScaffolder };

class ScaffolderExtensions extends AIScaffolder {
  constructor(config = {}) {
    super(config);
    this._codebaseMap = null;
  }

  async analyze() {
    if (!this._analysisCache) {
      const techStack = await this.detector.detect();
      const structure = await this.analyzer.analyzeStructure();
      this._analysisCache = { techStack, structure };
    }
    return this._analysisCache;
  }

  async fill(options = {}) {
    const { target = 'docs', offset = 0, limit = 10 } = options;
    const analysis = await this.analyze();

    const targets = target === 'all' ? ['docs', 'agents', 'skills', 'plans'] : [target];
    const results = { processed: 0, pending: 0, files: [] };

    for (const t of targets) {
      const dirPath = path.join(this.config.contextRoot, t);
      await fs.ensureDir(dirPath);

      const files = await this.getPendingFiles(dirPath);
      const toProcess = files.slice(offset, offset + limit);

      for (const file of toProcess) {
        try {
          await this.fillSingle(path.join(dirPath, file));
          results.files.push(file);
          results.processed++;
        } catch (error) {
          console.error(`Failed to fill ${file}:`, error.message);
        }
      }

      results.pending += files.length - toProcess.length;
    }

    return results;
  }

  async fillSingle(filePath) {
    await this.initialize();
    const analysis = await this.analyze();

    const fileName = path.basename(filePath, '.md');
    const targetType = path.basename(path.dirname(filePath));

    const content = await this.generator.generateFile(targetType, fileName, analysis);
    await fs.writeFile(filePath, content);

    return { path: filePath, message: 'Content generated successfully' };
  }

  async listPending(target = 'all') {
    const targets = target === 'all' ? ['docs', 'agents', 'skills', 'plans'] : [target];
    const pending = [];

    for (const t of targets) {
      const dirPath = path.join(this.config.contextRoot, t);
      const files = await this.getPendingFiles(dirPath);
      pending.push(...files.map((f) => path.join(t, f)));
    }

    return pending;
  }

  async getPendingFiles(dirPath) {
    if (!(await fs.pathExists(dirPath))) {
      return [];
    }

    const files = await fs.readdir(dirPath);
    return files.filter((f) => f.endsWith('.md') && f !== 'README.md');
  }

  async getMap(section = 'all') {
    if (!this._codebaseMap) {
      const structure = await this.analyzer.analyzeStructure();
      const symbols = await this.analyzer.analyzeSymbols();
      const techStack = await this.detector.detect();

      this._codebaseMap = {
        stack: techStack,
        structure: structure,
        architecture: {
          type: structure.type,
          patterns: [],
        },
        symbols: symbols,
        publicAPI: [],
        dependencies: techStack.dependencies || [],
        stats: {
          files: structure.files?.length || 0,
          directories: structure.directories?.length || 0,
        },
      };
    }

    if (section === 'all') {
      return this._codebaseMap;
    }

    return this.getNestedValue(this._codebaseMap, section);
  }

  async buildSemantic(options = {}) {
    const { contextType = 'documentation', targetFile, options: opts = {} } = options;
    const map = await this.getMap();

    let summary = '';
    switch (contextType) {
      case 'documentation':
        summary = `Generated documentation context for ${map.stack.frameworks?.join(', ') || 'project'}`;
        break;
      case 'playbook':
        summary = `Generated developer playbook for ${map.structure.type} architecture`;
        break;
      case 'plan':
        summary = `Generated implementation plan context`;
        break;
      case 'compact':
        summary = `Compact context: ${map.stats.files} files, ${map.stats.directories} directories`;
        break;
    }

    return { summary, map, targetFile };
  }

  async scaffoldPlan(options = {}) {
    const { planName, title, summary, autoFill = false } = options;

    const plansDir = path.join(this.config.contextRoot, 'plans');
    await fs.ensureDir(plansDir);

    const planPath = path.join(plansDir, `${planName}.md`);

    let content = `# ${title || planName}\n\n`;
    content += `> Created: ${new Date().toISOString()}\n`;
    if (summary) {
      content += `> ${summary}\n\n`;
    }
    content += `## Overview\n\n[Describe the plan here]\n\n`;
    content += `## Tasks\n\n- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3\n`;

    await fs.writeFile(planPath, content);

    if (autoFill) {
      const analysis = await this.analyze();
      const enhanced = await this.generator.generateFile('plans', planName, analysis);
      await fs.writeFile(planPath, enhanced);
    }

    return { path: planPath, name: planName };
  }

  async orchestrateAgents(options = {}) {
    const { task, phase, role } = options;
    const analysis = await this.analyze();

    const agentRoles = {
      P: ['pm', 'analyst'],
      R: ['architect', 'security'],
      E: ['developer'],
      V: ['qa', 'reviewer'],
      C: ['devops', 'writer'],
    };

    const roleMapping = {
      planner: 'pm',
      designer: 'architect',
      architect: 'architect',
      developer: 'developer',
      qa: 'qa',
      reviewer: 'reviewer',
      documenter: 'writer',
    };

    let recommendedAgents = [];

    if (role) {
      recommendedAgents.push({
        id: roleMapping[role] || role,
        role: role,
      });
    }

    if (phase) {
      const phaseAgents = agentRoles[phase] || [];
      for (const agentId of phaseAgents) {
        if (!recommendedAgents.find((a) => a.id === agentId)) {
          recommendedAgents.push({
            id: agentId,
            role: phase,
          });
        }
      }
    }

    if (recommendedAgents.length === 0) {
      if (task.toLowerCase().includes('test')) {
        recommendedAgents.push({ id: 'qa', role: 'testing' });
      }
      if (task.toLowerCase().includes('deploy') || task.toLowerCase().includes('ci')) {
        recommendedAgents.push({ id: 'devops', role: 'deployment' });
      }
      if (task.toLowerCase().includes('security')) {
        recommendedAgents.push({ id: 'security', role: 'security' });
      }
      if (task.toLowerCase().includes('design') || task.toLowerCase().includes('architect')) {
        recommendedAgents.push({ id: 'architect', role: 'architecture' });
      }
      if (task.toLowerCase().includes('document')) {
        recommendedAgents.push({ id: 'writer', role: 'documentation' });
      }
      if (task.toLowerCase().includes('implement') || task.toLowerCase().includes('code')) {
        recommendedAgents.push({ id: 'developer', role: 'implementation' });
      }

      if (recommendedAgents.length === 0) {
        recommendedAgents.push({ id: 'developer', role: 'general' });
        recommendedAgents.push({ id: 'reviewer', role: 'review' });
      }
    }

    return recommendedAgents;
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((curr, key) => curr?.[key], obj);
  }
}

module.exports.Scaffolder = ScaffolderExtensions;
