import type { ErrorResponse, Message, Request } from './types';
import type { Models } from './types/models';
import { OpenRouterErrorResponse } from './instances';

export type OpenRouterConfig = {
  /**
   * Secret key from Open Router
   */
  apiKey: string;

  /**
   * If set, this model will be the default model.
   *
   * Use this if you want to use the same model for all requests
   */
  model: Models;

  /**
   * Headers include in the request
   *
   */
  headers?: Record<string, string>;
};

export class OpenRouter {
  protected readonly baseUrl: string;

  protected readonly apiKey: string;

  protected readonly model: Models;

  protected readonly headers: Record<string, string>;

  constructor(config: OpenRouterConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.model = config.model;
  }

  private get baseConfig(): { baseUrl: string; headers: () => Record<string, string> } {
    if (!this.apiKey) {
      throw new Error('Missing API key');
    }

    return {
      baseUrl: this.baseUrl,
      headers: () => ({
        Authorization: `Bearer ${this.apiKey}`,
        ...this.headers,
      }),
    };
  }

  public getResponseText = async (request: Request): Promise<{ data: Message | null; error: ErrorResponse | null }> => {
    try {
      if (!this.model && !request.model) {
        throw new Error('Model is required!');
      }

      const res = await fetch(this.baseConfig.baseUrl, {
        method: 'POST',
        body: JSON.stringify({
          ...request,
          model: request.model ? request.model : this.model,
          stream: false,
          role: 'assistant',
        }),
        headers: {
          ...this.baseConfig.headers(),
        },
      });

      if (!res.ok) {
        try {
          const rawError = await res.json();

          if (rawError instanceof OpenRouterErrorResponse) {
            return {
              data: null,
              error: {
                code: rawError.error.code,
                message: rawError.error.message,
              },
            };
          }
          else {
            return {
              data: null,
              error: {
                code: res.status,
                message: res.statusText,
              },
            };
          }
        }
        catch (err) {
          return {
            data: null,
            error: {
              code: 500,
              message: JSON.stringify(err),
            },
          };
        }
      }

      const resJson = await res.json();

      const data = {
        role: resJson.choices[0].message.role,
        content: resJson.choices[0].message.content,
      };

      return { data, error: null };
    }
    catch (err) {
      return {
        data: null,
        error: {
          code: 500,
          message: (err as Error).message,
        },
      };
    }
  };
}
