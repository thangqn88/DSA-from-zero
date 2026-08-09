import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

// Bố cục khung ngoài không có test nào che, mà nó lại là chỗ dễ vỡ nhất khi
// sửa giao diện. Test ở đây chốt lại hành vi gấp/mở menu và vài luật đã bỏ.
function mountApp() {
  return mount(App, { attachTo: document.body })
}

describe('khung ngoài của app', () => {
  it('mount được và hiện đủ 11 mục điều hướng', () => {
    const w = mountApp()
    expect(w.findAll('.sb-list a').length).toBe(12) // 10 nhóm + Trang chủ + Bắt đầu học
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
