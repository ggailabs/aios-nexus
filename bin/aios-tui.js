#!/usr/bin/env node

/**
 * AIOS Nexus - TUI Entry Point
 *
 * Terminal User Interface for AIOS Nexus
 * Version: 5.0.0
 *
 * Author: Guilherme Giorgi
 * Organization: Genesis Grid AI Labs
 * Website: https://genesisgrid.ai
 */

const { startTUI } = require('../src/cli/tui');

startTUI().catch((error) => {
  console.error('TUI Error:', error.message);
  process.exit(1);
});
