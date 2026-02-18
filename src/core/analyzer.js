/**
 * AIOS Nexus - Codebase Analyzer
 *
 * Deep analysis of codebase structure and patterns
 * Version: 5.0.0
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');

class CodebaseAnalyzer {
  constructor(config = {}) {
    this.config = {
      root: config.root || process.cwd(),
      ignorePatterns: config.ignorePatterns || [
        'node_modules/**',
        'dist/**',
        'build/**',
        '.next/**',
        'coverage/**',
        '.git/**',
        '**/*.min.js',
        '**/*.d.ts',
      ],
      ...config,
    };
  }

  /**
   * Full codebase analysis
   */
  async analyze() {
    const [structure, symbols, patterns, dependencies] = await Promise.all([
      this.analyzeStructure(),
      this.analyzeSymbols(),
      this.detectPatterns(),
      this.analyzeDependencies(),
    ]);

    return {
      structure,
      symbols,
      patterns,
      dependencies,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Quick structure analysis
   */
  async quickStructure() {
    const directories = await this.getTopDirectories();
    const type = this.inferProjectType(directories);

    return {
      type,
      directories: directories.slice(0, 10),
      files: await this.countFiles(),
    };
  }

  /**
   * Analyze project structure
   */
  async analyzeStructure() {
    const [directories, files, entryPoints] = await Promise.all([
      this.getAllDirectories(),
      this.getAllFiles(),
      this.findEntryPoints(),
    ]);

    const type = this.inferProjectType(directories);
    const architecture = this.inferArchitecture(directories, files);

    return {
      type,
      architecture,
      directories,
      files: files.slice(0, 100), // Limit for memory
      totalFiles: files.length,
      entryPoints,
      hasTests: files.some((f) => f.includes('test') || f.includes('spec')),
      hasDocs: directories.some((d) => d === 'docs'),
      hasConfig: files.some((f) => f.includes('config')),
    };
  }

  /**
   * Analyze symbols (functions, classes, etc)
   */
  async analyzeSymbols() {
    const sourceFiles = await glob('**/*.{ts,tsx,js,jsx}', {
      cwd: this.config.root,
      ignore: this.config.ignorePatterns,
      onlyFiles: true,
      suppressErrors: true,
    });

    const symbols = {
      files: sourceFiles.length,
      classes: [],
      functions: [],
      interfaces: [],
      types: [],
      exports: [],
    };

    // Sample first 20 files for analysis
    const sampleFiles = sourceFiles.slice(0, 20);

    for (const file of sampleFiles) {
      try {
        const content = await fs.readFile(path.join(this.config.root, file), 'utf-8');
        const fileSymbols = this.extractSymbols(content, file);

        symbols.classes.push(...fileSymbols.classes);
        symbols.functions.push(...fileSymbols.functions);
        symbols.interfaces.push(...fileSymbols.interfaces);
        symbols.types.push(...fileSymbols.types);
        symbols.exports.push(...fileSymbols.exports);
      } catch {
        // Skip files that can't be read
      }
    }

    return symbols;
  }

  /**
   * Extract symbols from file content
   */
  extractSymbols(content, filePath) {
    const symbols = {
      classes: [],
      functions: [],
      interfaces: [],
      types: [],
      exports: [],
    };

    // Extract classes
    const classMatches = content.matchAll(/class\s+(\w+)/g);
    for (const match of classMatches) {
      symbols.classes.push({ name: match[1], file: filePath });
    }

    // Extract functions
    const funcMatches = content.matchAll(
      /(?:function\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\()/g
    );
    for (const match of funcMatches) {
      const name = match[1] || match[2];
      if (name && !name.startsWith('_')) {
        symbols.functions.push({ name, file: filePath });
      }
    }

    // Extract interfaces
    const interfaceMatches = content.matchAll(/interface\s+(\w+)/g);
    for (const match of interfaceMatches) {
      symbols.interfaces.push({ name: match[1], file: filePath });
    }

    // Extract types
    const typeMatches = content.matchAll(/type\s+(\w+)/g);
    for (const match of typeMatches) {
      symbols.types.push({ name: match[1], file: filePath });
    }

    // Extract exports
    const exportMatches = content.matchAll(
      /export\s+(?:default\s+)?(?:class|function|const|let|var)?\s*(\w+)/g
    );
    for (const match of exportMatches) {
      symbols.exports.push({ name: match[1], file: filePath });
    }

    return symbols;
  }

  /**
   * Detect code patterns
   */
  async detectPatterns() {
    const patterns = [];

    // Check for common patterns
    const checks = [
      { name: 'MVC', files: ['models', 'views', 'controllers'] },
      { name: 'Layered', files: ['services', 'repositories', 'controllers'] },
      { name: 'Feature-based', files: ['features', 'modules'] },
      { name: 'Domain-driven', files: ['domains', 'entities', 'aggregates'] },
      { name: 'Clean Architecture', files: ['usecases', 'entities', 'adapters'] },
      { name: 'Component-based', files: ['components'] },
      { name: 'Pages/Routes', files: ['pages', 'routes', 'app'] },
    ];

    const directories = await this.getAllDirectories();

    for (const check of checks) {
      const found = check.files.some((f) =>
        directories.some((d) => d.toLowerCase().includes(f.toLowerCase()))
      );
      if (found) {
        patterns.push(check.name);
      }
    }

    // Check for specific files that indicate patterns
    if ((await this.hasFile('middleware.ts')) || (await this.hasFile('middleware.js'))) {
      patterns.push('Middleware');
    }

    if ((await this.hasFile('graphql/')) || (await this.hasFile('schema.gql'))) {
      patterns.push('GraphQL');
    }

    if ((await this.hasFile('trpc/')) || (await this.hasDependency('trpc'))) {
      patterns.push('tRPC');
    }

    return patterns;
  }

  /**
   * Analyze dependencies
   */
  async analyzeDependencies() {
    try {
      const pkgPath = path.join(this.config.root, 'package.json');
      const pkg = await fs.readJson(pkgPath);

      return {
        production: Object.keys(pkg.dependencies || {}),
        development: Object.keys(pkg.devDependencies || {}),
        peer: Object.keys(pkg.peerDependencies || {}),
        total:
          Object.keys(pkg.dependencies || {}).length +
          Object.keys(pkg.devDependencies || {}).length,
      };
    } catch {
      return { production: [], development: [], peer: [], total: 0 };
    }
  }

  /**
   * Get all directories
   */
  async getAllDirectories() {
    const dirs = await glob('**/*/', {
      cwd: this.config.root,
      ignore: this.config.ignorePatterns,
      onlyDirectories: true,
      suppressErrors: true,
    });

    return dirs.map((d) => d.replace(/\/$/, '')).slice(0, 50);
  }

  /**
   * Get top-level directories
   */
  async getTopDirectories() {
    const entries = await fs.readdir(this.config.root, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory() && !e.name.startsWith('.')).map((e) => e.name);
  }

  /**
   * Get all files
   */
  async getAllFiles() {
    return await glob('**/*', {
      cwd: this.config.root,
      ignore: this.config.ignorePatterns,
      onlyFiles: true,
      suppressErrors: true,
    });
  }

  /**
   * Count files
   */
  async countFiles() {
    const files = await glob('**/*', {
      cwd: this.config.root,
      ignore: this.config.ignorePatterns,
      onlyFiles: true,
      suppressErrors: true,
    });

    return files.length;
  }

  /**
   * Find entry points
   */
  async findEntryPoints() {
    const entryPoints = [];

    const commonEntries = [
      'src/index.ts',
      'src/index.js',
      'src/main.ts',
      'src/main.js',
      'index.ts',
      'index.js',
      'main.ts',
      'main.js',
      'src/app.ts',
      'src/app.js',
      'app.ts',
      'app.js',
      'src/server.ts',
      'src/server.js',
      'server.ts',
      'server.js',
      'pages/index.tsx',
      'pages/index.js',
      'app/page.tsx',
      'app/page.js',
    ];

    for (const entry of commonEntries) {
      if (await fs.pathExists(path.join(this.config.root, entry))) {
        entryPoints.push(entry);
      }
    }

    return entryPoints;
  }

  /**
   * Infer project type
   */
  inferProjectType(directories) {
    const dirs = directories.map((d) => d.toLowerCase());

    if (dirs.some((d) => d.includes('pages') || d.includes('app'))) {
      return 'web-application';
    }

    if (dirs.some((d) => d.includes('api') || d.includes('routes'))) {
      return 'api';
    }

    if (dirs.some((d) => d.includes('components') && !dirs.some((d) => d.includes('pages')))) {
      return 'library';
    }

    if (dirs.some((d) => d.includes('cli') || d.includes('bin'))) {
      return 'cli-tool';
    }

    return 'application';
  }

  /**
   * Infer architecture
   */
  inferArchitecture(directories, files) {
    const patterns = [];

    // Check for monorepo
    if (directories.some((d) => d === 'packages')) {
      patterns.push('monorepo');
    }

    // Check for microservices
    if (directories.some((d) => d.includes('service') || d.includes('services'))) {
      patterns.push('microservices');
    }

    // Check for modular
    if (directories.some((d) => d === 'modules' || d === 'features')) {
      patterns.push('modular');
    }

    return patterns.length > 0 ? patterns.join('-') : 'standard';
  }

  /**
   * Check if file exists
   */
  async hasFile(filePath) {
    return fs.pathExists(path.join(this.config.root, filePath));
  }

  /**
   * Check if dependency exists
   */
  async hasDependency(name) {
    try {
      const pkgPath = path.join(this.config.root, 'package.json');
      const pkg = await fs.readJson(pkgPath);
      return !!(pkg.dependencies?.[name] || pkg.devDependencies?.[name]);
    } catch {
      return false;
    }
  }
}

module.exports = { CodebaseAnalyzer };
