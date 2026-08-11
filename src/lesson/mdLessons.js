// Bài học viết bằng Markdown. KHÔNG có danh sách viết tay ở đây: sự tồn tại của
// file src/content/<sid>.md chính là công tắc duy nhất quyết định bài đó render
// bằng LessonRenderer hay bằng file .vue cũ. Thêm một cờ nữa trong CHAPTERS là
// tạo ra nguồn sự thật thứ hai, đúng thứ file parts.js đã cảnh báo.
const modules = import.meta.glob('../content/*.md', { eager: true })

export const mdLessons = {}
for (const [path, mod] of Object.entries(modules)) {
  const sid = path.split('/').pop().replace(/\.md$/, '')
  mdLessons[sid] = mod.default
}

export const mdSids = Object.keys(mdLessons)

export function laBaiMarkdown(sid) {
  return Object.prototype.hasOwnProperty.call(mdLessons, sid)
}
