import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizBlock from '../../src/components/QuizBlock.vue'

const questions = [
  { q: 'Quay lui là gì?', options: ['Thử và quay lại', 'Sắp xếp'], answer: 0, why: 'Thử từng lựa chọn, sai thì hoàn tác.' },
  { q: 'DSU dùng để làm gì?', options: ['Duyệt cây', 'Gộp nhóm'], answer: 1, why: 'DSU quản lý các tập rời nhau.' },
]

describe('QuizBlock', () => {
  it('hiện tất cả câu hỏi và lựa chọn, chưa lộ đáp án', () => {
    const w = mount(QuizBlock, { props: { questions } })
    expect(w.findAll('.quiz-q')).toHaveLength(2)
    expect(w.findAll('.quiz-opt')).toHaveLength(4)
    expect(w.text()).not.toContain('Thử từng lựa chọn')
  })

  it('chọn đúng thì đánh dấu correct và hiện giải thích', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await w.findAll('.quiz-q')[0].findAll('.quiz-opt')[0].trigger('click')
    expect(w.findAll('.quiz-q')[0].findAll('.quiz-opt')[0].classes()).toContain('correct')
    expect(w.text()).toContain('Thử từng lựa chọn')
  })

  it('chọn sai thì đánh dấu wrong nhưng vẫn chỉ ra đáp án đúng', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    const opts = w.findAll('.quiz-q')[1].findAll('.quiz-opt')
    await opts[0].trigger('click')
    expect(opts[0].classes()).toContain('wrong')
    expect(opts[1].classes()).toContain('correct')
  })

  it('không cho đổi đáp án sau khi đã chọn', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    const opts = w.findAll('.quiz-q')[0].findAll('.quiz-opt')
    await opts[1].trigger('click')
    await opts[0].trigger('click')
    expect(opts[1].classes()).toContain('wrong')
    expect(opts[0].classes()).not.toContain('correct-picked')
  })

  it('đếm số câu đã trả lời và số câu đúng', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await w.findAll('.quiz-q')[0].findAll('.quiz-opt')[0].trigger('click')
    expect(w.get('.quiz-score').text()).toContain('1/2')
    expect(w.get('.quiz-score').text()).toContain('đúng 1')
  })
})
