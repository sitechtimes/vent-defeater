<template>
  <div class="flex flex-col items-center justify-start gap-4 w-screen h-screen">
    <NavBar :show-join-banner="showBanner" />
    <a href="/"><img class="logo h-32 transition duration-500" src="/logo/logoWithWords.svg" aria-hidden="true" /></a>

    <div class="flex flex-col items-center justify-center gap-2">
      <h1 class="text-3xl">Enter the code to join</h1>
      <p class="text-lg text-[color:var(--faded-text-color)]">It's on the screen in front of you</p>
    </div>

    <JoinCode />

    <div class="flex items-center justify-center gap-4">
      <RouterLink to="/" class="px-10 py-2.5 rounded-full border-2 border-[color:var(--text-color)] bg-transparent text-[color:var(--text-color)] text-lg font-semibold mt-6">Back</RouterLink>
      <button class="px-10 py-2.5 rounded-full border-2 border-[color:var(--text-color)] bg-[color:var(--text-color)] text-[color:var(--bg-color)] text-lg font-semibold mt-6">Join</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import JoinCode from '@/components/JoinCode.vue';
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref } from 'vue';

const showBanner = ref(true);
onMounted(() => {
  showBanner.value = false;
});
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .logo:hover {
    filter: contrast(200%);
  }
}
</style>
