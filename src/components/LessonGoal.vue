<template>
  <div class="lesson-goal" :id="partId(sid, 'muc-tieu')">
    <span class="lg-title">🎯 Sau bài này, bạn có thể…</span>
    <slot />
  </div>
</template>

<script setup>
import { partId } from '../lesson/parts.js'

defineProps({
  sid: { type: String, required: true },
})
</script>
