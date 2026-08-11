import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { CHAPTERS, sidToFile, sidToMd } from '../src/lesson/parts.js'
import { capstones, capstoneCuaChuong } from '../src/data/capstones/index.js'
import { lessons } from '../src/data/lessons/index.js'
import LessonRenderer from '../src/components/LessonRenderer.vue'

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

// MVP của chương hiện trong Phần 7 của bài cuối chương. Luật này chỉ ép khi cả
// hai đã sẵn sàng — chương đã có dữ liệu MVP và bài cuối đã được viết — nên nó
// không đỏ oan trong lúc MVP viết trước bài cuối.
describe('bài cuối chương hiển thị MVP của chương', () => {
  const root = resolve(__dirname, '..')
  const canKiem = CHAPTERS.filter(c => c.capstoneReady && c.lessons.at(-1).ready)

  it('có ít nhất một chương đủ điều kiện kiểm, hoặc chưa tới lúc', () => {
    expect(Array.isArray(canKiem)).toBe(true)
  })

  describe.each(canKiem)('chương $key', ({ key, lessons: baiTrongChuong }) => {
    const cuoi = baiTrongChuong.at(-1)
    const laMd = existsSync(resolve(root, sidToMd(cuoi.sid)))

    // Bài Markdown không có file section riêng, nên đọc mã nguồn không kiểm được
    // gì cả — LessonRenderer.vue suy chỗ hiển thị MVP ra từ CHAPTERS. Ở đây mount
    // thật bài cuối chương rồi nhìn vào DOM, cách kiểm chặt hơn hẳn đọc chuỗi.
    if (laMd) {
      const wrapper = mount(LessonRenderer, { props: { sid: cuoi.sid, active: true } })

      it('bài cuối render ProjectBrief ở chế độ capstone', () => {
        expect(wrapper.findAll('.pb-capstone')).toHaveLength(1)
      })

      it('bài cuối lấy MVP đúng khoá chương của mình', () => {
        expect(wrapper.get('.pb-capstone .pb-title').text()).toBe(capstoneCuaChuong(key).title)
      })

      it('bài cuối vẫn giữ cả bài luyện tay của riêng nó', () => {
        const rieng = wrapper.findAll('.pb:not(.pb-capstone)')
        expect(rieng).toHaveLength(1)
        expect(rieng[0].get('.pb-title').text()).toBe(lessons[cuoi.sid].project.title)
      })
      return
    }

    const src = readFileSync(resolve(root, sidToFile(cuoi.sid)), 'utf8')

    it('bài cuối render ProjectBrief ở chế độ capstone', () => {
      expect(src).toContain('mode="capstone"')
    })

    it('bài cuối lấy MVP đúng khoá chương của mình', () => {
      expect(src).toContain(`capstoneCuaChuong('${key}')`)
    })

    it('bài cuối vẫn giữ cả bài luyện tay của riêng nó', () => {
      expect(src).toContain(':brief="data.project"')
    })
  })
})
