<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="relative">
      <img class="w-[80vw]" src="/game/map/map.png" aria-hidden="true" />
      <button class="absolute w-10 h-10 flex items-center justify-center bg-red-500 rounded-md" :style="{ left: level.x * 0.8 + 'px', top: level.y * 0.8 + 'px' }" v-for="level in levels">
        <img class="w-8 h-8" :src="level.mapImg" aria-hidden="true">
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import type { Level } from '@/utils/elements';
import { ref } from 'vue';

const store = useGameStore();
const levels = ref(store.levels);
</script>

<style lang="scss" scoped>
.map {
  background-image: url('/game/map/map.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
