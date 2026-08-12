<template>
  <section :id="sid" class="day-section" :data-sid="sid" v-show="active">
    <h2>Chương {{ chapter.num }} — Dự án thực hành</h2>

    <template v-if="capstone">
      <p v-if="capstone.ketChuong">{{ capstone.ketChuong }}</p>
      <ProjectBrief :brief="capstone" mode="capstone" />
    </template>
  </section>
</template>

<script setup>
// Dự án thực hành thuộc về CẢ CHƯƠNG, không thuộc về một bài — nên nó có section
// riêng và một mục riêng trên sidebar, thay vì bị chôn dưới đáy bài cuối chương.
// LessonRenderer.vue không biết gì về dự án nữa; đó là điểm chính của Giai đoạn 2.6.
//
// Bốn thứ App.vue phụ thuộc vào phải giữ nguyên: id, class="day-section",
// data-sid, v-show="active".
import { computed } from 'vue'
import ProjectBrief from './ProjectBrief.vue'
import { CHAPTERS, chapterProjectId } from '../lesson/parts.js'
import { capstoneCuaChuong } from '../data/capstones/index.js'

const props = defineProps({
  chapterKey: { type: String, required: true },
  active: Boolean,
})

const chapter = computed(() => CHAPTERS.find(c => c.key === props.chapterKey))
const sid = computed(() => chapterProjectId(props.chapterKey))

// Không nhận brief từ ngoài: một nguồn sự thật. Chương nào có dữ liệu thì tự tra
// ra, chương nào chưa có thì cờ capstoneReady đã chặn không cho dựng section này.
const capstone = computed(() => capstoneCuaChuong(props.chapterKey))
</script>
