import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [
    react(),
    tailwindcss()
  ];

  // Only enable local self-signed SSL for local dev server
  if (command === 'serve') {
    plugins.push(basicSsl());
  }

  return {
    plugins,
    server: {
      host: true,
      port: 5173
    }
  };
});
