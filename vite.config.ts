import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import vitePluginReactAppRouter from "./src/plugins/vite-plugin-react-app-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    vitePluginReactAppRouter({
      root: "src",
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 5173,
  },
});
