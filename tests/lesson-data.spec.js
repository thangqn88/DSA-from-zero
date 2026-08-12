import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { lessons } from '../src/data/lessons/index.js'
import { LESSON_SECTIONS, sidToFile, sidToMd } from '../src/lesson/parts.js'

const root = resolve(__dirname, '..')
const LEVELS = ['Easy', 'Medium', 'Hard']
const present = LESSON_SECTIONS.filter(s => lessons[s.sid])

// Mười bài viết trước khi luật quiz ôn tập ra đời. Giai đoạn 4 sẽ bổ sung câu
// recall cho từng bài rồi xoá dần tên khỏi danh sách này — nó là danh sách việc
// còn nợ, không phải một ngoại lệ vĩnh viễn, nên cố ý kể tên từng bài.
const MIEN_TRU_RECALL = new Set([
  'quay-lui-xau-nhi-phan', 'to-hop', 'tham-lam', 'qhd-nen-tang',
  'qhd-lis-lcs-doixung', 'ngan-xep-hang-doi', 'dfs-bfs', 'dsu',
  'cay-nhi-phan-bst', 'bst-nang-cao',
])

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

// Dự án thực hành thuộc về CẢ CHƯƠNG, không thuộc về bài. Trường project của bài
// đã bị xoá ở Giai đoạn 2.6 và không được dựng lại — nếu cần một dự án, viết nó
// ở src/data/capstones/<chapter-key>.js.
describe('bài học không có dự án riêng', () => {
  describe.each(present)('bài $sid', ({ sid }) => {
    it('không còn trường project', () => {
      expect(lessons[sid], `bài ${sid} còn trường project`).not.toHaveProperty('project')
    })
  })

  it('không component nào dựng Phần 7 cho bài học nữa', () => {
    const src = readFileSync(resolve(root, 'src/components/LessonRenderer.vue'), 'utf8')
    expect(src).not.toContain('part="du-an"')
    expect(src).not.toContain('<ProjectBrief')
    expect(src).not.toContain("from './ProjectBrief.vue'")
  })
})

// Mỗi bài phải có ít nhất một câu ôn lại bài trước, nếu không người học đi hết
// khoá mà chưa lần nào phải ngoái lại. Luật này trước kia chỉ ép với bài có Phần
// 7; giờ ép với MỌI bài đã viết, trừ danh sách còn nợ ở đầu file.
describe('quiz ôn tập bắc cầu về bài cũ', () => {
  const canKiem = LESSON_SECTIONS.filter(
    s => s.ready && lessons[s.sid] && !MIEN_TRU_RECALL.has(s.sid),
  )

  describe.each(canKiem)('bài $sid', ({ sid }) => {
    it('có tối thiểu 1 câu quiz recall', () => {
      const recalls = lessons[sid].quiz.filter(q => q.recall === true)
      expect(recalls.length).toBeGreaterThanOrEqual(1)
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
