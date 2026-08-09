import { describe, it, expect } from 'vitest'
import { CHAPTERS } from '../src/lesson/parts.js'
import { capstones, capstoneCuaChuong } from '../src/data/capstones/index.js'

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

    it('đủ trường của schema capstone', () => {
      for (const k of ['title', 'why', 'input']) {
        expect(typeof cap[k]).toBe('string')
        expect(cap[k].length).toBeGreaterThan(10)
      }
      for (const k of ['must', 'done', 'traps', 'uses', 'reuses', 'stretch']) {
        expect(Array.isArray(cap[k])).toBe(true)
      }
      expect(typeof cap.data.format).toBe('string')
      expect(typeof cap.data.sample).toBe('string')
      // url là tuỳ chọn: có MVP không đọc dữ liệu ngoài nào cả (Chương 1 tự
      // sinh số đo của chính nó). Nhưng đã khai thì phải là link tải công khai.
      if (cap.data.url !== undefined) expect(cap.data.url).toMatch(/^https:\/\//)
    })

    it('có tối thiểu 3 yêu cầu bắt buộc và 2 tiêu chí xong', () => {
      expect(cap.must.length).toBeGreaterThanOrEqual(3)
      expect(cap.done.length).toBeGreaterThanOrEqual(2)
    })

    it('uses chỉ trỏ tới sid có thật', () => {
      const moiSid = CHAPTERS.flatMap(c => c.lessons.map(l => l.sid))
      expect(cap.uses.length).toBeGreaterThan(0)
      for (const u of cap.uses) expect(moiSid).toContain(u)
    })

    it('reuses chỉ trỏ tới chương có số nhỏ hơn', () => {
      for (const r of cap.reuses) {
        expect(r.chapter).toBeLessThan(num)
        expect(typeof r.module).toBe('string')
      }
    })

    it('chương từ 2 trở đi bắt buộc kế thừa tối thiểu 2 module', () => {
      // Chương 1 là gốc, không có chương trước để kế thừa.
      if (num === 1) expect(cap.reuses).toHaveLength(0)
      else expect(cap.reuses.length).toBeGreaterThanOrEqual(2)
    })
  })
})
