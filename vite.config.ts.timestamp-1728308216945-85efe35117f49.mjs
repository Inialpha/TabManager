// vite.config.ts
import { defineConfig } from "file:///C:/Users/Dell%20Inspiron/Desktop/TabManager/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Dell%20Inspiron/Desktop/TabManager/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///C:/Users/Dell%20Inspiron/Desktop/TabManager/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Tab Manager Extension",
  description: "An extension that manages tabs and groups them by domain.",
  version: "1.0",
  permissions: [
    "tabs",
    "windows",
    "storage",
    "tabGroups"
  ],
  background: {
    service_worker: "src/background/background.js"
  },
  action: {
    default_popup: "public/popup.html"
  }
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({ manifest: manifest_default })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: "src/popup/popup.html",
        // Reflects the path in the tree
        options: "src/options/options.html"
        // Reflects the path in the tree
      },
      output: {
        entryFileNames: "[name].js"
      },
      watch: {}
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXERlbGwgSW5zcGlyb25cXFxcRGVza3RvcFxcXFxUYWJNYW5hZ2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxEZWxsIEluc3Bpcm9uXFxcXERlc2t0b3BcXFxcVGFiTWFuYWdlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRGVsbCUyMEluc3Bpcm9uL0Rlc2t0b3AvVGFiTWFuYWdlci92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nO1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgaW5wdXQ6IHtcclxuICAgICAgICBwb3B1cDogJ3NyYy9wb3B1cC9wb3B1cC5odG1sJywgICAvLyBSZWZsZWN0cyB0aGUgcGF0aCBpbiB0aGUgdHJlZVxyXG4gICAgICAgIG9wdGlvbnM6ICdzcmMvb3B0aW9ucy9vcHRpb25zLmh0bWwnLCAgLy8gUmVmbGVjdHMgdGhlIHBhdGggaW4gdGhlIHRyZWVcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdbbmFtZV0uanMnLFxyXG4gICAgICB9LFxyXG4gICAgICB3YXRjaDoge30sICBcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG4iLCAie1xyXG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxyXG4gIFwibmFtZVwiOiBcIlRhYiBNYW5hZ2VyIEV4dGVuc2lvblwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBbiBleHRlbnNpb24gdGhhdCBtYW5hZ2VzIHRhYnMgYW5kIGdyb3VwcyB0aGVtIGJ5IGRvbWFpbi5cIixcclxuICBcInZlcnNpb25cIjogXCIxLjBcIixcclxuICBcInBlcm1pc3Npb25zXCI6IFtcclxuICAgIFwidGFic1wiLFxyXG4gICAgXCJ3aW5kb3dzXCIsXHJcbiAgICBcInN0b3JhZ2VcIixcclxuICAgIFwidGFiR3JvdXBzXCJcclxuICBdLFxyXG4gIFwiYmFja2dyb3VuZFwiOiB7XHJcbiAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwic3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC5qc1wiXHJcbiAgfSxcclxuICBcImFjdGlvblwiOiB7XHJcbiAgICBcImRlZmF1bHRfcG9wdXBcIjogXCJwdWJsaWMvcG9wdXAuaHRtbFwiXHJcbiAgfVxyXG59XHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlULFNBQVMsb0JBQW9CO0FBQ3RWLE9BQU8sV0FBVztBQUNsQixTQUFTLFdBQVc7OztBQ0ZwQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxFQUNuQjtBQUNGOzs7QURaQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJLEVBQUUsMkJBQVMsQ0FBQztBQUFBLEVBQ2xCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUE7QUFBQSxRQUNQLFNBQVM7QUFBQTtBQUFBLE1BQ1g7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxPQUFPLENBQUM7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
