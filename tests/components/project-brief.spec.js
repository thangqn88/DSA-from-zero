import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectBrief from '../../src/components/ProjectBrief.vue'

const projectBrief = {
  title: 'Bộ đếm tần suất từ',
  why: 'Bước đầu của mọi công cụ phân tích văn bản.',
  input: 'File .txt bất kỳ',
  must: ['Đọc file, tách từ, đếm', 'Tự cài hash table'],
  done: ['Chạy file 1MB dưới 1 giây'],
  traps: ['Quên xử lý va chạm'],
}

const capstoneBrief = {
  ...projectBrief,
  title: 'bench — công cụ đo hiệu năng',
  uses: ['do-phuc-tap', 'mang-chuoi'],
  reuses: [],
  stretch: ['Xuất kết quả ra CSV'],
  data: { format: 'CSV hai cột', sample: 'n,ms\n1000,12', url: 'https://example.org/data' },
}

describe('ProjectBrief', () => {
  it('chế độ project hiện đủ các khối nội dung', () => {
    const w = mount(ProjectBrief, { props: { brief: projectBrief } })
    const text = w.text()
    expect(text).toContain('Bộ đếm tần suất từ')
    expect(text).toContain('Bước đầu của mọi công cụ')
    expect(text).toContain('File .txt bất kỳ')
    expect(text).toContain('Tự cài hash table')
    expect(text).toContain('Chạy file 1MB dưới 1 giây')
    expect(text).toContain('Quên xử lý va chạm')
  })

  it('chế độ project không hiện khối riêng của capstone', () => {
    const w = mount(ProjectBrief, { props: { brief: projectBrief } })
    expect(w.find('.pb-capstone').exists()).toBe(false)
    expect(w.text()).not.toContain('Dữ liệu mẫu')
  })

  it('chế độ capstone hiện nhãn MVP, dữ liệu mẫu và link tải', () => {
    const w = mount(ProjectBrief, { props: { brief: capstoneBrief, mode: 'capstone' } })
    expect(w.find('.pb-capstone').exists()).toBe(true)
    expect(w.text()).toContain('Dự án MVP cuối chương')
    expect(w.text()).toContain('Dữ liệu mẫu')
    expect(w.find('a.pb-data-link').attributes('href')).toBe('https://example.org/data')
  })

  it('không hiện khối kế thừa khi reuses rỗng', () => {
    const w = mount(ProjectBrief, { props: { brief: capstoneBrief, mode: 'capstone' } })
    expect(w.find('.pb-reuse').exists()).toBe(false)
  })

  it('liệt kê module bắt buộc dùng lại khi có', () => {
    const brief = { ...capstoneBrief, reuses: [{ chapter: 2, module: 'sort' }] }
    const w = mount(ProjectBrief, { props: { brief, mode: 'capstone' } })
    expect(w.find('.pb-reuse').exists()).toBe(true)
    expect(w.text()).toContain('Chương 2')
    expect(w.text()).toContain('sort')
  })

  it('không dùng thẻ i, đúng luật không chữ nghiêng', () => {
    const w = mount(ProjectBrief, { props: { brief: capstoneBrief, mode: 'capstone' } })
    expect(w.html()).not.toContain('<i>')
    expect(w.html()).not.toContain('<em>')
  })
})
