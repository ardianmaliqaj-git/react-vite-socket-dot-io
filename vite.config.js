import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  build: { outDir: "./server/static/", assetsDir: "./files/" },
  plugins: [react()],
});
