<template>
  <div class="flex flex-col items-center justify-center gap-3 py-2 px-5">
    <div class="flex gap-3 content-center justify-center" :class="{ 'max-w-[40vw]': store.smallScreen, 'flex-wrap': store.smallScreen }">
      <span
        v-for="(num, index) in displayedNumbers"
        :key="index"
        class="w-14 h-14 text-center text-2xl rounded-md border-2 border-[color:var(--faded-bg-color)] flex items-center justify-center duration-250 transition-none"
        @click="attack(store.currentElement, index)"
        :class="{
          'cursor-default': !store.currentElement,
          'cursor-pointer': store.currentElement?.name == 'air',
          'cursor-not-allowed': store.currentElement && store.currentElement?.name != 'air',
          'bg-[color:var(--air)]': elementNumbers[index] == 3,
          'bg-[color:var(--enemy)]': elementNumbers[index] != 3
        }"
        >{{ num }}</span
      >
    </div>
    <div class="flex items-center justify-center gap-4" :class="{ 'w-[133%]': !store.smallScreen, 'w-full': store.smallScreen }">
      <div class="w-full h-4 bg-white rounded-full flex items-center justify-start" :class="{ shaky: attackMeter >= 100 }">
        <div class="transition-all duration-500 h-4 rounded-full bg-[color:var(--enemy)] min-w-[10%]" :style="{ width: attackMeter + '%' }"></div>
      </div>
      <div class="flex items-center justify-center gap-1">
        <img class="w-6 h-6" src="/game/life.svg" aria-hidden="true" />
        <h3 class="text-2xl font-semibold text-[color:var(--bg-color)]">{{ props.lives }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  lives: number;
  slots: number;
  reroll: boolean;
};

type Emits = {
  damaged: [damage: number];
  regen: [health: number, energy: number];
  onReroll: [board: number[]];
  fart: [void];
  blizzard: [void];
  outOfEnergy: [void];
};

const store = useGameStore();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
watch(
  () => props.reroll,
  (active) => {
    if (active) {
      enemyAttack();
      stunDuration.value = Math.max(0, stunDuration.value - 1);
    }
  }
);
watch(
  () => props.lives,
  () => {
    if (relics[15].unlocked) attackMeter.value = 10;
    displayedNumbers.value = generateNewArray();
    emit("onReroll", displayedNumbers.value);
  }
);

const attackMeter = ref(10);

const { elementGrid } = storeToRefs(store);
const displayedNumbers = ref<number[]>([]);
const elementNumbers = ref<number[]>([]);
const stunDuration = ref(0);

onMounted(() => {
  displayedNumbers.value = generateNewArray();
  elementNumbers.value = new Array(props.slots).fill(0);
  emit("onReroll", displayedNumbers.value);
});

function generateNewArray() {
  const array: number[] = [];
  for (let i = 0; i < props.slots; i++) {
    array.push(getRandomInt(0, 9));
  }
  return array;
}

function enemyAttack() {
  if (stunDuration.value > 0) return;
  attackMeter.value += getRandomInt(10, 15);
  if (attackMeter.value <= 115) return;

  let earthTiles = 0;
  if (earth.currentLevel >= 3) {
    let iceTiles = 0;
    for (let row of elementGrid.value) {
      for (let cell of row) {
        if (cell == 1) iceTiles++;
        if (cell == 4) earthTiles++;
      }
    }

    const chance = (earthTiles / elementGrid.value.length ** 2) * 0.5;
    if (Math.random() < chance) {
      if (relics[5].unlocked && iceTiles >= 1 && Math.random() < 0.05) emit("blizzard");
      return;
    }
  }

  if (earth.currentLevel == 4) {
    if (Math.random() < (earthTiles / elementGrid.value.length ** 2) * (relics[12].unlocked ? 0.5 : 0.25)) {
      stunDuration.value = Math.ceil((earthTiles / elementGrid.value.length ** 2) * 5);
    }
  }

  emit("damaged", getRandomInt(2 * props.slots, 10 * props.slots));
  attackMeter.value = 10;
}

async function attack(element: GameElement | undefined, index: number) {
  if (store.energy < (relics[1].unlocked ? 6 : relics[0].unlocked ? 4 : 5)) return emit("outOfEnergy");
  if (!element || element.currentLevel == 0 || element.name != "air" || elementNumbers.value[index] == 3) return;

  if (element.currentLevel >= 1) {
    elementNumbers.value[index] = 3;
    displayedNumbers.value[index] = reroll();
    unyeet(index);
    emit("regen", 0, -(relics[1].unlocked ? 6 : relics[0].unlocked ? 4 : 5));
  }

  if (element.currentLevel == 2) {
    await delay(150);
    if (Math.random() < (relics[9].unlocked ? 0.5 : 0.25)) cascade(1);
  }

  if (element.currentLevel == 3) {
    if (Math.random() < (relics[9].unlocked ? 1 : 0.5)) {
      await delay(150);
      cascade(1);
      await delay(150);
      if (Math.random() < (relics[9].unlocked ? 0.5 : 0.25)) cascade(2);
    }
  }

  if (element.currentLevel == 4) {
    await delay(150);
    cascade(1);
    await delay(150);
    for (let i = 1; i < 10; i++) {
      if (Math.random() < (relics[9].unlocked ? 1 : 0.5) / i) cascade(i + 1);
      else break;

      if (i > 3) emit("fart");
      await delay(150);
    }
  }

  emit("onReroll", displayedNumbers.value);

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

<style lang="scss" scoped>
@keyframes shake {
  0% {
    transform: translate(0.5rem, 0);
  }
  20% {
    transform: translate(0, 0.75rem);
  }
  40% {
    transform: translate(-0.35rem, 0.35rem);
  }
  60% {
    transform: translate(0.75rem, -0.35rem);
  }
  80% {
    transform: translate(-0.75rem, 0);
  }
  100% {
    transform: translate(0.5rem, 0);
  }
}

.shaky {
  animation: shake 0.25s infinite linear;
}
</style>
