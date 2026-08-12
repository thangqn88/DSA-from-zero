import { describe, it, expect } from 'vitest'
import { buildMenu, menuTuDuLieu } from '../src/data/menu.js'
import { lessons } from '../src/data/lessons/index.js'
import { LESSON_PARTS, CHAPTERS, chapterProjectId } from '../src/lesson/parts.js'
import menusData from '../src/data/menus.json'

describe('buildMenu', () => {
  it('sinh đúng 7 mục chuẩn cho section có dữ liệu bài học', () => {
    const menu = buildMenu('quay-lui-xau-nhi-phan')
    const ids = menu.map(m => m.id)
    expect(menu.filter(m => m.level === 3)).toHaveLength(LESSON_PARTS.length)
    expect(ids).toContain('quay-lui-xau-nhi-phan--muc-tieu')
    expect(ids).toContain('quay-lui-xau-nhi-phan--leetcode')
    expect(menu.find(m => m.id.endsWith('--quiz')).label).toBe('3. Quiz kiểm tra lý thuyết')
    expect(menu.at(-1).label).toBe('6. Tài nguyên tự luyện LeetCode')
  })

  it('chèn ví dụ ngay sau mục Ví dụ điển hình, ở level 4', () => {
    const menu = buildMenu('quay-lui-xau-nhi-phan')
    const at = menu.findIndex(m => m.id.endsWith('--vi-du'))
    const first = lessons['quay-lui-xau-nhi-phan'].examples[0]
    expect(menu[at + 1].id).toBe(first.id)
    expect(menu[at + 1].level).toBe(4)
    expect(menu[at + 1].official).toBe(first.official)
  })

  // Bài học kết ở mục 6. Dự án thực hành là section riêng của chương, không phải
  // một mục trong bài — sinh nó ở đây sẽ tạo một link trỏ vào hư không.
  it('không sinh mục Dự án thực hành trong menu của bài', () => {
    for (const sid of Object.keys(lessons)) {
      expect(buildMenu(sid).map(m => m.id)).not.toContain(`${sid}--du-an`)
    }
    expect(menuTuDuLieu('vi-du-sid', lessons['dsu']).map(m => m.id))
      .not.toContain('vi-du-sid--du-an')
  })

  // Trang dự án là bản đặc tả đọc một mạch, không có menu bài tập bên phải.
  // App.vue có v-if="currentMenu.length" nên khung menu tự biến mất.
  it('trả mảng rỗng cho id trang dự án của chương', () => {
    for (const c of CHAPTERS) {
      expect(buildMenu(chapterProjectId(c.key))).toEqual([])
    }
  })

  it('trả về menu từ menus.json cho section không phải bài học', () => {
    expect(buildMenu('trang-chu')).toEqual(menusData['trang-chu'])
  })

  it('trả mảng rỗng cho id lạ', () => {
    expect(buildMenu('khong-ton-tai')).toEqual([])
  })
})
