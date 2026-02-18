/**
 * AIOS Nexus - Anthropic LLM Client
 *
 * Client for Anthropic Claude API
 * Version: 5.0.0
 */

class AnthropicClient {
  constructor(config = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
      model: config.model || 'claude-sonnet-4-20250514',
      maxTokens: config.maxTokens || 4096,
      temperature: config.temperature || 0.7,
      ...config,
    };

    this.client = null;
  }

  /**
   * Initialize client
   */
  async initialize() {
    if (!this.client) {
      // Dynamic import to avoid bundling issues
      const Anthropic = require('@anthropic-ai/sdk');
      this.client = new Anthropic({ apiKey: this.config.apiKey });
    }
    return this.client;
  }

  /**
   * Generate completion
   */
  async generate(prompt, options = {}) {
    await this.initialize();

    const response = await this.client.messages.create({
      model: options.model || this.config.model,
      max_tokens: options.maxTokens || this.config.maxTokens,
      temperature: options.temperature ?? this.config.temperature,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return {
      content: response.content[0].text,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
      model: response.model,
      stopReason: response.stop_reason,
    };
  }

  /**
   * Generate with system prompt
   */
  async generateWithSystem(systemPrompt, userPrompt, options = {}) {
    await this.initialize();

    const response = await this.client.messages.create({
      model: options.model || this.config.model,
      max_tokens: options.maxTokens || this.config.maxTokens,
      temperature: options.temperature ?? this.config.temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    return {
      content: response.content[0].text,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    };
  }

  /**
   * Stream completion
   */
  async *stream(prompt, options = {}) {
    await this.initialize();

    const stream = await this.client.messages.stream({
      model: options.model || this.config.model,
      max_tokens: options.maxTokens || this.config.maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta') {
        yield event.delta.text;
      }
    }
  }

  /**
   * Check if API key is configured
   */
  isConfigured() {
    return !!this.config.apiKey;
  }

  /**
   * Get model info
   */
  getModelInfo() {
    return {
      provider: 'anthropic',
      model: this.config.model,
      maxTokens: this.config.maxTokens,
    };
  }
}

module.exports = { AnthropicClient };
