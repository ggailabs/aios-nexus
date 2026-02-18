/**
 * AIOS Nexus - Sync Engine Tests
 *
 * Unit tests for sync components
 * Version: 5.0.0
 */

const fs = require('fs-extra');
const path = require('path');
const { SyncEngine } = require('./engine');
const { IDEAdapters } = require('./adapters');
const { ContentTransformer } = require('./transformer');
const { ParityValidator } = require('./validator');

// Mock fs-extra
jest.mock('fs-extra');

describe('IDEAdapters', () => {
  let adapters;

  beforeEach(() => {
    adapters = new IDEAdapters({ root: '/test/project' });
  });

  test('should have all adapters', () => {
    expect(adapters.get('claude')).toBeDefined();
    expect(adapters.get('cursor')).toBeDefined();
    expect(adapters.get('windsurf')).toBeDefined();
    expect(adapters.get('codex')).toBeDefined();
    expect(adapters.get('gemini')).toBeDefined();
    expect(adapters.get('copilot')).toBeDefined();
    expect(adapters.get('antigravity')).toBeDefined();
    expect(adapters.get('vscode')).toBeDefined();
  });

  test('should return adapter info', () => {
    const claude = adapters.get('claude');

    expect(claude.getId()).toBe('claude');
    expect(claude.getName()).toBe('Claude Code');
    expect(claude.getTargetRoot()).toContain('.claude');
  });

  test('should get all adapters', () => {
    const all = adapters.getAll();

    expect(all.length).toBe(8);
    expect(all[0]).toHaveProperty('id');
    expect(all[0]).toHaveProperty('name');
    expect(all[0]).toHaveProperty('enabled');
  });

  test('should enable/disable adapters', () => {
    const claude = adapters.get('claude');

    claude.setEnabled(false);
    expect(claude.isEnabled()).toBe(false);

    claude.setEnabled(true);
    expect(claude.isEnabled()).toBe(true);
  });
});

describe('ContentTransformer', () => {
  let transformer;

  beforeEach(() => {
    transformer = new ContentTransformer();
  });

  test('should transform for Claude', async () => {
    const content = {
      agents: { 'test-agent.md': '# Test Agent' },
      skills: { 'test-skill.md': '# Test Skill' },
    };

    const transformed = await transformer.transform(content, 'claude');

    expect(transformed).toBeDefined();
    expect(transformed['.claude/CLAUDE.md']).toBeDefined();
  });

  test('should transform for Codex', async () => {
    const content = {
      agents: { 'test-agent.md': '# Test Agent' },
    };

    const transformed = await transformer.transform(content, 'codex');

    expect(transformed['AGENTS.md']).toBeDefined();
    expect(transformed['.codex/agents/test-agent.md']).toBeDefined();
  });

  test('should throw for unknown target', async () => {
    await expect(transformer.transform({}, 'unknown')).rejects.toThrow('No transformer for target');
  });

  test('should generate CLAUDE.md', () => {
    const content = { agents: {}, skills: {}, workflows: {} };
    const claudeMd = transformer.generateClaudeMain(content);

    expect(claudeMd).toContain('CLAUDE.md');
    expect(claudeMd).toContain('PREVC');
  });

  test('should generate AGENTS.md', () => {
    const content = { agents: {}, skills: {}, workflows: {} };
    const agentsMd = transformer.generateCodexAgentsMd(content);

    expect(agentsMd).toContain('AGENTS.md');
    expect(agentsMd).toContain('.codex/agents');
  });
});

describe('ParityValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new ParityValidator();
    jest.clearAllMocks();
  });

  test('should fail if target does not exist', async () => {
    fs.pathExists.mockResolvedValue(false);

    const result = await validator.validate('claude', {
      contextRoot: '/test/.context',
      targetRoot: '/test/.claude',
    });

    expect(result.valid).toBe(false);
    expect(result.issues).toContain('Target directory does not exist');
  });

  test('should fail if source does not exist', async () => {
    fs.pathExists
      .mockResolvedValueOnce(true) // target exists
      .mockResolvedValueOnce(false); // source doesn't

    const result = await validator.validate('claude', {
      contextRoot: '/test/.context',
      targetRoot: '/test/.claude',
    });

    expect(result.valid).toBe(false);
    expect(result.issues).toContain('Source context directory does not exist');
  });

  test('should count files correctly', async () => {
    fs.pathExists.mockResolvedValue(true);
    fs.readdir.mockResolvedValue([
      { name: 'test.md', isDirectory: () => false, isFile: () => true },
    ]);

    const count = await validator.countFiles('/test');
    expect(count).toBe(1);
  });

  test('should get required files', () => {
    const claudeRequired = validator.getRequiredFiles('claude');
    expect(claudeRequired).toContain('CLAUDE.md');

    const codexRequired = validator.getRequiredFiles('codex');
    expect(codexRequired).toContain('AGENTS.md');
  });
});

describe('SyncEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new SyncEngine();
    jest.clearAllMocks();
  });

  test('should get available targets', () => {
    const targets = engine.getAvailableTargets();

    expect(targets).toContain('claude');
    expect(targets).toContain('cursor');
    expect(targets).toContain('codex');
  });

  test('should read source content', async () => {
    fs.pathExists.mockResolvedValue(true);
    fs.readdir.mockResolvedValue(['test.md']);
    fs.readFile.mockResolvedValue('# Test Content');

    const content = await engine.readSourceContent();

    expect(content).toHaveProperty('agents');
    expect(content).toHaveProperty('skills');
    expect(content).toHaveProperty('docs');
  });
});
