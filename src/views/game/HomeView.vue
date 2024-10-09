<template>
  <div class="z-[200] bg-[rgba(0,0,0,0.75)] w-screen h-screen absolute top-0 left-0 flex items-center justify-center" v-if="showTutorial">
    <div class="absolute bg-white shadow-lg shadow-black flex flex-col items-center justify-start gap-2 w-[30rem] min-h-[25rem] p-5 rounded-lg" v-if="currentTutorialPhase >= 0">
      <p class="absolute top-0 left-2 text-lg">Tutorial {{ currentTutorialPhase + 1 }}/{{ tutorialPhases.length }}</p>
      <p class="absolute top-0 right-2 text-md text-red-700" v-if="showTutorialYelling">Watch the demo video first</p>
      <div class="flex items-center justify-center gap-4 w-full">
        <button class="flex items-center justify-center font-extrabold text-2xl rounded-full w-[30%]" @click="currentTutorialPhase = Math.max(-1, currentTutorialPhase - 1)">
          <img class="w-10 rotate-180 transition-none" src="/ui/rightArrow.svg" aria-hidden="true" />
        </button>
        <button
          class="flex items-center justify-center font-extrabold text-2xl rounded-full w-[30%]"
          :class="{
            'bg-gray-400': !tutorialPhases[currentTutorialPhase].allowNext || currentTutorialPhase + 1 >= tutorialPhases.length,
            blink: tutorialPhases[currentTutorialPhase].allowNext && currentTutorialPhase + 1 < tutorialPhases.length
          }"
          @click="nextTutorialPage"
        >
          <img class="w-10" src="/ui/rightArrow.svg" aria-hidden="true" />
        </button>
      </div>
      <video
        ref="tutorialVideo"
        @ended="
          tutorialVideo?.play();
          tutorialPhases[currentTutorialPhase].allowNext = true;
        "
        :src="tutorialPhases[currentTutorialPhase].src"
        muted
        autoplay
      ></video>
      <p class="text-lg font-medium text-center">{{ tutorialPhases[currentTutorialPhase].text }}</p>
      <button
        :class="{ 'bg-green-400': tutorialPhases[tutorialPhases.length - 1].allowNext, 'bg-gray-400': !tutorialPhases[tutorialPhases.length - 1].allowNext }"
        :disabled="!tutorialPhases[tutorialPhases.length - 1].allowNext"
        v-show="currentTutorialPhase == tutorialPhases.length - 1"
        @click="showTutorial = false"
        class="w-1/2 py-3 mt-4 brightness-75 rounded-lg tutorialButton text-2xl font-bold"
      >
        Let's go
      </button>
    </div>

    <div class="bg-white shadow-lg shadow-black p-10 rounded-2xl flex flex-col items-center justify-center gap-6" v-if="currentTutorialPhase == -1">
      <p class="text-3xl font-bold">Would you like a tutorial?</p>
      <div class="w-full flex items-center justify-center gap-2">
        <button @click="currentTutorialPhase = 0" class="w-1/2 py-3 bg-green-400 brightness-75 rounded-lg tutorialButton">Yes</button>
        <button @click="showTutorial = false" class="w-1/2 py-3 bg-red-400 brightness-75 rounded-lg tutorialButton">Get out of my face</button>
      </div>
    </div>
  </div>

  <video v-if="store.showBrainrot" class="absolute z-10 top-0 right-0 w-[10%]" muted autoplay loop src="/game/subwaySurfers.mp4"></video>

  <div
    class="energyOverlay w-screen h-screen fixed left-0 top-0 pointer-events-none transition-none z-[100] backdrop-blur-xl"
    :style="{ opacity: (energy - (relics[2].unlocked ? 150 : 100)) / (relics[2].unlocked ? 50 : 25) }"
    v-if="energy > (relics[2].unlocked ? 150 : 100) && !store.noCombust"
  ></div>
  <Transition name="opacity">
    <div class="healthOverlay w-screen h-screen fixed left-0 top-0 pointer-events-none transition-none z-[100] backdrop-blur-xl" v-if="health < 50 || showHealthOverlay"></div>
  </Transition>

  <img v-if="store.isDead || gameWon" class="fixed explode z-[100]" :class="{ 'opacity-0': gameWon }" src="/game/explosion.svg" aria-hidden="true" />
  <div v-if="store.isDead || gameWon" class="fixed lost z-[101] bg-white flex items-center justify-center flex-col gap-4 p-8 rounded-2xl">
    <h2 class="text-4xl font-semibold">{{ gameWon ? "You won!" : "You lost 😦" }}</h2>
    <p class="text-2xl font-medium" v-if="store.relicOfDeath && !gameWon && health <= 0">You lost the double or nothing</p>
    <p class="text-2xl font-medium" v-else-if="!gameWon && health <= 0">You died from wounds</p>
    <p class="text-2xl font-medium" v-else-if="!gameWon && energy >= (relics[2].unlocked ? 200 : 125)">Your energy meter spontaneously combusted</p>
    <div class="z-10 flex items-center justify-center flex-col bg-slate-900 py-2 px-10 w-48 rounded-xl">
      <p class="timer font-semibold text-4xl">
        {{ Math.floor(timer / 1000 / 60) }}:{{ (Math.floor((timer / 1000) % 60).toString().length == 1 ? "0" : "") + Math.floor((timer / 1000) % 60) }}.<span class="timer text-2xl">
          {{
            Math.floor(timer % 1000).toString().length == 1
              ? "0"
              : "" +
                Math.floor(timer % 1000)
                  .toString()
                  .slice(0, 2)
          }}
        </span>
      </p>
    </div>
    <div class="flex items-center justify-center gap-3">
      <button @click="restart" class="flex items-center justify-center gap-2 bg-green-300 py-3 px-10 rounded-full">
        <img class="w-6 h-6 duration-1000" src="/ui/restart.svg" aria-hidden="true" />Back to Menu
      </button>
    </div>
  </div>

  <div class="z-10 absolute bottom-4 right-4 flex items-center justify-center flex-col bg-slate-900 py-2 px-10 w-48 rounded-xl" v-if="level" ref="tutorial8">
    <p class="timer font-semibold text-4xl">
      {{ Math.floor(timer / 1000 / 60) }}:{{ (Math.floor((timer / 1000) % 60).toString().length == 1 ? "0" : "") + Math.floor((timer / 1000) % 60) }}.<span class="timer text-2xl">
        {{
          Math.floor(timer % 1000).toString().length == 1
            ? "0"
            : "" +
              Math.floor(timer % 1000)
                .toString()
                .slice(0, 2)
        }}
      </span>
    </p>
  </div>

  <div class="relative flex items-center justify-center w-screen h-screen overflow-hidden select-none" :class="{ 'bg-black': level }">
    <Transition name="left">
      <div class="inventory absolute left-0 h-screen flex items-center justify-start flex-col gap-4 px-3 py-10 bg-black bg-opacity-65 z-20" v-show="typeof level != 'string' && level">
        <div class="w-3/4 flex items-center justify-center gap-1">
          <img class="w-6 h-6 dark:invert" src="/game/health.svg" aria-hidden="true" />
          <h3 class="text-2xl font-semibold w-16 text-[color:var(--bg-color)]">{{ Math.floor(health) }}</h3>
          <div class="flex items-center justify-start w-full h-8 rounded-full bg-[color:var(--bg-color-contrast-translucent)]" :class="{ shaky: health < 20 }">
            <div class="transition-all duration-500 h-full rounded-full bg-red-500" :style="{ width: Math.min(100, health) + '%' }"></div>
          </div>
        </div>

        <div class="w-3/4 flex items-center justify-center gap-1">
          <img class="w-6 h-6 dark:invert" src="/game/elements/electric.svg" aria-hidden="true" />
          <h3 class="text-2xl font-semibold w-16 text-[color:var(--bg-color)]">{{ energy }}</h3>
          <div
            class="relative flex items-center justify-start w-full h-8 rounded-full bg-[color:var(--bg-color-contrast-translucent)]"
            :class="{ shaky: !store.noCombust && energy > (relics[2].unlocked ? 180 : 115) }"
          >
            <div
              class="transition-all duration-500 h-full rounded-full bg-yellow-500 min-w-[10%]"
              :style="{ width: Math.min(relics[2].unlocked ? 150 : 100, energy) / (relics[2].unlocked ? 1.5 : 1) + '%' }"
            ></div>
            <div
              class="transition-all duration-500 absolute left-0 h-full rounded-full bg-orange-500 max-w-full"
              v-if="!store.noCombust && energy > (relics[2].unlocked ? 150 : 100)"
              :style="{ width: ((energy - (relics[2].unlocked ? 150 : 100)) / (relics[2].unlocked ? 50 : 25)) * 100 + '%' }"
            ></div>
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
            <p class="mt-2 text-xl">{{ store.smallScreen ? "Lvl" : "Level" }} {{ element.currentLevel }}</p>
            <p>{{ element.name[0].toUpperCase() + element.name.slice(1) }}</p>
          </button>
        </div>

        <Transition name="down">
          <div class="flex items-center justify-center w-full p-3 rounded-2xl" :class="{ 'flex-col': store.smallScreen }" v-if="selectedElement">
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

        <h2 class="text-white text-3xl font-semibold">Relics</h2>
        <div class="flex flex-wrap items-center justify-center w-full gap-4">
          <div
            class="relic duration-200 relative w-16 h-16 flex items-center justify-center rounded-lg bg-white"
            v-for="relic in currentRelics"
            :class="{ 'brightness-50': !relic, 'brightness-0': relic && relic.broken }"
          >
            <img v-if="relic" class="w-14 h-14" :src="relic.img" aria-hidden="true" />
            <div
              v-if="relic"
              class="description shadow-[color:var(--text-color)] shadow-sm pointer-events-none hidden absolute top-0 left-20 w-96 min-w-96 rounded-lg z-10 p-2 flex-col gap-2 items-center justify-center whitespace-nowrap bg-white"
            >
              <h4 class="text-xl font-semibold">{{ relic.name }}</h4>
              <p class="text-wrap w-3/4 text-center transition-none">
                <span :class="{ 'font-bold': part.bold }" v-for="part in formatDescription(relic.description)">{{ part.text }}</span>
              </p>
            </div>
          </div>
        </div>

        <h2 class="text-white text-3xl font-semibold">Powerups</h2>
        <div class="flex flex-wrap items-center justify-center w-full gap-4">
          <div v-for="powerup in currentPowerups">
            <button
              @click="usePowerup(powerup)"
              class="relic duration-200 relative w-24 h-16 flex items-center justify-center rounded-lg bg-white"
              v-if="powerup"
              :disabled="disablePowerup(powerup)"
              :class="{ 'brightness-50': !powerup, 'cursor-not-allowed': disablePowerup(powerup) }"
            >
              <img class="w-14 h-14" :src="powerup.img" aria-hidden="true" />
              <p class="absolute bottom-0 right-1">x{{ powerup.count }}</p>
              <div
                class="description shadow-[color:var(--text-color)] shadow-sm pointer-events-none hidden absolute top-0 left-28 w-[17rem] rounded-lg z-10 p-2 flex-col gap-2 items-center justify-center whitespace-nowrap bg-white"
              >
                <h4 class="text-xl font-semibold">{{ powerup.name }}</h4>
                <p class="text-wrap w-3/4 text-center transition-none">
                  <span :class="{ 'font-bold': part.bold }" v-for="part in formatDescription(powerup.description)">{{ part.text }}</span>
                </p>
              </div>
            </button>
            <div v-else class="relic duration-200 relative w-24 h-16 flex items-center justify-center rounded-lg bg-white brightness-50"></div>
          </div>
        </div>
      </div>
    </Transition>

    <Intro
      v-if="!level"
      @next="
        level = store.levels[0];
        showTutorial = true;
      "
    />
    <Transition name="page">
      <Level
        v-if="typeof level != 'string' && level"
        :level="level"
        :player-rows="rows"
        :player-columns="columns"
        :fast-forward="fastForward"
        @win="handleWin"
        @win-game="gameWon = true"
        @reward="(reward) => handleReward(reward)"
        @damaged="(damage) => handleDamage(damage)"
        @regen="(hp, energy) => handleRegen(hp, energy)"
      />
    </Transition>

    <Transition name="pageOther">
      <Map :current-level="previousLevel" @select="(lvl) => (level = lvl)" v-if="level == 'map'"></Map>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Amogus from "@/components/Game/Amogus.vue";
import Intro from "@/components/Game/Intro.vue";
import Level from "@/components/Game/Level.vue";
import Map from "@/components/Game/Map.vue";
import { useGameStore } from "@/stores/game";
import { useUserStore } from "@/stores/user";
import { air, earth, fire, ice, formatDescription, type Relic, type Powerup, relics, powerups } from "@/utils/elements";
import type { Element, Level as LevelType } from "@/utils/elements";
import { delay, getRandomInt, getRandomItemFromArray } from "@/utils/functions";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useMeta } from "vue-meta";

useMeta({
  title: "Vent Defeater on Steal",
  description: "The vents are fighting back, corrupting any crewmates that hop in! It's up to you to put a stop to their sussy antics. Can you be the sussiest one among us?"
});

const tutorialVideo = ref<HTMLVideoElement>();

const store = useGameStore();
const userStore = useUserStore();

const showHealthOverlay = ref(false);
const startTime = ref<number>();
const timer = ref(0);
watch(
  () => startTime.value,
  async () => {
    while (startTime.value && !gameWon.value && !store.isDead) {
      timer.value = new Date().getTime() - startTime.value;
      await delay(20);
    }
  }
);

const gameWon = ref(false);
const showTutorial = ref(false);
watch(
  () => showTutorial.value,
  (val) => {
    if (!val) startTime.value = new Date().getTime();
  }
);

const previousLevel = ref<LevelType>();
const level = ref<"map" | LevelType>();
const health = ref(100);
watch(
  () => health.value,
  () => {
    if (health.value <= 0) store.isDead = true;
  }
);
const { energy, elementGrid } = storeToRefs(store);
watch(
  () => energy.value,
  () => {
    if (store.noCombust) return;
    if (energy.value >= (relics[2].unlocked ? 200 : 125)) store.isDead = true;
  }
);

const rows = ref(2);
const columns = ref(2);

const elements = ref<Record<string, Element>>({ ice, fire, air, earth });
const selectedElement = ref<Element>();
const currentRelics = ref<Relic[]>(new Array(12).fill(undefined));
const currentPowerups = ref<Powerup[]>(new Array(4).fill(undefined));
const shielded = ref(false);
const fastForward = ref(false);

watch(
  () => store.relicOfDeath,
  (val) => {
    if (val) health.value = 0;
  }
);

const showTutorialYelling = ref(false);
const tutorialPhases = ref([
  {
    top: 0,
    left: 500,
    text: "This is your health. Don't let it go below 0 or else your glycemic index will drop into the negatives",
    src: "/game/tutorial/tutorialHealth.mp4",
    allowNext: false
  },
  {
    top: 40,
    left: 500,
    text: "This is your energy. Don't let it go above 125 or you'll get electrocuted and die",
    src: "/game/tutorial/tutorialEnergy.mp4",
    allowNext: false
  },
  {
    top: 170,
    left: 600,
    text: "These are your elements, relics, and powerups. Click to select. You can hover over them to see what they do",
    src: "/game/tutorial/tutorialElements.mp4",
    allowNext: false
  },
  {
    top: 700,
    left: 975,
    text: "This is your board. You can use your elements here by clicking on a tile",
    src: "/game/tutorial/tutorialBoard.mp4",
    allowNext: false
  },
  {
    top: 115,
    left: 1000,
    text: "This is your enemy. He burns down orphanages. Let's kill him and steal his stuff",
    src: "/game/tutorial/tutorialEnemy.mp4",
    allowNext: false
  },
  {
    top: 190,
    left: 1000,
    text: "Your enemy will attack you if this bar fills up. They may also have extra lives so be careful",
    src: "/game/tutorial/tutorialEnemy2.mp4",
    allowNext: false
  },
  {
    top: 800,
    left: 1000,
    text: "This is the great almighty reroll button. Click it to reroll your board",
    src: "/game/tutorial/tutorialReroll.mp4",
    allowNext: false
  },
  {
    top: 925,
    left: 1200,
    text: "This is your speedrun timer. It'll start once you exit this tutorial",
    src: "/game/tutorial/tutorialTimer.mp4",
    allowNext: false
  },
  {
    top: 700,
    left: 975,
    text: "Your goal is to match numbers on your board to the numbers above the enemy. Matching is done automatically, you just need to keep rolling!",
    src: "/game/tutorial/tutorialMatch.mp4",
    allowNext: false
  }
]);
const currentTutorialPhase = ref(-1);

function nextTutorialPage() {
  if (!tutorialPhases.value[currentTutorialPhase.value].allowNext) {
    showTutorialYelling.value = true;
    return;
  }

  showTutorialYelling.value = false;
  currentTutorialPhase.value = Math.min(tutorialPhases.value.length - 1, currentTutorialPhase.value + 1);
}

watch(
  () => selectedElement.value,
  (stat) => (store.currentElement = stat)
);

onBeforeMount(() => {
  document.body.classList.remove("dark");
  userStore.theme = "light";
  store.levels = generateNewMap();
  selectedElement.value = elements.value.ice;
});

onMounted(() => {
  store.smallScreen = window.innerWidth < 1920;
  window.addEventListener("resize", () => {
    store.smallScreen = window.innerWidth < 1920;
  });
});

function generateNewMap() {
  const levels: LevelType[] = [];

  levels.push({
    id: 0,
    x: 90,
    y: 450,
    topPercent: 450 / 11,
    leftPercent: 90 / 20,
    levelImg: "/game/firstperson/navigation.png",
    mapImg: "/game/skull1.svg",
    type: "fight",
    mystery: false,
    completed: true,
    color: "#ffff00",
    enemy: {
      lives: 1,
      slots: 2,
      color: "#ffff00"
    },
    nextLevels: [1, 2, 15]
  });

  levels.push(generateNewLevel(1, 525, 400, "o2", 1, "mystery", [2]));
  levels.push(generateNewLevel(2, 390, 215, "asteroid", 1, "fight", [3]));
  levels.push(generateNewLevel(3, 605, 215, "cafeteria1", 2, "random", [4, 11, 12]));
  levels.push(generateNewLevel(4, 810, 45, "cafeteria3", 2, "random", [5]));
  levels.push(generateNewLevel(5, 997, 215, "cafeteria4", 2, "harderFight", [6]));
  levels.push(generateNewLevel(6, 1400, 215, "gen1", 2, "random", [7]));
  levels.push(generateNewLevel(7, 1462, 300, "gen2", 2, "random", [8]));
  levels.push(generateNewLevel(8, 1622, 540, "reactor1", 3, "shop", [9]));
  levels.push(generateNewLevel(9, 1675, 382, "reactor2", 3, "harderFight", [10]));
  levels.push(generateNewLevel(10, 1307, 400, "cams", 3, "boss", null));
  levels.push(generateNewLevel(11, 810, 215, "emergency", 2, "shop", [5]));
  levels.push(generateNewLevel(12, 805, 410, "cafeteria2", 2, "random", [13, 19]));
  levels.push(generateNewLevel(13, 675, 655, "admin1", 2, "mystery", [14]));
  levels.push(generateNewLevel(14, 517, 550, "admin2", 1, "boss", [19]));
  levels.push(generateNewLevel(15, 390, 525, "route1vent1", 1, "fight", [16]));
  levels.push(generateNewLevel(16, 395, 755, "route1vent2", 1, "random", [17, 18, 19]));
  levels.push(generateNewLevel(17, 567, 890, "comms", 2, "mystery", [18, 19]));
  levels.push(generateNewLevel(18, 767, 903, "chute", 2, "random", [20, 23]));
  levels.push(generateNewLevel(19, 910, 690, "shop", 2, "shop", [20, 23]));
  levels.push(generateNewLevel(20, 1160, 720, "electrical1", 2, "mystery", [21]));
  levels.push(generateNewLevel(21, 1175, 585, "electrical2", 2, "random", [22]));
  levels.push(generateNewLevel(22, 1205, 420, "medbay", 2, "harderFight", [6]));
  levels.push(generateNewLevel(23, 1395, 735, "gen1", 2, "random", [24]));
  levels.push(generateNewLevel(24, 1462, 660, "gen2", 3, "random", [8]));

  return levels;

  function generateNewLevel(
    id: number,
    x: number,
    y: number,
    levelImg: string,
    difficulty: 1 | 2 | 3,
    type: "mystery" | "fight" | "harderFight" | "boss" | "shop" | "random",
    nextLevels: number[] | null
  ): LevelType {
    const determinedType = type == "mystery" || type == "random" ? getRandomItemFromArray(["fight", "harderFight", "relic", "shop"]) : type;
    return {
      id,
      x,
      y,
      topPercent: y / 11,
      leftPercent: x / 20,
      levelImg: "/game/firstperson/" + levelImg + ".png",
      mapImg: type == "mystery" ? getMapImg(type) : getMapImg(determinedType),
      type: determinedType,
      mystery: type == "mystery",
      completed: false,
      color: type == "mystery" ? getColor(type) : getColor(determinedType),
      enemy: determinedType != "shop" && determinedType != "relic" ? generateNewEnemy(difficulty, determinedType) : null,
      nextLevels
    };
  }

  function getMapImg(type: "mystery" | "fight" | "harderFight" | "boss" | "shop" | "relic") {
    if (type == "mystery") return "/game/mystery.svg";
    if (type == "fight") return "/game/skull1.svg";
    if (type == "harderFight") return "/game/skull2.svg";
    if (type == "boss") return "/game/skull3.svg";
    if (type == "shop") return "/game/shop.svg";
    return "/game/relic.svg";
  }

  function getColor(type: "mystery" | "fight" | "harderFight" | "boss" | "shop" | "relic") {
    if (type == "mystery") return "#ffffff";
    if (type == "fight") return "#ffff00";
    if (type == "harderFight") return "#ffa500";
    if (type == "boss") return "#ff0000";
    if (type == "shop") return "#00ff00";
    return "#03cafc";
  }

  function generateNewEnemy(difficulty: 1 | 2 | 3, type: "fight" | "harderFight" | "boss") {
    return {
      lives: getLives(difficulty, type),
      slots: type == "boss" ? 9 : getRandomInt(1 * difficulty, Math.ceil(2.25 * difficulty)) + (type == "harderFight" ? 1 : 0),
      color: getRandomItemFromArray(["#ff0000", "#00ff00", "#56deff", "#ffff00", "#ff00ff", "#00ffff", "#f7f7f7"])
    };

    function getLives(difficulty: 1 | 2 | 3, type: "fight" | "harderFight" | "boss") {
      if (type == "fight") return getRandomInt(Math.ceil(1.5 * difficulty), Math.ceil(2.5 * difficulty));
      if (type == "harderFight") return getRandomInt(3 * difficulty, Math.ceil(4.5 * difficulty));
      return difficulty == 1 ? 15 : 68;
    }
  }
}

function handleWin() {
  if (!level.value || typeof level.value == "string") return;
  energy.value = relics[2].unlocked ? 150 : 100;
  if (relics[4].unlocked) health.value = 100;

  previousLevel.value = level.value;
  level.value = "map";

  if (previousLevel.value.id == 0) {
    rows.value++;
    columns.value++;
  }
}

function handleReward(reward: Element | Relic | Powerup | { type: "Bypass" }) {
  if (reward.type == "Element") {
    elements.value[reward.name].currentLevel++;
    selectedElement.value = Object.values(elements.value).find((el) => el.currentLevel != 0);
  } else if (reward.type == "Relic") {
    reward.unlocked = true;
    currentRelics.value[currentRelics.value.findIndex((relic) => !relic)] = reward;
  } else if (reward.type == "Powerup") {
    reward.count += 5;
    if (currentPowerups.value.find((powerup) => powerup && powerup.name == reward.name) != undefined) return;
    currentPowerups.value[currentPowerups.value.findIndex((powerup) => !powerup)] = reward;
  }
}

async function handleDamage(damage: number) {
  if (shielded.value) {
    shielded.value = false;
    return;
  }

  let defense = 0;
  for (let row of elementGrid.value) {
    for (let cell of row) {
      if (cell == 4) defense++;
    }
  }
  const ouch = Math.max(1, damage - defense);
  const damageFinal = health.value - ouch;

  if (relics[3].unlocked && !relics[3].broken && damageFinal <= 0) {
    health.value = 25;
    energy.value = relics[2].unlocked ? 150 : 100;
    relics[3].broken = true;
  } else {
    health.value = damageFinal;
    showOverlay();
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
}

function restart() {
  window.location.reload();
}

function getBarColor(element: Element, bar: number) {
  if (element.currentLevel < bar) return "bg-[color:var(--faded-bg-color)]";
  if (element.currentLevel == bar) return element.name;
  return element.name + "Secondary";
}

function disablePowerup(powerup: Powerup) {
  if (powerup.id == 0 && health.value == 100) return true;
  else if (powerup.id == 1 && energy.value >= (relics[2].unlocked ? 150 : 100)) return true;
  else if (powerup.id == 2 && shielded.value) return true;
  else if (powerup.id == 3 && fastForward.value) return true;

  return false;
}

async function usePowerup(powerup: Powerup) {
  if (powerup.count <= 0) return;

  powerup.count--;
  if (powerup.id == 0) health.value = 100;
  if (powerup.id == 1) energy.value = relics[2].unlocked ? 150 : 100;
  if (powerup.id == 2) shielded.value = true;
  if (powerup.id == 3) {
    fastForward.value = true;
    await delay(50);
    fastForward.value = false;
  }
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

@keyframes explode {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }

  50% {
    transform: translate(-50%, -50%) scale(0.5);
  }

  100% {
    transform: translate(-50%, -50%) scale(3);
  }
}

.explode {
  width: 100vw;
  height: 100vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(3);
  animation: explode 1s linear;
}

@keyframes grow {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }

  85% {
    transform: translate(-50%, -50%) scale(0);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.lost {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  animation: grow 1.25s linear;

  button {
    filter: grayscale(0.5) brightness(0.66);
  }
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

.relic:hover,
.level:hover {
  .description {
    display: flex;
  }
}

.inventory {
  width: 35rem;
}

@keyframes blink {
  5% {
    background-color: transparent;
  }
  40% {
    background-color: rgb(88, 255, 150);
  }
  60% {
    background-color: rgb(88, 255, 150);
  }
  95% {
    background-color: transparent;
  }
}
.blink {
  animation: blink 1s ease infinite;
}

@media (max-width: 1200px) {
  .inventory {
    width: 40vw;
    overflow-x: visible;
    overflow-y: scroll;
  }

  .relic:hover,
  .level:hover {
    .description {
      position: unset;
      top: unset;
      left: unset;
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .element:hover {
    background-color: var(--faded-bg-color-dark);
  }
  .disabled:hover {
    background-color: var(--faded-bg-color);
  }

  .tutorialButton:hover {
    filter: brightness(1);
  }

  .lost {
    button:hover {
      filter: grayscale(0) brightness(1.05);

      img {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
