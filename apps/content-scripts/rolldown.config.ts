import { defineConfig } from "rolldown";

export default defineConfig([
  {
    input: "src/index.ts",
    output: { format: "es", sourcemap: true, file: "dist/main.js" },
  },
  {
    input: "src/share-links.ts",
    output: { format: "iife", sourcemap: true, file: "dist/share-links.js" },
  },
]);
