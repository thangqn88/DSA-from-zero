import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkedExample from '../../src/components/WorkedExample.vue'
import PracticeSet from '../../src/components/PracticeSet.vue'
import LeetCodeList from '../../src/components/LeetCodeList.vue'

describe('WorkedExample', () => {
  it('render đủ 6 khối theo đúng thứ tự và có id neo', () => {
    const w = mount(WorkedExample, {
      props: { id: 'vd-to-hop', title: 'Tổ hợp chập k' },
      slots: {
        'de-bai': '<p>ĐỀ</p>', 'y-tuong': '<p>Ý</p>', 'thuat-toan': '<p>TT</p>',
        'chay-tay': '<p>CT</p>', code: '<pre>CODE</pre>', 'toi-uu': '<p>TU</p>',
      },
    })
    expect(w.get('h4').attributes('id')).toBe('vd-to-hop')
    const labels = w.findAll('.we-label').map(e => e.text())
    expect(labels).toEqual([
      '📋 Đề bài', '🧩 Ý tưởng cốt lõi', '⚙️ Thuật toán',
      '✍️ Chạy tay', '💻 Code mẫu', '🚀 Cách tối ưu hơn',
    ])
  })

  it('gắn nhãn đề chính thức khi official = true', () => {
    const w = mount(WorkedExample, { props: { id: 'x', title: 'Y', official: true } })
    expect(w.get('h4').text()).toContain('★')
  })
})

describe('PracticeSet', () => {
  const items = [
    { title: 'Bài A', idea: 'ý A', hint: 'gợi ý A' },
    { title: 'Bài B', idea: 'ý B', hint: 'gợi ý B' },
    { title: 'Bài C', idea: 'ý C', hint: 'gợi ý C' },
  ]
  it('render đủ 3 bài, gợi ý nằm trong details đóng sẵn', () => {
    const w = mount(PracticeSet, { props: { items } })
    expect(w.findAll('.practice-item')).toHaveLength(3)
    const d = w.findAll('.practice-item details')
    expect(d).toHaveLength(3)
    expect(d[0].attributes('open')).toBeUndefined()
    expect(d[0].text()).toContain('gợi ý A')
  })
})

describe('LeetCodeList', () => {
  const items = [
    { no: 20, name: 'Valid Parentheses', slug: 'valid-parentheses', level: 'Easy', note: 'khởi động' },
    { no: 150, name: 'Evaluate RPN', slug: 'evaluate-reverse-polish-notation', level: 'Medium', note: 'hậu tố' },
  ]
  it('render link đúng chuẩn leetcode và nhãn độ khó', () => {
    const w = mount(LeetCodeList, { props: { items } })
    const a = w.findAll('a.lc-link')
    expect(a[0].attributes('href')).toBe('https://leetcode.com/problems/valid-parentheses/')
    expect(a[0].attributes('target')).toBe('_blank')
    expect(a[0].attributes('rel')).toContain('noopener')
    expect(w.findAll('.lc-level')[0].classes()).toContain('lc-easy')
    expect(w.findAll('.lc-level')[1].classes()).toContain('lc-medium')
  })
})
