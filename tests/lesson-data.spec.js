import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { lessons } from '../src/data/lessons/index.js'
import { LESSON_SECTIONS, sidToFile, sidToMd } from '../src/lesson/parts.js'

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

    // Người dùng báo ngày 2026-08-11: đọc Phần 7 xong vẫn không biết bắt đầu từ
    // đâu, cần kiến thức gì, đầu ra là gì. Ba trường dưới đây trả lời đúng ba câu
    // đó, và luật này giữ cho không bài nào bỏ sót chúng.
    it('project trả lời được "cần biết gì", "đầu ra là gì", "bắt đầu từ đâu"', () => {
      expect(Array.isArray(p.needs), 'thiếu trường needs').toBe(true)
      expect(p.needs.length).toBeGreaterThanOrEqual(3)

      expect(typeof p.output, 'thiếu trường output').toBe('string')
      expect(p.output.length).toBeGreaterThan(40)

      expect(Array.isArray(p.start), 'thiếu trường start').toBe(true)
      expect(p.start.length).toBeGreaterThanOrEqual(4)
      // Bước đầu tiên phải là một việc nhỏ chạy được ngay, không phải một yêu cầu
      // tóm tắt lại cả dự án — đó chính là chỗ người mới bị chặn.
      expect(p.start[0].length).toBeGreaterThan(40)
    })

    it('có tối thiểu 2 yêu cầu bắt buộc và 3 tiêu chí nghiệm thu', () => {
      expect(p.must.length).toBeGreaterThanOrEqual(2)
      expect(p.done.length).toBeGreaterThanOrEqual(3)
    })

    // Một tiêu chí không nói CÁCH kiểm thì người học không tự chấm được, và nó
    // quay về đúng thứ văn xuôi mà phản hồi ngày 2026-08-11 phàn nàn.
    it('mỗi tiêu chí nghiệm thu đều kèm cách kiểm cụ thể', () => {
      for (const [i, d] of p.done.entries()) {
        expect(d, `AC${i + 1} còn là chuỗi, chưa tách thành { dat, kiem }`).toBeTypeOf('object')
        expect(typeof d.dat).toBe('string')
        expect(d.dat.length).toBeGreaterThan(15)
        expect(typeof d.kiem, `AC${i + 1} thiếu cách kiểm`).toBe('string')
        expect(d.kiem.length, `AC${i + 1} có cách kiểm quá sơ sài`).toBeGreaterThan(25)
      }
    })

    it('yêu cầu cuối cùng bắc cầu về kiến thức cũ', () => {
      expect(p.must.at(-1).length).toBeGreaterThan(20)
    })

    it('có tối thiểu 1 câu quiz ôn lại kiến thức cũ', () => {
      const recalls = lessons[sid].quiz.filter(q => q.recall === true)
      expect(recalls.length).toBeGreaterThanOrEqual(1)
    })

    it('section render Phần 7 bằng ProjectBrief', () => {
      // Bài Markdown không có file section riêng: LessonRenderer.vue dựng Phần 7
      // cho mọi bài có data.project, nên chỗ cần kiểm là component chung.
      const file = existsSync(resolve(root, sidToMd(sid)))
        ? 'src/components/LessonRenderer.vue'
        : sidToFile(sid)
      const src = readFileSync(resolve(root, file), 'utf8')
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
