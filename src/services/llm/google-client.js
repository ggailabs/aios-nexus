/**
 * AIOS Nexus - Google LLM Client
 *
 * Client for Google AI API
 * Version: 5.0.0
 */

class GoogleClient {
  constructor(config = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.GOOGLE_API_KEY,
      model: config.model || 'gemini-1.5-pro',
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
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      this.client = new GoogleGenerativeAI(this.config.apiKey);
    }
    return this.client;
  }

  /**
   * Generate completion
   */
  async generate(prompt, options = {}) {
    await this.initialize();

    const model = this.client.getGenerativeModel({
      model: options.model || this.config.model,
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: options.maxTokens || this.config.maxTokens,
        temperature: options.temperature ?? this.config.temperature,
      },
    });

    const response = result.response;

    return {
      content: response.text(),
      usage: {
        inputTokens: response.usageMetadata?.promptTokenCount || 0,
        outputTokens: response.usageMetadata?.candidatesTokenCount || 0,
      },
      model: this.config.model,
    };
  }

  /**
   * Generate with system prompt
   */
  async generateWithSystem(systemPrompt, userPrompt, options = {}) {
    await this.initialize();

    const model = this.client.getGenerativeModel({
      model: options.model || this.config.model,
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        maxOutputTokens: options.maxTokens || this.config.maxTokens,
        temperature: options.temperature ?? this.config.temperature,
      },
    });

    return {
      content: result.response.text(),
      usage: {
        inputTokens: result.response.usageMetadata?.promptTokenCount || 0,
        outputTokens: result.response.usageMetadata?.candidatesTokenCount || 0,
      },
    };
  }

  /**
   * Stream completion
   */
  async *stream(prompt, options = {}) {
    await this.initialize();

    const model = this.client.getGenerativeModel({
      model: options.model || this.config.model,
    });

    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
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
      provider: 'google',
      model: this.config.model,
      maxTokens: this.config.maxTokens,
    };
  }
}

module.exports = { GoogleClient };
