import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true, // 🔴 Aceasta este linia care deschide porțile spre Wi-Fi!
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});