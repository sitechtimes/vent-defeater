<template>
  <div>
    <vue-word-cloud
      style="height: 480px; width: 640px"
      :words="[
        ['romance', 19],
        ['horror', 3],
        ['fantasy', 7],
        ['adventure', 3]
      ]"
      :color="([_, weight]) => (weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo')"
      font-family="Comic Sans MS"
    />
  </div>
</template>

<script setup>
// @ts-ignore
import VueWordCloud from 'vuewordcloud';
</script>

<style scoped></style>
