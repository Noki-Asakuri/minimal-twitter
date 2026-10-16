import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { cn } from "cn/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [
    react({ compiler: true }),
    tailwindcss(),
    cn({ content: ["src/**/*.{ts,tsx}"], out: "src/lib/cn-tables.ts" }),
  ],
  resolve: { tsconfigPaths: true },
});
