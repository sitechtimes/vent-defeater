<template>
  <LoadingTransition @done="loaded = true" />
  <div class="h-screen flex flex-col items-center justify-between bg-[color:var(--faded-bg-color)] transition duration-500">
    <header class="w-screen h-16 bg-[color:var(--bg-color)] transition duration-500 flex items-center justify-between px-8" :class="{ 'opacity-0': !loaded }">
      <div class="flex items-center justify-center gap-6">
        <RouterLink title="Go back to dashboard" to="/app/dashboard"><img class="w-6 h-6 dark:invert" src="/ui/leftArrow.svg" aria-hidden="true" /></RouterLink>
        <div class="flex items-start justify-center flex-col">
          <div class="flex items-center justify-center gap-2">
            <h1 class="text-lg font-450">{{ userStore.currentPres?.name }}</h1>
            <button><img class="w-4 h-4 dark:invert" src="/ui/pencil.svg" alt="Click to edit presentation name" /></button>
          </div>
          <p class="text-xs text-[color:var(--faded-text-color)]">{{ userStore.currentPres?.type }}</p>
        </div>
        <button title="Settings" class="settings w-10 h-10 bg-[color:var(--faded-bg-color)] flex items-center justify-center rounded-full">
          <img class="w-5 h-5 transition dark:invert" src="/ui/settings.svg" aria-hidden="true" />
        </button>
      </div>
      <div class="flex items-center justify-center gap-6">
        <ThemeToggle big />
      </div>
    </header>

    <div class="flex items-start justify-between bg-[color:var(--faded-bg-color)] w-screen h-screen transition duration-500 py-5 px-5" :class="{ 'opacity-0': !loaded }" v-if="currentSlide">
      <div class="flex flex-col items-center justify-center gap-6">
        <button class="flex items-center justify-center gap-2 bg-[color:var(--text-color)] rounded-full px-6 py-3 text-[color:var(--bg-color)] font-semibold">
          <img class="w-5 h-5 invert dark:invert-0" src="/ui/plus.svg" aria-hidden="true" /> New Slide
        </button>
        <div
          class="smallSlide rounded-lg cursor-pointer bg-[color:var(--bg-color)] flex items-center justify-center"
          :class="{ selected: currentSlideIndex == index }"
          v-for="(slide, index) in userStore.currentPres?.slides"
        >
          <p>Slide {{ index + 1 }}</p>
        </div>
      </div>

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

      <ElementOptions :selected-element="selectedElement" @close="selectedElement = undefined" />
      <div class="w-80" v-show="!selectedElement"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingTransition from '@/components/LoadingTransition.vue';
import ElementOptions from '@/components/PresentationEditing/ElementOptions.vue';
import ElementSwitch from '@/components/PresentationEditing/ElementSwitch.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
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
const offsetLeft = ref(0);
const offsetTop = ref(0);
const offsetRight = ref(0);
const offsetBottom = ref(0);

const scalePositionWidth = ref<'left' | 'center' | 'right'>();
const scalePositionHeight = ref<'top' | 'center' | 'bottom'>();

// when saving:
// delete any elements that have top left right bottom all outside bounds of slide

onMounted(() => {
  loaded.value = false;
  getScaleFactors();

  if (!userStore.currentPres) return;

  const slide = userStore.currentPres.slides[currentSlideIndex.value];
  slide.selected = false;
  for (let element of slide.elements) {
    element.selected = false;
  }
  currentSlide.value = slide;

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

  console.log(scaleFactor.value, reverseScaleFactor.value);
}

function handleMouseDown(element: Element, event: MouseEvent, width?: 'left' | 'center' | 'right', height?: 'top' | 'center' | 'bottom') {
  if (!slideRef.value) return;

  selectElement(element, event);
  elementMoving.value = true;

  scalePositionWidth.value = width;
  scalePositionHeight.value = height;

  const slideRect = slideRef.value.getBoundingClientRect();
  const mouseLeft = event.clientX - slideRect.left;
  const mouseTop = event.clientY - slideRect.top;
  const mouseRight = slideRect.right - event.clientX;
  const mouseBottom = slideRect.bottom - event.clientY;

  offsetLeft.value = mouseLeft - element.position.left * scaleFactor.value;
  offsetTop.value = mouseTop - element.position.top * scaleFactor.value;
  offsetRight.value = mouseRight - element.position.right * scaleFactor.value;
  offsetBottom.value = mouseBottom - element.position.bottom * scaleFactor.value;

  document.addEventListener('mousemove', width || height ? scaleElement : moveElement);
  document.addEventListener('mouseup', handleMouseUp);
}

function scaleElement(event: MouseEvent) {
  if (!elementMoving.value || !selectedElement.value || !slideRef.value || selectedElement.value.type == 'Slide') return;

  const width = scalePositionWidth.value;
  const height = scalePositionHeight.value;

  const slideRect = slideRef.value.getBoundingClientRect();
  const mouseLeft = event.clientX - slideRect.left;
  const mouseTop = event.clientY - slideRect.top;
  const mouseRight = slideRect.right - event.clientX;
  const mouseBottom = slideRect.bottom - event.clientY;

  const rawLeft = mouseLeft * reverseScaleFactor.value - offsetLeft.value * reverseScaleFactor.value;
  const rawTop = mouseTop * reverseScaleFactor.value - offsetTop.value * reverseScaleFactor.value;
  const rawRight = mouseRight * reverseScaleFactor.value - offsetRight.value * reverseScaleFactor.value;
  const rawBottom = mouseBottom * reverseScaleFactor.value - offsetBottom.value * reverseScaleFactor.value;

  if (height == 'top') selectedElement.value.position.top = rawTop;
  if (height == 'bottom') selectedElement.value.position.bottom = rawBottom;
  if (width == 'left') selectedElement.value.position.left = rawLeft;
  if (width == 'right') selectedElement.value.position.right = rawRight;
}

function moveElement(event: MouseEvent) {
  if (!elementMoving.value || !selectedElement.value || !slideRef.value || selectedElement.value.type == 'Slide') return;

  const slideRect = slideRef.value.getBoundingClientRect();
  const mouseLeft = event.clientX - slideRect.left;
  const mouseTop = event.clientY - slideRect.top;
  const mouseRight = slideRect.right - event.clientX;
  const mouseBottom = slideRect.bottom - event.clientY;

  const rawLeft = mouseLeft * reverseScaleFactor.value - offsetLeft.value * reverseScaleFactor.value;
  const rawTop = mouseTop * reverseScaleFactor.value - offsetTop.value * reverseScaleFactor.value;
  const rawRight = mouseRight * reverseScaleFactor.value - offsetRight.value * reverseScaleFactor.value;
  const rawBottom = mouseBottom * reverseScaleFactor.value - offsetBottom.value * reverseScaleFactor.value;

  selectedElement.value.position.left = rawLeft;
  selectedElement.value.position.top = rawTop;
  selectedElement.value.position.right = rawRight;
  selectedElement.value.position.bottom = rawBottom;
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

.smallSlide {
  width: 128px;
  height: 72px;
}

.selected {
  outline: 0.15rem solid var(--primary);
}

@media (hover: hover) and (pointer: fine) {
  .settings:hover {
    img {
      transform: scale(1.1);
    }
  }
}
</style>
