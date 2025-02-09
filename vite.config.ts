/// <reference types="vitest" />

import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import { reactRouter } from '@react-router/dev/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // react()
    reactRouter(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, '/src/features'),
      '@hooks': path.resolve(__dirname, '/src/hooks'),
      '@layouts': path.resolve(__dirname, '/src/layouts'),
      '@routes': path.resolve(__dirname, '/src/routes'),
      '@utils': path.resolve(__dirname, '/src/utils'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/**/*'],
    },
  },
});
