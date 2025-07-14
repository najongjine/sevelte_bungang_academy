import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    cors: true,
    headers: {
      "Cross-Origin-Opener-Policy": "",
      "Cross-Origin-Embedder-Policy": "",
    },
  },
});
