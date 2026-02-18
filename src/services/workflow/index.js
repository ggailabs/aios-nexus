/**
 * AIOS Nexus - Workflow Module Index
 *
 * Exports all workflow components
 * Version: 5.0.0
 */

const { WorkflowEngine } = require('./engine');
const { PhaseSystem, PHASES, PHASE_SEQUENCES } = require('./phases');
const { ScaleRouter, SCALE_CONFIG } = require('./scale-router');
const { WorkflowState } = require('./state');
const { QualityGates, DEFAULT_GATES } = require('./quality-gates');

module.exports = {
  WorkflowEngine,
  PhaseSystem,
  ScaleRouter,
  WorkflowState,
  QualityGates,
  // Constants
  PHASES,
  PHASE_SEQUENCES,
  SCALE_CONFIG,
  DEFAULT_GATES,
};
