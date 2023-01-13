import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [
    mkcert(),
    solidPlugin()
  ],
  build: {
    target: "esnext",
  },
  server: {
    https: true,
    open: true,
    hmr: true
  }
})
