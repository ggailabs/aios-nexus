/**
 * AIOS Nexus - OpenAI LLM Client
 *
 * Client for OpenAI API
 * Version: 5.0.0
 */

class OpenAIClient {
  constructor(config = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.OPENAI_API_KEY,
      model: config.model || 'gpt-4-turbo-preview',
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
      const OpenAI = require('openai');
      this.client = new OpenAI({ apiKey: this.config.apiKey });
    }
    return this.client;
  }

  /**
   * Generate completion
   */
  async generate(prompt, options = {}) {
    await this.initialize();

    const response = await this.client.chat.completions.create({
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
      content: response.choices[0].message.content,
      usage: {
        inputTokens: response.usage.prompt_tokens,
        outputTokens: response.usage.completion_tokens,
      },
      model: response.model,
      finishReason: response.choices[0].finish_reason,
    };
  }

  /**
   * Generate with system prompt
   */
  async generateWithSystem(systemPrompt, userPrompt, options = {}) {
    await this.initialize();

    const response = await this.client.chat.completions.create({
      model: options.model || this.config.model,
      max_tokens: options.maxTokens || this.config.maxTokens,
      temperature: options.temperature ?? this.config.temperature,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    return {
      content: response.choices[0].message.content,
      usage: {
        inputTokens: response.usage.prompt_tokens,
        outputTokens: response.usage.completion_tokens,
      },
    };
  }

  /**
   * Stream completion
   */
  async *stream(prompt, options = {}) {
    await this.initialize();

    const stream = await this.client.chat.completions.create({
      model: options.model || this.config.model,
      max_tokens: options.maxTokens || this.config.maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
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
      provider: 'openai',
      model: this.config.model,
      maxTokens: this.config.maxTokens,
    };
  }
}

module.exports = { OpenAIClient };
