<template>
  <div
    class="element flex absolute transition-none"
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
      top: element.position.top * scaleFactor + 'px',
      left: element.position.left * scaleFactor + 'px',
      bottom: element.position.bottom * scaleFactor + 'px',
      right: element.position.right * scaleFactor + 'px',
      backgroundColor: element.background.color,
      backgroundImage: element.background.image ? `url('${element.background.image}')` : 'none',
      backgroundSize: 'cover'
    }"
  >
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-nw-resize top left"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'left', 'top')"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-n-resize top"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'center', 'top')"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-ne-resize top right"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'right', 'top')"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-e-resize left"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'left', 'center')"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-w-resize right"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'right', 'center')"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-sw-resize bottom left"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'left', 'bottom')"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-s-resize bottom"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'center', 'bottom')"
    ></div>
    <div
      class="absolute hidden bg-[color:var(--primary)] w-2.5 h-2.5 cursor-se-resize bottom right"
      :style="{ display: element.id == selectedElement?.id ? 'block' : '' }"
      @mousedown="emit('scale', $event, 'right', 'bottom')"
    ></div>
    <PresentationEditingElementsTextField v-if="element.type == 'Text Field'" :element="element" :scale-factor="scaleFactor" @select="(event) => emit('select', event)" />
  </div>
</template>

<script setup lang="ts">
type Props = {
  selectedElement: Slide | ElementType | undefined;
  element: ElementType;
  scaleFactor: number;
};
type Emits = {
  select: [event: MouseEvent];
  scale: [event: MouseEvent, width: "left" | "center" | "right", height: "top" | "center" | "bottom"];
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
.selected {
  outline: 0.15rem solid var(--primary);
}

.left {
  left: -0.35rem;
}
.right {
  right: -0.35rem;
}
.top {
  top: -0.35rem;
}
.bottom {
  bottom: -0.35rem;
}

@media (hover: hover) and (pointer: fine) {
  .element:hover {
    cursor: move;
  }
}
</style>
