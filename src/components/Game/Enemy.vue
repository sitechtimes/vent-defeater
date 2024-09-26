<template>
    <div class="flex gap-3 relative">
        <span
          v-for="(num, index) in displayedNumbers"
          :key="index"
          class="w-14 h-14 text-center text-2xl rounded-md border-2 border-[color:var(--faded-bg-color)] flex items-center justify-center duration-250 cursor-pointer"
          @click="attack(store.currentElement, index)"
          :class="{ 'bg-[color:var(--air)]': elementNumbers[index] == 3, 'bg-[color:var(--faded-bg-color-light)]': elementNumbers[index] != 3 }"
          >{{ num }}</span
        >
      </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { type Element } from '@/utils/elements';
import { getRandomInt } from '@/utils/functions';
import { onMounted, ref } from 'vue';

type Props = {
    lives: number;
    slots: number;
}

const store = useGameStore();
const props = defineProps<Props>();
const displayedNumbers = ref<number[]>([]);
const elementNumbers = ref<number[]>([]);

onMounted(() => {
    displayedNumbers.value = generateNewArray();
    elementNumbers.value = new Array(props.slots).fill(0);
});

function generateNewArray () {
    const array: number[] = [];
    for (let i = 0; i < props.slots; i++) {
        array.push(Math.floor(getRandomInt(0, 9)));
    }
    return array;
}

function attack(element: Element | undefined, index: number) {
    if (!element || element.currentLevel == 0 || element.name != 'air') return;

    if (element.currentLevel == 1) {
        elementNumbers.value[index] = 3;

    }
  
}

</script>

<style lang="scss" scoped>

</style>