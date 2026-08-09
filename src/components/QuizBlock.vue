<template>
  <div class="quiz">
    <div class="quiz-score">
      Đã trả lời {{ answeredCount }}/{{ questions.length }} — đúng {{ correctCount }}
    </div>

    <div v-for="(item, qi) in questions" :key="qi" class="quiz-q">
      <p class="quiz-prompt">
        <strong>Câu {{ qi + 1 }}.</strong> {{ item.q }}
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

const picked = ref(props.questions.map(() => null))

function pick(qi, oi) {
  if (picked.value[qi] !== null) return
  picked.value[qi] = oi
}

// Chỉ tô màu sau khi người học đã chọn — trước đó không được lộ đáp án.
function optClass(qi, oi) {
  const p = picked.value[qi]
  if (p === null) return ''
  if (oi === props.questions[qi].answer) return 'correct'
  return oi === p ? 'wrong' : ''
}

const answeredCount = computed(() => picked.value.filter(p => p !== null).length)
const correctCount = computed(
  () => picked.value.filter((p, i) => p !== null && p === props.questions[i].answer).length,
)
</script>
