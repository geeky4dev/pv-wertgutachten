import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // base URL para producción, usar '/' si sirve desde raíz
  server: {
    port: 5173, // solo para desarrollo
  },
})

