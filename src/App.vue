<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark')
  }
})
</script>

<style scoped></style>
