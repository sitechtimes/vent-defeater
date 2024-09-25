<template>
  <div class="absolute top-4 right-4">
    <ThemeToggle big />
  </div>
  <div class="overflow-hidden">
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
</style>
