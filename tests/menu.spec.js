import { describe, it, expect } from 'vitest'
import { buildMenu } from '../src/data/menu.js'
import { lessons } from '../src/data/lessons/index.js'
import menusData from '../src/data/menus.json'

describe('buildMenu', () => {
  it('sinh 7 mục chuẩn cho section có dữ liệu bài học', () => {
    const menu = buildMenu('quay-lui-xau-nhi-phan')
    const ids = menu.map(m => m.id)
    expect(ids).toContain('quay-lui-xau-nhi-phan--muc-tieu')
    expect(ids).toContain('quay-lui-xau-nhi-phan--leetcode')
    expect(menu.find(m => m.id.endsWith('--quiz')).label).toBe('3. Quiz kiểm tra lý thuyết')
  })

  it('chèn ví dụ ngay sau mục Ví dụ điển hình, ở level 4', () => {
    const menu = buildMenu('quay-lui-xau-nhi-phan')
    const at = menu.findIndex(m => m.id.endsWith('--vi-du'))
    const first = lessons['quay-lui-xau-nhi-phan'].examples[0]
    expect(menu[at + 1].id).toBe(first.id)
    expect(menu[at + 1].level).toBe(4)
    expect(menu[at + 1].official).toBe(first.official)
  })

  it('trả về menu từ menus.json cho section không phải bài học', () => {
    expect(buildMenu('trang-chu')).toEqual(menusData['trang-chu'])
  })

  it('trả mảng rỗng cho id lạ', () => {
    expect(buildMenu('khong-ton-tai')).toEqual([])
  })
})
