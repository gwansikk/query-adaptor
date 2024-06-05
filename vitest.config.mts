import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/*.test.ts?(x)'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
