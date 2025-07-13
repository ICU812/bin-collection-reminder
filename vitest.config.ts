import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // or 'jsdom' if you're testing the DOM
    include: ['tests/**/*.test.ts'],
  },
});
