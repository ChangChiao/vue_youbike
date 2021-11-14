import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint';
const baseUrl = process.env.BASE_URL || "";
export default defineConfig({
  base: baseUrl,
  plugins: [vue()],
  build: {
    outDir: '../docs'
  },
  server:{
    host: '0.0.0.0',
  }
})
