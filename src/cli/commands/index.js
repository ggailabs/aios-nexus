/**
 * AIOS Nexus - CLI Commands Index
 *
 * Exports all CLI command handlers
 * Version: 5.0.0
 */

const { workflowCommand } = require('./workflow');
const { contextCommand } = require('./context');
const { scaffoldCommand } = require('./scaffold');

module.exports = {
  workflowCommand,
  contextCommand,
  scaffoldCommand,
};
