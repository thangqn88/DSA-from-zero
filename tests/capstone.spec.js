import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { CHAPTERS, allSectionIds, chapterProjectId } from '../src/lesson/parts.js'
import { capstones, capstoneCuaChuong } from '../src/data/capstones/index.js'
import ChapterProject from '../src/components/ChapterProject.vue'

const san = CHAPTERS.filter(c => c.capstoneReady)

describe('capstone', () => {
  it('chỉ chương đã bật cờ mới có dữ liệu MVP', () => {
    for (const c of CHAPTERS) {
      expect(!!capstones[c.key]).toBe(c.capstoneReady)
    }
  })

  it('capstoneCuaChuong trả null cho chương chưa có MVP', () => {
    const chuaCo = CHAPTERS.find(c => !c.capstoneReady)
    expect(capstoneCuaChuong(chuaCo.key)).toBeNull()
  })

  describe.each(san)('chương $key', ({ key, num }) => {
    const cap = capstoneCuaChuong(key)

    // Mười ba trường của một dự án chương. Thiếu một trường là người học đọc
    // xong vẫn không biết bắt đầu từ đâu hoặc coi thế nào là xong.
    it('đủ mười ba trường của schema capstone', () => {
      for (const k of [
        'title', 'ketChuong', 'why', 'needs', 'input', 'output', 'outputSample',
        'start', 'must', 'done', 'traps', 'uses', 'data',
      ]) {
        expect(cap[k], `chương ${key} thiếu trường ${k}`).toBeDefined()
      }
      for (const k of ['title', 'ketChuong', 'why', 'input', 'output', 'outputSample']) {
        expect(typeof cap[k]).toBe('string')
        expect(cap[k].length).toBeGreaterThan(10)
      }
      for (const k of ['needs', 'must', 'done', 'traps', 'uses', 'start']) {
        expect(Array.isArray(cap[k])).toBe(true)
      }
      expect(typeof cap.data.format).toBe('string')
      expect(typeof cap.data.sample).toBe('string')
      // url là tuỳ chọn: có MVP không đọc dữ liệu ngoài nào cả (Chương 1 tự
      // sinh số đo của chính nó). Nhưng đã khai thì phải là link tải công khai.
      if (cap.data.url !== undefined) expect(cap.data.url).toMatch(/^https:\/\//)
    })

    it('có tối thiểu 3 yêu cầu bắt buộc và 4 tiêu chí nghiệm thu', () => {
      expect(cap.must.length).toBeGreaterThanOrEqual(3)
      // MVP cuối chương lắp nhiều module lại, nên cần nhiều tiêu chí hơn một dự
      // án của bài lẻ — mỗi module phải có ít nhất một chỗ để chấm.
      expect(cap.done.length).toBeGreaterThanOrEqual(4)
    })

    it('mỗi tiêu chí nghiệm thu đều kèm cách kiểm cụ thể', () => {
      for (const [i, d] of cap.done.entries()) {
        expect(d, `AC${i + 1} còn là chuỗi, chưa tách thành { dat, kiem }`).toBeTypeOf('object')
        expect(typeof d.dat).toBe('string')
        expect(typeof d.kiem, `AC${i + 1} thiếu cách kiểm`).toBe('string')
        expect(d.kiem.length).toBeGreaterThan(25)
      }
    })

    it('trả lời được "cần biết trước", "đầu ra là gì", "bắt đầu từ đâu"', () => {
      expect(Array.isArray(cap.needs)).toBe(true)
      expect(cap.needs.length).toBeGreaterThanOrEqual(3)
      expect(typeof cap.output).toBe('string')
      expect(cap.output.length).toBeGreaterThan(40)
      expect(Array.isArray(cap.start)).toBe(true)
      expect(cap.start.length).toBeGreaterThanOrEqual(4)
    })

    it('uses chỉ trỏ tới sid có thật', () => {
      const moiSid = CHAPTERS.flatMap(c => c.lessons.map(l => l.sid))
      expect(cap.uses.length).toBeGreaterThan(0)
      for (const u of cap.uses) expect(moiSid).toContain(u)
    })

    // Bảy dự án độc lập với nhau: người bỏ qua chương trước vẫn làm được. reuses
    // chỉ là GỢI Ý dùng lại code cũ, nên nó được phép vắng mặt hoặc rỗng.
    it('reuses không bắt buộc, nhưng có thì chỉ trỏ về chương trước', () => {
      if (cap.reuses === undefined) return
      expect(Array.isArray(cap.reuses)).toBe(true)
      for (const r of cap.reuses) {
        expect(r.chapter).toBeLessThan(num)
        expect(typeof r.module).toBe('string')
      }
    })

    // Dự án dùng kiến thức của CẢ chương, không phải của một bài.
    it('uses kể tên mọi bài của chương', () => {
      const trongChuong = CHAPTERS.find(c => c.key === key).lessons.map(l => l.sid)
      expect([...cap.uses].sort()).toEqual([...trongChuong].sort())
    })
  })
})

// Dự án của chương đứng thành section riêng, không nằm trong bài nào. Luật này
// thay cho luật cũ "bài cuối chương render ProjectBrief" — kiến trúc đó đã chết.
describe('section dự án của chương', () => {
  describe.each(san)('chương $key', ({ key }) => {
    it('có id dự án trong allSectionIds', () => {
      expect(allSectionIds).toContain(chapterProjectId(key))
    })

    it('mount ChapterProject cho đúng một khối capstone, tiêu đề khớp dữ liệu', () => {
      const w = mount(ChapterProject, { props: { chapterKey: key, active: true } })
      expect(w.findAll('.pb-capstone')).toHaveLength(1)
      expect(w.get('.pb-capstone .pb-title').text()).toBe(capstoneCuaChuong(key).title)
      // Bốn thứ App.vue phụ thuộc vào.
      const sec = w.get('section.day-section')
      expect(sec.attributes('id')).toBe(chapterProjectId(key))
      expect(sec.attributes('data-sid')).toBe(chapterProjectId(key))
    })

    it('không có khối dự án nào khác lọt vào trang này', () => {
      const w = mount(ChapterProject, { props: { chapterKey: key, active: true } })
      expect(w.findAll('.pb')).toHaveLength(1)
    })
  })
})
