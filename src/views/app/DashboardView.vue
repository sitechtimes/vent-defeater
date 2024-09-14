<template>
  <div class="flex items-center justify-center w-screen h-full">
    <SideMenu />
    <div class="w-full min-h-screen flex items-start justify-start">
      <header class="w-full h-24 px-28 py-12 flex align-center justify-between">
        <input
          class="h-8 w-full bg-[color:var(--faded-bg-color)] text-[color:var(--text-color)] placeholder:text-[color:var(--text-color)]"
          type="text"
          placeholder="Search vents, cameras, and electrical"
        />
      </header>
    </div>
  </div>
  <WordCloud></WordCloud>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue';
import WordCloud from '@/components/WordCloud.vue';
</script>

<style lang="scss" scoped></style>
