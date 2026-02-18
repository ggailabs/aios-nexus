/**
 * AIOS Nexus - Workflow Engine Tests
 *
 * Unit tests for PREVC workflow system
 */

const path = require('path');
const fs = require('fs-extra');
const { WorkflowEngine } = require('../../src/services/workflow');

describe('WorkflowEngine', () => {
  let engine;
  const testContextRoot = path.join(__dirname, '../fixtures/.context-test');

  beforeAll(async () => {
    await fs.ensureDir(testContextRoot);
    engine = new WorkflowEngine({ contextRoot: testContextRoot });
  });

  afterAll(async () => {
    await fs.remove(testContextRoot);
  });

  describe('start()', () => {
    it('should start a QUICK workflow with E→V phases', async () => {
      const workflow = await engine.start('test-quick', { scale: 'QUICK' });

      expect(workflow).toBeDefined();
      expect(workflow.name).toBe('test-quick');
      expect(workflow.scale).toBe('QUICK');
      expect(workflow.phases).toEqual(['E', 'V']);
      expect(workflow.currentPhase).toBe('E');
      expect(workflow.status).toBe('running');
    });

    it('should start a MEDIUM workflow with P→R→E→V phases', async () => {
      const workflow = await engine.start('test-medium', { scale: 'MEDIUM' });

      expect(workflow.phases).toEqual(['P', 'R', 'E', 'V']);
      expect(workflow.currentPhase).toBe('P');
    });

    it('should start a LARGE workflow with P→R→E→V→C phases', async () => {
      const workflow = await engine.start('test-large', { scale: 'LARGE' });

      expect(workflow.phases).toEqual(['P', 'R', 'E', 'V', 'C']);
    });

    it('should generate unique workflow IDs', async () => {
      const wf1 = await engine.start('test-1', { scale: 'SMALL' });
      engine.currentWorkflow = null;
      const wf2 = await engine.start('test-2', { scale: 'SMALL' });

      expect(wf1.id).not.toBe(wf2.id);
    });
  });

  describe('status()', () => {
    it('should return null when no workflow is active', async () => {
      engine.currentWorkflow = null;
      const status = await engine.status();

      expect(status).toBeNull();
    });

    it('should return workflow status when active', async () => {
      await engine.start('status-test', { scale: 'MEDIUM' });
      const status = await engine.status();

      expect(status).toBeDefined();
      expect(status.name).toBe('status-test');
      expect(status.progress).toBeGreaterThanOrEqual(0);
      expect(status.progress).toBeLessThanOrEqual(100);
    });
  });

  describe('advance()', () => {
    it('should advance to next phase', async () => {
      await engine.start('advance-test', { scale: 'SMALL' });
      const result = await engine.advance({ force: true });

      expect(result.advanced).toBe(true);
      expect(result.phase).toBe('E');
    });

    it('should complete workflow after last phase', async () => {
      await engine.start('complete-test', { scale: 'QUICK' });

      await engine.advance({ force: true });
      const result = await engine.advance({ force: true });

      expect(result.completed).toBe(true);
    });

    it('should throw error when no active workflow', async () => {
      engine.currentWorkflow = null;

      await expect(engine.advance()).rejects.toThrow('No active workflow');
    });
  });

  describe('cancel()', () => {
    it('should cancel active workflow', async () => {
      await engine.start('cancel-test', { scale: 'MEDIUM' });
      const result = await engine.cancel('Test cancellation');

      expect(result.cancelled).toBe(true);
      expect(result.workflow.status).toBe('cancelled');
      expect(result.workflow.cancelReason).toBe('Test cancellation');
    });
  });

  describe('recordDecision()', () => {
    it('should record a decision in the workflow', async () => {
      await engine.start('decision-test', { scale: 'MEDIUM' });

      const decision = await engine.recordDecision({
        title: 'Test Decision',
        description: 'Test description',
        alternatives: ['Option A', 'Option B'],
      });

      expect(decision.title).toBe('Test Decision');
      expect(decision.description).toBe('Test description');
      expect(decision.alternatives).toHaveLength(2);
    });
  });

  describe('addArtifact()', () => {
    it('should add an artifact to the workflow', async () => {
      await engine.start('artifact-test', { scale: 'MEDIUM' });

      const artifact = await engine.addArtifact({
        name: 'test-artifact',
        type: 'code',
        path: '/test/path.js',
      });

      expect(artifact.name).toBe('test-artifact');
      expect(artifact.type).toBe('code');
    });
  });

  describe('calculateProgress()', () => {
    it('should return 0 when no workflow', () => {
      engine.currentWorkflow = null;
      expect(engine.calculateProgress()).toBe(0);
    });

    it('should calculate correct progress', async () => {
      await engine.start('progress-test', { scale: 'SMALL' });

      expect(engine.calculateProgress()).toBe(33);

      await engine.advance({ force: true });
      expect(engine.calculateProgress()).toBe(67);

      await engine.advance({ force: true });
      expect(engine.calculateProgress()).toBe(100);
    });
  });
});
