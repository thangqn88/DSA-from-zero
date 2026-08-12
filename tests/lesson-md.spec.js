import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { parseLessonMd, slug } from '../src/lesson/md.js'
import { mdLessons, mdSids } from '../src/lesson/mdLessons.js'
import { lessons } from '../src/data/lessons/index.js'
import { LESSON_PARTS, LESSON_SECTIONS, partId } from '../src/lesson/parts.js'
import LessonRenderer from '../src/components/LessonRenderer.vue'

const SLOT = ['de-bai', 'y-tuong', 'thuat-toan', 'chay-tay', 'code', 'toi-uu']
const root = resolve(__dirname, '..')

// Bài tối thiểu hợp lệ, dùng làm nền cho các phép thử cú pháp bên dưới.
function baiToiThieu(them = '') {
  return [
    '@part ly-thuyet',
    'Nội dung lý thuyết.',
    '@part vi-sao',
    'Nội dung vì sao.',
    '@part vi-du',
    '@vidu vd-x | Một ví dụ',
    ...SLOT.flatMap(s => [`@slot ${s}`, `Nội dung ${s}.`]),
    them,
  ].join('\n')
}

describe('cú pháp Markdown bài học', () => {
  it('đọc được một bài tối thiểu hợp lệ', () => {
    const r = parseLessonMd(baiToiThieu())
    expect(r.parts['ly-thuyet']).toContain('Nội dung lý thuyết')
    expect(r.examples).toHaveLength(1)
    expect(r.examples[0].id).toBe('vd-x')
    expect(r.examples[0].title).toBe('Một ví dụ')
    expect(r.examples[0].official).toBe(false)
    for (const s of SLOT) expect(r.examples[0].slots[s]).toContain(`Nội dung ${s}`)
  })

  it('nhận cờ ví dụ sao qua @vidu*', () => {
    const src = baiToiThieu().replace('@vidu vd-x', '@vidu* vd-x')
    expect(parseLessonMd(src).examples[0].official).toBe(true)
  })

  // Đây là con bọ đã sống sót qua 5 bài ở thời viết bằng .vue: thiếu một slot thì
  // nhãn vẫn hiện mà bên dưới trống trơn, build vẫn xanh. Giờ nó làm đỏ build.
  it('báo lỗi khi một ví dụ thiếu slot', () => {
    const src = baiToiThieu().replace('@slot toi-uu\nNội dung toi-uu.', '')
    expect(() => parseLessonMd(src)).toThrow(/thiếu nội dung cho @slot toi-uu/)
  })

  it('báo lỗi khi slot có tiêu đề nhưng không có nội dung', () => {
    const src = baiToiThieu().replace('Nội dung chay-tay.', '')
    expect(() => parseLessonMd(src)).toThrow(/@slot chay-tay/)
  })

  it('báo lỗi với tên mục hoặc tên slot lạ', () => {
    expect(() => parseLessonMd(baiToiThieu().replace('@part vi-sao', '@part vi-sao-gi-do')))
      .toThrow(/không thuộc khung bài học/)
    expect(() => parseLessonMd(baiToiThieu().replace('@slot code', '@slot code-mau')))
      .toThrow(/không có trong WorkedExample/)
  })

  it('báo lỗi khi hai ví dụ trùng id', () => {
    const src = baiToiThieu(
      ['@vidu vd-x | Ví dụ khác', ...SLOT.flatMap(s => [`@slot ${s}`, 'x'])].join('\n'),
    )
    expect(() => parseLessonMd(src)).toThrow(/hai ví dụ cùng id/)
  })

  it('báo lỗi khi có nội dung trước @part đầu tiên', () => {
    expect(() => parseLessonMd('Lạc đề.\n' + baiToiThieu())).toThrow(/trước @part đầu tiên/)
  })

  it('báo lỗi khi thiếu hẳn một mục văn xuôi', () => {
    const src = baiToiThieu().replace('@part vi-sao\nNội dung vì sao.\n', '')
    expect(() => parseLessonMd(src)).toThrow(/thiếu nội dung cho @part vi-sao/)
  })

  it('gắn class formula-table cho mọi bảng, không cần tác giả viết HTML', () => {
    const src = baiToiThieu().replace(
      'Nội dung lý thuyết.',
      'Nội dung lý thuyết.\n\n| A | B |\n|---|---|\n| 1 | 2 |',
    )
    expect(parseLessonMd(src).parts['ly-thuyet']).toContain('<table class="formula-table">')
  })

  it('sinh id không dấu cho tiêu đề trong thân bài', () => {
    expect(slug('Hệ số tải, nở bảng')).toBe('he-so-tai-no-bang')
    expect(slug('Đệ quy')).toBe('de-quy')
    const src = baiToiThieu().replace('Nội dung lý thuyết.', '### Tủ đựng đồ\n\nNội dung lý thuyết.')
    expect(parseLessonMd(src).parts['ly-thuyet']).toContain('id="auto-tu-dung-do"')
  })
})

describe.each(mdSids)('bài Markdown: %s', (sid) => {
  const noiDung = mdLessons[sid]
  const data = lessons[sid]

  it('có dữ liệu có cấu trúc đi kèm trong src/data/lessons', () => {
    expect(data, `thiếu src/data/lessons/${sid}.js`).toBeTypeOf('object')
  })

  it('nằm trong CHAPTERS và đã bật cờ ready', () => {
    const s = LESSON_SECTIONS.find(l => l.sid === sid)
    expect(s, `sid "${sid}" không có trong CHAPTERS`).toBeTruthy()
    expect(s.ready, `bài ${sid} đã có file .md nhưng chưa bật cờ ready`).toBe(true)
  })

  it('examples trong dữ liệu chính là các @vidu của file .md', () => {
    expect(data.examples.map(e => e.id)).toEqual(noiDung.examples.map(e => e.id))
  })

  it('không còn escape HTML bằng tay trong khối code', () => {
    for (const html of Object.values(noiDung.parts)) {
      expect(html).not.toContain('&amp;lt;')
      expect(html).not.toContain('v-pre')
    }
  })
})

describe('LessonRenderer dựng đủ khung bài học', () => {
  const sid = mdSids[0]
  const wrapper = mount(LessonRenderer, { props: { sid, active: true } })
  const el = wrapper.element

  it('giữ nguyên hợp đồng với App.vue', () => {
    const sec = el.matches('section') ? el : el.querySelector('section')
    expect(sec.classList.contains('day-section')).toBe(true)
    expect(sec.getAttribute('data-sid')).toBe(sid)
    expect(sec.getAttribute('id')).toBe(sid)
  })

  it('lấy tiêu đề bài từ CHAPTERS chứ không từ file .md', () => {
    const s = LESSON_SECTIONS.find(l => l.sid === sid)
    expect(wrapper.get('h2').text()).toBe(s.title)
  })

  it('render đủ mọi mục của khung bài học', () => {
    for (const p of LESSON_PARTS) {
      if (p.key === 'muc-tieu') {
        expect(wrapper.find('.lesson-goal').exists()).toBe(true)
        continue
      }
      expect(wrapper.find(`#${partId(sid, p.key)}`).exists(), `thiếu mục ${p.key}`).toBe(true)
    }
  })

  it('render đủ mọi ví dụ điển hình, mỗi ví dụ đủ 6 phần có nội dung', () => {
    const vd = mdLessons[sid].examples
    for (const e of vd) {
      expect(wrapper.find(`#${e.id}`).exists(), `thiếu neo ${e.id}`).toBe(true)
    }
    const bodies = wrapper.findAll('.md-body')
    // 2 mục văn xuôi + 6 phần cho mỗi ví dụ
    expect(bodies).toHaveLength(2 + vd.length * 6)
    for (const b of bodies) expect(b.element.textContent.trim().length).toBeGreaterThan(0)
  })

  it('dùng lại đúng các component chung thay vì HTML viết tay', () => {
    expect(wrapper.find('.quiz').exists()).toBe(true)
    expect(wrapper.findAll('.worked-example')).toHaveLength(mdLessons[sid].examples.length)
  })
})

// Đây là câu hỏi kiến trúc thật sự của việc bỏ file .vue: điểm neo widget nằm
// trong HTML thô, nhúng bằng v-html — Vue không biên dịch nội dung đó. Nó VẪN nằm
// trong DOM thật, nên getElementById tìm thấy; nhưng khẳng định suông thì không
// đáng tin, nên ở đây mount thật rồi bấm thật.
const coWidgetSids = mdSids.filter(sid => existsSync(resolve(root, `src/widgets/${sid}.js`)))

describe.each(coWidgetSids)('widget của bài Markdown: %s', (sid) => {
  const nguon = readFileSync(resolve(root, `src/widgets/${sid}.js`), 'utf8')
  const idTrucTiep = [...nguon.matchAll(/getElementById\('([^']+)'/g)].map(m => m[1])
  // makeStepper(prefix, ...) tự ghép prefix với 5 hậu tố cố định.
  const prefix = [...nguon.matchAll(/makeStepper\('([^']+)'/g)].map(m => m[1])
  const idStepper = prefix.flatMap(p =>
    ['Next', 'Prev', 'Reset', 'StepNum', 'StepTotal'].map(h => p + h),
  )

  const wrapper = mount(LessonRenderer, {
    props: { sid, active: true },
    attachTo: document.body,
  })

  it('tìm được id widget mà kịch bản JS gọi tới', () => {
    expect(idTrucTiep.length + idStepper.length).toBeGreaterThan(0)
    for (const id of [...new Set([...idTrucTiep, ...idStepper])]) {
      expect(document.getElementById(id), `thiếu điểm neo #${id}`).not.toBeNull()
    }
  })

  // JS đã ghi được vào vùng v-html: các khung vẽ trong file .md để rỗng, nội dung
  // bên trong chúng hoàn toàn do widget dựng lúc chạy.
  it('widget vẽ được nội dung vào đúng vùng nhúng bằng v-html', () => {
    const daVe = idTrucTiep.filter(id => (document.getElementById(id)?.innerHTML ?? '') !== '')
    expect(daVe.length, 'không khung nào được widget vẽ vào').toBeGreaterThan(0)
  })

  it('nút bấm của widget điều khiển được từng bước', () => {
    for (const p of prefix) {
      const tong = Number(document.getElementById(p + 'StepTotal').textContent)
      expect(tong, `stepper ${p} không dựng được bước nào`).toBeGreaterThan(0)

      const soBuoc = () => document.getElementById(p + 'StepNum').textContent
      expect(soBuoc(), `stepper ${p} không khởi động ở bước 0`).toBe('0')
      document.getElementById(p + 'Next').click()
      expect(soBuoc(), `stepper ${p} không tiến được`).toBe('1')
      document.getElementById(p + 'Prev').click()
      expect(soBuoc(), `stepper ${p} không lùi được`).toBe('0')
    }
  })

  it('mount được mà không ném lỗi nào từ initWidgets', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
