import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',  // ← ADICIONE ISSO! Usa caminhos relativos
  server: {
    host: '0.0.0.0',
    port: port,
  },
  preview: {
    host: '0.0.0.0',
    port: port,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});