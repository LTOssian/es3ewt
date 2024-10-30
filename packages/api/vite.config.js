// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [], // Add your plugins here
  test: {
    globals: true,
    environment: "node", // Or 'node' depending on your needs
    coverage: {
      reporter: ["text", "json", "html"], // Coverage options
    },
    // setupFiles: './setupTests.js', // Optional setup file for Vitest
  },
});
