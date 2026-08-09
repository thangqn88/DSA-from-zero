import { describe, it, expect } from 'vitest'
import { LESSON_PARTS, LESSON_SECTIONS, partId, partTitle } from '../src/lesson/parts.js'

describe('parts', () => {
  it('có đúng 7 mục theo thứ tự chuẩn', () => {
    expect(LESSON_PARTS.map(p => p.key)).toEqual([
      'muc-tieu', 'ly-thuyet', 'vi-sao', 'quiz', 'vi-du', 'bai-tap', 'leetcode',
    ])
  })

  it('đánh số 1..6 cho 6 phần sau phần mở đầu', () => {
    expect(LESSON_PARTS[0].num).toBe(0)
    expect(LESSON_PARTS.slice(1).map(p => p.num)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('partId ghép sid với key bằng hai gạch ngang', () => {
    expect(partId('to-hop', 'quiz')).toBe('to-hop--quiz')
  })

  it('partTitle trả tiêu đề có tiền tố số cho phần đánh số', () => {
    expect(partTitle('quiz')).toBe('3. Quiz kiểm tra lý thuyết')
    expect(partTitle('muc-tieu')).toBe('Mục tiêu bài học')
  })

  it('liệt kê đúng 10 nhóm kiến thức cần viết lại', () => {
    expect(LESSON_SECTIONS).toHaveLength(10)
    expect(LESSON_SECTIONS.map(s => s.sid)).toContain('dsu')
    for (const s of LESSON_SECTIONS) {
      expect(s.file).toMatch(/^src\/sections\/\w+\.vue$/)
    }
  })
})
