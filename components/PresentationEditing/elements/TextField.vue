<template>
  <div
    ref="textBox"
    contenteditable="true"
    class="cursor-text bg-transparent outline-none resize-none"
    :class="{ showPlaceholder }"
    @input="handleInput"
    @focus="showPlaceholder = false"
    @blur="textBox?.innerText.trim() == '' ? (showPlaceholder = true) : (showPlaceholder = false)"
    placeholder="Click to add text"
    :style="{
      color: element.text.color,
      fontFamily: element.text.font,
      fontSize: element.text.size * scaleFactor + 'px',
      fontWeight: element.text.styles.bold ? 'bold' : 'normal',
      fontStyle: element.text.styles.italics ? 'italic' : 'normal',
      textDecoration: element.text.styles.underline ? 'underline' : element.text.styles.strikethrough ? 'line-through' : 'none',
      textDecorationColor: element.text.styles.strikethrough ? element.text.color : 'none',
      textAlign: element.text.styles.align,
      textWrap: element.text.styles.wrap ? 'wrap' : 'nowrap'
    }"
    @mousedown="emit('select', $event)"
  ></div>
</template>

<script setup lang="ts">
const textBox = ref<HTMLElement>();

type Props = {
  element: TextField;
  scaleFactor: number;
};
type Emits = {
  select: [event: MouseEvent];
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const showPlaceholder = ref(true);
const text = ref("");

function handleInput() {
  if (!textBox.value) return;

  const input = textBox.value.innerText.trim();
  if (input == "") showPlaceholder.value = true;
  else showPlaceholder.value = false;

  text.value = input;
}
</script>

<style lang="scss" scoped>
div {
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
}
.showPlaceholder::before {
  content: attr(placeholder);
  color: var(--faded-text-color);
  pointer-events: none;
}
</style>
