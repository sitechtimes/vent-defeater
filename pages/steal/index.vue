<template>
  <div class="w-screen h-screen flex flex-col items-center justify-start gap-4 background select-text">
    <div class="w-[960px] h-full flex flex-col items-center justify-start">
      <NuxtLink to="/steal/62049">vent defeater: the game</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
definePageMeta({
  layout: "steal"
});

useSeoMeta({
  title: "Welcome to Steal",
  ogTitle: "Steal Store",
  description: "Steal is the ultimate destination for playing, discussing, and creating games.",
  ogDescription: "Steal is the ultimate destination for playing, discussing, and creating games."
});
</script>

<style lang="scss" scoped></style>
