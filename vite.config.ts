import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup/popup.html',   // Reflects the path in the tree
        options: 'src/options/options.html',  // Reflects the path in the tree
      },
      output: {
        entryFileNames: '[name].js',
      },
      watch: {},  
    },
  },
});

