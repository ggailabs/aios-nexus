/**
 * AIOS Nexus - Tech Stack Detector
 *
 * Automatic detection of technologies and frameworks
 * Version: 5.0.0
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');

// Framework detection patterns
const FRAMEWORK_PATTERNS = {
  // Frontend
  'next.js': {
    files: ['next.config.js', 'next.config.mjs', 'next.config.ts'],
    dependencies: ['next'],
    extensions: ['.next'],
  },
  react: {
    dependencies: ['react', 'react-dom'],
    files: ['react-app-env.d.ts'],
  },
  vue: {
    dependencies: ['vue'],
    files: ['vue.config.js', 'vite.config.js'],
  },
  nuxt: {
    dependencies: ['nuxt'],
    files: ['nuxt.config.js', 'nuxt.config.ts'],
  },
  angular: {
    files: ['angular.json'],
    dependencies: ['@angular/core'],
  },
  svelte: {
    dependencies: ['svelte'],
    files: ['svelte.config.js'],
  },
  remix: {
    dependencies: ['@remix-run/react'],
  },
  astro: {
    dependencies: ['astro'],
    files: ['astro.config.mjs'],
  },

  // Backend
  express: {
    dependencies: ['express'],
  },
  nestjs: {
    dependencies: ['@nestjs/core'],
  },
  fastify: {
    dependencies: ['fastify'],
  },
  hono: {
    dependencies: ['hono'],
  },
  koa: {
    dependencies: ['koa'],
  },

  // Full-stack
  't3-stack': {
    dependencies: ['next', 'trpc', 'prisma', 'tailwindcss'],
  },
  blitz: {
    dependencies: ['blitz'],
  },

  // Mobile
  'react-native': {
    dependencies: ['react-native'],
  },
  expo: {
    dependencies: ['expo'],
  },
  flutter: {
    files: ['pubspec.yaml'],
  },

  // Desktop
  electron: {
    dependencies: ['electron'],
  },
  tauri: {
    files: ['src-tauri/Cargo.toml'],
  },
};

// Language detection patterns
const LANGUAGE_PATTERNS = {
  typescript: {
    extensions: ['.ts', '.tsx'],
    configFiles: ['tsconfig.json'],
  },
  javascript: {
    extensions: ['.js', '.jsx', '.mjs', '.cjs'],
    configFiles: ['jsconfig.json'],
  },
  python: {
    extensions: ['.py'],
    configFiles: ['pyproject.toml', 'requirements.txt', 'setup.py'],
  },
  rust: {
    extensions: ['.rs'],
    configFiles: ['Cargo.toml'],
  },
  go: {
    extensions: ['.go'],
    configFiles: ['go.mod'],
  },
  java: {
    extensions: ['.java'],
    configFiles: ['pom.xml', 'build.gradle'],
  },
  csharp: {
    extensions: ['.cs'],
    configFiles: ['.csproj'],
  },
};

// Database detection patterns
const DATABASE_PATTERNS = {
  postgresql: {
    dependencies: ['pg', 'postgres', '@prisma/client', 'typeorm'],
    envVars: ['DATABASE_URL', 'POSTGRES_'],
  },
  mysql: {
    dependencies: ['mysql', 'mysql2'],
    envVars: ['MYSQL_'],
  },
  mongodb: {
    dependencies: ['mongoose', 'mongodb'],
    envVars: ['MONGO_', 'MONGODB_'],
  },
  redis: {
    dependencies: ['redis', 'ioredis'],
    envVars: ['REDIS_'],
  },
  sqlite: {
    dependencies: ['sqlite', 'better-sqlite3'],
    files: ['*.db', '*.sqlite'],
  },
  supabase: {
    dependencies: ['@supabase/supabase-js'],
    envVars: ['SUPABASE_'],
  },
  firebase: {
    dependencies: ['firebase', '@firebase/app'],
    files: ['firebase.json'],
  },
  prisma: {
    dependencies: ['prisma', '@prisma/client'],
    files: ['prisma/schema.prisma'],
  },
};

// Styling detection patterns
const STYLING_PATTERNS = {
  tailwindcss: {
    dependencies: ['tailwindcss'],
    files: ['tailwind.config.js', 'tailwind.config.ts'],
  },
  'styled-components': {
    dependencies: ['styled-components'],
  },
  emotion: {
    dependencies: ['@emotion/react', '@emotion/styled'],
  },
  'css-modules': {
    extensions: ['.module.css', '.module.scss'],
  },
  sass: {
    dependencies: ['sass', 'node-sass'],
    extensions: ['.scss', '.sass'],
  },
  less: {
    dependencies: ['less'],
    extensions: ['.less'],
  },
};

// Testing detection patterns
const TESTING_PATTERNS = {
  jest: {
    dependencies: ['jest'],
    configFiles: ['jest.config.js', 'jest.config.ts'],
  },
  vitest: {
    dependencies: ['vitest'],
    configFiles: ['vitest.config.js', 'vitest.config.ts'],
  },
  mocha: {
    dependencies: ['mocha'],
    configFiles: ['.mocharc.js'],
  },
  cypress: {
    dependencies: ['cypress'],
    files: ['cypress.config.js'],
  },
  playwright: {
    dependencies: ['@playwright/test'],
    files: ['playwright.config.ts'],
  },
  'testing-library': {
    dependencies: ['@testing-library/react', '@testing-library/vue'],
  },
};

class TechStackDetector {
  constructor(config = {}) {
    this.config = {
      root: config.root || process.cwd(),
      ...config,
    };

    this.packageJson = null;
    this.cache = {};
  }

  /**
   * Detect all tech stack components
   */
  async detect() {
    await this.loadPackageJson();

    const [frameworks, languages, databases, styling, testing, tools] = await Promise.all([
      this.detectFrameworks(),
      this.detectLanguages(),
      this.detectDatabases(),
      this.detectStyling(),
      this.detectTesting(),
      this.detectTools(),
    ]);

    return {
      frameworks,
      languages,
      databases,
      styling,
      testing,
      tools,
      packageManager: await this.detectPackageManager(),
      nodeVersion: await this.detectNodeVersion(),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Load package.json
   */
  async loadPackageJson() {
    if (this.packageJson) return this.packageJson;

    try {
      const pkgPath = path.join(this.config.root, 'package.json');
      this.packageJson = await fs.readJson(pkgPath);
      return this.packageJson;
    } catch {
      this.packageJson = {};
      return this.packageJson;
    }
  }

  /**
   * Detect frameworks
   */
  async detectFrameworks() {
    const detected = [];

    for (const [name, pattern] of Object.entries(FRAMEWORK_PATTERNS)) {
      if (await this.matchPattern(pattern)) {
        detected.push(name);
      }
    }

    return detected;
  }

  /**
   * Detect languages
   */
  async detectLanguages() {
    const detected = [];

    for (const [name, pattern] of Object.entries(LANGUAGE_PATTERNS)) {
      const hasConfig = await this.hasFiles(pattern.configFiles);
      const hasExtensions = await this.hasExtensions(pattern.extensions);

      if (hasConfig || hasExtensions) {
        detected.push(name);
      }
    }

    return detected;
  }

  /**
   * Detect databases
   */
  async detectDatabases() {
    const detected = [];

    for (const [name, pattern] of Object.entries(DATABASE_PATTERNS)) {
      if (await this.matchPattern(pattern)) {
        detected.push(name);
      }
    }

    return detected;
  }

  /**
   * Detect styling
   */
  async detectStyling() {
    const detected = [];

    for (const [name, pattern] of Object.entries(STYLING_PATTERNS)) {
      if (await this.matchPattern(pattern)) {
        detected.push(name);
      }
    }

    return detected;
  }

  /**
   * Detect testing frameworks
   */
  async detectTesting() {
    const detected = [];

    for (const [name, pattern] of Object.entries(TESTING_PATTERNS)) {
      if (await this.matchPattern(pattern)) {
        detected.push(name);
      }
    }

    return detected;
  }

  /**
   * Detect development tools
   */
  async detectTools() {
    const tools = [];
    const pkg = this.packageJson || {};

    // Build tools
    if (this.hasDependency('vite')) tools.push('vite');
    if (this.hasDependency('webpack')) tools.push('webpack');
    if (this.hasDependency('esbuild')) tools.push('esbuild');
    if (this.hasDependency('rollup')) tools.push('rollup');
    if (this.hasDependency('turbo')) tools.push('turbo');

    // Linting
    if (this.hasDependency('eslint')) tools.push('eslint');
    if (this.hasDependency('prettier')) tools.push('prettier');

    // Type checking
    if (this.hasDependency('typescript')) tools.push('typescript');

    // CI/CD
    if (await fs.pathExists(path.join(this.config.root, '.github/workflows'))) {
      tools.push('github-actions');
    }

    // Containers
    if (await fs.pathExists(path.join(this.config.root, 'Dockerfile'))) {
      tools.push('docker');
    }

    return tools;
  }

  /**
   * Detect package manager
   */
  async detectPackageManager() {
    const root = this.config.root;

    if (await fs.pathExists(path.join(root, 'pnpm-lock.yaml'))) return 'pnpm';
    if (await fs.pathExists(path.join(root, 'yarn.lock'))) return 'yarn';
    if (await fs.pathExists(path.join(root, 'package-lock.json'))) return 'npm';
    if (await fs.pathExists(path.join(root, 'bun.lockb'))) return 'bun';

    return 'npm';
  }

  /**
   * Detect Node version
   */
  async detectNodeVersion() {
    try {
      const engines = this.packageJson?.engines?.node;
      if (engines) return engines;

      const nvmrcPath = path.join(this.config.root, '.nvmrc');
      if (await fs.pathExists(nvmrcPath)) {
        return (await fs.readFile(nvmrcPath, 'utf-8')).trim();
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Check if pattern matches
   */
  async matchPattern(pattern) {
    // Check dependencies
    if (pattern.dependencies) {
      for (const dep of pattern.dependencies) {
        if (this.hasDependency(dep)) return true;
      }
    }

    // Check files
    if (pattern.files) {
      if (await this.hasFiles(pattern.files)) return true;
    }

    // Check extensions
    if (pattern.extensions) {
      if (await this.hasExtensions(pattern.extensions)) return true;
    }

    // Check env vars
    if (pattern.envVars) {
      for (const envVar of pattern.envVars) {
        if (this.hasEnvVar(envVar)) return true;
      }
    }

    return false;
  }

  /**
   * Check if dependency exists
   */
  hasDependency(name) {
    const pkg = this.packageJson || {};
    return (
      (pkg.dependencies && pkg.dependencies[name]) ||
      (pkg.devDependencies && pkg.devDependencies[name]) ||
      (pkg.peerDependencies && pkg.peerDependencies[name])
    );
  }

  /**
   * Check if files exist
   */
  async hasFiles(files) {
    for (const file of files) {
      const filePath = path.join(this.config.root, file);
      if (await fs.pathExists(filePath)) return true;
    }
    return false;
  }

  /**
   * Check if extensions exist in project
   */
  async hasExtensions(extensions) {
    for (const ext of extensions) {
      const files = await glob(`**/*${ext}`, {
        cwd: this.config.root,
        ignore: ['node_modules/**', 'dist/**', 'build/**', '.next/**'],
        onlyFiles: true,
        suppressErrors: true,
      });

      if (files.length > 0) return true;
    }
    return false;
  }

  /**
   * Check if env var exists
   */
  hasEnvVar(prefix) {
    for (const key of Object.keys(process.env)) {
      if (key.startsWith(prefix)) return true;
    }
    return false;
  }
}

module.exports = { TechStackDetector, FRAMEWORK_PATTERNS, LANGUAGE_PATTERNS, DATABASE_PATTERNS };
