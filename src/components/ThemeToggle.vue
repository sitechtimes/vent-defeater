<template>
  <button @click="toggleTheme" class="bg-transparent border-0 p-0 flex items-center justify-center">
    <a href="#" class="flex">
      <img class="h-8" v-show="user.theme == 'light'" src="/ui/sun.svg" aria-hidden="true" />
      <img class="h-8" v-show="user.theme == 'dark'" src="/ui/moon.svg" aria-hidden="true" />
    </a>
  </button>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/user';

const user = userStore();

function toggleTheme() {
  if (user.theme == 'light') {
    document.body.classList.add('dark');
    user.theme = 'dark';
    localStorage.setItem('theme', 'dark');
    return;
  }

  document.body.classList.remove('dark');
  user.theme = 'light';
  localStorage.removeItem('theme');
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
