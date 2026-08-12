import { LESSON_PARTS, partId, partTitle, CHAPTERS, chapterProjectId } from '../lesson/parts.js'
import { lessons } from './lessons/index.js'
import menusData from './menus.json'

// Menu phải của 1 nhóm kiến thức được SINH RA từ khung chuẩn, không viết tay,
// nên không bao giờ lệch với nội dung thật của section.
export function menuTuDuLieu(sid, data) {
  const out = []
  for (const p of LESSON_PARTS) {
    out.push({ id: partId(sid, p.key), label: partTitle(p.key), official: false, level: 3 })
    if (p.key === 'vi-du') {
      for (const e of data.examples) {
        out.push({ id: e.id, label: e.title, official: !!e.official, level: 4 })
      }
    }
  }
  return out
}

const PROJECT_IDS = new Set(CHAPTERS.map(c => chapterProjectId(c.key)))

export function buildMenu(sid) {
  // Trang dự án là một bản đặc tả đọc một mạch, không phải bài học 7 mục — nó
  // KHÔNG có menu bài tập bên phải. App.vue có v-if="currentMenu.length" nên
  // khung menu tự biến mất. Đừng sinh menu cho trang này chỉ vì trang khác có.
  if (PROJECT_IDS.has(sid)) return []

  const data = lessons[sid]
  if (!data) return menusData[sid] || []
  return menuTuDuLieu(sid, data)
}
