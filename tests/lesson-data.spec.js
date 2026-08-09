import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { lessons } from '../src/data/lessons/index.js'
import { LESSON_SECTIONS, sidToFile } from '../src/lesson/parts.js'

const root = resolve(__dirname, '..')
const LEVELS = ['Easy', 'Medium', 'Hard']
const present = LESSON_SECTIONS.filter(s => lessons[s.sid])
const coDuAn = LESSON_SECTIONS.filter(s => s.duAn)

describe.each(present)('dữ liệu bài học: $sid', ({ sid }) => {
  const data = lessons[sid]

  it('có mục tiêu học từ 2 đến 4 gạch đầu dòng', () => {
    expect(Array.isArray(data.goal)).toBe(true)
    expect(data.goal.length).toBeGreaterThanOrEqual(2)
    expect(data.goal.length).toBeLessThanOrEqual(4)
  })

  it('có 1 đến 2 ví dụ điển hình, id không trùng', () => {
    expect(data.examples.length).toBeGreaterThanOrEqual(1)
    expect(data.examples.length).toBeLessThanOrEqual(2)
    const ids = data.examples.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const e of data.examples) expect(e.title.length).toBeGreaterThan(3)
  })

  it('có 3 đến 5 câu quiz hợp lệ', () => {
    expect(data.quiz.length).toBeGreaterThanOrEqual(3)
    expect(data.quiz.length).toBeLessThanOrEqual(5)
    for (const q of data.quiz) {
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(q.options.length)
      expect(q.why.length).toBeGreaterThan(10)
    }
  })

  it('có đúng 3 bài tập kiểm tra, mỗi bài có ý tưởng và gợi ý', () => {
    expect(data.practice).toHaveLength(3)
    for (const p of data.practice) {
      expect(p.title.length).toBeGreaterThan(3)
      expect(p.idea.length).toBeGreaterThan(10)
      expect(p.hint.length).toBeGreaterThan(10)
    }
  })

  it('có 8 đến 12 bài LeetCode, slug không trùng, mức hợp lệ', () => {
    expect(data.leetcode.length).toBeGreaterThanOrEqual(8)
    expect(data.leetcode.length).toBeLessThanOrEqual(12)
    const slugs = data.leetcode.map(x => x.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const x of data.leetcode) {
      expect(LEVELS).toContain(x.level)
      expect(x.slug).toMatch(/^[a-z0-9-]+$/)
      expect(Number.isInteger(x.no)).toBe(true)
      expect(x.note.length).toBeGreaterThan(5)
    }
  })

  it('danh sách LeetCode xếp từ dễ tới khó', () => {
    const rank = data.leetcode.map(x => LEVELS.indexOf(x.level))
    expect(rank).toEqual([...rank].sort((a, b) => a - b))
  })
})

// Luật này rỗng lúc đầu và phủ dần khi từng bài bật cờ duAn trong CHAPTERS.
// Nhờ vậy nó không bao giờ đỏ oan trong nhiều tuần chờ nội dung.
describe('schema Dự án thực hành', () => {
  it('danh sách bài đã có Phần 7 là một mảng hợp lệ', () => {
    expect(Array.isArray(coDuAn)).toBe(true)
  })

  describe.each(coDuAn)('bài $sid', ({ sid }) => {
    const p = lessons[sid].project

    it('có project đủ 6 trường', () => {
      expect(p).toBeTypeOf('object')
      for (const k of ['title', 'why', 'input']) {
        expect(typeof p[k]).toBe('string')
        expect(p[k].length).toBeGreaterThan(10)
      }
      for (const k of ['must', 'done', 'traps']) {
        expect(Array.isArray(p[k])).toBe(true)
        expect(p[k].length).toBeGreaterThan(0)
      }
    })

    it('có tối thiểu 2 yêu cầu bắt buộc và 1 tiêu chí xong', () => {
      expect(p.must.length).toBeGreaterThanOrEqual(2)
      expect(p.done.length).toBeGreaterThanOrEqual(1)
    })

    it('yêu cầu cuối cùng bắc cầu về kiến thức cũ', () => {
      expect(p.must.at(-1).length).toBeGreaterThan(20)
    })

    it('có tối thiểu 1 câu quiz ôn lại kiến thức cũ', () => {
      const recalls = lessons[sid].quiz.filter(q => q.recall === true)
      expect(recalls.length).toBeGreaterThanOrEqual(1)
    })

    it('section render Phần 7 bằng ProjectBrief', () => {
      const src = readFileSync(resolve(root, sidToFile(sid)), 'utf8')
      expect(src).toContain('part="du-an"')
      expect(src).toContain('<ProjectBrief')
    })
  })
})

describe('tiến độ', () => {
  it('liệt kê các nhóm chưa có dữ liệu (không fail)', () => {
    const missing = LESSON_SECTIONS.filter(s => !lessons[s.sid]).map(s => s.sid)
    console.log('Còn thiếu dữ liệu:', missing.join(', ') || '(không còn)')
    expect(present.length).toBeGreaterThan(0)
  })
})
