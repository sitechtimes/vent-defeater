<template>
  <div class="w-screen h-screen flex flex-col items-center justify-start gap-4 py-10 overflow-hidden">
    <Enemy :lives="1" :slots="2" />
  </div>
</template>

<script setup lang="ts">
import JoinPageRpg from '../JoinPageRpg.vue';
import Enemy from './Enemy.vue';
</script>

<style lang="scss" scoped></style>
