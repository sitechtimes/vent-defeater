<template>
  <div class="energyOverlay w-screen h-screen fixed left-0 top-0 pointer-events-none transition-none z-[100] backdrop-blur-xl" :style="{ opacity: (energy - 100) / 25 }" v-if="energy > 100"></div>
  <Transition name="opacity">
    <div class="healthOverlay w-screen h-screen fixed left-0 top-0 pointer-events-none transition-none z-[100] backdrop-blur-xl" v-if="health < 50 || showHealthOverlay"></div>
  </Transition>

  <button class="z-10 absolute top-4 right-4 border-2 bg-white border-neutral-950" @click="level = 'map'">(testing) next lvl</button>
  <button class="z-10 absolute top-16 right-4 border-2 bg-white border-neutral-950" @click="handleDamage(8)">take 8 damage</button>
  <div class="z-10 absolute bottom-4 right-4 flex items-center justify-center flex-col bg-slate-900 py-2 px-10 w-48 rounded-xl" v-if="level">
    <p class="timer font-semibold text-4xl">
      {{ Math.floor(timer / 1000 / 60) }}:{{ (Math.floor((timer / 1000) % 60).toString().length == 1 ? '0' : '') + Math.floor((timer / 1000) % 60) }}.<span class="timer text-2xl">
        {{
          Math.floor(timer % 1000).toString().length == 1
            ? '0'
            : '' +
              Math.floor(timer % 1000)
                .toString()
                .slice(0, 2)
        }}
      </span>
    </p>
  </div>

  <div class="relative flex items-center justify-center w-screen h-screen overflow-hidden select-none" :class="{ 'bg-black': level }">
    <Transition name="left">
      <div class="absolute left-0 h-screen flex items-center justify-start flex-col gap-4 px-3 py-10 bg-black bg-opacity-65 w-[35rem] z-20" v-show="typeof level != 'string' && level">
        <div class="w-3/4 flex items-center justify-center gap-1">
          <img class="w-6 h-6 dark:invert" src="/game/health.svg" aria-hidden="true" />
          <h3 class="text-2xl font-semibold w-16 text-[color:var(--bg-color)]">{{ Math.floor(health) }}</h3>
          <div class="flex items-center justify-start w-full h-8 rounded-full bg-[color:var(--bg-color-contrast-translucent)]">
            <div class="transition-all duration-500 h-full rounded-full bg-red-500" :style="{ width: Math.min(100, health) + '%' }"></div>
          </div>
        </div>

        <div class="w-3/4 flex items-center justify-center gap-1">
          <img class="w-6 h-6 dark:invert" src="/game/elements/electric.svg" aria-hidden="true" />
          <h3 class="text-2xl font-semibold w-16 text-[color:var(--bg-color)]">{{ energy }}</h3>
          <div class="relative flex items-center justify-start w-full h-8 rounded-full bg-[color:var(--bg-color-contrast-translucent)]">
            <div class="transition-all duration-500 h-full rounded-full bg-yellow-500 min-w-[10%]" :style="{ width: Math.min(100, energy) + '%' }"></div>
            <div class="transition-all duration-500 absolute left-0 h-full rounded-full bg-orange-500 max-w-full" :style="{ width: ((energy - 100) / 25) * 100 + '%' }"></div>
          </div>
        </div>

        <h1 class="text-4xl font-bold text-[color:var(--bg-color)]">Inventory</h1>

        <div class="flex items-center justify-center w-full gap-4">
          <button
            @click="selectedElement = element"
            class="element flex flex-col items-center justify-center bg-[color:var(--bg-color)] rounded-2xl border-2 p-2 select-none"
            :disabled="element.currentLevel == 0"
            :class="{
              disabled: element.currentLevel == 0,
              grayscale: element.currentLevel == 0,
              'cursor-not-allowed': element.currentLevel == 0,
              'blur-sm': element.currentLevel == 0,
              'border-green-500': element.name == selectedElement?.name,
              'border-transparent': element.name != selectedElement?.name
            }"
            v-for="element in elements"
            :key="element.name"
          >
            <img class="w-[25%] h-[25%]" :src="element.img" :alt="'Open tech tree of ' + element.name" />
            <p class="mt-2 text-xl">Level {{ element.currentLevel }}</p>
            <p>{{ element.name[0].toUpperCase() + element.name.slice(1) }}</p>
          </button>
        </div>

        <Transition name="down">
          <div class="flex items-center justify-center w-full p-3 rounded-2xl" v-if="selectedElement">
            <div class="flex flex-col items-center justify-center w-40">
              <h2 class="text-4xl text-[color:var(--bg-color)]">{{ selectedElement.name[0].toUpperCase() + selectedElement.name.slice(1) }}</h2>
              <p class="text-lg text-[color:var(--bg-color)]">Level {{ selectedElement.currentLevel }}</p>
            </div>

            <div class="w-full h-10 flex items-center justify-center gap-[0.125rem] bg-[color:var(--bg-color-contrast)] border-2 border-[color:var(--bg-color-contrast)] rounded-full">
              <div
                class="level relative w-full h-full flex items-center justify-around py-2 cursor-help"
                v-for="level in selectedElement.levels"
                :class="getBarColor(selectedElement, level.level)"
                :key="level.level"
              >
                <div
                  class="description shadow-[color:var(--text-color)] shadow-sm pointer-events-none hidden absolute top-0 left-28 w-96 rounded-lg z-10 p-2 flex-col gap-2 items-center justify-center whitespace-nowrap"
                  :class="getBarColor(selectedElement, level.level)"
                >
                  <h4 class="text-xl font-semibold">{{ level.name }}</h4>
                  <p
                    class="text-wrap w-3/4 text-center transition-none"
                    :class="{ 'blur-sm': selectedElement.currentLevel < level.level, 'cursor-not-allowed': selectedElement.currentLevel < level.level }"
                  >
                    <span :class="{ 'font-bold': part.bold }" v-for="part in formatDescription(level.description)">{{ part.text }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <Intro
      v-if="!level"
      @next="
        level = store.levels[0];
        startTime = new Date().getTime();
      "
    />
    <Transition name="page">
      <Level
        v-if="typeof level != 'string' && level"
        :level="level"
        :player-rows="rows"
        :player-columns="columns"
        @win="handleWin"
        @reward="(reward) => handleReward(reward)"
        @damaged="(damage) => handleDamage(damage)"
        @regen="(hp, energy) => handleRegen(hp, energy)"
      />
    </Transition>

    <Transition name="pageOther">
      <Map :current-level="previousLevel" @select="(lvl) => (level = lvl)" v-if="level == 'map'" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Intro from '@/components/Game/Intro.vue';
import Level from '@/components/Game/Level.vue';
import Map from '@/components/Game/Map.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useGameStore } from '@/stores/game';
import { air, earth, fire, ice, formatDescription } from '@/utils/elements';
import type { Element, Level as LevelType } from '@/utils/elements';
import { delay, getRandomInt, getRandomItemFromArray } from '@/utils/functions';
import { onBeforeMount, onMounted, ref, toRef, watch } from 'vue';

const store = useGameStore();

const showHealthOverlay = ref(false);
const startTime = ref<number>();
const timer = ref(0);
watch(
  () => startTime.value,
  async () => {
    while (startTime.value) {
      timer.value = new Date().getTime() - startTime.value;
      await delay(20);
    }
  }
);

const previousLevel = ref<LevelType>();
const level = ref<'map' | LevelType>();
const health = ref(100);
const energy = toRef(store.energy);
const elementGrid = toRef(store.elementGrid);
watch(
  () => store.energy,
  async (value) => (energy.value = value)
);

const rows = ref(2);
const columns = ref(2);

const elements = ref<Record<string, Element>>({ ice, fire, air, earth });
const selectedElement = ref<Element>();

watch(
  () => selectedElement.value,
  (stat) => (store.currentElement = stat)
);

onBeforeMount(() => {
  store.levels = generateNewMap();
});

function generateNewMap() {
  const levels: LevelType[] = [];

  levels.push({
    id: 0,
    x: 90,
    y: 450,
    levelImg: '/game/firstperson/navigation.png',
    mapImg: '/game/skull1.svg',
    type: 'fight',
    mystery: false,
    completed: true,
    color: '#ffff00',
    enemy: {
      lives: 1,
      slots: 2,
      color: '#ffff00'
    },
    nextLevels: [1, 2, 15]
  });

  levels.push(generateNewLevel(1, 525, 400, 'o2', 1, 'mystery', [2]));
  levels.push(generateNewLevel(2, 390, 215, 'asteroid', 1, 'fight', [3]));
  levels.push(generateNewLevel(3, 605, 215, 'cafeteria1', 2, 'fight', [4, 11, 12]));
  levels.push(generateNewLevel(4, 810, 45, 'cafeteria3', 2, 'mystery', [5]));
  levels.push(generateNewLevel(5, 997, 215, 'cafeteria4', 2, 'harderFight', [6]));
  levels.push(generateNewLevel(6, 1400, 215, 'gen1', 2, 'fight', [7]));
  levels.push(generateNewLevel(7, 1462, 300, 'gen2', 2, 'mystery', [8]));
  levels.push(generateNewLevel(8, 1622, 540, 'reactor1', 3, 'fight', [9]));
  levels.push(generateNewLevel(9, 1675, 382, 'reactor2', 3, 'harderFight', [10]));
  levels.push(generateNewLevel(10, 1307, 400, 'cams', 3, 'boss', null));
  levels.push(generateNewLevel(11, 810, 215, 'emergency', 3, 'shop', [5]));
  levels.push(generateNewLevel(12, 805, 410, 'cafeteria2', 2, 'mystery', [13, 19]));
  levels.push(generateNewLevel(13, 675, 655, 'admin1', 2, 'fight', [14]));
  levels.push(generateNewLevel(14, 517, 550, 'admin2', 2, 'mystery', [19]));
  levels.push(generateNewLevel(15, 390, 525, 'route1vent1', 1, 'fight', [16]));
  levels.push(generateNewLevel(16, 395, 755, 'route1vent2', 1, 'fight', [17, 18, 19]));
  levels.push(generateNewLevel(17, 567, 890, 'comms', 2, 'mystery', [18, 19]));
  levels.push(generateNewLevel(18, 767, 903, 'chute', 2, 'mystery', [20, 23]));
  levels.push(generateNewLevel(19, 910, 690, 'shop', 3, 'shop', [20, 23]));
  levels.push(generateNewLevel(20, 1160, 720, 'electrical1', 2, 'mystery', [21]));
  levels.push(generateNewLevel(21, 1175, 585, 'electrical2', 2, 'fight', [22]));
  levels.push(generateNewLevel(22, 1205, 420, 'medbay', 2, 'harderFight', [6]));
  levels.push(generateNewLevel(23, 1395, 735, 'gen1', 2, 'fight', [24]));
  levels.push(generateNewLevel(24, 1462, 660, 'gen2', 3, 'mystery', [8]));

  return levels;

  function generateNewLevel(
    id: number,
    x: number,
    y: number,
    levelImg: string,
    difficulty: 1 | 2 | 3,
    type: 'mystery' | 'fight' | 'harderFight' | 'boss' | 'shop',
    nextLevels: number[] | null
  ): LevelType {
    const determinedType = type == 'mystery' ? getRandomItemFromArray(['fight', 'harderFight', 'relic', 'shop']) : type;
    return {
      id,
      x,
      y,
      levelImg: '/game/firstperson/' + levelImg + '.png',
      mapImg: getMapImg(type),
      type: determinedType,
      mystery: type == 'mystery',
      completed: false,
      color: getColor(type),
      enemy: determinedType != 'shop' && determinedType != 'relic' ? generateNewEnemy(difficulty, determinedType) : null,
      nextLevels
    };
  }

  function getMapImg(type: 'mystery' | 'fight' | 'harderFight' | 'boss' | 'shop') {
    if (type == 'mystery') return '/game/mystery.svg';
    if (type == 'fight') return '/game/skull1.svg';
    if (type == 'harderFight') return '/game/skull2.svg';
    if (type == 'boss') return '/game/skull3.svg';
    return '/game/shop.svg';
  }

  function getColor(type: 'mystery' | 'fight' | 'harderFight' | 'boss' | 'shop') {
    if (type == 'mystery') return '#ffffff';
    if (type == 'fight') return '#ffff00';
    if (type == 'harderFight') return '#ffa500';
    if (type == 'boss') return '#ff0000';
    return '#00ff00';
  }

  function generateNewEnemy(difficulty: 1 | 2 | 3, type: 'fight' | 'harderFight' | 'boss') {
    return {
      lives: getLives(difficulty, type),
      slots: type == 'boss' ? 9 : getRandomInt(1.5 * difficulty, 2.75 * difficulty) + (type == 'harderFight' ? 1 : 0),
      color: getRandomItemFromArray(['#ff0000', '#00ff00', '#56deff', '#ffff00', '#ff00ff', '#00ffff', '#f7f7f7'])
    };

    function getLives(difficulty: 1 | 2 | 3, type: 'fight' | 'harderFight' | 'boss') {
      if (type == 'fight') return getRandomInt(1 * difficulty, 2 * difficulty);
      if (type == 'harderFight') return getRandomInt(2 * difficulty, 3 * difficulty);
      return 50;
    }
  }
}

function handleWin() {
  if (!level.value || typeof level.value == 'string') return;
  energy.value = 100;

  previousLevel.value = level.value;
  level.value = 'map';

  if (previousLevel.value.id == 0) {
    rows.value++;
    columns.value++;
  }
}

function handleReward(reward: Element) {
  if (reward.name == 'ice') elements.value.ice.currentLevel++;
  if (reward.name == 'fire') elements.value.fire.currentLevel++;
  if (reward.name == 'air') elements.value.air.currentLevel++;
  if (reward.name == 'earth') elements.value.earth.currentLevel++;

  selectedElement.value = Object.values(elements.value).find((el) => el.currentLevel != 0);
}

async function handleDamage(damage: number) {
  let defense = 0;
  elementGrid.value.forEach((arr) => {
    arr.forEach((el) => {
      if (el === 4) defense++;
    });
  });
  console.log(defense);
  const ouch = Math.max(0, damage - defense);
  health.value -= ouch;
  showOverlay();
  if (health.value <= 0) {
    // die
  }

  async function showOverlay() {
    showHealthOverlay.value = true;
    await delay(ouch < 1 ? 50 : 300);
    showHealthOverlay.value = false;
  }
}

function handleRegen(hp: number, nrg: number) {
  health.value = Math.min(100, health.value + hp);
  if (selectedElement.value) energy.value += nrg;
  store.energy = energy.value;
  if (energy.value >= 125) {
    // die
  }
}

function getBarColor(element: Element, bar: number) {
  /* yes this is necessary
  fuck tailwind
  dont trump me
  dont do it
  i swear to god i will remove the 2 from tf2 */

  if (element.currentLevel < bar) return 'bg-[color:var(--faded-bg-color)]';
  if (element.currentLevel == bar) return element.name;
  return element.name + 'Secondary';
}
</script>

<style lang="scss" scoped>
.page-enter-active {
  transition: all 1.25s ease;
}

.page-leave-active {
  transition: all 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translate(50vw);
}
.page-leave-to {
  opacity: 0;
}

.pageOther-enter-active,
.pageOther-leave-active {
  transition: all 1s ease;
}

.pageOther-enter-from {
  opacity: 0;
  transform: translate(100vw);
}
.pageOther-leave-to {
  opacity: 0;
  transform: translate(-100vw);
}

.left-enter-active,
.left-leave-active {
  transition: all 1.25s ease;
}

.left-enter-from,
.left-leave-to {
  opacity: 0;
  transform: translateX(-50vw);
}

.down-enter-active,
.down-leave-active {
  transition: all 0.5s ease;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.25s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

.timer {
  color: transparent;
  background: linear-gradient(to bottom, var(--secondary), var(--secondary-shade));
  background-clip: text;
  width: fit-content;
}

.energyOverlay {
  background-image: radial-gradient(transparent 50%, yellow);
  mask-image: radial-gradient(transparent 30%, yellow);
}

.healthOverlay {
  background-image: radial-gradient(transparent 50%, rgba(255, 0, 0, 0.85));
  mask-image: radial-gradient(transparent 30%, rgba(255, 0, 0, 0.85));
}

.level:first-child {
  border-top-left-radius: 500em;
  border-bottom-left-radius: 500em;
}

.level:last-child {
  border-top-right-radius: 500em;
  border-bottom-right-radius: 500em;
}

.ice {
  background-color: var(--ice);
}
.iceSecondary {
  background-color: var(--ice-secondary);
}
.fire {
  background-color: var(--fire);
}
.fireSecondary {
  background-color: var(--fire-secondary);
}
.air {
  background-color: var(--air);
}
.airSecondary {
  background-color: var(--air-secondary);
}
.earth {
  background-color: var(--earth);
}
.earthSecondary {
  background-color: var(--earth-secondary);
}

@media (hover: hover) and (pointer: fine) {
  .element:hover {
    background-color: var(--faded-bg-color-dark);
  }
  .disabled:hover {
    background-color: var(--faded-bg-color);
  }

  .level:hover {
    .description {
      display: flex;
    }
  }
}
</style>
