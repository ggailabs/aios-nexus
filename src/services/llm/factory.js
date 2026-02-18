/**
 * AIOS Nexus - LLM Client Factory
 *
 * Factory for creating LLM clients
 * Version: 5.0.0
 */

const { AnthropicClient } = require('./anthropic-client');
const { OpenAIClient } = require('./openai-client');
const { GoogleClient } = require('./google-client');

class LLMClientFactory {
  /**
   * Create LLM client based on provider
   */
  static create(provider, config = {}) {
    switch (provider) {
      case 'anthropic':
        return new AnthropicClient(config);
      case 'openai':
        return new OpenAIClient(config);
      case 'google':
        return new GoogleClient(config);
      default:
        throw new Error(`Unknown LLM provider: ${provider}`);
    }
  }

  /**
   * Get available providers
   */
  static getProviders() {
    return ['anthropic', 'openai', 'google'];
  }

  /**
   * Check if provider is available
   */
  static isAvailable(provider) {
    return this.getProviders().includes(provider);
  }
}

module.exports = { LLMClientFactory };
