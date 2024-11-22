import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000/api/", // The API server's base URL
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""), // Remove `/api` prefix before sending to target
            },
        },
    },
});
