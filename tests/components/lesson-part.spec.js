import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LessonPart from '../../src/components/LessonPart.vue'
import LessonGoal from '../../src/components/LessonGoal.vue'

describe('LessonPart', () => {
  it('render heading có id chuẩn và tiêu đề chuẩn', () => {
    const w = mount(LessonPart, { props: { sid: 'to-hop', part: 'quiz' } })
    const h3 = w.get('h3')
    expect(h3.attributes('id')).toBe('to-hop--quiz')
    expect(h3.text()).toBe('3. Quiz kiểm tra lý thuyết')
  })

  it('render nội dung trong slot mặc định', () => {
    const w = mount(LessonPart, {
      props: { sid: 'dsu', part: 'ly-thuyet' },
      slots: { default: '<p>nội dung lý thuyết</p>' },
    })
    expect(w.html()).toContain('nội dung lý thuyết')
  })
})

describe('LessonGoal', () => {
  it('render id mục tiêu và nhãn cố định', () => {
    const w = mount(LessonGoal, {
      props: { sid: 'dsu' },
      slots: { default: 'gộp 2 nhóm trong O(1)' },
    })
    expect(w.get('.lesson-goal').attributes('id')).toBe('dsu--muc-tieu')
    expect(w.text()).toContain('Sau bài này, bạn có thể')
    expect(w.text()).toContain('gộp 2 nhóm trong O(1)')
  })
})
