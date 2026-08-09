<template>
  <div class="pb" :class="{ 'pb-capstone': isCapstone }">
    <p v-if="isCapstone" class="pb-badge">Dự án MVP cuối chương</p>
    <h4 class="pb-title">{{ brief.title }}</h4>

    <p class="pb-why">{{ brief.why }}</p>

    <div class="pb-block">
      <strong>Đầu vào:</strong> {{ brief.input }}
    </div>

    <div class="pb-block">
      <strong>Yêu cầu bắt buộc</strong>
      <ul>
        <li v-for="(m, i) in brief.must" :key="i">{{ m }}</li>
      </ul>
    </div>

    <div v-if="isCapstone && brief.reuses.length" class="pb-block pb-reuse">
      <strong>Bắt buộc dùng lại code cũ của bạn</strong>
      <ul>
        <li v-for="(r, i) in brief.reuses" :key="i">
          Chương {{ r.chapter }} — module <code>{{ r.module }}</code>
        </li>
      </ul>
    </div>

    <div class="pb-block">
      <strong>Coi như xong khi</strong>
      <ul>
        <li v-for="(d, i) in brief.done" :key="i">{{ d }}</li>
      </ul>
    </div>

    <div v-if="isCapstone" class="pb-block">
      <strong>Dữ liệu mẫu</strong>
      <p>{{ brief.data.format }}</p>
      <!-- Dữ liệu mẫu đến từ biến nên phải nội suy — KHÔNG dùng v-pre ở đây,
           khác với code C++ viết tay trong section. -->
      <pre class="pb-sample"><code>{{ brief.data.sample }}</code></pre>
      <a class="pb-data-link" :href="brief.data.url" target="_blank" rel="noopener">
        Tải bộ dữ liệu đầy đủ
      </a>
    </div>

    <details class="pb-block">
      <summary>Chỗ dễ sai</summary>
      <ul>
        <li v-for="(t, i) in brief.traps" :key="i">{{ t }}</li>
      </ul>
    </details>

    <details v-if="isCapstone && brief.stretch.length" class="pb-block">
      <summary>Mở rộng nếu còn hứng</summary>
      <ul>
        <li v-for="(s, i) in brief.stretch" :key="i">{{ s }}</li>
      </ul>
    </details>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  brief: { type: Object, required: true },
  mode: { type: String, default: 'project' },
})

const isCapstone = computed(() => props.mode === 'capstone')
</script>
