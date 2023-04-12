import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'
import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig({
  plugins: [mkcert(), react(), ssr()],
  build: {
    target: 'esnext'
  },
  server: {
    https: false,
    open: true,
    hmr: true
  }
})
