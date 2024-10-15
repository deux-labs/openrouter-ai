import type { Models } from './types/models';

type TextContent = {
  type: 'text';
  text: string;
};

type ImageContentPart = {
  type: 'image_url';
  image_url: {
    url: string; // URL or base64 encoded image data
    detail?: string; // Optional, defaults to 'auto'
  };
};

type ContentPart = TextContent | ImageContentPart;

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string | ContentPart[];
  name?: string;
};

type ToolChoice = 'none' | 'auto' | {
  type: 'function';
  function: {
    name: string;
  };
};

type Request = {
  messages: Message[];
  prompt?: string;
  model?: Models;
  response_format?: {
    type: 'json_object';
  };
  stop?: string | string[];
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;

  top_p?: number;
  top_k?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  repetition_penalty?: number;
  seed?: number;
  tool_choice?: ToolChoice;
  logit_bias?: { [key: number]: number };
  transforms?: string[];
  models?: Models[];
  route?: 'fallback';

  // TODO: Provider Preferences type
  // provider?: ProviderPreferences;
};

// Response type

type ResponseUsage = {
  prompt_tokens: number;
  comletion_tokens: number;
  total_tokens: number;
};

type NonStreamingChoice = {
  finish_reason: string | null;
  message: Message;
  error?: ErrorResponse;
};

export type ErrorResponse = {
  code: number;
  message: string;
  metadata?: ModerationErrorMetadata;
};

type ModerationErrorMetadata = {
  reasons: string[];
  flagged_input: string;
};

type Response = {
  id: string;
  choices: NonStreamingChoice;
  created: number;
  model: Models;
  object: 'chat.completion' | 'chat.completion.chunk';
  system_fingerprint?: string;
  usage?: ResponseUsage;
};

export type { Request, Response };
