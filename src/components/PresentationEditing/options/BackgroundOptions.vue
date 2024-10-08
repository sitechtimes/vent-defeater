<template>
  <div class="flex items-start justify-center flex-col gap-2 w-full my-4">
    <h3 class="font-bold text-lg">Background</h3>
    <div class="flex items-center justify-center flex-col w-full gap-4">
      <div class="flex items-center justify-between w-full">
        <p>Background Color</p>
        <input type="color" v-model="options.color" />
      </div>

      <div class="flex items-center justify-between w-full">
        <p>Background Image</p>
        <input type="file" accept="image/*" />
      </div>
    </div>
  </div>
  <div class="w-full h-0.5 bg-[color:var(--faded-bg-color-light)] rounded-full"></div>
</template>

<script setup lang="ts">
import type { Background } from "@/utils/types";

type Props = {
  options: Background;
};

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .sizeButton:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
