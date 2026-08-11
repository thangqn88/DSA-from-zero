import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { LESSON_SECTIONS, LESSON_PARTS, partId } from '../src/lesson/parts.js'
import { lessons } from '../src/data/lessons/index.js'

const root = resolve(__dirname, '..')
const done = LESSON_SECTIONS.filter(s => lessons[s.sid])

describe.each(done)('cấu trúc section: $sid', ({ sid, file }) => {
  const src = readFileSync(resolve(root, file), 'utf8')

  it('giữ nguyên hợp đồng với App.vue', () => {
    expect(src).toContain(`data-sid="${sid}"`)
    expect(src).toContain('class="day-section"')
    expect(src).toContain('v-show="active"')
    expect(src).toContain('defineProps({ active: Boolean })')
  })

  it('dùng đủ các mục chuẩn của khung bài học', () => {
    const sec = LESSON_SECTIONS.find(s => s.sid === sid)
    for (const p of LESSON_PARTS) {
      // Phần 7 chỉ bắt buộc với bài đã được bổ sung Dự án thực hành. Giai đoạn 4
      // sẽ bật cờ duAn cho cả 10 bài cũ, lúc đó luật này phủ toàn bộ 30 bài.
      if (p.key === 'du-an' && !sec.duAn) continue
      if (p.key === 'muc-tieu') {
        expect(src).toContain('<LessonGoal')
      } else {
        expect(src).toContain(`part="${p.key}"`)
      }
    }
    expect(src).toContain(`:sid="'${sid}'"`)
  })

  it('có đúng id neo cho mọi ví dụ điển hình khai báo trong dữ liệu', () => {
    for (const e of lessons[sid].examples) {
      expect(src).toContain(`id="${e.id}"`)
    }
  })

  // WorkedExample chỉ render 6 slot CÓ TÊN. Nội dung đổ vào slot mặc định bị Vue
  // vứt đi lặng lẽ, không lỗi build, không lỗi test — Phần 4 vẫn hiện đủ 6 cái
  // nhãn nhưng trống trơn bên dưới. Đúng lỗi đó đã sống sót qua 5 bài. Luật này
  // đếm slot, nên nó bắt được ngay lần sau.
  it('mọi ví dụ điển hình đổ nội dung vào đủ 6 slot có tên', () => {
    const soVd = (src.match(/<WorkedExample/g) || []).length
    expect(soVd).toBe(lessons[sid].examples.length)
    for (const slot of ['de-bai', 'y-tuong', 'thuat-toan', 'chay-tay', 'code', 'toi-uu']) {
      const dem = (src.match(new RegExp(`<template #${slot}>`, 'g')) || []).length
      expect(dem, `thiếu slot #${slot}`).toBe(soVd)
    }
  })

  it('không còn chữ nghiêng viết tay bằng thẻ <em> rỗng nghĩa', () => {
    expect(src).not.toMatch(/<i>/)
  })

  it('không tự viết lại quiz/leetcode bằng HTML thủ công', () => {
    expect(src).toContain('<QuizBlock')
    expect(src).toContain('<PracticeSet')
    expect(src).toContain('<LeetCodeList')
  })

  it('id các mục chuẩn được sinh đúng định dạng', () => {
    expect(partId(sid, 'quiz')).toBe(`${sid}--quiz`)
  })
})
