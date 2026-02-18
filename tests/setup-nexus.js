/**
 * AIOS Nexus - Test Setup
 *
 * Global setup for Jest tests
 */

const path = require('path');
const fs = require('fs-extra');

const fixturesDir = path.join(__dirname, 'fixtures');

async function setupFixtures() {
  const dirs = [
    '.context-test',
    '.context-scaffold',
    '.context-sync',
    '.context-mcp',
    '.aios-core-test',
    '.aios-core-mcp',
    'cli-test',
  ];

  for (const dir of dirs) {
    const fullPath = path.join(fixturesDir, dir);
    await fs.ensureDir(fullPath);

    if (dir.startsWith('.context')) {
      await fs.ensureDir(path.join(fullPath, 'docs'));
      await fs.ensureDir(path.join(fullPath, 'agents'));
      await fs.ensureDir(path.join(fullPath, 'skills'));
      await fs.ensureDir(path.join(fullPath, 'plans'));
      await fs.ensureDir(path.join(fullPath, 'workflows'));
    }
  }
}

async function cleanupFixtures() {
  const dirs = [
    '.context-test',
    '.context-scaffold',
    '.context-sync',
    '.context-mcp',
    '.aios-core-test',
    '.aios-core-mcp',
    'cli-test',
  ];

  for (const dir of dirs) {
    const fullPath = path.join(fixturesDir, dir);
    await fs.remove(fullPath);
  }
}

module.exports = async () => {
  await setupFixtures();

  process.on('exit', async () => {
    await cleanupFixtures();
  });
};
