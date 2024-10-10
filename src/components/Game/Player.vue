<template>
  <div class="flex gap-3 relative" v-if="loaded">
    <div v-for="(row, rowIndex) in displayedGrid" :key="rowIndex" class="flex items-center justify-center flex-col gap-2">
      <span
        v-for="(num, numIndex) in row"
        :key="numIndex"
        class="w-14 h-14 text-center text-2xl rounded-md border-2 border-[color:var(--faded-bg-color)] flex items-center justify-center duration-250 transition-none"
        @click="attack(store.currentElement, rowIndex, numIndex)"
        :class="{
          'cursor-default': !store.currentElement,
          'cursor-pointer': store.currentElement && store.currentElement?.name != 'air',
          'cursor-not-allowed': store.currentElement?.name == 'air',
          'bg-[color:var(--ice)]': elementGrid[rowIndex][numIndex] == 1,
          'bg-[color:var(--fire)]': elementGrid[rowIndex][numIndex] == 2,
          'bg-[color:var(--earth)]': elementGrid[rowIndex][numIndex] == 4,
          'bg-[color:var(--enemy)]': elementGrid[rowIndex][numIndex] == 99,
          'bg-[color:var(--you)]': elementGrid[rowIndex][numIndex] == 0
        }"
        >{{ num }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { fire, ice, relics, type Element } from "@/utils/elements";
import { getRandomInt } from "@/utils/functions";
import { onBeforeMount, ref, toRef, watch } from "vue";

type Props = {
  rows: number;
  columns: number;
  reroll: boolean;
  match: number[][] | undefined;
};

type Emits = {
  damaged: [damage: number];
  regen: [health: number, energy: number];
  onReroll: [board: number[][]];
  oilSpill: [void];
  outOfEnergy: [void];
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
const elementGrid = toRef(store.elementGrid);

const loaded = ref(false);

const generalWinterCooldown = ref(0);
const arsonCooldown = ref(0);

onBeforeMount(() => {
  elementGrid.value = [];
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
  emit("onReroll", displayedGrid.value);
});

function getAdjacentTiles(i: number, j: number) {
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
      if (!explode && elementGrid.value[i][j] == 2 && fireExplode(i, j)) explode = true;
      if (elementGrid.value[i][j] == 2) emit("regen", getFireRegen(), 0);
      if (elementGrid.value[i][j] == 4) {
        if (relics[11].unlocked) continue;
        displayedGrid.value[i][j] = Math.max(0, Math.min(9, displayedGrid.value[i][j] + getRandomInt(-1, 1)));
        elementGrid.value[i][j] = 0;
        continue;
      }
      if (iceThaw(i, j)) continue;
      displayedGrid.value[i][j] = getNewNumber(displayedGrid.value[i][j]);
    }
  }
  if (explode) {
    elementGrid.value = elementGrid.value.map((row) => row.map((elem) => (elem == 2 ? 0 : elem)));
    emit("damaged", getExplosionDamage());
  }
  generalWinter();
  arson();
  emit("onReroll", displayedGrid.value);

  function getFireRegen() {
    if (fire.currentLevel == 1) return 5;
    else if (fire.currentLevel == 2) return 7.5;
    else if (fire.currentLevel == 3) return 10;
    else return 15;
  }

  function getExplosionDamage() {
    let initial = 25;
    if (relics[6].unlocked) initial -= 15;
    if (relics[7].unlocked) {
      initial += 10;
      emit("oilSpill");
    }
    return initial;
  }

  function getNewNumber(replace: number) {
    let random = getRandomInt(0, 9);
    while (random == replace) {
      random = getRandomInt(0, 9);
    }
    return random;
  }

  function iceThaw(i: number, j: number) {
    const level = ice.currentLevel;

    if (elementGrid.value[i][j] != 1) return false;

    if (level == 1) elementGrid.value[i][j] = 0;

    return true;
  }

  function fireExplode(i: number, j: number) {
    const level = fire.currentLevel;

    if (level <= 2) {
      // check for explosions
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
    if (ice.currentLevel == 4) {
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
        if (tries <= props.rows * props.columns) elementGrid.value[row][column] = 1;
        generalWinterCooldown.value = 0;
      }
    }
  }

  async function arson() {
    if (fire.currentLevel == 4) {
      if (arsonCooldown.value < 2) arsonCooldown.value++;
      else {
        await spreadFire();
        if (relics[8].unlocked) spreadFire();
        arsonCooldown.value = 0;
      }
    }

    async function spreadFire() {
      let row = getRandomInt(0, props.rows - 1);
      let column = getRandomInt(0, props.columns - 1);
      let tries = 0;
      while (elementGrid.value[row][column] != 0 && tries < props.rows * props.columns) {
        row = getRandomInt(0, props.rows - 1);
        column = getRandomInt(0, props.columns - 1);
        tries++;
      }
      if (tries <= props.rows * props.columns) elementGrid.value[row][column] = 2;
    }
  }
}

function attack(element: Element | undefined, rowIndex: number, numIndex: number) {
  if (!element || element.currentLevel == 0 || element.name == "air") return;

  if (element.name == "ice") ice(element, rowIndex, numIndex);
  else if (element.name == "fire") fire(element, rowIndex, numIndex);
  else if (element.name == "earth") earth(element, rowIndex, numIndex);

  function ice(element: Element, rowIndex: number, numIndex: number) {
    if (store.energy < (relics[1].unlocked ? 6 : relics[0].unlocked ? 4 : 5)) return emit("outOfEnergy");
    if (elementGrid.value[rowIndex][numIndex] > 1) return;

    if (elementGrid.value[rowIndex][numIndex] == 1 && element.currentLevel >= 2) {
      elementGrid.value[rowIndex][numIndex] = 0;
      return;
    } else if (elementGrid.value[rowIndex][numIndex] != 0) return;

    if (element.currentLevel >= 1) {
      // basic attack
      elementGrid.value[rowIndex][numIndex] = 1;
      emit("regen", 0, -(relics[1].unlocked ? 6 : relics[0].unlocked ? 4 : 5));
    }
  }

  function fire(element: Element, rowIndex: number, numIndex: number) {
    if (store.energy < (relics[1].unlocked ? 6 : relics[0].unlocked ? 4 : 5)) return emit("outOfEnergy");
    if (elementGrid.value[rowIndex][numIndex] != 0) return;

    if (element.currentLevel >= 1) {
      // basic attack
      elementGrid.value[rowIndex][numIndex] = 2;
      emit("regen", 0, -(relics[1].unlocked ? 6 : relics[0].unlocked ? 4 : 5));
    }
  }

  function earth(element: Element, rowIndex: number, numIndex: number) {
    if (store.energy < (relics[1].unlocked ? 6 : relics[0].unlocked ? 4 : 5)) return emit("outOfEnergy");
    if (elementGrid.value[rowIndex][numIndex] != 0) return;

    if (element.currentLevel >= 1) {
      // basic attack
      elementGrid.value[rowIndex][numIndex] = 4;
      store.energy -= 5;
    }
  }
}
</script>

<style lang="scss" scoped></style>
