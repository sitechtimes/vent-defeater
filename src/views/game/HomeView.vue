<template>
  <div class="absolute top-4 right-4">
    <ThemeToggle big />
  </div>
  <div class="flex items-center justify-around w-screen h-screen overflow-hidden">
    <Transition name="left">
      <div class="h-screen flex items-start justify-center p-3 bg-[color:var(--faded-bg-color)] w-[50rem]" v-show="level != 0">
        <h1 class="text-4xl font-bold">Inventory</h1>
        <div>

        </div>
      </div>
    </Transition>

    <Intro v-show="level == 0" @next="level++" />
    <Transition name="page">
      <Level v-show="level == 1" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Intro from '@/components/Game/Intro.vue';
import Level from '@/components/Game/Level.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { ref } from 'vue';

const level = ref(0);
const health = ref(100);
const shield = ref(100);
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
</style>
