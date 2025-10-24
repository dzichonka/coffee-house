import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        menu: path.resolve(__dirname, "menu.html"),
        login: path.resolve(__dirname, "login.html"),
      },
    },
    sourcemap: true,
    minify: true,
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    modules: {
      scopeBehaviour: "local",
    },
  },
});
