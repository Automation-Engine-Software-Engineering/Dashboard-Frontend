import react from "@vitejs/plugin-react";

import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // Example alias
      // Add more aliases as needed
    }
  },
  plugins: [react()]
});
