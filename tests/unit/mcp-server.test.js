/**
 * AIOS Nexus - MCP Server Tests
 *
 * Unit tests for MCP server components
 */

const path = require('path');
const fs = require('fs-extra');

describe('MCP Server', () => {
  const testContextRoot = path.join(__dirname, '../fixtures/.context-mcp');
  const testAIOSRoot = path.join(__dirname, '../fixtures/.aios-core-mcp');

  beforeAll(async () => {
    await fs.ensureDir(testContextRoot);
    await fs.ensureDir(path.join(testContextRoot, 'docs'));
    await fs.ensureDir(path.join(testContextRoot, 'agents'));
    await fs.ensureDir(testAIOSRoot);
  });

  afterAll(async () => {
    await fs.remove(testContextRoot);
    await fs.remove(testAIOSRoot);
  });

  describe('Module Loading', () => {
    it('should load MCP module without errors', () => {
      expect(() => require('../../src/services/mcp')).not.toThrow();
    });

    it('should export MCPServer class', () => {
      const mcp = require('../../src/services/mcp');
      expect(mcp.MCPServer).toBeDefined();
      expect(typeof mcp.MCPServer).toBe('function');
    });

    it('should export registerTools function', () => {
      const mcp = require('../../src/services/mcp');
      expect(mcp.registerTools).toBeDefined();
      expect(typeof mcp.registerTools).toBe('function');
    });

    it('should export registerResources function', () => {
      const mcp = require('../../src/services/mcp');
      expect(mcp.registerResources).toBeDefined();
      expect(typeof mcp.registerResources).toBe('function');
    });

    it('should export registerPrompts function', () => {
      const mcp = require('../../src/services/mcp');
      expect(mcp.registerPrompts).toBeDefined();
      expect(typeof mcp.registerPrompts).toBe('function');
    });
  });

  describe('Server Creation', () => {
    it('should create MCPServer instance', () => {
      const { MCPServer } = require('../../src/services/mcp');
      const server = new MCPServer({
        contextRoot: testContextRoot,
        aiosRoot: testAIOSRoot,
      });

      expect(server).toBeDefined();
      expect(server.config).toBeDefined();
      expect(server.config.name).toBe('aios-nexus');
      expect(server.config.version).toBe('5.0.0');
    });

    it('should accept custom configuration', () => {
      const { MCPServer } = require('../../src/services/mcp');
      const server = new MCPServer({
        name: 'custom-server',
        version: '1.0.0',
        contextRoot: testContextRoot,
        aiosRoot: testAIOSRoot,
      });

      expect(server.config.name).toBe('custom-server');
      expect(server.config.version).toBe('1.0.0');
    });
  });

  describe('Server Status', () => {
    it('should return status object', () => {
      const { MCPServer } = require('../../src/services/mcp');
      const server = new MCPServer({
        contextRoot: testContextRoot,
        aiosRoot: testAIOSRoot,
      });

      const status = server.getStatus();

      expect(status).toBeDefined();
      expect(status.name).toBeDefined();
      expect(status.version).toBeDefined();
      expect(status.contextRoot).toBeDefined();
    });
  });
});
