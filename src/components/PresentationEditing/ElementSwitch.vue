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
      top: element.position.y * scaleFactor + 'px',
      left: element.position.x * scaleFactor + 'px',
      width: element.dimensions.width * scaleFactor + 'px',
      height: element.dimensions.height * scaleFactor + 'px',
      backgroundColor: element.background.color,
      backgroundImage: element.background.image ? `url('${element.background.image}')` : 'none',
      backgroundSize: 'cover'
    }"
  >
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2 h-2 cursor-nw-resize"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      style="top: -0.3rem; left: -0.3rem"
      @mousedown="handleMouseDown($event, true, true)"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2 h-2 cursor-nw-resize"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      style="bottom: -0.3rem; right: -0.3rem"
      @mousedown="emit('scale', $event, true, true)"
    ></div>
    <TextField v-if="element.type == 'Text Field'" :element="element" :scale-factor="scaleFactor" @select="(event) => emit('select', event)" />
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
type Emits = {
  select: [event: MouseEvent];
  scale: [event: MouseEvent, width: boolean, height: boolean];
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

let emitHandler: typeof emitMove;
function handleMouseDown(event: MouseEvent, width: boolean, height: boolean) {
  emit("scale", event, width, height);
  emitHandler = () => emitMove(event, width, height);
  document.addEventListener('mousemove', emitHandler);
  document.addEventListener('mouseup', handleMouseUp);
}

function emitMove(event: MouseEvent, width?: boolean, height?: boolean) {
  emit("scale", event, width ?? false, height ?? false);
}

function handleMouseUp() {
  if (emitHandler) document.removeEventListener('mousemove', emitHandler);
  document.removeEventListener('mouseup', handleMouseUp);
}
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
