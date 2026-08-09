import { describe, it, expect } from 'vitest'
import menusData from '../src/data/menus.json'
import { LESSON_SECTIONS } from '../src/lesson/parts.js'

describe('menus.json', () => {
  it('không còn giữ menu viết tay cho 10 nhóm kiến thức', () => {
    for (const s of LESSON_SECTIONS) {
      expect(menusData[s.sid]).toBeUndefined()
    }
  })

  it('vẫn giữ key cho trang chủ', () => {
    expect(menusData['trang-chu']).toBeDefined()
  })
})
