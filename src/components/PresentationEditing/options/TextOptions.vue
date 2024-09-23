<template>
  <div class="flex items-start justify-center flex-col gap-2 w-full my-4">
    <h3 class="font-bold text-lg">Text</h3>
    <div class="flex items-center justify-center flex-col w-full gap-4">
      <div class="flex items-center justify-between w-full">
        <p>Text Color</p>
        <input type="color" v-model="options.color" />
      </div>

      <div class="flex items-center justify-between w-full">
        <p>Font</p>
        <button>arial</button>
      </div>

      <div class="flex items-center justify-between w-full">
        <p>Font Size</p>
        <div class="flex items-center jsutify-center gap-1">
          <button class="sizeButton rounded-md transition" @click="options.size--"><img class="w-5 h-5 dark:invert" src="/ui/minus.svg" aria-hidden="true" /></button>
          <input class="w-10 select-none text-center rounded-md border border-[color:var(--text-color)]" type="number" v-model="options.size" />
          <button class="sizeButton rounded-md transition" @click="options.size++"><img class="w-5 h-5 dark:invert" src="/ui/plus.svg" aria-hidden="true" /></button>
        </div>
      </div>

      <div class="flex items-center justify-center gap-5 w-full">
        <button
          class="sizeButton rounded-md transition w-8 h-8 flex items-center justify-center"
          :class="{ 'bg-[color:var(--faded-bg-color)]': options.styles.bold }"
          @click="options.styles.bold = !options.styles.bold"
        >
          <img class="w-5 h-5 dark:invert" src="/ui/bold.svg" aria-hidden="true" />
        </button>
        <button
          class="sizeButton rounded-md transition w-8 h-8 flex items-center justify-center"
          :class="{ 'bg-[color:var(--faded-bg-color)]': options.styles.italics }"
          @click="options.styles.italics = !options.styles.italics"
        >
          <img class="w-5 h-5 dark:invert" src="/ui/italics.svg" aria-hidden="true" />
        </button>
        <button
          class="sizeButton rounded-md transition w-8 h-8 flex items-center justify-center"
          :class="{ 'bg-[color:var(--faded-bg-color)]': options.styles.underline }"
          @click="
            options.styles.underline = !options.styles.underline;
            options.styles.strikethrough = false;
          "
        >
          <img class="w-5 h-5 dark:invert" src="/ui/underline.svg" aria-hidden="true" />
        </button>
        <button
          class="sizeButton rounded-md transition w-8 h-8 flex items-center justify-center"
          :class="{ 'bg-[color:var(--faded-bg-color)]': options.styles.strikethrough }"
          @click="
            options.styles.strikethrough = !options.styles.strikethrough;
            options.styles.underline = false;
          "
        >
          <img class="w-5 h-5 dark:invert" src="/ui/strikethrough.svg" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
  <div class="w-full h-0.5 bg-[color:var(--faded-bg-color-light)] rounded-full"></div>
</template>

<script setup lang="ts">
import type { Text } from '@/utils/types';
import { watch } from 'vue';

type Props = {
  options: Text;
};

const props = defineProps<Props>();
watch(
  () => props.options.size,
  (size) => {
    if (size < 0) props.options.size = 0;
    if (size > 400) props.options.size = 400;
  }
);
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .sizeButton:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
