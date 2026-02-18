const fs = require('fs-extra');
const path = require('path');
const { AIScaffolder } = require('./scaffolder');
const { IDEDetector } = require('./detector');

class ContentGenerator {
  constructor(config) {
    this.config = config;
    this.scaffolder = new AIScaffolder();
    this.detector = new IDEDetector();
  }

  async generate(projectInfo) {
    const targetDir = this.getTargetDirectory();
    const result = {
      targetDir,
      docsCount: 0,
      agentsCount: 0,
      skillsCount: 0,
      workflowsCount: 0,
      files: []
    };

    try {
      // Create target directory
      await fs.ensureDir(targetDir);

      // Generate content based on configuration
      if (this.config.useAI) {
        await this.generateAIContent(projectInfo, targetDir, result);
      } else {
        await this.generateGenericContent(targetDir, result);
      }

      // Generate README
      await this.generateReadme(targetDir, result);

      result.files = await this.getAllGeneratedFiles(targetDir);

    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }

    return result;
  }

  async generateAIContent(projectInfo, targetDir, result) {
    const { content } = await this.scaffolder.analyzeAndGenerate(projectInfo, this.config);

    // Generate documentation
    const docsDir = path.join(targetDir, 'docs');
    await fs.ensureDir(docsDir);
    
    for (const [docName, docContent] of Object.entries(content.docs)) {
      const filePath = path.join(docsDir, `${docName}.md`);
      await fs.writeFile(filePath, docContent);
      result.docsCount++;
    }

    // Generate agents
    const agentsDir = path.join(targetDir, 'agents');
    await fs.ensureDir(agentsDir);
    
    for (const [agentName, agentContent] of Object.entries(content.agents)) {
      const filePath = path.join(agentsDir, `${agentName}.md`);
      await fs.writeFile(filePath, agentContent);
      result.agentsCount++;
    }

    // Generate skills
    const skillsDir = path.join(targetDir, 'skills');
    await fs.ensureDir(skillsDir);
    
    for (const [skillName, skillContent] of Object.entries(content.skills)) {
      const skillSubDir = path.join(skillsDir, skillName);
      await fs.ensureDir(skillSubDir);
      
      // Create skill.md file
      const skillFilePath = path.join(skillSubDir, 'skill.md');
      await fs.writeFile(skillFilePath, skillContent);
      result.skillsCount++;
    }

    // Generate workflows
    const workflowsDir = path.join(targetDir, 'workflows');
    await fs.ensureDir(workflowsDir);
    
    for (const [workflowName, workflowContent] of Object.entries(content.workflows)) {
      const filePath = path.join(workflowsDir, `${workflowName}.md`);
      await fs.writeFile(filePath, workflowContent);
      result.workflowsCount++;
    }
  }

  async generateGenericContent(targetDir, result) {
    // Generate generic templates based on project type
    const projectType = this.config.projectType;

    // Create basic structure
    await fs.ensureDir(path.join(targetDir, 'docs'));
    await fs.ensureDir(path.join(targetDir, 'agents'));
    await fs.ensureDir(path.join(targetDir, 'skills'));
    await fs.ensureDir(path.join(targetDir, 'workflows'));

    // Generate generic documentation
    await this.generateGenericDocs(targetDir, result, projectType);
    
    // Generate generic agents
    await this.generateGenericAgents(targetDir, result, projectType);
    
    // Generate generic skills
    await this.generateGenericSkills(targetDir, result, projectType);
    
    // Generate generic workflows
    await this.generateGenericWorkflows(targetDir, result, projectType);
  }

  async generateGenericDocs(targetDir, result, projectType) {
    const docsDir = path.join(targetDir, 'docs');
    
    const architectureDoc = this.getGenericArchitectureDoc(projectType);
    await fs.writeFile(path.join(docsDir, 'architecture.md'), architectureDoc);
    result.docsCount++;

    const componentsDoc = this.getGenericComponentsDoc(projectType);
    await fs.writeFile(path.join(docsDir, 'components.md'), componentsDoc);
    result.docsCount++;
  }

  async generateGenericAgents(targetDir, result, projectType) {
    const agentsDir = path.join(targetDir, 'agents');
    
    const specialistAgent = this.getGenericSpecialistAgent(projectType);
    await fs.writeFile(path.join(agentsDir, 'specialist.md'), specialistAgent);
    result.agentsCount++;

    const reviewerAgent = this.getGenericReviewerAgent(projectType);
    await fs.writeFile(path.join(agentsDir, 'reviewer.md'), reviewerAgent);
    result.agentsCount++;

    const testerAgent = this.getGenericTesterAgent(projectType);
    await fs.writeFile(path.join(agentsDir, 'tester.md'), testerAgent);
    result.agentsCount++;
  }

  async generateGenericSkills(targetDir, result, projectType) {
    const skillsDir = path.join(targetDir, 'skills');
    
    const patternsSkill = this.getGenericPatternsSkill(projectType);
    const patternsDir = path.join(skillsDir, 'patterns');
    await fs.ensureDir(patternsDir);
    await fs.writeFile(path.join(patternsDir, 'skill.md'), patternsSkill);
    result.skillsCount++;

    const testingSkill = this.getGenericTestingSkill(projectType);
    const testingDir = path.join(skillsDir, 'testing');
    await fs.ensureDir(testingDir);
    await fs.writeFile(path.join(testingDir, 'skill.md'), testingSkill);
    result.skillsCount++;

    const optimizationSkill = this.getGenericOptimizationSkill(projectType);
    const optimizationDir = path.join(skillsDir, 'optimization');
    await fs.ensureDir(optimizationDir);
    await fs.writeFile(path.join(optimizationDir, 'skill.md'), optimizationSkill);
    result.skillsCount++;
  }

  async generateGenericWorkflows(targetDir, result, projectType) {
    const workflowsDir = path.join(targetDir, 'workflows');
    
    const developmentWorkflow = this.getGenericDevelopmentWorkflow(projectType);
    await fs.writeFile(path.join(workflowsDir, 'development.md'), developmentWorkflow);
    result.workflowsCount++;

    const reviewWorkflow = this.getGenericReviewWorkflow(projectType);
    await fs.writeFile(path.join(workflowsDir, 'review.md'), reviewWorkflow);
    result.workflowsCount++;
  }

  async generateReadme(targetDir, result) {
    const readmeContent = this.getReadmeContent(result);
    await fs.writeFile(path.join(targetDir, 'README.md'), readmeContent);
  }

  async getAllGeneratedFiles(targetDir) {
    const files = [];
    
    const walkDir = async (dir) => {
      const items = await fs.readdir(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
          await walkDir(fullPath);
        } else {
          files.push(path.relative(targetDir, fullPath));
        }
      }
    };
    
    await walkDir(targetDir);
    return files;
  }

  getTargetDirectory() {
    return this.detector.getTargetDirectory(this.config.ide);
  }

  // Generic template methods
  getGenericArchitectureDoc(projectType) {
    return `# Architecture Documentation

## Project Type
This is a ${projectType} project.

## Structure
The project follows standard ${projectType} architecture patterns.

## Guidelines
- Follow best practices for ${projectType} development
- Maintain clean and organized code structure
- Implement proper error handling
- Write comprehensive tests

## Next Steps
1. Review the existing codebase
2. Understand the current architecture
3. Follow established patterns
4. Contribute consistently with the project style
`;
  }

  getGenericComponentsDoc(projectType) {
    return `# Components Documentation

## Overview
This project uses component-based architecture patterns appropriate for ${projectType}.

## Component Structure
- Follow consistent naming conventions
- Implement proper separation of concerns
- Use appropriate design patterns

## Best Practices
- Keep components focused and reusable
- Implement proper prop validation
- Document component interfaces
- Test components thoroughly

## Guidelines
- Follow the established component patterns
- Maintain consistency across components
- Optimize for performance and maintainability
`;
  }

  getGenericSpecialistAgent(projectType) {
    return `# ${projectType} Specialist

You are a ${projectType} development specialist with expertise in building robust and scalable applications.

## Your Expertise
- ${projectType} best practices and patterns
- Architecture design and implementation
- Performance optimization
- Code quality and maintainability

## Guidelines
1. Follow established ${projectType} conventions
2. Implement scalable and maintainable solutions
3. Consider performance implications
4. Write clean, documented code
5. Test thoroughly

## Focus Areas
- Code quality and consistency
- Performance optimization
- Security best practices
- Proper error handling
- Comprehensive testing
`;
  }

  getGenericReviewerAgent(projectType) {
    return `# Code Review Agent

You are a code review specialist with expertise in ${projectType} development.

## Review Criteria
1. Code quality and readability
2. Performance implications
3. Security considerations
4. Testing coverage
5. Documentation completeness

## Review Process
- Check for adherence to coding standards
- Verify performance implications
- Ensure proper error handling
- Validate test coverage
- Check documentation quality

## Feedback Guidelines
- Provide constructive feedback
- Suggest specific improvements
- Explain reasoning for changes
- Prioritize critical issues
`;
  }

  getGenericTesterAgent(projectType) {
    return `# Testing Specialist

You are a testing specialist focused on ${projectType} applications.

## Testing Strategy
- Unit testing for individual components
- Integration testing for component interactions
- End-to-end testing for user workflows
- Performance testing for critical paths

## Testing Best Practices
- Write comprehensive test cases
- Test edge cases and error conditions
- Maintain test independence
- Use appropriate testing tools
- Keep tests updated with code changes

## Test Coverage
- Aim for high code coverage
- Focus on critical functionality
- Test error handling paths
- Validate user interactions
`;
  }

  getGenericPatternsSkill(projectType) {
    return `# ${projectType} Development Patterns

## Common Patterns
- Follow established architectural patterns
- Implement consistent coding standards
- Use appropriate design patterns
- Maintain separation of concerns

## Best Practices
- Write clean, readable code
- Implement proper error handling
- Use consistent naming conventions
- Document complex logic
- Optimize for performance

## Code Organization
- Group related functionality
- Use appropriate file structure
- Implement proper imports/exports
- Maintain consistent code style
`;
  }

  getGenericTestingSkill(projectType) {
    return `# ${projectType} Testing Patterns

## Testing Approach
- Test-driven development when appropriate
- Comprehensive unit testing
- Integration testing for components
- End-to-end testing for workflows

## Testing Tools
- Use appropriate testing frameworks
- Implement test automation
- Use mocking for external dependencies
- Monitor test coverage

## Testing Best Practices
- Write maintainable tests
- Test edge cases and errors
- Keep tests independent
- Update tests with code changes
`;
  }

  getGenericOptimizationSkill(projectType) {
    return `# ${projectType} Optimization Techniques

## Performance Optimization
- Identify and fix performance bottlenecks
- Optimize database queries
- Implement caching strategies
- Optimize asset loading

## Code Optimization
- Remove unused code
- Optimize algorithms
- Implement lazy loading
- Use appropriate data structures

## Monitoring and Analysis
- Monitor application performance
- Use profiling tools
- Analyze bundle sizes
- Track user experience metrics
`;
  }

  getGenericDevelopmentWorkflow(projectType) {
    return `# ${projectType} Development Workflow

## Phase 1: Planning
- Understand requirements thoroughly
- Plan architecture and design
- Identify potential challenges
- Define success criteria

## Phase 2: Implementation
- Follow established patterns
- Write clean, maintainable code
- Implement proper error handling
- Add appropriate logging

## Phase 3: Testing
- Write comprehensive tests
- Test edge cases
- Perform integration testing
- Validate performance

## Phase 4: Review
- Code review for quality
- Architecture review
- Security review
- Performance review

## Phase 5: Deployment
- Prepare for production
- Monitor deployment
- Validate functionality
- Document changes
`;
  }

  getGenericReviewWorkflow(projectType) {
    return `# ${projectType} Code Review Workflow

## Pre-Review
- Ensure code follows project standards
- Run all tests successfully
- Update documentation
- Self-review for obvious issues

## Review Process
- Check code quality and consistency
- Verify performance implications
- Assess security considerations
- Validate test coverage

## Post-Review
- Address all feedback
- Update documentation
- Re-test if necessary
- Merge when approved

## Review Guidelines
- Be constructive and specific
- Explain reasoning for changes
- Prioritize critical issues
- Suggest improvements
`;
  }

  getReadmeContent(result) {
    return `# GGAI Nexus Generated Content

This directory contains AI-generated development environment content optimized for your project.

## 📁 Structure

### 📝 Documentation (\`${result.docsCount} files\`)
- Architecture documentation
- Component guides
- Development patterns

### 🤖 Agents (\`${result.agentsCount} agents\`)
- Specialized development agents
- Code review agents
- Testing specialists

### ⚡ Skills (\`${result.skillsCount} skills\`)
- Development patterns
- Testing strategies
- Optimization techniques

### 🔄 Workflows (\`${result.workflowsCount} workflows\`)
- Development workflows
- Review processes
- Best practice guides

## 🚀 Getting Started

1. **Restart your IDE** to load the new configuration
2. **Explore the generated content** in each category
3. **Start using the agents and skills** in your development workflow
4. **Follow the workflows** for consistent development practices

## 💡 Tips

- The agents are specialized for your specific tech stack
- Skills provide on-demand expertise for common tasks
- Workflows ensure consistent development practices
- All content is generated based on your project's actual structure and dependencies

## 🔧 Customization

Feel free to modify any of the generated content to better suit your project's specific needs. The generated files serve as a solid foundation that you can build upon.

---

Generated by GGAI Nexus • Powered by AI analysis of your project
`;
  }
}

module.exports = { ContentGenerator };
