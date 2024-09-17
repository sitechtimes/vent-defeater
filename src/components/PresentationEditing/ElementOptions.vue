<template>
  <div class="flex items-start justify-center flex-col bg-[color:var(--bg-color)] rounded-lg w-80 p-7 gap-4" v-if="selectedElement">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl">{{ selectedElement.type }}</h1>
      <button @click="">
        <img class="w-5 h-5 dark:invert" src="/ui/x.svg" alt="Click to close editing menu" />
      </button>
    </div>
    <TextOptions v-if="'text' in selectedElement" :options="selectedElement.text" />
  </div>
</template>

<script setup lang="ts">
import type { Element, Slide } from '@/utils/types';
import TextOptions from './options/TextOptions.vue';

type Props = {
  selectedElement: Slide | Element | undefined;
};
const props = defineProps<Props>();
</script>

<style lang="scss" scoped></style>
