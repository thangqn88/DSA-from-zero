import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Bản build chạy dưới subpath của GitHub Pages (https://thangqn88.github.io/DSA-from-zero/),
// còn `npm run dev` vẫn phục vụ ở gốc cho tiện.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/DSA-from-zero/' : '/',
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.js'],
  },
}))
