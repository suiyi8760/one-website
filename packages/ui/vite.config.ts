import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [mkcert(), react()],
  build: {
    target: 'esnext'
  },
  server: {
    https: false,
    open: true,
    hmr: true
  }
})
