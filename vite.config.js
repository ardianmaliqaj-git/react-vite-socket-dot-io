import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig((env) => {
  return {
    plugins: [react()],
    build: {
      outDir: "./server/static/",
      sourcemap: env.mode == "production" ? false : true,
      emptyOutDir: true,
      minify: true,
      rollupOptions: {
        output: {
          entryFileNames: "[name].[hash].js",
          chunkFileNames: "[name].[hash].js",
          assetFileNames: "[name].[hash].[ext]",
        },
      },
    },
  };
});
