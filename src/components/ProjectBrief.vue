<template>
  <div class="pb" :class="{ 'pb-capstone': isCapstone }">
    <p v-if="isCapstone" class="pb-badge">Dự án MVP cuối chương</p>
    <h4 class="pb-title">{{ brief.title }}</h4>

    <p class="pb-why">{{ brief.why }}</p>

    <div v-if="brief.needs?.length" class="pb-block">
      <strong>Cần biết trước</strong>
      <ul>
        <li v-for="(n, i) in brief.needs" :key="i">{{ n }}</li>
      </ul>
    </div>

    <div class="pb-block">
      <strong>Đầu vào:</strong> {{ brief.input }}
    </div>

    <div v-if="brief.output" class="pb-block">
      <strong>Đầu ra:</strong> {{ brief.output }}
      <pre v-if="brief.outputSample" class="pb-sample"><code>{{ brief.outputSample }}</code></pre>
    </div>

    <!-- Khối quan trọng nhất với người mới: danh sách yêu cầu bên dưới nói ĐÍCH
         đến, còn khối này nói viên gạch đầu tiên. Thiếu nó thì bản đặc tả đọc như
         một bức tường, không biết bấu vào đâu mà bắt đầu. -->
    <div v-if="brief.start?.length" class="pb-block pb-start">
      <strong>Bắt đầu từ đâu</strong>
      <ol>
        <li v-for="(s, i) in brief.start" :key="i">{{ s }}</li>
      </ol>
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

    <!-- Tiêu chí nghiệm thu. Mỗi mục phải trả lời được bằng đúng một chữ đạt hoặc
         chưa đạt, và phải kèm CÁCH kiểm — nếu không thì nó chỉ là một lời chúc,
         không phải tiêu chí. Đạt hết là dự án xong, không cần hỏi ai. -->
    <div class="pb-block pb-ac">
      <strong>Tiêu chí nghiệm thu — đạt đủ là xong</strong>
      <ol>
        <li v-for="(d, i) in brief.done" :key="i">
          <span class="ac-id">AC{{ i + 1 }}</span>
          <span class="ac-dat">{{ d.dat }}</span>
          <span class="ac-kiem"><strong>Kiểm bằng:</strong> {{ d.kiem }}</span>
        </li>
      </ol>
    </div>

    <div v-if="isCapstone" class="pb-block">
      <strong>Dữ liệu mẫu</strong>
      <p>{{ brief.data.format }}</p>
      <!-- Dữ liệu mẫu đến từ biến nên phải nội suy — KHÔNG dùng v-pre ở đây,
           khác với code C++ viết tay trong section. -->
      <pre class="pb-sample"><code>{{ brief.data.sample }}</code></pre>
      <!-- Có MVP không đọc dữ liệu ngoài nào — khi đó không có gì để tải. -->
      <a
        v-if="brief.data.url"
        class="pb-data-link"
        :href="brief.data.url"
        target="_blank"
        rel="noopener"
      >
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
