/**
 * AIOS Nexus - Scale Router
 *
 * Automatic scale detection and phase routing
 * Version: 5.0.0
 */

const SCALE_CONFIG = {
  QUICK: {
    phases: ['E', 'V'],
    estimatedTime: 5, // minutes
    description: 'Bug fixes, typos, small tweaks',
    indicators: {
      maxFiles: 3,
      maxLines: 50,
      keywords: ['fix', 'typo', 'typo', 'correct', 'update', 'patch'],
    },
  },
  SMALL: {
    phases: ['P', 'E', 'V'],
    estimatedTime: 15, // minutes
    description: 'Simple features, no architecture changes',
    indicators: {
      maxFiles: 10,
      maxLines: 200,
      keywords: ['add', 'create', 'implement', 'update', 'feature'],
    },
  },
  MEDIUM: {
    phases: ['P', 'R', 'E', 'V'],
    estimatedTime: 30, // minutes
    description: 'Regular features with design decisions',
    indicators: {
      maxFiles: 30,
      maxLines: 1000,
      keywords: ['feature', 'refactor', 'integrate', 'migrate'],
    },
  },
  LARGE: {
    phases: ['P', 'R', 'E', 'V', 'C'],
    estimatedTime: 60, // minutes
    description: 'Complex features, systems, compliance',
    indicators: {
      maxFiles: Infinity,
      maxLines: Infinity,
      keywords: ['system', 'architecture', 'redesign', 'migrate', 'compliance', 'security'],
    },
  },
};

class ScaleRouter {
  constructor(config = {}) {
    this.config = { ...SCALE_CONFIG, ...config };
  }

  /**
   * Detect scale based on options and context
   */
  detectScale(options = {}) {
    // Explicit scale
    if (options.scale && this.config[options.scale]) {
      return options.scale;
    }

    // Detect from description
    if (options.description) {
      const detected = this.detectFromDescription(options.description);
      if (detected) return detected;
    }

    // Detect from files
    if (options.files && options.files.length > 0) {
      const detected = this.detectFromFiles(options.files);
      if (detected) return detected;
    }

    // Default to MEDIUM
    return 'MEDIUM';
  }

  /**
   * Detect scale from description text
   */
  detectFromDescription(description) {
    const text = description.toLowerCase();

    // Check for LARGE indicators first
    const largeKeywords = this.config.LARGE.indicators.keywords;
    if (largeKeywords.some((kw) => text.includes(kw))) {
      // Additional checks for LARGE
      if (
        text.includes('system') ||
        text.includes('architecture') ||
        text.includes('redesign') ||
        text.includes('compliance')
      ) {
        return 'LARGE';
      }
    }

    // Check for QUICK indicators
    const quickKeywords = this.config.QUICK.indicators.keywords;
    if (quickKeywords.some((kw) => text.includes(kw))) {
      // Verify it's actually quick
      if (text.length < 100 && !text.includes('and') && !text.includes('also')) {
        return 'QUICK';
      }
    }

    // Check for SMALL indicators
    const smallKeywords = this.config.SMALL.indicators.keywords;
    if (smallKeywords.some((kw) => text.includes(kw))) {
      if (!text.includes('complex') && !text.includes('multiple')) {
        return 'SMALL';
      }
    }

    // Check for MEDIUM indicators
    const mediumKeywords = this.config.MEDIUM.indicators.keywords;
    if (mediumKeywords.some((kw) => text.includes(kw))) {
      return 'MEDIUM';
    }

    return null;
  }

  /**
   * Detect scale from file list
   */
  detectFromFiles(files) {
    const fileCount = files.length;
    const totalLines = files.reduce((sum, f) => sum + (f.lines || 0), 0);

    // Check QUICK
    if (
      fileCount <= this.config.QUICK.indicators.maxFiles &&
      totalLines <= this.config.QUICK.indicators.maxLines
    ) {
      return 'QUICK';
    }

    // Check SMALL
    if (
      fileCount <= this.config.SMALL.indicators.maxFiles &&
      totalLines <= this.config.SMALL.indicators.maxLines
    ) {
      return 'SMALL';
    }

    // Check MEDIUM
    if (
      fileCount <= this.config.MEDIUM.indicators.maxFiles &&
      totalLines <= this.config.MEDIUM.indicators.maxLines
    ) {
      return 'MEDIUM';
    }

    // Default to LARGE
    return 'LARGE';
  }

  /**
   * Get phases for a scale
   */
  getPhases(scale) {
    const config = this.config[scale];
    if (!config) {
      throw new Error(`Unknown scale: ${scale}`);
    }
    return [...config.phases];
  }

  /**
   * Get scale configuration
   */
  getScaleConfig(scale) {
    const config = this.config[scale];
    if (!config) {
      throw new Error(`Unknown scale: ${scale}`);
    }
    return {
      scale,
      ...config,
    };
  }

  /**
   * Get all scales
   */
  getAllScales() {
    return Object.entries(this.config).map(([scale, config]) => ({
      scale,
      ...config,
    }));
  }

  /**
   * Estimate time for a scale
   */
  estimateTime(scale) {
    const config = this.config[scale];
    return config ? config.estimatedTime : null;
  }

  /**
   * Get scale recommendation
   */
  getRecommendation(options = {}) {
    const detected = this.detectScale(options);
    const config = this.config[detected];

    return {
      scale: detected,
      phases: config.phases,
      estimatedTime: config.estimatedTime,
      description: config.description,
      reasoning: this.getReasoning(options, detected),
    };
  }

  /**
   * Get reasoning for scale detection
   */
  getReasoning(options, scale) {
    const reasons = [];

    if (options.scale) {
      reasons.push(`Explicitly set to ${scale}`);
    } else if (options.description) {
      const detected = this.detectFromDescription(options.description);
      if (detected) {
        reasons.push(`Detected from description: "${options.description.substring(0, 50)}..."`);
      }
    }

    if (options.files && options.files.length > 0) {
      reasons.push(`Based on ${options.files.length} files`);
    }

    if (reasons.length === 0) {
      reasons.push('Default scale (MEDIUM)');
    }

    return reasons;
  }

  /**
   * Validate scale
   */
  validateScale(scale) {
    return Object.keys(this.config).includes(scale);
  }

  /**
   * Format scale for display
   */
  formatScale(scale) {
    const config = this.config[scale];
    if (!config) return `Unknown: ${scale}`;

    return `${scale} (${config.phases.join('→')}) - ${config.description}`;
  }
}

module.exports = { ScaleRouter, SCALE_CONFIG };
