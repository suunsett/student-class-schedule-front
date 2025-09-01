import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  // vite.config.js
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
