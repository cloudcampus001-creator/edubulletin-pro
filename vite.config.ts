import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plain Vite/Nitro config (no Lovable wrapper).
// Nitro auto-detects the Vercel build environment and applies the
// correct preset — no explicit `preset: "vercel"` needed.
// The `environments.ssr.build.rollupOptions.input` line below points
// the server build at src/server.ts (our SSR error-page wrapper)
// instead of TanStack Start's default bundled entry.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    viteReact(),
    tailwindcss(),
    nitro(),
  ],
  environments: {
    ssr: { build: { rollupOptions: { input: "./src/server.ts" } } },
  },
});
