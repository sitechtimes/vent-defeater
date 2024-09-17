<template>
  <div class="group">
    <h3>Text</h3>
    <div class="options">
      <div class="option">
        <p>Text Size</p>
        <button @click="increaseTextSize">{{ options.size }}</button>
      </div>
      <div class="option">
        <p>Font</p>
        <button>arial</button>
      </div>
    </div>
  </div>
  <div class="w-full h-0.5 bg-[color:var(--faded-bg-color-light)] rounded-full"></div>
</template>

<script setup lang="ts">
import type { Text } from '@/utils/types';

type Props = {
  options: Text;
};
const props = defineProps<Props>();
function increaseTextSize() {
  props.options.size++;
}
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;

  h3 {
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .options {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
}
</style>
