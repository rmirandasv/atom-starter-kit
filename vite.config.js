import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/resources/ts",
    },
  },
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/ts/app.tsx"],
      refresh: true,
      resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
        return pages[`./pages/${name}.tsx`];
      },
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    cors: {
      origin: "http://localhost:8000",
    },
  },
});
