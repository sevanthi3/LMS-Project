// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./", // Keep this for relative paths in build
  server: {
    port: 5173, // or whatever port you use to run the frontend
    host: 'localhost',
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173, // important: match the above port
    },
  },
})
