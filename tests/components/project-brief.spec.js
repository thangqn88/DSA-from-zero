import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectBrief from '../../src/components/ProjectBrief.vue'

const projectBrief = {
  title: 'Bộ đếm tần suất từ',
  why: 'Bước đầu của mọi công cụ phân tích văn bản.',
  needs: ['Hàm băm và va chạm', 'C++ đọc file bằng ifstream'],
  input: 'File .txt bất kỳ',
  output: 'Danh sách 20 từ hay gặp nhất',
  outputSample: 'the | 61022\nof | 32117',
  start: ['Đọc file và đếm số từ, chưa băm gì cả', 'Cài bảng cố định 16 ngăn'],
  must: ['Đọc file, tách từ, đếm', 'Tự cài hash table'],
  done: [
    { dat: 'Chạy file 1MB dưới 1 giây', kiem: 'time ./demtu sach.txt, cột real dưới 1s' },
  ],
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

  // Bốn khối này sinh ra từ phản hồi ngày 2026-08-11: đọc Phần 7 xong vẫn không
  // biết cần biết gì, đầu ra là gì, bắt đầu từ đâu, và làm sao biết là xong.
  it('trả lời đủ bốn câu người mới hay hỏi', () => {
    const w = mount(ProjectBrief, { props: { brief: projectBrief } })
    const text = w.text()
    expect(text).toContain('Cần biết trước')
    expect(text).toContain('Hàm băm và va chạm')
    expect(text).toContain('Đầu ra:')
    expect(text).toContain('Danh sách 20 từ hay gặp nhất')
    expect(text).toContain('Bắt đầu từ đâu')
    expect(text).toContain('chưa băm gì cả')
    expect(text).toContain('Tiêu chí nghiệm thu')
  })

  it('đánh số AC và luôn kèm cách kiểm', () => {
    const w = mount(ProjectBrief, { props: { brief: projectBrief } })
    const items = w.findAll('.pb-ac li')
    expect(items).toHaveLength(projectBrief.done.length)
    expect(items[0].find('.ac-id').text()).toBe('AC1')
    // Một tiêu chí không kèm cách kiểm thì không phải tiêu chí nghiệm thu.
    for (const li of items) {
      expect(li.find('.ac-kiem').exists()).toBe(true)
      expect(li.find('.ac-kiem').text()).toContain('Kiểm bằng:')
    }
  })

  it('mẫu đầu ra hiện trong khối pre để giữ nguyên dòng và cột', () => {
    const w = mount(ProjectBrief, { props: { brief: projectBrief } })
    expect(w.find('pre.pb-sample').text()).toContain('61022')
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
