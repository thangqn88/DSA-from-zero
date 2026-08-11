import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuizBlock from '../../src/components/QuizBlock.vue'
import { lessons } from '../../src/data/lessons/index.js'

const questions = [
  { q: 'Quay lui là gì?', options: ['Thử và quay lại', 'Sắp xếp'], answer: 0, why: 'Thử từng lựa chọn, sai thì hoàn tác.' },
  { q: 'DSU dùng để làm gì?', options: ['Duyệt cây', 'Gộp nhóm'], answer: 1, why: 'DSU quản lý các tập rời nhau.' },
]

// Thứ tự lựa chọn bị xáo trước khi hiển thị, nên test phải tìm nút theo NỘI DUNG
// chứ không theo vị trí. Tìm theo vị trí là đúng kiểu test khoá cứng cái mà tính
// năng này cố tình phá.
function nutTheoChu(w, qi, chu) {
  const opts = w.findAll('.quiz-q')[qi].findAll('.quiz-opt')
  const nut = opts.find(o => o.text() === chu)
  if (!nut) throw new Error(`Không thấy lựa chọn "${chu}"`)
  return nut
}

describe('QuizBlock', () => {
  it('hiện tất cả câu hỏi và lựa chọn, chưa lộ đáp án', () => {
    const w = mount(QuizBlock, { props: { questions } })
    expect(w.findAll('.quiz-q')).toHaveLength(2)
    expect(w.findAll('.quiz-opt')).toHaveLength(4)
    expect(w.text()).not.toContain('Thử từng lựa chọn')
  })

  it('chọn đúng thì đánh dấu correct và hiện giải thích', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await nutTheoChu(w, 0, 'Thử và quay lại').trigger('click')
    expect(nutTheoChu(w, 0, 'Thử và quay lại').classes()).toContain('correct')
    expect(w.text()).toContain('Thử từng lựa chọn')
  })

  it('chọn sai thì đánh dấu wrong nhưng vẫn chỉ ra đáp án đúng', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await nutTheoChu(w, 1, 'Duyệt cây').trigger('click')
    expect(nutTheoChu(w, 1, 'Duyệt cây').classes()).toContain('wrong')
    expect(nutTheoChu(w, 1, 'Gộp nhóm').classes()).toContain('correct')
  })

  it('không cho đổi đáp án sau khi đã chọn', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await nutTheoChu(w, 0, 'Sắp xếp').trigger('click')
    await nutTheoChu(w, 0, 'Thử và quay lại').trigger('click')
    expect(nutTheoChu(w, 0, 'Sắp xếp').classes()).toContain('wrong')
    expect(w.get('.quiz-score').text()).toContain('đúng 0')
  })

  it('đếm số câu đã trả lời và số câu đúng', async () => {
    const w = mount(QuizBlock, { props: { questions } })
    await nutTheoChu(w, 0, 'Thử và quay lại').trigger('click')
    expect(w.get('.quiz-score').text()).toContain('1/2')
    expect(w.get('.quiz-score').text()).toContain('đúng 1')
  })
})

describe('QuizBlock — câu ôn tập', () => {
  it('câu ôn tập có nhãn riêng, câu thường thì không', () => {
    const w = mount(QuizBlock, {
      props: {
        questions: [
          { q: 'Câu ôn', options: ['a', 'b'], answer: 0, why: 'vì thế', recall: true },
          { q: 'Câu thường', options: ['a', 'b'], answer: 1, why: 'vì vậy' },
        ],
      },
    })
    expect(w.findAll('.quiz-recall')).toHaveLength(1)
    expect(w.text()).toContain('Ôn lại bài trước')
  })
})

describe('QuizBlock — xáo trộn lựa chọn', () => {
  const nhieuLuaChon = Array.from({ length: 12 }, (_, i) => ({
    q: `Câu hỏi số ${i} về thuật toán?`,
    options: ['đúng', 'sai một', 'sai hai'],
    answer: 0,
    why: 'giải thích đủ dài cho schema',
  }))

  it('giữ nguyên tập lựa chọn, chỉ đổi thứ tự', () => {
    const w = mount(QuizBlock, { props: { questions: nhieuLuaChon } })
    for (const q of w.findAll('.quiz-q')) {
      const chu = q.findAll('.quiz-opt').map(o => o.text()).sort()
      expect(chu).toEqual(['sai hai', 'sai một', 'đúng'])
    }
  })

  it('cùng một câu hỏi luôn cho ra cùng một thứ tự', () => {
    const lan1 = mount(QuizBlock, { props: { questions: nhieuLuaChon } })
    const lan2 = mount(QuizBlock, { props: { questions: nhieuLuaChon } })
    expect(lan1.findAll('.quiz-opt').map(o => o.text()))
      .toEqual(lan2.findAll('.quiz-opt').map(o => o.text()))
  })

  it('đáp án đúng không còn dồn hết về vị trí đầu', () => {
    const w = mount(QuizBlock, { props: { questions: nhieuLuaChon } })
    const viTri = w.findAll('.quiz-q')
      .map(q => q.findAll('.quiz-opt').findIndex(o => o.text() === 'đúng'))
    expect(new Set(viTri).size).toBeGreaterThan(1)
  })
})

// Đây là luật thật sự đáng giá: chạy trên toàn bộ quiz của mọi bài đã viết, để
// đảm bảo người học không thể ăn điểm bằng cách bấm mãi một vị trí.
describe('QuizBlock — phân bố đáp án trên toàn bộ nội dung', () => {
  const tatCa = Object.values(lessons).flatMap(l => l.quiz)

  it('không vị trí nào chiếm quá 55% số câu', () => {
    const dem = {}
    for (const item of tatCa) {
      const w = mount(QuizBlock, { props: { questions: [item] } })
      const dung = item.options[item.answer]
      const vt = w.findAll('.quiz-opt').findIndex(o => o.text() === dung)
      dem[vt] = (dem[vt] || 0) + 1
    }
    const nhieuNhat = Math.max(...Object.values(dem))
    expect(nhieuNhat / tatCa.length).toBeLessThan(0.55)
  })
})
