import { expect, it } from 'vitest';
import { OpenRouter } from './openrouter';

if (!process.env.OPENROUTER_KEY) {
  throw new Error('Missing key');
}

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_KEY,
  model: 'nousresearch/hermes-3-llama-3.1-405b:free',
});

async function fetchMessage(retry: number) {
  if (retry === 0) {
    throw new Error('OpenRouter server cold start.');
  }

  const { data, error } = await openrouter.getResponseText({
    messages: [{
      content: 'Hello, I\'m Lee',
      role: 'user',
    }],
  });

  if (error) {
    return fetchMessage(retry - 1);
  }

  return { data, error };
}

it('test request', async () => {
  const response = await fetchMessage(2);

  expect(response?.data).toHaveProperty('content');
  expect(response?.error).toBeNull();
});

it('test throw error', async () => {
  const { data, error } = await openrouter.getResponseText({
    messages: [],
  });

  expect(data).toBeNull();
  expect(error).toHaveProperty('code');
});
