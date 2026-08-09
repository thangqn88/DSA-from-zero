<template>
  <table class="formula-table lc-table">
    <tr><th>#</th><th>Bài</th><th>Mức</th><th>Vì sao nên làm</th></tr>
    <tr v-for="it in items" :key="it.slug">
      <td>{{ it.no }}</td>
      <td>
        <a
          class="lc-link"
          :href="`https://leetcode.com/problems/${it.slug}/`"
          target="_blank"
          rel="noopener noreferrer"
          >{{ it.name }}</a
        >
      </td>
      <td><span class="lc-level" :class="levelClass(it.level)">{{ it.level }}</span></td>
      <td>{{ it.note }}</td>
    </tr>
  </table>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
})

function levelClass(level) {
  return { Easy: 'lc-easy', Medium: 'lc-medium', Hard: 'lc-hard' }[level]
}
</script>
