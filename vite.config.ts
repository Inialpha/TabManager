import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import { Plugin } from 'vite';

const viteManifestHackIssue846: Plugin & { renderCrxManifest: (manifest: any, bundle: any) => void } = {
    // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
    name: 'manifestHackIssue846',
    renderCrxManifest(_manifest, bundle) {
        bundle['manifest.json'] = bundle['.vite/manifest.json']
        bundle['manifest.json'].fileName = 'manifest.json'
        delete bundle['.vite/manifest.json']
    },
}
export default defineConfig({
  plugins: [
    react(),
    viteManifestHackIssue846,
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'public/popup.html',   // Reflects the path in the tree
        options: 'public/options.html',  // Reflects the path in the tree
      },
      output: {
        entryFileNames: '[name].js',
      },
      watch: {},  
    },
  },
});

