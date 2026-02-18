/**
 * AIOS Nexus - Scaffolder Tests
 *
 * Unit tests for AI scaffolding system
 */

const path = require('path');
const fs = require('fs-extra');
const { Scaffolder } = require('../../src/core/scaffolder');

describe('Scaffolder', () => {
  let scaffolder;
  const testContextRoot = path.join(__dirname, '../fixtures/.context-scaffold');
  const testAIOSRoot = path.join(__dirname, '../fixtures/.aios-core-test');

  beforeAll(async () => {
    await fs.ensureDir(testContextRoot);
    await fs.ensureDir(path.join(testContextRoot, 'docs'));
    await fs.ensureDir(path.join(testContextRoot, 'agents'));
    await fs.ensureDir(path.join(testContextRoot, 'skills'));
    await fs.ensureDir(path.join(testContextRoot, 'plans'));
    await fs.ensureDir(testAIOSRoot);

    scaffolder = new Scaffolder({
      contextRoot: testContextRoot,
      aiosRoot: testAIOSRoot,
    });
  });

  afterAll(async () => {
    await fs.remove(testContextRoot);
    await fs.remove(testAIOSRoot);
  });

  describe('analyze()', () => {
    it('should analyze project and return tech stack', async () => {
      const result = await scaffolder.analyze();

      expect(result).toBeDefined();
      expect(result.techStack).toBeDefined();
      expect(result.structure).toBeDefined();
    });
  });

  describe('fill()', () => {
    it('should return fill results', async () => {
      const result = await scaffolder.fill({ target: 'docs', limit: 5 });

      expect(result).toBeDefined();
      expect(result.processed).toBeGreaterThanOrEqual(0);
      expect(result.pending).toBeGreaterThanOrEqual(0);
    });
  });

  describe('listPending()', () => {
    it('should list pending files', async () => {
      const pending = await scaffolder.listPending('docs');

      expect(Array.isArray(pending)).toBe(true);
    });
  });

  describe('getMap()', () => {
    it('should return codebase map', async () => {
      const map = await scaffolder.getMap('all');

      expect(map).toBeDefined();
    });

    it('should return specific section', async () => {
      const stack = await scaffolder.getMap('stack');

      expect(stack).toBeDefined();
    });
  });

  describe('buildSemantic()', () => {
    it('should build semantic context', async () => {
      const result = await scaffolder.buildSemantic({
        contextType: 'documentation',
      });

      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
    });
  });

  describe('scaffoldPlan()', () => {
    it('should create a plan file', async () => {
      const result = await scaffolder.scaffoldPlan({
        planName: 'test-plan',
        title: 'Test Plan',
        summary: 'Test summary',
      });

      expect(result).toBeDefined();
      expect(result.name).toBe('test-plan');
      expect(result.path).toContain('test-plan.md');
    });
  });

  describe('orchestrateAgents()', () => {
    it('should recommend agents for a task', async () => {
      const agents = await scaffolder.orchestrateAgents({
        task: 'implement user authentication',
      });

      expect(Array.isArray(agents)).toBe(true);
      expect(agents.length).toBeGreaterThan(0);
    });

    it('should recommend security agent for security task', async () => {
      const agents = await scaffolder.orchestrateAgents({
        task: 'fix security vulnerability',
      });

      const hasSecurity = agents.some((a) => a.id === 'security');
      expect(hasSecurity).toBe(true);
    });

    it('should recommend qa agent for test task', async () => {
      const agents = await scaffolder.orchestrateAgents({
        task: 'write unit tests',
      });

      const hasQA = agents.some((a) => a.id === 'qa');
      expect(hasQA).toBe(true);
    });
  });
});
