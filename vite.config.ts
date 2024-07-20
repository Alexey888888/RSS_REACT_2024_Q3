/// <reference types="vitest" />
import { defineConfig } from 'vite';
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
        'src/main.tsx',
        'node_modules',
        '**/dist/**', 
        '**/.eslintrc.cjs', 
        '**/vite.config.ts'],
    },
   
  },
});