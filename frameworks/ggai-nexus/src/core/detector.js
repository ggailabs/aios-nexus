const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

class IDEDetector {
  constructor() {
    this.ideConfigs = {
      windsurf: {
        dirs: ['.windsurf'],
        files: ['windsurf.config.json'],
        targetDir: '.windsurf'
      },
      cursor: {
        dirs: ['.cursor'],
        files: ['.cursorrules'],
        targetDir: '.cursor'
      },
      antigravity: {
        dirs: ['.agent', '.idx'],
        files: ['mcp.json', 'mcp_config.json'],
        targetDir: '.agent'
      },
      vscode: {
        dirs: ['.vscode'],
        files: ['settings.json', 'extensions.json'],
        targetDir: '.vscode'
      }
    };
  }

  async detectIDE(projectPath = process.cwd()) {
    const detectedIDEs = [];

    for (const [ideName, config] of Object.entries(this.ideConfigs)) {
      // Check for IDE-specific directories
      for (const dir of config.dirs) {
        const dirPath = path.join(projectPath, dir);
        if (await fs.pathExists(dirPath)) {
          detectedIDEs.push(ideName);
          break;
        }
      }

      // Check for IDE-specific files
      for (const file of config.files) {
        const filePath = path.join(projectPath, file);
        if (await fs.pathExists(filePath)) {
          if (!detectedIDEs.includes(ideName)) {
            detectedIDEs.push(ideName);
          }
          break;
        }
      }
    }

    return detectedIDEs;
  }

  async analyzeProject(projectPath = process.cwd()) {
    const projectInfo = {
      path: projectPath,
      name: path.basename(projectPath),
      frameworks: [],
      dependencies: [],
      structure: [],
      fileTypes: {},
      packageJson: null,
      detectedIDEs: await this.detectIDE(projectPath)
    };

    // Read package.json if exists
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      try {
        const packageJson = await fs.readJson(packageJsonPath);
        projectInfo.packageJson = packageJson;
        
        // Extract dependencies
        const allDeps = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies
        };
        projectInfo.dependencies = Object.keys(allDeps);

        // Detect frameworks
        projectInfo.frameworks = this.detectFrameworks(allDeps);
      } catch (error) {
        console.warn('Could not read package.json:', error.message);
      }
    }

    // Analyze project structure
    const files = await glob('**/*', {
      cwd: projectPath,
      ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**']
    });

    // Analyze file types and structure
    for (const file of files) {
      const ext = path.extname(file);
      const dir = path.dirname(file);

      // Count file types
      projectInfo.fileTypes[ext] = (projectInfo.fileTypes[ext] || 0) + 1;

      // Detect important directories
      if (dir && !projectInfo.structure.includes(dir)) {
        projectInfo.structure.push(dir);
      }
    }

    // Sort and limit structure to most important directories
    projectInfo.structure = projectInfo.structure
      .filter(dir => !dir.includes('node_modules') && !dir.includes('.git'))
      .sort()
      .slice(0, 10);

    return projectInfo;
  }

  detectFrameworks(dependencies) {
    const frameworks = [];

    const frameworkMap = {
      // Frontend frameworks
      'react': 'React',
      'vue': 'Vue',
      'angular': 'Angular',
      'svelte': 'Svelte',
      'next': 'Next.js',
      'nuxt': 'Nuxt.js',
      
      // Backend frameworks
      'express': 'Express.js',
      'fastify': 'Fastify',
      'koa': 'Koa',
      'nest': 'NestJS',
      'django': 'Django',
      'flask': 'Flask',
      'rails': 'Ruby on Rails',
      
      // Database
      'prisma': 'Prisma',
      'mongoose': 'Mongoose',
      'sequelize': 'Sequelize',
      'typeorm': 'TypeORM',
      
      // Styling
      'tailwindcss': 'Tailwind CSS',
      'styled-components': 'Styled Components',
      'emotion': 'Emotion',
      'sass': 'Sass',
      
      // Testing
      'jest': 'Jest',
      'vitest': 'Vitest',
      'cypress': 'Cypress',
      'playwright': 'Playwright',
      
      // Build tools
      'webpack': 'Webpack',
      'vite': 'Vite',
      'rollup': 'Rollup',
      'parcel': 'Parcel',
      
      // TypeScript
      'typescript': 'TypeScript'
    };

    for (const [dep, framework] of Object.entries(frameworkMap)) {
      if (dependencies[dep] || Object.keys(dependencies).some(key => key.includes(dep))) {
        frameworks.push(framework);
      }
    }

    return frameworks;
  }

  getTargetDirectory(ide) {
    return this.ideConfigs[ide]?.targetDir || '.ggai-nexus';
  }

  getProjectType(projectInfo) {
    const { frameworks, fileTypes } = projectInfo;

    // Check for frontend indicators
    const frontendIndicators = [
      '.jsx', '.tsx', '.vue', '.svelte',
      'react', 'vue', 'angular', 'svelte'
    ];

    // Check for backend indicators
    const backendIndicators = [
      '.js', '.ts', '.py', '.rb', '.php', '.go', '.rs',
      'express', 'fastify', 'django', 'flask', 'rails'
    ];

    const hasFrontend = frameworks.some(f => 
      frontendIndicators.some(indicator => 
        f.toLowerCase().includes(indicator.toLowerCase())
      )
    ) || Object.keys(fileTypes).some(ext => 
      frontendIndicators.includes(ext)
    );

    const hasBackend = frameworks.some(f => 
      backendIndicators.some(indicator => 
        f.toLowerCase().includes(indicator.toLowerCase())
      )
    ) || Object.keys(fileTypes).some(ext => 
      backendIndicators.includes(ext)
    );

    if (hasFrontend && hasBackend) {
      return 'fullstack';
    } else if (hasFrontend) {
      return 'frontend';
    } else if (hasBackend) {
      return 'backend';
    } else {
      return 'docs';
    }
  }
}

module.exports = { IDEDetector };
