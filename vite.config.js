import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "backend/dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://interviewerai.onrender.com",
        // target: "http://localhost:8000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
