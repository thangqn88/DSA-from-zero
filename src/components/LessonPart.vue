<template>
  <section class="lesson-part">
    <h3 :id="partId(sid, part)">{{ partTitle(part) }}</h3>
    <slot />
  </section>
</template>

<script setup>
import { partId, partTitle } from '../lesson/parts.js'

defineProps({
  sid: { type: String, required: true },
  part: { type: String, required: true },
})
</script>
