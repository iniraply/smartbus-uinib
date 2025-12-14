import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // TAMBAHKAN BAGIAN INI:
  resolve: {
    dedupe: ["react", "react-dom"], // <--- Ini memaksa Vite pakai 1 versi React saja
  },
});
