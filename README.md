## OpenRouter AI Assistant Small Kit

Provides a small kit to communicate with Openrouter API seamlessly.

Example:

```js
import { OpenRouter } from '@deux_labs/ai-assistant-kit';

const openrouter = new OpenRouter({
  apiKey: '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',
  model: 'nousresearch/hermes-3-llama-3.1-405b:free'
});

async function main() {
  const { data } = await openrouter.getResponseText({
    messages: [{
      content: 'Hi, I\m Lee',
      role: 'user'
    }]
  });

  return data;
}

main().then(data => console.log(data));

// Result:
// {
//   role: 'assistant',
//   content: "Hello Lee! It's nice to meet you. How can I assist you today?"
// }
```
