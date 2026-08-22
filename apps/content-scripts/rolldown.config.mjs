import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/index.js",
  output: {
    format: "es",
    sourcemap: true,
    file: "dist/main.js",
  },
});
