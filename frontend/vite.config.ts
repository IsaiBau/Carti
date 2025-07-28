import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';
const keyPath = resolve(__dirname, './cert/key.pem');
const certPath = resolve(__dirname, './cert/cert.pem');
export default defineConfig({
  base: './', 
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    https: {
      key:  readFileSync(keyPath),
      cert: readFileSync(certPath )
    },
    port: 5173,
    host: 'localhost'
  }
});
