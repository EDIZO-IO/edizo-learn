// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/edizo-learn', // GitHub repo name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
