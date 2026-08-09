import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  CHAPTERS, navTop, navGroups, allSectionIds, DEFAULT_ID, FIRST_LESSON_ID,
} from '../src/lesson/parts.js'

describe('nav.js cũ đã bị xoá', () => {
  it('không còn file src/data/nav.js', () => {
    expect(existsSync(resolve(__dirname, '..', 'src/data/nav.js'))).toBe(false)
  })
})

describe('dữ liệu menu trái suy ra từ CHAPTERS', () => {
  it('có đúng 7 nhóm, nhãn mang số chương và tên chương', () => {
    expect(navGroups).toHaveLength(7)
    expect(navGroups[0].label).toBe('Chương 1 — Nền móng')
    expect(navGroups[6].label).toBe('Chương 7 — Chuyên đề và giới hạn')
  })

  it('thứ tự và số lượng bài khớp CHAPTERS', () => {
    const fromNav = navGroups.flatMap(g => g.items.map(i => i.id))
    const fromChapters = CHAPTERS.flatMap(c => c.lessons.map(l => l.sid))
    expect(fromNav).toEqual(fromChapters)
  })

  it('mỗi mục mang theo cờ ready để sidebar biết bài nào chưa viết', () => {
    const items = navGroups.flatMap(g => g.items)
    expect(items.every(i => typeof i.ready === 'boolean')).toBe(true)
  })

  it('navTop chỉ có trang chủ', () => {
    expect(navTop).toHaveLength(1)
    expect(navTop[0].id).toBe('trang-chu')
  })

  it('allSectionIds chỉ chứa trang chủ và các bài đã viết', () => {
    const moiBai = CHAPTERS.flatMap(c => c.lessons)
    expect(allSectionIds).toContain('trang-chu')
    for (const l of moiBai) {
      if (l.ready) expect(allSectionIds).toContain(l.sid)
      else expect(allSectionIds).not.toContain(l.sid)
    }
  })

  it('FIRST_LESSON_ID là bài ready đầu tiên theo thứ tự học', () => {
    expect(FIRST_LESSON_ID).toBe('do-phuc-tap')
  })

  it('DEFAULT_ID vẫn là trang chủ', () => {
    expect(DEFAULT_ID).toBe('trang-chu')
  })
})
