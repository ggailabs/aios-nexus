/**
 * AIOS Nexus - CLI Integration Tests
 *
 * Integration tests for CLI commands
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const CLI_PATH = path.join(__dirname, '../../bin/aios-nexus.js');
const TEST_DIR = path.join(__dirname, '../fixtures/cli-test');

describe('CLI Integration', () => {
  beforeAll(async () => {
    await fs.ensureDir(TEST_DIR);
  });

  afterAll(async () => {
    await fs.remove(TEST_DIR);
  });

  describe('--help', () => {
    it('should display help message', () => {
      const output = execSync(`node ${CLI_PATH} --help`, { encoding: 'utf-8' });

      expect(output).toContain('aios-nexus');
      expect(output).toContain('init');
      expect(output).toContain('sync');
      expect(output).toContain('workflow');
      expect(output).toContain('agent');
    });
  });

  describe('--version', () => {
    it('should display version', () => {
      const output = execSync(`node ${CLI_PATH} --version`, { encoding: 'utf-8' });

      expect(output).toMatch(/\d+\.\d+\.\d+/);
    });
  });

  describe('agent list', () => {
    it('should list all agents', () => {
      const output = execSync(`node ${CLI_PATH} agent list`, { encoding: 'utf-8' });

      expect(output).toContain('Available Agents');
      expect(output).toContain('@architect');
      expect(output).toContain('@developer');
      expect(output).toContain('@qa');
    });
  });

  describe('workflow status', () => {
    it('should show no active workflow message', () => {
      const output = execSync(`node ${CLI_PATH} workflow status`, { encoding: 'utf-8' });

      expect(output).toContain('No active workflow');
    });
  });

  describe('validate', () => {
    it('should validate project', () => {
      const output = execSync(`node ${CLI_PATH} validate`, {
        encoding: 'utf-8',
        cwd: path.join(__dirname, '../..'),
      });

      expect(output).toContain('Validation Results');
    });
  });

  describe('sync --dry-run', () => {
    it('should preview sync without writing', () => {
      const output = execSync(`node ${CLI_PATH} sync --dry-run`, {
        encoding: 'utf-8',
        cwd: path.join(__dirname, '../..'),
      });

      expect(output).toContain('Syncing');
      expect(output).toContain('Dry run');
    });
  });
});
