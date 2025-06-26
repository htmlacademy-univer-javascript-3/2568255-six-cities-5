/// <reference_models='vitest' />
/// <reference_models='vite/client' />

import { defineConfig } from 'vitest/config'; 
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});