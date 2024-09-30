<template>
  <div>
    <img class="w-56 h-56" :src="position ? '/game/amogus.svg' : '/game/amogusShort.svg'" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { delay, getRandomInt } from '@/utils/functions';
import { onMounted, ref } from 'vue';

type Props = {
  color: string;
};

const props = defineProps<Props>();

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

<style scoped></style>
