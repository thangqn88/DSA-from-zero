<template>
  <div class="worked-example">
    <h4 :id="id">{{ official ? '★ ' : '' }}{{ title }}</h4>

    <p class="we-label">📋 Đề bài</p>
    <slot name="de-bai" />

    <p class="we-label">🧩 Ý tưởng cốt lõi</p>
    <slot name="y-tuong" />

    <p class="we-label">⚙️ Thuật toán</p>
    <slot name="thuat-toan" />

    <p class="we-label">✍️ Chạy tay</p>
    <slot name="chay-tay" />

    <p class="we-label">💻 Code mẫu</p>
    <slot name="code" />

    <p class="we-label">🚀 Cách tối ưu hơn</p>
    <slot name="toi-uu" />
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  official: { type: Boolean, default: false },
})
</script>
