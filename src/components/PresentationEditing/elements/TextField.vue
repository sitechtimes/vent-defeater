<template>
  <div
    contenteditable="true"
    class="cursor-text bg-transparent outline-none"
    :style="{
      color: element.text.color,
      fontSize: element.text.size * scaleFactor + 'px',
      fontWeight: element.text.styles.bold ? 'bold' : 'normal',
      fontStyle: element.text.styles.italics ? 'italic' : 'normal',
      textDecoration: element.text.styles.underline ? 'underline' : 'none',
      textDecorationColor: element.text.styles.strikethrough ? element.text.color : 'none',
      textAlign: element.text.styles.align,
      textWrap: element.text.styles.wrap ? 'wrap' : 'nowrap'
    }"
    style="resize: none"
    @mousedown="emit('select', $event)"
  >
    Click to add text
  </div>
</template>

<script setup lang="ts">
import type { TextField } from '@/utils/types';

type Props = {
  element: TextField;
  scaleFactor: number;
};
type Emits = {
  select: [event: MouseEvent];
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function stop(event: MouseEvent) {
  event.stopPropagation();
}
</script>

<style lang="scss" scoped>
div {
  width: calc(100% - 1.5rem);
  height: calc(100% - 1.5rem);
}
</style>
