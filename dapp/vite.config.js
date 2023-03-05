import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },

  optimizeDeps: {
    include: ['@babel/polyfill'],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.js',
    },
  },
});
