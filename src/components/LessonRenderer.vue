<template>
  <section :id="sid" class="day-section" :data-sid="sid" v-show="active">
    <h2>{{ title }}</h2>

    <LessonGoal :sid="sid">
      <ul>
        <li v-for="(g, i) in data.goal" :key="i">{{ g }}</li>
      </ul>
    </LessonGoal>

    <LessonPart :sid="sid" part="ly-thuyet">
      <div class="md-body" v-html="noiDung.parts['ly-thuyet']"></div>
    </LessonPart>

    <LessonPart :sid="sid" part="vi-sao">
      <div class="md-body" v-html="noiDung.parts['vi-sao']"></div>
    </LessonPart>

    <LessonPart :sid="sid" part="quiz">
      <QuizBlock :questions="data.quiz" />
    </LessonPart>

    <LessonPart :sid="sid" part="vi-du">
      <!-- Dãy khối giữ đúng thứ tự tác giả viết: ví dụ và văn xuôi/widget xen
           giữa chúng. Bài Tham lam đặt widget ngay sau mỗi ví dụ, nên render
           riêng danh sách ví dụ rồi mới tới văn xuôi là sai thứ tự. -->
      <template v-for="(b, i) in noiDung.viDu" :key="b.kind === 'vidu' ? b.id : `html-${i}`">
        <WorkedExample
          v-if="b.kind === 'vidu'"
          :id="b.id"
          :title="b.title"
          :official="b.official"
        >
          <template #de-bai><div class="md-body" v-html="b.slots['de-bai']"></div></template>
          <template #y-tuong><div class="md-body" v-html="b.slots['y-tuong']"></div></template>
          <template #thuat-toan><div class="md-body" v-html="b.slots['thuat-toan']"></div></template>
          <template #chay-tay><div class="md-body" v-html="b.slots['chay-tay']"></div></template>
          <template #code><div class="md-body" v-html="b.slots['code']"></div></template>
          <template #toi-uu><div class="md-body" v-html="b.slots['toi-uu']"></div></template>
        </WorkedExample>
        <div v-else class="md-body" v-html="b.html"></div>
      </template>
    </LessonPart>

    <LessonPart :sid="sid" part="bai-tap">
      <PracticeSet :items="data.practice" />
    </LessonPart>

    <LessonPart :sid="sid" part="leetcode">
      <LeetCodeList :items="data.leetcode" />
    </LessonPart>

    <LessonPart v-if="data.project || capstone" :sid="sid" part="du-an">
      <ProjectBrief v-if="data.project" :brief="data.project" />

      <!-- Bài cuối chương là chỗ MVP của cả chương xuất hiện. Dữ liệu nằm ở
           src/data/capstones/, không nằm trong dữ liệu bài, vì nó thuộc về cả
           chương — và chỗ hiển thị suy ra từ CHAPTERS chứ không khai báo tay,
           nên không có bài nào quên hiện MVP của chương mình. -->
      <template v-if="capstone">
        <p v-if="capstone.ketChuong">{{ capstone.ketChuong }}</p>
        <ProjectBrief :brief="capstone" mode="capstone" />
      </template>
    </LessonPart>
  </section>
</template>

<script setup>
// Khung chung cho MỌI bài học viết bằng Markdown. Thay cho một file .vue riêng mỗi
// bài: 48 dòng dây nối từng phải lặp lại 16 lần giờ chỉ còn tồn tại ở đây.
//
// Văn xuôi nhúng bằng v-html nên Vue không biên dịch nội dung bên trong. Đó là chủ
// ý: code C++ trong bài không còn phải escape &lt; &amp; bằng tay, và cũng không
// cần v-pre nữa. Nguồn HTML là file .md của chính dự án, không phải dữ liệu người
// dùng nhập, nên không có bề mặt XSS ở đây.
import { computed, onMounted } from 'vue'
import LessonGoal from './LessonGoal.vue'
import LessonPart from './LessonPart.vue'
import QuizBlock from './QuizBlock.vue'
import WorkedExample from './WorkedExample.vue'
import PracticeSet from './PracticeSet.vue'
import LeetCodeList from './LeetCodeList.vue'
import ProjectBrief from './ProjectBrief.vue'

import { CHAPTERS, LESSON_SECTIONS } from '../lesson/parts.js'
import { mdLessons } from '../lesson/mdLessons.js'
import { initWidgets } from '../lesson/widgets.js'
import { lessons } from '../data/lessons/index.js'
import { capstoneCuaChuong } from '../data/capstones/index.js'

const props = defineProps({
  sid: { type: String, required: true },
  active: Boolean,
})

const noiDung = computed(() => mdLessons[props.sid])
const data = computed(() => lessons[props.sid])

// Tiêu đề bài lấy từ CHAPTERS chứ không chép lại vào file .md — sidebar và tiêu đề
// trang phải nói cùng một tên, và CHAPTERS đã là nguồn sự thật cho tên bài.
const title = computed(() => LESSON_SECTIONS.find((l) => l.sid === props.sid)?.title ?? props.sid)

// Chỉ bài CUỐI của một chương đã có dữ liệu MVP mới hiện MVP đó. Suy ra từ
// CHAPTERS chứ không thêm cờ: thứ tự bài trong chương đã là nguồn sự thật, và một
// cờ nữa chỉ là thêm một chỗ để quên bật.
const capstone = computed(() => {
  const c = CHAPTERS.find((ch) => ch.capstoneReady && ch.lessons.at(-1).sid === props.sid)
  return c ? capstoneCuaChuong(c.key) : null
})

// Section dựng sẵn cả 30 bài rồi ẩn bằng v-show, nên DOM của bài này đã có thật ở
// thời điểm onMounted — giống hệt lúc widget còn được gọi từ file .vue của bài.
onMounted(() => {
  initWidgets(props.sid)
})
</script>
