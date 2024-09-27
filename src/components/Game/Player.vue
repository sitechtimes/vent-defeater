<template>
  <div class="flex gap-3 relative" v-if="loaded">
    <div v-for="(row, rowIndex) in displayedGrid" :key="rowIndex" class="flex items-center justify-center flex-col gap-2">
      <span
        v-for="(num, numIndex) in row"
        :key="numIndex"
        class="w-14 h-14 text-center text-2xl rounded-md border-2 border-[color:var(--faded-bg-color)] flex items-center justify-center duration-250 cursor-pointer transition-none"
        @click="attack(store.currentElement, rowIndex, numIndex)"
        :class="{ 'bg-[color:var(--ice)]': elementGrid[rowIndex][numIndex] == 1, 'bg-[color:var(--fire)]': elementGrid[rowIndex][numIndex] == 2, 'bg-[color:var(--faded-bg-color-light)]': elementGrid[rowIndex][numIndex] == 0 }"
        >{{ num }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { type Element } from '@/utils/elements';
import { delay, getRandomInt } from '@/utils/functions';
import { onMounted, ref, watch } from 'vue';

type Props = {
  rows: number;
  columns: number;
  reroll: boolean;
};

type Emits = {
  damaged: [damage: number];
  regen: [health: number, energy: number];
};

const store = useGameStore();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
watch(
  () => props.reroll,
  (active) => {
    if (active) reroll();
  }
);

const displayedGrid = ref<number[][]>([]);
const elementGrid = ref<number[][]>([]);

const loaded = ref(false);

const generalWinterCooldown = ref(0);
const arsonCooldown = ref(0);

onMounted(() => {
  /* yes this is necessary
  array.fill does funky shit with the ice attack
  dont trump meme me
  dont do it lawrence
  i know you want to dont do it
  dont fucking do it */
  for (let i = 0; i < props.rows; i++) {
    const displayedRow: number[] = [];
    const elementRow: number[] = [];
    for (let j = 0; j < props.columns; j++) {
      displayedRow.push(getRandomInt(0, 9));
      elementRow.push(0);
    }
    displayedGrid.value.push(displayedRow);
    elementGrid.value.push(elementRow);
  }
  loaded.value = true;
});

function getAdjacentTiles (i: number, j: number) {
  let left: number | undefined, right: number | undefined, up: number | undefined, down: number | undefined;
      try {
        left = elementGrid.value[i][j - 1];
      } catch (e) {}
      try {
        right = elementGrid.value[i][j + 1];
      } catch (e) {}
      try {
        up = elementGrid.value[i - 1][j];
      } catch (e) {}
      try {
        down = elementGrid.value[i + 1][j];
      } catch (e) {}

      return [left, right, up, down];
}

function reroll() {
  let explode = false;
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < props.columns; j++) {
      if (!explode && fireExplode(i, j)) explode = true;
      if (iceThaw(i, j)) continue;
      displayedGrid.value[i][j] = getNewNumber(displayedGrid.value[i][j]);
      if (store.currentElement?.name == 'fire' && elementGrid.value[i][j] == 2) emit("regen", store.currentElement.currentLevel == 4 ? 0.05 : (0.1 / store.currentElement.currentLevel), 0);
    }
  }
  if (explode) {
    elementGrid.value = elementGrid.value.map((row) => row.map((elem) => elem == 2 ? 0 : elem));
    emit("damaged", 25);
  }
  generalWinter();
  arson();
  emit('regen', 0, 5);

  function getNewNumber(replace: number) {
    let random = getRandomInt(0, 9);
    while (random == replace) {
      random = getRandomInt(0, 9);
    }
    return random;
  }

  function iceThaw(i: number, j: number) {
    const level = store.currentElement?.currentLevel;

    if (elementGrid.value[i][j] != 1) return false;

    if (level == 1) elementGrid.value[i][j] = 0;
    else if (level == 2 || level == 3) {
      const directions = getAdjacentTiles(i, j);
      let adjacentFrozen = 0;
      let allAdjacent = 0;
      for (let direction of directions) {
        if (direction != undefined) {
          allAdjacent++;
          if (direction == 1) adjacentFrozen++;
        }
      }

      const chance = adjacentFrozen / allAdjacent;
      if (Math.random() > chance && level == 2) elementGrid.value[i][j] = 0;
    }

    return true;
  }

  function fireExplode (i: number, j: number) {
    const level = store.currentElement?.currentLevel;

    if (level && level <= 2) { // check for explosions
      const directions = getAdjacentTiles(i, j);
      let adjacentFire = 0;
      for (let direction of directions) {
        if (direction == 2) adjacentFire++;
      }

      if (adjacentFire >= (level == 1 ? 2 : 4)) return true;
    }
    return false;
  }

  function generalWinter() {
    if (store.currentElement?.currentLevel == 4 && store.currentElement?.name == 'ice') {
      if (generalWinterCooldown.value < 2) generalWinterCooldown.value++;
      else {
        let row = getRandomInt(0, props.rows - 1);
        let column = getRandomInt(0, props.columns - 1);
        let tries = 0;
        while (elementGrid.value[row][column] != 0 && tries < props.rows * props.columns) {
          row = getRandomInt(0, props.rows - 1);
          column = getRandomInt(0, props.columns - 1);
          tries++;
        }
        if (tries >= props.rows * props.columns) elementGrid.value[row][column] = 1;
        generalWinterCooldown.value = 0;
      }
    }
  }

  function arson() {
    if (store.currentElement?.currentLevel == 4 && store.currentElement?.name == 'fire') {
      if (arsonCooldown.value < 2) arsonCooldown.value++;
      else {
        let row = getRandomInt(0, props.rows - 1);
        let column = getRandomInt(0, props.columns - 1);
        let tries = 0;
        while (elementGrid.value[row][column] != 0 && tries < props.rows * props.columns) {
          row = getRandomInt(0, props.rows - 1);
          column = getRandomInt(0, props.columns - 1);
          tries++;
        }
        if (tries >= props.rows * props.columns) elementGrid.value[row][column] = 2;
        arsonCooldown.value = 0;
      }
    }
  }
}

function attack(element: Element | undefined, rowIndex: number, numIndex: number) {
  if (!element || element.currentLevel == 0 || element.name == 'air') return;

  if (element.name == 'ice') ice(element, rowIndex, numIndex);
  else if (element.name == 'fire') fire(element, rowIndex, numIndex);
  else if (element.name == 'earth') earth(element, rowIndex, numIndex);

  function ice(element: Element, rowIndex: number, numIndex: number) {
    if (element.currentLevel >= 3 && elementGrid.value[rowIndex][numIndex] == 1) { // freeze adjacent fire tiles
      elementGrid.value[rowIndex][numIndex] = 0;
      return;
    }

    if (elementGrid.value[rowIndex][numIndex] != 0 || store.energy < 5) return;

    if (element.currentLevel >= 1) { // basic attack
      elementGrid.value[rowIndex][numIndex] = 1;
      store.energy -= 5;
    }
  }

  function fire(element: Element, rowIndex: number, numIndex: number) {
    if (element.currentLevel >= 1) { // basic attack
      elementGrid.value[rowIndex][numIndex] = 2;
      store.energy -= 5;
    }

    if (element.currentLevel >= 3) { // burn adjacent ground tiles
      const directions = getAdjacentTiles(rowIndex, numIndex);
      for (let direction of directions) {
        if (direction == 4) elementGrid.value[rowIndex][numIndex] = 2;
      }
    }
  }

  function earth(element: Element, rowIndex: number, numIndex: number) {}
}
</script>

<style lang="scss" scoped></style>
