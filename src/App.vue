<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { userStore } from './stores/user'

onBeforeMount(() => {
  if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark')
    userStore().theme = 'dark'
  }
})
</script>

<style scoped></style>
