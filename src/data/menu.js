import { LESSON_PARTS, partId, partTitle } from '../lesson/parts.js'
import { lessons } from './lessons/index.js'
import menusData from './menus.json'

// Menu phải của 1 nhóm kiến thức được SINH RA từ khung 6 phần, không viết tay,
// nên không bao giờ lệch với nội dung thật của section.
export function buildMenu(sid) {
  const data = lessons[sid]
  if (!data) return menusData[sid] || []

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
