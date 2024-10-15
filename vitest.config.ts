import process from 'node:process';
import { defineConfig } from 'vitest/config';
import 'dotenv/config';

export default defineConfig({
  test: {
    env: process.env,
    testTimeout: 10000,
  },
});
