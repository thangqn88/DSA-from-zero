import { LESSON_PARTS, partId, partTitle } from '../lesson/parts.js'
import { lessons } from './lessons/index.js'
import menusData from './menus.json'

// Menu phải của 1 nhóm kiến thức được SINH RA từ khung chuẩn, không viết tay,
// nên không bao giờ lệch với nội dung thật của section.
export function menuTuDuLieu(sid, data) {
  const out = []
  for (const p of LESSON_PARTS) {
    // Bài chưa được bổ sung Phần 7 thì section không có neo tương ứng — sinh
    // mục menu ở đây sẽ tạo ra một link trỏ vào hư không.
    if (p.key === 'du-an' && !data.project) continue

    out.push({ id: partId(sid, p.key), label: partTitle(p.key), official: false, level: 3 })
    if (p.key === 'vi-du') {
      for (const e of data.examples) {
        out.push({ id: e.id, label: e.title, official: !!e.official, level: 4 })
      }
    }
  }
  return out
}

export function buildMenu(sid) {
  const data = lessons[sid]
  if (!data) return menusData[sid] || []
  return menuTuDuLieu(sid, data)
}
