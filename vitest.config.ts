import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/pages/_document.tsx',
        'vitest.config.ts',
        'next-env.d.ts',
        '**/*.js',
        '**/*.mjs',
        '**/*.cjs',
      ],
    },
  },
});
