<template>
    <img class="vent" :src="position ? '/game/ventOpen.svg' : '/game/ventClosedish.svg'" aria-hidden="true" />
</template>

<script setup lang="ts">
import { delay, getRandomInt } from "@/utils/functions";
import { onMounted, ref } from "vue";

const position = ref(0);

onMounted(() => bop());

async function bop() {
  while (true) {
    position.value = 0;
    await delay(getRandomInt(200, 400));
    position.value = 1;
    await delay(getRandomInt(500, 700));
  }
}
</script>

<style lang="scss" scoped>
.vent {
  background: radial-gradient(red, transparent 66%);
}
</style>
