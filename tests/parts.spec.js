import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  LESSON_PARTS, LESSON_SECTIONS, CHAPTERS, sidToFile, sidToMd, partId, partTitle,
} from '../src/lesson/parts.js'

describe('parts', () => {
  it('có đúng 8 mục theo thứ tự chuẩn', () => {
    expect(LESSON_PARTS.map(p => p.key)).toEqual([
      'muc-tieu', 'ly-thuyet', 'vi-sao', 'quiz', 'vi-du', 'bai-tap', 'leetcode', 'du-an',
    ])
  })

  it('đánh số 1..7 cho 7 phần sau phần mở đầu', () => {
    expect(LESSON_PARTS[0].num).toBe(0)
    expect(LESSON_PARTS.slice(1).map(p => p.num)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('mục cuối là Dự án thực hành', () => {
    const last = LESSON_PARTS.at(-1)
    expect(last.key).toBe('du-an')
    expect(partTitle('du-an')).toBe('7. Dự án thực hành')
  })

  it('partId ghép sid với key bằng hai gạch ngang', () => {
    expect(partId('to-hop', 'quiz')).toBe('to-hop--quiz')
  })

  it('partTitle trả tiêu đề có tiền tố số cho phần đánh số', () => {
    expect(partTitle('quiz')).toBe('3. Quiz kiểm tra lý thuyết')
    expect(partTitle('muc-tieu')).toBe('Mục tiêu bài học')
  })

  it('liệt kê đủ 30 nhóm kiến thức của chương trình', () => {
    expect(LESSON_SECTIONS).toHaveLength(30)
    expect(LESSON_SECTIONS.map(s => s.sid)).toContain('dsu')
    for (const s of LESSON_SECTIONS) {
      expect(s.file).toMatch(/^src\/sections\/\w+\.vue$/)
    }
  })
})

describe('CHAPTERS — cấu trúc 7 chương', () => {
  it('có đúng 7 chương, đánh số 1..7 liên tục', () => {
    expect(CHAPTERS).toHaveLength(7)
    expect(CHAPTERS.map(c => c.num)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('có đúng 30 bài, không sid nào trùng', () => {
    const sids = CHAPTERS.flatMap(c => c.lessons.map(l => l.sid))
    expect(sids).toHaveLength(30)
    expect(new Set(sids).size).toBe(30)
  })

  it('giữ nguyên 10 sid cũ', () => {
    const sids = CHAPTERS.flatMap(c => c.lessons.map(l => l.sid))
    for (const old of [
      'quay-lui-xau-nhi-phan', 'to-hop', 'tham-lam', 'qhd-nen-tang',
      'qhd-lis-lcs-doixung', 'ngan-xep-hang-doi', 'dfs-bfs', 'dsu',
      'cay-nhi-phan-bst', 'bst-nang-cao',
    ]) {
      expect(sids).toContain(old)
    }
  })

  it('mọi bài đều khai báo đủ cờ ready và duAn', () => {
    for (const c of CHAPTERS) {
      for (const l of c.lessons) {
        expect(typeof l.ready).toBe('boolean')
        expect(typeof l.duAn).toBe('boolean')
        expect(l.title.length).toBeGreaterThan(0)
      }
    }
  })

  it('bài chưa viết thì chưa thể có Phần 7', () => {
    for (const c of CHAPTERS) {
      for (const l of c.lessons) {
        if (!l.ready) expect(l.duAn).toBe(false)
      }
    }
  })

  it('LESSON_SECTIONS suy ra đúng từ CHAPTERS, giữ thứ tự chương', () => {
    expect(LESSON_SECTIONS).toHaveLength(30)
    expect(LESSON_SECTIONS[0].sid).toBe('do-phuc-tap')
    expect(LESSON_SECTIONS[0].chapter).toBe('nen-mong')
    expect(LESSON_SECTIONS.at(-1).chapter).toBe('chuyen-de')
  })

  it('sidToFile đổi sid thành đường dẫn section đúng quy ước cũ', () => {
    expect(sidToFile('dfs-bfs')).toBe('src/sections/DfsBfs.vue')
    expect(sidToFile('qhd-lis-lcs-doixung')).toBe('src/sections/QhdLisLcsDoixung.vue')
    expect(sidToFile('do-phuc-tap')).toBe('src/sections/DoPhucTap.vue')
  })

  // Một bài "đã viết" tồn tại dưới đúng một trong hai dạng: file .md trong
  // src/content (khung do LessonRenderer.vue dựng) hoặc file .vue trong
  // src/sections (dạng cũ). Có cả hai là hai section cùng data-sid trong DOM.
  it('mọi bài ready đều có đúng một file nội dung tồn tại thật', () => {
    for (const s of LESSON_SECTIONS.filter(s => s.ready)) {
      const coVue = existsSync(resolve(__dirname, '..', s.file))
      const coMd = existsSync(resolve(__dirname, '..', sidToMd(s.sid)))
      expect(coVue || coMd, `bài ${s.sid} bật ready nhưng không có file nội dung`).toBe(true)
      expect(coVue && coMd, `bài ${s.sid} có cả .vue lẫn .md`).toBe(false)
    }
  })
})
