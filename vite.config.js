import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <--- Kita butuh ini

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // INI JURUS KUNCINYA:
      // Memaksa semua library menggunakan SATU versi React yang sama
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  // Optimasi tambahan untuk memastikan build bersih
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
