<template>
  <ol class="practice">
    <li v-for="(it, i) in items" :key="i" class="practice-item">
      <strong>{{ it.title }}</strong>
      <div class="idea"><em>Ý tưởng:</em> {{ it.idea }}</div>
      <details>
        <summary>Xem gợi ý</summary>
        <div class="hint"><em>Hướng dẫn:</em> {{ it.hint }}</div>
      </details>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>
