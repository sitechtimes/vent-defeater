<template>
  <div class="w-screen flex flex-col items-center justify-center p-8 mt-50 gap-3">
    <div class="flex flex-col select-none text-center gap-2 items-center justify-center">
      <p class="w-96">Click a number to freeze it. On reroll, you will take <span class="text-blue-500">Freeze</span> damage for every number you have frozen.</p>
      <p class="flex gap-2">
        Health: <span class="font-extrabold">{{ Math.floor(health) }}</span>
        <span v-if="health < 100 && regen > 0">Regen: +{{ Math.floor(regen * 100) / 10 }}/sec</span>
      </p>
      <meter min="0" max="100" low="35" :value="health" class="w-full"></meter>
      <div class="flex gap-3 relative">
        <span
          v-for="(num, index) in code"
          :key="index"
          class="w-14 h-14 text-center text-2xl rounded-md border-2 border-[color:var(--faded-bg-color)] bg-[color:var(--faded-bg-color-light)] flex items-center justify-center duration-250 cursor-pointer"
          :class="{ 'ml-3': index == 3, 'bg-gray-200': frozen[index] === -1, 'dark:bg-gray-800': frozen[index] === -1, 'bg-blue-300': frozen[index] !== -1, 'dark::bg-blue-800': frozen[index] !== -1 }"
          @click="freeze(index)"
          >{{ num }}</span
        >
      </div>
    </div>

    <div class="flex items-center justify-center gap-4">
      <button @click="roll" class="back transition px-10 py-2.5 rounded-full border-2 border-[color:var(--text-color)] bg-transparent text-[color:var(--text-color)] text-lg font-semibold mt-6">Reroll 🎲</button>
  
      <button @click="emit('join', code.join(''))"
        class="px-10 py-2.5 rounded-full border-2 border-[color:var(--text-color)] text-[color:var(--bg-color)] text-lg font-semibold mt-6 bg-[color:var(--text-color)]">
        <p class="font-semibold text-[color:var(--bg-color)] text-lg">Join</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

type Emits = {
  join: [code: string];
  die: [void];
};

const emit = defineEmits<Emits>();

const code: Ref<string[]> = ref(new Array(6).fill('0'));
const frozen: Ref<number[]> = ref(new Array(6).fill(-1));
const health: Ref<number> = ref(100);

function roll() {
  let rand = String(Math.floor(Math.random() * 1000000));
  while (rand.length < 6) rand = '0' + rand;
  code.value = rand.split('');
  frozen.value.forEach((num, index) => {
    if (num !== -1) {
      code.value[index] = String(num);
      health.value--;
      regen.value = -3;
    }
  });
  if (health.value <= 0) {
    code.value = new Array(6).fill('0');
    frozen.value = new Array(6).fill(-1);
    alert('You died!');
    emit('die');
    health.value = 100;
  }
}

function freeze(index: number) {
  if (frozen.value[index] === -1) {
    frozen.value[index] = Number(code.value[index]);
    return;
  }
  frozen.value[index] = -1;
}

const regen = ref(0);
setInterval(() => {
  if (health.value >= 100) {
    regen.value = 0;
    return;
  }

  regen.value += 0.01;

  if (regen.value < 0) {
    regen.value += 0.1;
    if (regen.value > 0) regen.value = 0;
    return;
  }

  if (regen.value > 100 - health.value) {
    health.value = 100;
  } else {
    health.value += regen.value;
  }
}, 100);
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .back:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
