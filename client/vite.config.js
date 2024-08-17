import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://fusionfind-api.vercel.app/",
        changeOrigin: true, // Ensures the host header is changed to the target URL
        secure: true, // Ensures SSL connections are used
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
