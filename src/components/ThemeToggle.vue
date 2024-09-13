<template>
  <button @click="toggleTheme" class="bg-transparent border-0 p-0 flex items-center justify-center">
    <img class="h-8" v-show="userStore.theme == 'light'" src="/ui/sun.svg" aria-hidden="true" />
    <img class="h-8" v-show="userStore.theme == 'dark'" src="/ui/moon.svg" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

function toggleTheme() {
  const wasLight = userStore.theme === 'light';
  userStore.theme = wasLight ? 'dark' : 'light';
  document.body.classList[wasLight ? 'add' : 'remove']('dark');
  localStorage.setItem('theme', userStore.theme);
}
</script>

<style lang="scss" scoped>
/*.theme {
  background-color: transparent;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
  }

  img {
    height: 2em;
  }
}*/
</style>
