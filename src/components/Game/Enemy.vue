<template>
  <div class="flex gap-3 relative py-2 px-5">
    <span
      v-for="(num, index) in displayedNumbers"
      :key="index"
      class="w-14 h-14 text-center text-2xl rounded-md border-2 border-[color:var(--faded-bg-color)] flex items-center justify-center duration-250 transition-none"
      @click="attack(store.currentElement, index)"
      :class="{
        'cursor-default': !store.currentElement,
        'cursor-pointer': store.currentElement,
        'cursor-not-allowed': store.currentElement && store.currentElement?.name != 'air',
        'bg-[color:var(--air)]': elementNumbers[index] == 3,
        'bg-[color:var(--enemy)]': elementNumbers[index] != 3
      }"
      >{{ num }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { type Element } from '@/utils/elements';
import { delay, getRandomInt } from '@/utils/functions';
import { onMounted, ref, watch } from 'vue';

type Props = {
  lives: number;
  slots: number;
  reroll: boolean;
};

type Emits = {
  damaged: [damage: number];
  onReroll: [board: number[]];
};

const store = useGameStore();
const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const displayedNumbers = ref<number[]>([]);
const elementNumbers = ref<number[]>([]);

onMounted(() => {
  displayedNumbers.value = generateNewArray();
  elementNumbers.value = new Array(props.slots).fill(0);
  emit('onReroll', displayedNumbers.value);
});

function generateNewArray() {
  const array: number[] = [];
  for (let i = 0; i < props.slots; i++) {
    array.push(getRandomInt(0, 9));
  }
  return array;
}

async function attack(element: Element | undefined, index: number) {
  if (!element || element.currentLevel == 0 || element.name != 'air' || elementNumbers.value[index] == 3 || store.energy < 10) return;

  if (element.currentLevel >= 1) {
    elementNumbers.value[index] = 3;
    displayedNumbers.value[index] = reroll();
    unyeet(index);
    store.energy -= 10;
  }

  if (element.currentLevel == 2) {
    await delay(150);
    if (Math.random() < 0.25) cascade(1);
  }

  if (element.currentLevel == 3) {
    if (Math.random() < 0.5) {
      await delay(150);
      cascade(1);
      await delay(150);
      if (Math.random() < 0.25) cascade(2);
    }
  }

  if (element.currentLevel == 4) {
    await delay(150);
    cascade(1);
    await delay(150);
    for (let i = 1; i < 10; i++) {
      if (Math.random() < 0.5 / i) cascade(i + 1);
      else break;
      await delay(150);
    }
  }

  emit('onReroll', displayedNumbers.value);

  function reroll() {
    let random = getRandomInt(0, 9);
    while (random == displayedNumbers.value[index]) {
      random = getRandomInt(0, 9);
    }
    return random;
  }

  function cascade(distance: number) {
    try {
      elementNumbers.value[index - distance] = 3;
      displayedNumbers.value[index - distance] = reroll();
      unyeet(index - distance);

      if (elementNumbers.value[index + distance] != undefined) {
        elementNumbers.value[index + distance] = 3;
        displayedNumbers.value[index + distance] = reroll();
        unyeet(index + distance);
      }
    } catch (e) {}
  }

  async function unyeet(index: number) {
    await delay(500);
    elementNumbers.value[index] = 0;
  }
}
</script>

<style lang="scss" scoped></style>
