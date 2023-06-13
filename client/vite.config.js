import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/recommend": {
        target: "https://dialogflow-webhook-kbh8.onrender.com",
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/appwrite/, ""),
      },
      "/search": {
        target: "https://seo-elasticsearch.onrender.com",
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/appwrite/, ""),
      },
    },
  },
});
