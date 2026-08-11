<template>
  <div class="quiz">
    <div class="quiz-score">
      Đã trả lời {{ answeredCount }}/{{ questions.length }} — đúng {{ correctCount }}
    </div>

    <div v-for="(item, qi) in shuffled" :key="qi" class="quiz-q">
      <p class="quiz-prompt">
        <strong>Câu {{ qi + 1 }}.</strong>
        <span v-if="item.recall" class="quiz-recall">Ôn lại bài trước</span>
        {{ item.q }}
      </p>
      <button
        v-for="(opt, oi) in item.options"
        :key="oi"
        type="button"
        class="quiz-opt"
        :class="optClass(qi, oi)"
        :disabled="picked[qi] !== null"
        @click="pick(qi, oi)"
      >
        {{ opt }}
      </button>
      <p v-if="picked[qi] !== null" class="quiz-why">
        <strong>{{ picked[qi] === item.answer ? '✅ Chính xác.' : '❌ Chưa đúng.' }}</strong>
        {{ item.why }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  questions: { type: Array, required: true },
})

// Người viết bài luôn đặt đáp án đúng ở vị trí đầu cho dễ soạn, nên nếu hiện
// nguyên xi thì người học đoán được đáp án mà không cần đọc. Ở đây ta xáo lại
// thứ tự lựa chọn trước khi hiển thị.
//
// Xáo bằng bộ sinh số giả ngẫu nhiên có hạt giống lấy từ chính nội dung câu hỏi,
// KHÔNG dùng Math.random. Nhờ vậy một câu hỏi luôn cho ra cùng một thứ tự ở mọi
// lần tải trang và mọi máy: người học quay lại bài cũ vẫn thấy đúng bố cục cũ,
// và test kiểm chứng được kết quả.
function hatGiong(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function boSinhSo(seed) {
  let x = seed || 1
  return () => {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    return ((x >>> 0) % 100000) / 100000
  }
}

function xaoTron(options, answer, seed) {
  const idx = options.map((_, i) => i)
  const rnd = boSinhSo(seed)
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return {
    options: idx.map(i => options[i]),
    answer: idx.indexOf(answer),
  }
}

const shuffled = computed(() =>
  props.questions.map(item => {
    const { options, answer } = xaoTron(item.options, item.answer, hatGiong(item.q))
    return { ...item, options, answer }
  }),
)

const picked = ref(props.questions.map(() => null))

function pick(qi, oi) {
  if (picked.value[qi] !== null) return
  picked.value[qi] = oi
}

// Chỉ tô màu sau khi người học đã chọn — trước đó không được lộ đáp án.
function optClass(qi, oi) {
  const p = picked.value[qi]
  if (p === null) return ''
  if (oi === shuffled.value[qi].answer) return 'correct'
  return oi === p ? 'wrong' : ''
}

const answeredCount = computed(() => picked.value.filter(p => p !== null).length)
const correctCount = computed(
  () => picked.value.filter((p, i) => p !== null && p === shuffled.value[i].answer).length,
)
</script>
