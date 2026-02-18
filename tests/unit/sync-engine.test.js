/**
 * AIOS Nexus - Sync Engine Tests
 *
 * Unit tests for multi-IDE sync system
 */

const path = require('path');
const fs = require('fs-extra');
const { SyncEngine } = require('../../src/services/sync');

describe('SyncEngine', () => {
  let syncEngine;
  const testContextRoot = path.join(__dirname, '../fixtures/.context-sync');

  beforeAll(async () => {
    await fs.ensureDir(testContextRoot);
    await fs.ensureDir(path.join(testContextRoot, 'docs'));
    await fs.ensureDir(path.join(testContextRoot, 'agents'));
    await fs.ensureDir(path.join(testContextRoot, 'skills'));
    await fs.ensureDir(path.join(testContextRoot, 'plans'));
    await fs.ensureDir(path.join(testContextRoot, 'workflows'));

    syncEngine = new SyncEngine({ contextRoot: testContextRoot });
  });

  afterAll(async () => {
    await fs.remove(testContextRoot);
  });

  describe('sync()', () => {
    it('should sync to all IDEs in dry-run mode', async () => {
      const result = await syncEngine.sync({
        ide: 'all',
        dryRun: true,
      });

      expect(result).toBeDefined();
      expect(result.synced).toBeGreaterThanOrEqual(0);
      expect(result.skipped).toBeGreaterThanOrEqual(0);
    });

    it('should sync to specific IDE', async () => {
      const result = await syncEngine.sync({
        ide: 'claude',
        dryRun: true,
      });

      expect(result).toBeDefined();
    });

    it('should handle missing context directory', async () => {
      const engine = new SyncEngine({
        contextRoot: '/nonexistent/path',
      });

      const result = await engine.sync({ ide: 'claude', dryRun: true });

      expect(result).toBeDefined();
    });
  });

  describe('validate()', () => {
    it('should validate sync status', async () => {
      const result = await syncEngine.validate();

      expect(result).toBeDefined();
      expect(result.valid).toBeDefined();
      expect(result.idesChecked).toBeDefined();
    });
  });

  describe('getIDEConfig()', () => {
    it('should return IDE config for Claude', () => {
      const config = syncEngine.getIDEConfig?.('claude');

      expect(config).toBeDefined();
    });
  });

  describe('getTargetPath()', () => {
    it('should return correct target path for IDE', () => {
      const targetPath = syncEngine.getTargetPath?.('claude');

      expect(targetPath).toBeDefined();
    });
  });
});
