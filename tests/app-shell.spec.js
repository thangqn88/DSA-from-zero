import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import App from '../src/App.vue'
import { LESSON_SECTIONS } from '../src/lesson/parts.js'

// Bố cục khung ngoài không có test nào che, mà nó lại là chỗ dễ vỡ nhất khi
// sửa giao diện. Test ở đây chốt lại hành vi gấp/mở menu và vài luật đã bỏ.
function mountApp() {
  return mount(App, { attachTo: document.body })
}

describe('khung ngoài của app', () => {
  it('chỉ bài đã viết mới là link bấm được', () => {
    const w = mountApp()
    const soReady = LESSON_SECTIONS.filter(s => s.ready).length
    // Trang chủ + Bắt đầu học + mỗi bài đã viết một link.
    expect(w.findAll('.sb-list a').length).toBe(soReady + 2)
    w.unmount()
  })

  it('bài chưa viết vẫn hiện trên sidebar nhưng không bấm được', () => {
    const w = mountApp()
    const soChuaViet = LESSON_SECTIONS.filter(s => !s.ready).length
    const soon = w.findAll('.sb-soon')
    expect(soon.length).toBe(soChuaViet)
    expect(soon[0].element.tagName).toBe('SPAN')
    expect(soon[0].text()).toContain('sắp có')
    w.unmount()
  })

  it('sidebar gom bài theo đúng 7 chương', () => {
    const w = mountApp()
    const groups = w.findAll('.sb-group')
    expect(groups.length).toBe(7)
    expect(groups[0].text()).toBe('Chương 1 — Nền móng')
    w.unmount()
  })

  it('không còn khối tiêu đề trang, nhưng vẫn giữ đúng 1 thẻ h1 cho trình đọc màn hình', () => {
    const w = mountApp()
    expect(w.find('.page-header').exists()).toBe(false)
    const h1 = w.findAll('h1')
    expect(h1.length).toBe(1)
    expect(h1[0].classes()).toContain('sr-only')
    w.unmount()
  })

  it('không còn dấu sao ở menu trái', () => {
    const w = mountApp()
    expect(w.find('.sb-exam').exists()).toBe(false)
    w.unmount()
  })

  it('danh sách nhóm mặc định gấp lại, bấm nút thì mở ra', async () => {
    const w = mountApp()
    const toggle = w.find('.sb-toggle')
    expect(toggle.exists()).toBe(true)
    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(w.find('.sb-list').classes()).not.toContain('open')

    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(w.find('.sb-list').classes()).toContain('open')
    w.unmount()
  })

  it('chọn xong một nhóm thì menu tự gấp lại', async () => {
    const w = mountApp()
    await w.find('.sb-toggle').trigger('click')
    expect(w.find('.sb-list').classes()).toContain('open')

    const links = w.findAll('.sb-list a')
    await links[links.length - 1].trigger('click')

    expect(w.find('.sb-list').classes()).not.toContain('open')
    expect(w.find('.sb-toggle').attributes('aria-expanded')).toBe('false')
    w.unmount()
  })

  it('nhãn trên nút gấp/mở cho biết đang đứng ở nhóm nào', async () => {
    const w = mountApp()
    const links = w.findAll('.sb-list a')
    const target = links[links.length - 1]
    const label = target.text()

    await target.trigger('click')
    expect(w.find('.sb-toggle-text').text()).toBe(label)
    w.unmount()
  })

  it('menu bài tập bên phải là thẻ div khi màn rộng, không phải nút', async () => {
    // jsdom không có matchMedia nên compactMenu giữ false — đúng nhánh màn rộng.
    const w = mountApp()
    // Trang chủ không có menu bài tập, phải vào một nhóm kiến thức trước.
    const links = w.findAll('.sb-list a')
    await links[links.length - 1].trigger('click')

    const label = w.find('.em-label')
    expect(label.exists()).toBe(true)
    expect(label.element.tagName).toBe('DIV')
    expect(label.attributes('aria-expanded')).toBeUndefined()
    w.unmount()
  })
})

describe('nguồn dữ liệu điều hướng', () => {
  const src = readFileSync(resolve(__dirname, '..', 'src/App.vue'), 'utf8')

  it('App.vue lấy dữ liệu menu từ parts.js, không từ data/nav.js', () => {
    expect(src).toContain('from "./lesson/parts.js"')
    expect(src).not.toContain('data/nav.js')
  })

  it('nút Bắt đầu học trỏ tới bài ready đầu tiên, không hardcode sid', () => {
    expect(src).toContain('goToId(FIRST_LESSON_ID)')
    expect(src).not.toContain("goToId('quay-lui-xau-nhi-phan')")
  })

  it('style.css có lớp sb-soon giữ chiều cao chạm tối thiểu 44px', () => {
    const css = readFileSync(resolve(__dirname, '..', 'src/style.css'), 'utf8')
    const khoi = css.match(/\.sidebar \.sb-soon\s*\{[^}]*\}/)
    expect(khoi).not.toBeNull()
    expect(khoi[0]).toMatch(/min-height:\s*44px/)
  })
})
