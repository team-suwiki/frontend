import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.suwiki.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      api: '/src/api',
      atom: '/src/atom',
      constants: '/src/constants',
      components: '/src/components',
      hooks: '/src/hooks',
      pages: '/src/pages',
      styles: '/src/styles',
      types: '/src/types',
      utils: '/src/utils',
    },
  },
});
