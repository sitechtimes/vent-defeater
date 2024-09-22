<template>
  <textarea
    class="cursor-text w-full bg-transparent outline-none h-full"
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
    :value="element.content"
    placeholder="Click to add text"
  ></textarea>
</template>

<script setup lang="ts">
import type { TextField } from '@/utils/types';

type Props = {
  element: TextField;
  scaleFactor: number;
};
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
