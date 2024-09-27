<template>
  <div class="w-screen h-screen flex flex-col items-center justify-start gap-4 py-10 overflow-hidden">
    <Enemy :lives="enemyLives" :slots="enemySlots" @damaged="(damage) => emit('damaged', damage)" />
    <Player :rows="playerRows" :columns="playerColumns" :reroll="reroll" @regen="(hp, energy) => emit('regen', hp, energy)" />
    <button @click="roll" class="back transition px-10 py-2.5 rounded-full border-2 border-[color:var(--text-color)] text-[color:var(--text-color)] text-lg font-semibold mt-6">Reroll 🎲</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Enemy from './Enemy.vue';
import Player from './Player.vue';
import { delay } from '@/utils/functions';

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

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const reroll = ref(false);

async function roll() {
  reroll.value = true;
  await delay(500);
  reroll.value = false;
}
</script>

<style lang="scss" scoped></style>
