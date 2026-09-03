import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/dev-leon-matias-profile/",
  // -------------------------------

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["motion/react"],
  },
  define: {
    // In CI: VITE_APP_VERSION is set via env (e.g. "1.0.42" using github.run_number).
    // Locally: falls back to today's date so the footer always shows something meaningful.
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(
      process.env.VITE_APP_VERSION ??
        new Date().toISOString().slice(0, 10).replace(/-/g, ".")
    ),
  },
}));
