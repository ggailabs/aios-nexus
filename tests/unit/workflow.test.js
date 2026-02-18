/**
 * AIOS Nexus - Workflow Engine Tests
 *
 * Unit tests for workflow components
 * Version: 5.0.0
 */

const { WorkflowEngine } = require('./engine');
const { PhaseSystem, PHASES, PHASE_SEQUENCES } = require('./phases');
const { ScaleRouter, SCALE_CONFIG } = require('./scale-router');
const { WorkflowState } = require('./state');
const { QualityGates } = require('./quality-gates');

// Mock console.log for cleaner test output
const originalLog = console.log;
beforeEach(() => {
  console.log = jest.fn();
});
afterEach(() => {
  console.log = originalLog;
});

describe('PhaseSystem', () => {
  let phaseSystem;

  beforeEach(() => {
    phaseSystem = new PhaseSystem();
  });

  test('should have all PREVC phases defined', () => {
    expect(PHASES.P).toBeDefined();
    expect(PHASES.R).toBeDefined();
    expect(PHASES.E).toBeDefined();
    expect(PHASES.V).toBeDefined();
    expect(PHASES.C).toBeDefined();
  });

  test('should return correct phase info', () => {
    const planPhase = phaseSystem.getPhaseInfo('P');
    expect(planPhase.name).toBe('Plan');
    expect(planPhase.agents).toContain('pm');
  });

  test('should return correct sequence for scale', () => {
    const quickSequence = phaseSystem.getSequence('QUICK');
    expect(quickSequence).toHaveLength(2);
    expect(quickSequence[0].id).toBe('E');
    expect(quickSequence[1].id).toBe('V');
  });

  test('should return correct next phase', () => {
    const nextPhase = phaseSystem.getNextPhase('P', 'MEDIUM');
    expect(nextPhase.id).toBe('R');
  });

  test('should return null for last phase', () => {
    const nextPhase = phaseSystem.getNextPhase('V', 'QUICK');
    expect(nextPhase).toBeNull();
  });

  test('should calculate correct progress', () => {
    const progress = phaseSystem.getProgress('R', 'MEDIUM');
    expect(progress.current).toBe(2);
    expect(progress.total).toBe(4);
    expect(progress.percentage).toBe(50);
  });
});

describe('ScaleRouter', () => {
  let scaleRouter;

  beforeEach(() => {
    scaleRouter = new ScaleRouter();
  });

  test('should return explicit scale when provided', () => {
    const scale = scaleRouter.detectScale({ scale: 'LARGE' });
    expect(scale).toBe('LARGE');
  });

  test('should detect QUICK from description', () => {
    const scale = scaleRouter.detectScale({ description: 'fix typo in readme' });
    expect(scale).toBe('QUICK');
  });

  test('should detect LARGE from description', () => {
    const scale = scaleRouter.detectScale({ description: 'redesign the authentication system' });
    expect(scale).toBe('LARGE');
  });

  test('should return default MEDIUM for unknown', () => {
    const scale = scaleRouter.detectScale({});
    expect(scale).toBe('MEDIUM');
  });

  test('should return correct phases for scale', () => {
    const phases = scaleRouter.getPhases('SMALL');
    expect(phases).toEqual(['P', 'E', 'V']);
  });

  test('should estimate time correctly', () => {
    expect(scaleRouter.estimateTime('QUICK')).toBe(5);
    expect(scaleRouter.estimateTime('LARGE')).toBe(60);
  });
});

describe('QualityGates', () => {
  let qualityGates;

  beforeEach(() => {
    qualityGates = new QualityGates();
  });

  test('should have gates for all phases', () => {
    expect(qualityGates.getPhaseChecks('P')).toBeDefined();
    expect(qualityGates.getPhaseChecks('R')).toBeDefined();
    expect(qualityGates.getPhaseChecks('E')).toBeDefined();
    expect(qualityGates.getPhaseChecks('V')).toBeDefined();
    expect(qualityGates.getPhaseChecks('C')).toBeDefined();
  });

  test('should run phase checks', async () => {
    const results = await qualityGates.runPhaseChecks('P');
    expect(results.phase).toBe('P');
    expect(results.checks).toBeDefined();
    expect(typeof results.passed).toBe('boolean');
  });

  test('should allow adding custom checks', () => {
    qualityGates.addCheck('P', {
      name: 'custom-check',
      description: 'A custom check',
      severity: 'WARN',
      check: async () => ({ passed: true, message: 'OK' }),
    });

    const checks = qualityGates.getPhaseChecks('P');
    const customCheck = checks.find((c) => c.name === 'custom-check');
    expect(customCheck).toBeDefined();
  });
});

describe('WorkflowState', () => {
  let workflowState;
  const testStateFile = '/tmp/test-workflow-state.json';

  beforeEach(() => {
    workflowState = new WorkflowState(testStateFile);
  });

  afterEach(async () => {
    // Clean up test file
    const fs = require('fs-extra');
    await fs.remove(testStateFile);
  });

  test('should save and load workflow', async () => {
    const workflow = {
      id: 'test-workflow',
      name: 'Test',
      status: 'running',
    };

    await workflowState.save(workflow);
    const loaded = await workflowState.loadById('test-workflow');

    expect(loaded).toBeDefined();
    expect(loaded.name).toBe('Test');
  });

  test('should return null for non-existent workflow', async () => {
    const loaded = await workflowState.loadById('non-existent');
    expect(loaded).toBeNull();
  });

  test('should delete workflow', async () => {
    const workflow = {
      id: 'to-delete',
      name: 'Delete Me',
      status: 'completed',
    };

    await workflowState.save(workflow);
    await workflowState.delete('to-delete');
    const loaded = await workflowState.loadById('to-delete');

    expect(loaded).toBeNull();
  });
});

describe('WorkflowEngine', () => {
  let engine;
  const testStateFile = '/tmp/test-engine-state.json';

  beforeEach(() => {
    engine = new WorkflowEngine({ stateFile: testStateFile });
  });

  afterEach(async () => {
    const fs = require('fs-extra');
    await fs.remove(testStateFile);
  });

  test('should start a workflow', async () => {
    const workflow = await engine.start('Test Workflow', { scale: 'SMALL' });

    expect(workflow).toBeDefined();
    expect(workflow.name).toBe('Test Workflow');
    expect(workflow.scale).toBe('SMALL');
    expect(workflow.status).toBe('running');
  });

  test('should advance workflow', async () => {
    await engine.start('Test', { scale: 'QUICK' });
    const result = await engine.advance();

    expect(result.advanced).toBe(true);
    expect(result.phase).toBe('V');
  });

  test('should complete workflow', async () => {
    await engine.start('Test', { scale: 'QUICK' });
    await engine.advance();
    const result = await engine.complete();

    expect(result.completed).toBe(true);
  });

  test('should track artifacts', async () => {
    await engine.start('Test', { scale: 'SMALL' });

    const artifact = await engine.addArtifact({
      type: 'document',
      path: '/docs/spec.md',
    });

    expect(artifact).toBeDefined();
    expect(artifact.type).toBe('document');
  });

  test('should track decisions', async () => {
    await engine.start('Test', { scale: 'SMALL' });

    const decision = await engine.recordDecision({
      title: 'Use PostgreSQL',
      rationale: 'Better for complex queries',
    });

    expect(decision).toBeDefined();
    expect(decision.title).toBe('Use PostgreSQL');
  });
});
