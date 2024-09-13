<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { userStore } from './stores/user';

const user = userStore();

onBeforeMount(() => {
  if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark');
    user.theme = 'dark';
  }
  document.body.style.display = 'flex';
});
</script>

<style scoped></style>
