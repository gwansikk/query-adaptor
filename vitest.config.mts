import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/*.spec.ts?(x)'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
