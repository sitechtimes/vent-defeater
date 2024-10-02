<template>
  <div class="background w-screen h-screen flex items-center justify-around overflow-hidden" :style="{ backgroundImage: `url(${level.levelImg})` }">
    <div class="winOverlay w-screen h-screen fixed left-0 top-0 transition-none z-[100] backdrop-blur-md" v-if="showWin"></div>

    <Transition name="left">
      <div class="absolute card z-[101] bg-white w-screen py-6 gap-4 flex items-center justify-center flex-col" v-if="showWin">
        <h1 class="text-4xl font-semibold">You win!</h1>
        <p class="text-xl font-semibold">Pick your reward:</p>
        <Reward :level="level" @select="(reward) => (selectedReward = reward)" />
        <button @click="next" :disabled="!selectedReward" class="text-2xl rounded-full px-10 py-2 mt-6" :class="{ 'bg-green-900': !selectedReward, 'bg-green-300': selectedReward }">Next</button>
      </div>
    </Transition>

    <div class="w-[50em]"></div>

    <div class="w-full h-full gap-8 py-10 flex flex-col items-center justify-around" v-if="level.type != 'shop' && level.type != 'relic'">
      <div class="w-2/3 h-[45%] flex items-center justify-end">
        <div class="flex flex-col items-center justify-center">
          <Enemy
            :lives="level.enemy?.lives ?? 1"
            :slots="level.enemy?.slots ?? 3"
            :reroll="reroll"
            @on-reroll="(board) => handleReroll(board, 'enemy')"
            @damaged="(damage) => emit('damaged', damage)"
          />
          <Amogus color="#ff0000" />
        </div>
      </div>
      <div class="w-2/3 h-[45%] flex items-center justify-start">
        <div class="flex flex-col items-center justify-center">
          <Player
            :rows="playerRows"
            :columns="playerColumns"
            :reroll="reroll"
            :match="matchedBoard"
            @on-reroll="(board) => handleReroll(board, 'player')"
            @damaged="(damage) => emit('damaged', damage)"
            @regen="(hp, energy) => emit('regen', hp, energy)"
          />
          <button
            @click="roll"
            class="reroll back transition w-48 py-2.5 rounded-full border-2 border-[color:var(--text-color)] bg-[color:var(--bg-color)] text-[color:var(--text-color)] text-lg font-semibold mt-6"
            :disabled="matchedBoard != undefined"
            :class="{ 'cursor-not-allowed': matchedBoard }"
          >
            Reroll 🎲
          </button>
        </div>
      </div>
    </div>
    <Shop v-if="level.type == 'shop'" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import Enemy from './Enemy.vue';
import Player from './Player.vue';
import { delay } from '@/utils/functions';
import { useGameStore } from '@/stores/game';
import Amogus from './Amogus.vue';
import type { Element, Level } from '@/utils/elements';
import Reward from './Reward.vue';
import Shop from './Shop.vue';

type Emits = {
  reward: [reward: Element];
  win: [void];
  damaged: [damage: number];
  regen: [health: number, energy: number];
};

type Props = {
  level: Level;
  playerRows: number;
  playerColumns: number;
};

const store = useGameStore();

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const reroll = ref(false);
const matchedBoard = ref<number[][]>();

const showWin = ref(false);
const selectedReward = ref<Element>();

const enemyBoard = ref<number[]>();
const playerBoard = ref<number[][]>();

const winCooldown = ref(true);

onMounted(async () => {
  winCooldown.value = true;
  await delay(100);
  winCooldown.value = false;
});

onBeforeUnmount(() => {
  showWin.value = false;
});

function next() {
  if (!selectedReward.value) return;
  emit('win');
  emit('reward', selectedReward.value);
}

function handleReroll(board: number[] | number[][], from: 'enemy' | 'player') {
  if (from == 'enemy') enemyBoard.value = board as number[];
  else playerBoard.value = board as number[][];

  if (!enemyBoard.value || !playerBoard.value) return;

  const match = findMatches(playerBoard.value, enemyBoard.value);
  if (!match) return;
  if (winCooldown.value) {
    roll();
    return;
  }

  matchedBoard.value = match;
  props.level.completed = true;
  showWin.value = true;

  function findMatches(player: number[][], enemy: number[]) {
    const rows = player.length;
    const cols = player[0].length;
    const seqLength = enemy.length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (player[i][j] != enemy[0]) continue;

        const path: number[][] = [];
        let currentCell = [i, j];
        path.push(currentCell);
        for (let k = 1; k < seqLength + 1; k++) {
          const dirs = checkAllDirections(currentCell[0], currentCell[1], enemy[k], path);
          if (dirs) {
            currentCell = [dirs.dir1, dirs.dir2];
            path.push(currentCell);

            if (enemy[k] == enemy[enemy.length - 1]) return path;
          } else break;
        }
      }
    }
    return null;

    function checkAllDirections(i: number, j: number, searchFor: number, previousTiles: number[][]) {
      const directions = [
        [i + 1, j],
        [i - 1, j],
        [i + 1, j + 1],
        [i + 1, j - 1],
        [i - 1, j - 1],
        [i - 1, j + 1],
        [i, j + 1],
        [i, j - 1]
      ];

      for (let dir of directions) {
        if (checkBounds(dir[0], dir[1]) && !previousTiles.includes([dir[0], dir[1]]) && player[dir[0]][dir[1]] == searchFor) return { dir1: dir[0], dir2: dir[1] };
      }
      return null;
    }

    function checkBounds(i: number, j: number) {
      return i >= 0 && i < rows && j >= 0 && j < cols;
    }
  }
}

async function roll() {
  reroll.value = true;
  if (!winCooldown.value) emit('regen', 0, 5);
  await delay(50);
  reroll.value = false;
}
</script>

<style lang="scss" scoped>
.left-enter-active,
.left-leave-active {
  transition: all 0.75s ease;
}

.left-enter-from,
.left-leave-to {
  opacity: 0;
  transform: translate(-100vw);
}

.background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.winOverlay {
  background-image: radial-gradient(rgba(0, 0, 0, 0.5) 30%, rgb(0, 255, 42));
  mask-image: radial-gradient(rgba(0, 0, 0, 0.5) 30%, rgb(0, 255, 42));
}

@media (hover: hover) and (pointer: fine) {
  .reroll:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
