<template>
  <div>
    <vue-word-cloud
      id="cloud"
      :style="{ width: width + 'px', height: height + 'px' }"
      :words="words"
      :color="([text, weight]: [string, number]) => (weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo')"
      font-family="Comic Sans MS"
    ></vue-word-cloud>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import VueWordCloud from 'vuewordcloud';
import { ref, type Ref } from 'vue';

const words: Ref<[string, number][]> = ref([
  ['romance', 1],
  ['horror', 6],
  ['fantasy', 7],
  ['adventure', 3],
  ['comedy', 8],
  ['french', 6],
  ['words', 4],
  ['eyikes', 9],
  ['womp womp', 13],
  ['🎂', 20]
]);

const width = ref(window.innerWidth);
const height = ref(window.innerHeight);

const resize = new ResizeObserver(() => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
}).observe(document.body);
</script>

<style scoped>
#cloud * {
  transform: scale(0.8);
}
</style>
