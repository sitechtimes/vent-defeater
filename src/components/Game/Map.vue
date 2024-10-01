<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="relative w-[1536px] h-[864px] map">
      <div class="absolute w-10 h-10 bg-red-500" :style="{ left: level.x * 0.8 + 'px', top: level.y * 0.8 + 'px' }" v-for="level in levels"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Level } from '@/utils/elements';

const levels: Level[] = [
  {
    x: 90,
    y: 450,
    img: '/ui/moon.svg'
  }
];
</script>

<style lang="scss" scoped>
.map {
  background-image: url('/game/map/map.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
