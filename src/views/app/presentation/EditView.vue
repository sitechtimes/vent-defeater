<template>
  <LoadingTransition @done="loaded = true" />
  <div class="flex items-center justify-between bg-[color:var(--faded-bg-color)] w-screen h-screen" :class="{ 'opacity-0': !loaded }" v-if="currentSlide">
    <div class="flex flex-col items-center justify-center">slides</div>

    <div class="slideBackground flex items-center justify-center bg-[color:var(--faded-bg-color-light)] rounded-lg" ref="slideBackgroundRef">
      <div
        class="relative rounded-lg cursor-pointer overflow-hidden"
        :class="{ selected: currentSlide.id == selectedElement?.id }"
        ref="slideRef"
        @mousedown="selectElement(currentSlide, $event)"
        :style="{
          width: currentSlide.dimensions.width * scaleFactor + 'px',
          height: currentSlide.dimensions.height * scaleFactor + 'px',
          backgroundColor: currentSlide.background.color
        }"
      >
        <ElementSwitch
          v-for="element in currentSlide.elements"
          :key="element.id"
          :element="element"
          :scale-factor="scaleFactor"
          :selected-element="selectedElement"
          @mousedown="handleMouseDown(element, $event)"
          @select="(event) => selectElement(element, event)"
          @scale="(event, width, height) => handleMouseDown(element, event, width, height)"
        />
      </div>
    </div>

    <ElementOptions :selected-element="selectedElement" />

    <div>themes and shit</div>
  </div>
</template>

<script setup lang="ts">
import LoadingTransition from '@/components/LoadingTransition.vue';
import ElementOptions from '@/components/PresentationEditing/ElementOptions.vue';
import ElementSwitch from '@/components/PresentationEditing/ElementSwitch.vue';
import TextField from '@/components/PresentationEditing/elements/TextField.vue';
import { useUserStore } from '@/stores/user';
import type { Element, Slide } from '@/utils/types';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const slideBackgroundRef = ref<HTMLElement>();
const slideRef = ref<HTMLElement>();

const loaded = ref(false);

const userStore = useUserStore();
const currentSlideIndex = ref(0);
const currentSlide = ref(userStore.currentPres?.slides[currentSlideIndex.value]);
const scaleFactor = ref(1);
const reverseScaleFactor = ref(1);

const selectedElement = ref<Slide | Element>();
const elementMoving = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);
const elementWidth = ref(0);
const elementHeight = ref(0);

const scalePositionWidth = ref<'left' | 'center' | 'right'>();
const scalePositionHeight = ref<'top' | 'center' | 'bottom'>();

onMounted(() => {
  loaded.value = false;

  if (!userStore.currentPres) return;

  console.log(userStore.currentPres);
  const slide = userStore.currentPres.slides[currentSlideIndex.value];
  slide.selected = false;
  for (let element of slide.elements) {
    element.selected = false;
  }
  currentSlide.value = slide;

  getScaleFactors();

  window.addEventListener('resize', getScaleFactors);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', scaleElement);
  document.removeEventListener('mousemove', moveElement);
  document.removeEventListener('mouseup', handleMouseUp);
});

function getScaleFactors() {
  if (!slideBackgroundRef.value || !currentSlide.value) return;

  const widthFactor = slideBackgroundRef.value.clientWidth / currentSlide.value.dimensions.width;
  const reverseWidthFactor = currentSlide.value.dimensions.width / slideBackgroundRef.value.clientWidth;
  const heightFactor = slideBackgroundRef.value.clientHeight / currentSlide.value.dimensions.height;
  const reverseHeightFactor = currentSlide.value.dimensions.height / slideBackgroundRef.value.clientHeight;

  if (widthFactor < heightFactor) {
    scaleFactor.value = widthFactor;
    reverseScaleFactor.value = reverseWidthFactor;
  } else {
    scaleFactor.value = heightFactor;
    reverseScaleFactor.value = reverseHeightFactor;
  }
}

let previousX: number;
let previousY: number;
let previousWidth: number;
let previousHeight: number;
function handleMouseDown(element: Element, event: MouseEvent, width?: 'left' | 'center' | 'right', height?: 'top' | 'center' | 'bottom') {
  if (!slideRef.value) return;

  selectElement(element, event);
  elementMoving.value = true;

  if (width) {
    scalePositionWidth.value = width;
    previousWidth = element.dimensions.width;
  }
  if (height) {
    scalePositionHeight.value = height;
    previousHeight = element.dimensions.height;
  }

  previousX = element.position.x;
  previousY = element.position.y;

  // element width and height
  const el = event.target as HTMLDivElement;
  elementWidth.value = el.offsetWidth;
  elementHeight.value = el.offsetHeight;

  // mouse position relative to slide
  const slideRect = slideRef.value.getBoundingClientRect();
  const mouseX = event.clientX - slideRect.left; // top
  const mouseY = event.clientY - slideRect.top; // left

  // offset between mouse and element's top/left
  offsetX.value = mouseX - element.position.x * scaleFactor.value;
  offsetY.value = mouseY - element.position.y * scaleFactor.value;

  document.addEventListener('mousemove', width || height ? scaleElement : moveElement);
  document.addEventListener('mouseup', handleMouseUp);
}

function scaleElement(event: MouseEvent) {
  if (!elementMoving.value || !selectedElement.value || !slideRef.value || selectedElement.value.type == 'Slide') return;

  const width = scalePositionWidth.value;
  const height = scalePositionHeight.value;

  // mouse position relative to slide
  const slideRect = slideRef.value.getBoundingClientRect();
  const mouseX = event.clientX - slideRect.left; // top
  const mouseY = event.clientY - slideRect.top; // left

  // move same distance as mouse from original offsetx/y
  const rawX = mouseX * reverseScaleFactor.value - offsetX.value * reverseScaleFactor.value; // position of element's top relative to slide
  const rawY = mouseY * reverseScaleFactor.value - offsetY.value * reverseScaleFactor.value; // position of element's left relative to slide
  console.log(rawX, rawY);

  const widthDirection = rawX < previousX ? previousWidth + Math.abs(selectedElement.value.position.x - previousX) : previousWidth - Math.abs(selectedElement.value.position.x - previousX);
  const heightDirection = rawY < previousY ? previousHeight + Math.abs(selectedElement.value.position.y - previousY) : previousHeight - Math.abs(selectedElement.value.position.y - previousY);

  if (width == 'left' && height == 'top') {
    selectedElement.value.position.x = Math.max(0, Math.min(rawX, slideRect.width * reverseScaleFactor.value - selectedElement.value.dimensions.width));
    selectedElement.value.position.y = Math.max(0, Math.min(rawY, slideRect.height * reverseScaleFactor.value - selectedElement.value.dimensions.height));
    selectedElement.value.dimensions.width = Math.max(0, Math.min(widthDirection, slideRect.width * reverseScaleFactor.value));
    selectedElement.value.dimensions.height = Math.max(0, Math.min(heightDirection, slideRect.height * reverseScaleFactor.value));
  } else if (width == 'right' && height == 'bottom') {
    selectedElement.value.dimensions.width = Math.max(0, Math.min(rawX, slideRect.width * reverseScaleFactor.value - selectedElement.value.dimensions.width));
    selectedElement.value.dimensions.height = Math.max(0, Math.min(rawY, slideRect.height * reverseScaleFactor.value - selectedElement.value.dimensions.height));
  }

  // check bounds of outer slide
  // selectedElement.value.position.x = Math.max(0, Math.min(rawX, slideRect.width * reverseScaleFactor.value - selectedElement.value.dimensions.width));
  // selectedElement.value.position.y = Math.max(0, Math.min(rawY, slideRect.height * reverseScaleFactor.value - selectedElement.value.dimensions.height));
}

function moveElement(event: MouseEvent) {
  if (!elementMoving.value || !selectedElement.value || !slideRef.value || selectedElement.value.type == 'Slide') return;

  // mouse position relative to slide
  const slideRect = slideRef.value.getBoundingClientRect();
  const mouseX = event.clientX - slideRect.left; // top
  const mouseY = event.clientY - slideRect.top; // left
  console.log(event.clientX, event.clientY);

  // move same distance as mouse from original offsetx/y
  const rawX = mouseX * reverseScaleFactor.value - offsetX.value * reverseScaleFactor.value; // position of element's top relative to slide
  const rawY = mouseY * reverseScaleFactor.value - offsetY.value * reverseScaleFactor.value; // position of element's left relative to slide

  // check bounds of outer slide
  selectedElement.value.position.x = Math.max(0, Math.min(rawX, slideRect.width * reverseScaleFactor.value - selectedElement.value.dimensions.width));
  selectedElement.value.position.y = Math.max(0, Math.min(rawY, slideRect.height * reverseScaleFactor.value - selectedElement.value.dimensions.height));
}

function handleMouseUp() {
  elementMoving.value = false;
  document.removeEventListener('mousemove', scaleElement);
  document.removeEventListener('mousemove', moveElement);
  document.removeEventListener('mouseup', handleMouseUp);
}

function selectElement(element: Slide | Element, event: Event) {
  event.stopPropagation();

  if (!currentSlide.value) return;
  currentSlide.value.selected = false;
  for (let el of currentSlide.value.elements) {
    el.selected = false;
  }

  selectedElement.value = element;
  element.selected = true;
}
</script>

<style lang="scss" scoped>
.slideBackground {
  width: 100%;
  height: 100%;
  max-width: 80rem;
  max-height: 45rem;
}

.selected {
  outline: 0.15rem solid var(--primary);
}
</style>
