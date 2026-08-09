<template>
  <section
    id="trang-chu"
    class="day-section"
    data-sid="trang-chu"
    v-show="active"
  >
    <h2>Tổng quan</h2>

    <div class="learner-card">
      <div class="learner-card-heading">
        Nếu bạn mới bắt đầu, hãy làm theo 3 bước này
      </div>
      <p style="margin: 0.25rem 0 0">
        Đừng cố đọc hết ngay. Chọn một nhóm, xem ví dụ trước, rồi làm bài tập để
        củng cố. Mỗi bài học được thiết kế để bạn hiểu được “tại sao” trước khi
        nhìn vào “cách viết code”.
      </p>
    </div>

    <div class="demo-banner">
      Mọi khái niệm đều bắt đầu bằng
      <strong>một ví dụ đời thường</strong> trước khi có thuật ngữ và code, kèm
      widget để bạn chạy tay từng bước. Dùng menu bên trái để chọn nhóm kiến
      thức cần học — nội dung bên phải sẽ đổi theo.
    </div>

    <div
      class="realworld"
      style="background: var(--success-bg); border-left-color: var(--success)"
    >
      <span class="rw-title">🎯 Mỗi nhóm kiến thức học theo đúng 6 phần</span>
      <p style="margin: 0">
        Mọi nhóm kiến thức đều đi theo cùng một khung: mục tiêu bài học → lý
        thuyết cơ bản → vì sao kiến thức này quan trọng → quiz kiểm tra → ví dụ
        điển hình giải đủ 6 bước → bài tập kiểm tra → danh sách LeetCode để tự
        luyện. Bạn chỉ cần quen khung này một lần là học được cả 10 nhóm.
      </p>
    </div>

  </section>
</template>

<script setup>
defineProps({ active: Boolean });
</script>
