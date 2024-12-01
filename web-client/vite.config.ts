import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    name: 'web-client',
    root: 'src',
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
