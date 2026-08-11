import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { parseLessonMd } from './src/lesson/md.js'

// Bài học viết bằng Markdown được dịch sang HTML NGAY LÚC BUILD, không phải lúc
// chạy. Nhờ vậy markdown-it nằm hoàn toàn ngoài bundle trình duyệt, và mọi lỗi cú
// pháp trong file .md làm đỏ build chứ không lặng lẽ hiện ra một mục trống.
function lessonMarkdown() {
  return {
    name: 'dsa-lesson-md',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0]
      if (!file.endsWith('.md')) return null
      const ten = file.split(/[\\/]/).pop()
      const json = JSON.stringify(parseLessonMd(code, ten))
      // Escape '<' để chuỗi HTML không bao giờ cắt ngang thẻ script của trang.
      return { code: `export default ${json.replace(/</g, '\\u003c')}`, map: null }
    },
  }
}

// https://vite.dev/config/
// Bản build chạy dưới subpath của GitHub Pages (https://thangqn88.github.io/DSA-from-zero/),
// còn `npm run dev` vẫn phục vụ ở gốc cho tiện.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/DSA-from-zero/' : '/',
  plugins: [lessonMarkdown(), vue()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.js'],
  },
}))
