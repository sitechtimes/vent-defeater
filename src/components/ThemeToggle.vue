<template>
  <button @click="toggleTheme" class="bg-[color:var(--faded-bg-color)] w-14 h-8 border-solid border-2 border-[color:var(--text-color)] rounded-full relative">
    <img class="absolute top-0.5 left-0.5 h-6 transition duration-500" :class="{ 'translate-x-6': dark }" :src="dark ? '/ui/moon.svg' : '/ui/sun.svg'" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const dark = ref(userStore.theme == 'dark');

function toggleTheme() {
  const wasLight = userStore.theme === 'light';
  userStore.theme = wasLight ? 'dark' : 'light';
  dark.value = wasLight;
  document.body.classList[wasLight ? 'add' : 'remove']('dark');
  localStorage.setItem('theme', userStore.theme);
}
</script>

<style scoped></style>
