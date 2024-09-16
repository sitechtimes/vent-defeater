<template>
  <div
    class="element flex absolute"
    :class="{
      selected: element.id == selectedElement?.id,
      'cursor-move': element.id == selectedElement?.id,
      'items-start': element.flex.items == 'left',
      'items-center': element.flex.items == 'center',
      'items-end': element.flex.items == 'right',
      'justify-start': element.flex.justify == 'left',
      'justify-center': element.flex.justify == 'center',
      'justify-end': element.flex.justify == 'right',
      'align-start': element.flex.align == 'left',
      'align-center': element.flex.align == 'center',
      'align-end': element.flex.align == 'right',
      'flex-wrap': element.flex.wrap
    }"
    :style="{
      top: element.position.x * scaleFactor + 'px',
      left: element.position.y * scaleFactor + 'px',
      width: element.dimensions.width * scaleFactor + 'px',
      height: element.dimensions.height * scaleFactor + 'px',
      backgroundColor: element.background.color,
      backgroundImage: element.background.image ? `url('${element.background.image}')` : 'none',
      backgroundSize: 'cover'
    }"
  >
    <TextField v-if="element.type == 'Text Field'" :element="element" :scale-factor="scaleFactor" />
  </div>
</template>

<script setup lang="ts">
import type { Element, Slide } from '@/utils/types';
import TextField from './elements/TextField.vue';

type Props = {
  selectedElement: Slide | Element | undefined;
  element: Element;
  scaleFactor: number;
};
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.selected {
  outline: 0.15rem solid var(--primary);
}

@media (hover: hover) and (pointer: fine) {
  .element:hover {
    cursor: move;
  }
}
</style>
