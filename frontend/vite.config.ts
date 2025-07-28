import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', 
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    https: {
      key: readFileSync.readFileSync('./cert/key.pem'),
      cert: readFileSync('./cert/cert.pem')
    },
    port: 5173,
    host: 'localhost'
  }
});
