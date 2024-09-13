<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useUserStore } from './stores/user';
const userStore = useUserStore();

onBeforeMount(() => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    userStore.theme = 'dark';
  }
  document.body.style.display = 'flex';
});
</script>

<style scoped></style>
