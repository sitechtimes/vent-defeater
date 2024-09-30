<template>
  <div class="background w-screen h-screen flex items-center justify-around overflow-hidden">
    <div class="w-[50em]"></div>

    <div class="w-full h-full gap-8 py-10 flex flex-col items-center justify-around">
      <div class="w-2/3 h-[45%] flex items-center justify-end">
        <div class="flex flex-col items-center justify-center">
          <Enemy :lives="enemyLives" :slots="enemySlots" :reroll="reroll" @on-reroll="(board) => handleReroll(board, 'enemy')" @damaged="(damage) => emit('damaged', damage)" />
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Enemy from './Enemy.vue';
import Player from './Player.vue';
import { delay } from '@/utils/functions';
import { useGameStore } from '@/stores/game';
import Amogus from './Amogus.vue';

type Emits = {
  damaged: [damage: number];
  regen: [health: number, energy: number];
};

type Props = {
  enemyLives: number;
  enemySlots: number;
  playerRows: number;
  playerColumns: number;
};

const store = useGameStore();

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const reroll = ref(false);
const matchedBoard = ref<number[][]>();

const enemyBoard = ref<number[]>();
const playerBoard = ref<number[][]>();

function handleReroll(board: number[] | number[][], from: 'enemy' | 'player') {
  if (from == 'enemy') enemyBoard.value = board as number[];
  else playerBoard.value = board as number[][];

  if (!enemyBoard.value || !playerBoard.value) return;

  const match = findMatches(playerBoard.value, enemyBoard.value);
  if (!match) return;

  console.log(match);
  matchedBoard.value = match;

  // i love chatgpt
  function findMatches(player: number[][], enemy: number[]) {
    const rows = player.length;
    const cols = player[0].length;
    const seqLength = enemy.length;
    const reversedSequence = [...enemy].reverse();

    // Check if a sub-array matches the target sequence or its reverse
    function checkMatch(arr: number[]) {
      return arr.join() === enemy.join() || arr.join() === reversedSequence.join();
    }

    // Check horizontal and vertical sequences
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Horizontal right
        if (col + seqLength <= cols) {
          const horizontalRight = player[row].slice(col, col + seqLength);
          if (checkMatch(horizontalRight)) {
            // Return positions for horizontal right
            return Array.from({ length: seqLength }, (_, i) => [row, col + i]);
          }
        }

        // Vertical down
        if (row + seqLength <= rows) {
          const verticalDown = [];
          for (let i = 0; i < seqLength; i++) {
            verticalDown.push(player[row + i][col]);
          }
          if (checkMatch(verticalDown)) {
            // Return positions for vertical down
            return Array.from({ length: seqLength }, (_, i) => [row + i, col]);
          }
        }

        // Diagonal down-right
        if (row + seqLength <= rows && col + seqLength <= cols) {
          const diagonalRight = [];
          for (let i = 0; i < seqLength; i++) {
            diagonalRight.push(player[row + i][col + i]);
          }
          if (checkMatch(diagonalRight)) {
            // Return positions for diagonal down-right
            return Array.from({ length: seqLength }, (_, i) => [row + i, col + i]);
          }
        }

        // Diagonal down-left
        if (row + seqLength <= rows && col - seqLength + 1 >= 0) {
          const diagonalLeft = [];
          for (let i = 0; i < seqLength; i++) {
            diagonalLeft.push(player[row + i][col - i]);
          }
          if (checkMatch(diagonalLeft)) {
            // Return positions for diagonal down-left
            return Array.from({ length: seqLength }, (_, i) => [row + i, col - i]);
          }
        }
      }
    }

    return null;
  }
}

async function roll() {
  reroll.value = true;
  emit('regen', 0, 5);
  await delay(50);
  reroll.value = false;
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url('/game/map/empty.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media (hover: hover) and (pointer: fine) {
  .reroll:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
