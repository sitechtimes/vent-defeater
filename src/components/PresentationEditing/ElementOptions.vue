<template>
  <div class="flex items-start justify-start flex-col bg-[color:var(--bg-color)] rounded-lg w-80 p-7 gap-4 h-full" v-if="selectedElement">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl">{{ selectedElement.type }}</h1>
      <button class="closeButton rounded-full w-8 h-8 transition flex items-center justify-center" @click="emit('close')">
        <img class="w-5 h-5 dark:invert" src="/ui/x.svg" alt="Click to close editing menu" />
      </button>
    </div>
    <TextOptions v-if="'text' in selectedElement" :options="selectedElement.text" />
    <BackgroundOptions v-if="'background' in selectedElement" :options="selectedElement.background" />
  </div>
</template>

<script setup lang="ts">
import type { Element, Slide } from "@/utils/types";
import TextOptions from "./options/TextOptions.vue";
import BackgroundOptions from "./options/BackgroundOptions.vue";

type Props = {
  selectedElement: Slide | Element | undefined;
};
type Emits = {
  close: [void];
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .closeButton:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
