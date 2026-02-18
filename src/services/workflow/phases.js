/**
 * AIOS Nexus - Phase System
 *
 * PREVC Phases: Plan, Review, Execute, Validate, Confirm
 * Version: 5.0.0
 */

const PHASES = {
  P: {
    id: 'P',
    name: 'Plan',
    description: 'Define what to build. Gather requirements, write specs, identify scope.',
    agents: ['orchestrator', 'pm', 'po', 'sm', 'analyst'],
    outputs: ['PRD', 'Specifications', 'Stories', 'Epic breakdown'],
    color: 'blue',
    icon: '📋',
  },
  R: {
    id: 'R',
    name: 'Review',
    description:
      'Validate the approach. Architecture decisions, technical design, risk assessment.',
    agents: ['architect', 'security', 'reviewer', 'optimizer'],
    outputs: ['Architecture Doc', 'ADR', 'Security Review', 'Performance Plan'],
    color: 'yellow',
    icon: '🔍',
  },
  E: {
    id: 'E',
    name: 'Execute',
    description: 'Build it. Implementation follows the approved specs and design.',
    agents: ['developer', 'data-engineer', 'mobile'],
    outputs: ['Code', 'Tests', 'Migrations', 'Documentation'],
    color: 'green',
    icon: '💻',
  },
  V: {
    id: 'V',
    name: 'Validate',
    description: 'Verify it works. Tests, QA, code review against original specs.',
    agents: ['qa', 'reviewer', 'security', 'optimizer'],
    outputs: ['QA Report', 'Coverage Report', 'Benchmarks', 'Security Scan'],
    color: 'magenta',
    icon: '✅',
  },
  C: {
    id: 'C',
    name: 'Confirm',
    description: 'Ship it. Documentation, deployment, stakeholder handoff.',
    agents: ['devops', 'writer'],
    outputs: ['Release', 'Changelog', 'Deployed App', 'Updated Docs'],
    color: 'cyan',
    icon: '🚀',
  },
};

const PHASE_SEQUENCES = {
  QUICK: ['E', 'V'],
  SMALL: ['P', 'E', 'V'],
  MEDIUM: ['P', 'R', 'E', 'V'],
  LARGE: ['P', 'R', 'E', 'V', 'C'],
};

class PhaseSystem {
  constructor() {
    this.phases = PHASES;
    this.sequences = PHASE_SEQUENCES;
  }

  /**
   * Get phase information
   */
  getPhaseInfo(phaseId) {
    const phase = this.phases[phaseId];
    if (!phase) {
      throw new Error(`Unknown phase: ${phaseId}`);
    }
    return phase;
  }

  /**
   * Get all phases
   */
  getAllPhases() {
    return Object.values(this.phases);
  }

  /**
   * Get phase sequence for a scale
   */
  getSequence(scale) {
    const sequence = this.sequences[scale];
    if (!sequence) {
      throw new Error(`Unknown scale: ${scale}`);
    }
    return sequence.map((id) => this.phases[id]);
  }

  /**
   * Get next phase in sequence
   */
  getNextPhase(currentPhase, scale) {
    const sequence = this.sequences[scale];
    const currentIndex = sequence.indexOf(currentPhase);

    if (currentIndex === -1) {
      throw new Error(`Phase ${currentPhase} not in sequence for scale ${scale}`);
    }

    if (currentIndex >= sequence.length - 1) {
      return null; // No next phase
    }

    return this.phases[sequence[currentIndex + 1]];
  }

  /**
   * Get previous phase in sequence
   */
  getPreviousPhase(currentPhase, scale) {
    const sequence = this.sequences[scale];
    const currentIndex = sequence.indexOf(currentPhase);

    if (currentIndex <= 0) {
      return null; // No previous phase
    }

    return this.phases[sequence[currentIndex - 1]];
  }

  /**
   * Get agents for a phase
   */
  getAgents(phaseId) {
    const phase = this.phases[phaseId];
    return phase ? phase.agents : [];
  }

  /**
   * Get outputs for a phase
   */
  getOutputs(phaseId) {
    const phase = this.phases[phaseId];
    return phase ? phase.outputs : [];
  }

  /**
   * Check if phase is valid for scale
   */
  isPhaseValidForScale(phaseId, scale) {
    const sequence = this.sequences[scale];
    return sequence ? sequence.includes(phaseId) : false;
  }

  /**
   * Get phase progress
   */
  getProgress(currentPhase, scale) {
    const sequence = this.sequences[scale];
    const currentIndex = sequence.indexOf(currentPhase);

    return {
      current: currentIndex + 1,
      total: sequence.length,
      percentage: Math.round(((currentIndex + 1) / sequence.length) * 100),
    };
  }

  /**
   * Format phase for display
   */
  formatPhase(phaseId, options = {}) {
    const { showAgents = false, showOutputs = false } = options;
    const phase = this.phases[phaseId];

    if (!phase) return `Unknown: ${phaseId}`;

    let output = `${phase.icon} ${phase.id}: ${phase.name}`;

    if (showAgents) {
      output += `\n   Agents: ${phase.agents.map((a) => `@${a}`).join(', ')}`;
    }

    if (showOutputs) {
      output += `\n   Outputs: ${phase.outputs.join(', ')}`;
    }

    return output;
  }

  /**
   * Get phase timeline
   */
  getTimeline(scale, currentPhase) {
    const sequence = this.sequences[scale];
    const currentIndex = sequence.indexOf(currentPhase);

    return sequence.map((id, index) => ({
      ...this.phases[id],
      status: index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'pending',
      index,
    }));
  }

  /**
   * Validate phase transition
   */
  validateTransition(fromPhase, toPhase, scale) {
    const sequence = this.sequences[scale];
    const fromIndex = sequence.indexOf(fromPhase);
    const toIndex = sequence.indexOf(toPhase);

    if (fromIndex === -1 || toIndex === -1) {
      return {
        valid: false,
        reason: 'One or both phases not in sequence',
      };
    }

    if (toIndex !== fromIndex + 1) {
      return {
        valid: false,
        reason: 'Can only advance to next phase in sequence',
      };
    }

    return { valid: true };
  }
}

module.exports = { PhaseSystem, PHASES, PHASE_SEQUENCES };
