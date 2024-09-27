<template>
  <button class="absolute top-16 right-4 border-2 border-neutral-950" @click="level++">(testing) next lvl</button>
  <div class="absolute top-4 right-4 select-none">
    <ThemeToggle big />
  </div>

  <div class="flex items-center justify-around w-screen h-screen overflow-hidden select-none">
    <div class="absolute bottom-4 right-4 flex items-center justify-center flex-col bg-[color:var(--bg-color-contrast)] py-2 px-10 w-48 rounded-xl" v-if="level != 0">
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

    <Transition name="left">
      <div class="h-screen flex items-center justify-start flex-col gap-4 px-3 py-10 bg-[color:var(--faded-bg-color-light)] w-[50rem] z-20" v-show="level != 0">
        <div class="w-3/4 flex items-center justify-center gap-1">
          <img class="w-6 h-6 dark:invert" src="/game/health.svg" aria-hidden="true" />
          <h3 class="text-2xl font-semibold w-16">{{ health }}</h3>
          <div class="flex items-center justify-start w-full h-8 rounded-full bg-[color:var(--bg-color-contrast-translucent)]">
            <div class="h-full rounded-full bg-red-500" :style="{ width: Math.min(100, health) + '%' }"></div>
          </div>
        </div>

        <div class="w-3/4 flex items-center justify-center gap-1">
          <img class="w-6 h-6 dark:invert" src="/game/elements/electric.svg" aria-hidden="true" />
          <h3 class="text-2xl font-semibold w-16">{{ energy }}</h3>
          <div class="relative flex items-center justify-start w-full h-8 rounded-full bg-[color:var(--bg-color-contrast-translucent)]">
            <div class="h-full rounded-full bg-yellow-500 min-w-[10%]" :style="{ width: Math.min(100, energy) + '%' }"></div>
            <div class="h-full rounded-full bg-orange-500 min-w-[10%] max-w-full absolute left-0" v-if="energy > 100" :style="{ width: (energy - 100) * 4 + '%' }"></div>
          </div>
        </div>

        <h1 class="text-4xl font-bold">Inventory</h1>

        <div class="flex items-center justify-center w-full gap-4">
          <button
            @click="selectedElement = element"
            class="element flex flex-col items-center justify-center bg-[color:var(--faded-bg-color)] rounded-2xl border-2 p-2 select-none"
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
          <div class="flex flex-col items-center justify-center w-full p-3 bg-[color:var(--faded-bg-color)] rounded-2xl" v-if="selectedElement">
            <h2 class="text-4xl">{{ selectedElement.name[0].toUpperCase() + selectedElement.name.slice(1) }}</h2>
            <p class="text-lg">Level {{ selectedElement.currentLevel }}</p>

            <div class="w-full flex flex-col items-center justify-center gap-4">
              <div
                class="w-full flex items-center justify-around rounded-lg py-2 transition-none"
                v-for="level in selectedElement.levels"
                :style="{ backgroundColor: selectedElement.currentLevel != level.level ? 'var(--faded-bg-color)' : 'var(--secondary)' }"
                :key="level.level"
              >
                <p class="text-3xl">{{ level.level }}</p>
                <p
                  class="text-wrap w-3/4 text-center transition-none"
                  :class="{ 'blur-sm': selectedElement.currentLevel < level.level, 'cursor-not-allowed': selectedElement.currentLevel < level.level }"
                >
                  <span :class="{ 'font-bold': part.bold }" v-for="part in formatDescription(level.description)">{{ part.text }}</span>
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <Intro
      v-show="level == 0"
      @next="
        level++;
        startTime = new Date().getTime();
      "
    />
    <Transition name="page">
      <Level
        v-show="level == 1"
        :enemy-lives="currentEnemy.lives"
        :enemy-slots="currentEnemy.slots"
        :player-rows="rows"
        :player-columns="columns"
        @damaged="(damage) => handleDamage(damage)"
        @regen="(hp, energy) => handleRegen(hp, energy)"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Intro from '@/components/Game/Intro.vue';
import Level from '@/components/Game/Level.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useGameStore } from '@/stores/game';
import { air, earth, fire, ice, formatDescription } from '@/utils/elements';
import type { Element } from '@/utils/elements';
import { delay } from '@/utils/functions';
import { onMounted, ref, watch } from 'vue';

const store = useGameStore();

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

const level = ref(0);
const health = ref(100);
const energy = ref(store.energy);
watch(
  () => store.energy,
  async (value) => (energy.value = value)
);

const rows = ref(5);
const columns = ref(3);

const elements = ref<Record<string, Element>>({ ice, fire, air, earth });
const selectedElement = ref<Element>();

const currentEnemy = ref({ lives: 1, slots: 3 });

watch(
  () => selectedElement.value,
  (stat) => (store.currentElement = stat)
);

onMounted(() => {
  elements.value.ice.currentLevel = 4;
  elements.value.air.currentLevel = 4;
});

function handleDamage(damage: number) {
  health.value -= damage;
  if (health.value < 0) {
    // die
  }
}

function handleRegen(hp: number, nrg: number) {
  health.value = Math.min(100, health.value + hp);
  energy.value += nrg;
  store.energy = energy.value;
  if (energy.value >= 125) {
    // die
  }
}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: all 1.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translate(50vw);
}
.page-leave-to {
  opacity: 0;
  transform: translate(-50vw);
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

.timer {
  color: transparent;
  background: linear-gradient(to bottom, var(--secondary), var(--secondary-shade));
  background-clip: text;
  width: fit-content;
}

@media (hover: hover) and (pointer: fine) {
  .element:hover {
    background-color: var(--bg-color-contrast-translucent);
  }
  .disabled:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
