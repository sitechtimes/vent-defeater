<template>
  <div class="w-screen flex flex-col items-center justify-center p-8 mt-50 gap-3">
    <img class="logo transition duration-500 rounded-md items-center w-80 justify-center mt-20" src="/logo/logoWithWords.svg" />
    <h2 class="text-3xl">Enter the code to join</h2>
    <h3>It’s on the screen in front of you.</h3>

    <div class="flex flex-col select-none text-center gap-2 max-w-80">
      <p>Click a number to freeze it. You will take additional <span class="text-blue-500">Freeze</span> damage for every number you have frozen.</p>
      <p class="flex gap-2">
        Health: <span class="font-extrabold">{{ Math.floor(health) }}</span>
        <span v-if="health < 100 && regen > 0">Regen: +{{ Math.floor(regen * 100) / 10 }}/sec</span>
      </p>
      <meter min="0" max="100" low="35" :value="health" class="w-full"></meter>
      <div class="flex gap-2">
        <span
          v-for="(num, index) in code"
          :key="index"
          class="flex rounded-md w-12 h-12 justify-center items-center cursor-pointer duration-250"
          :class="frozen[index] === -1 ? 'bg-gray-200 dark:bg-gray-800' : 'bg-blue-300 dark:bg-blue-800 '"
          @click="freeze(index)"
          >{{ num }}</span
        >
      </div>
    </div>

    <button @click="roll" class="rounded-full bg-[color:var(--text-color)] px-10 border-r border-[color:var(--bg-color)] text-[color:var(--bg-color)] text-lg font-semibold">Reroll 🎲</button>

    <button class="flex items-center justify-center rounded-full bg-[color:var(--text-color)] px-10 border-r border-[color:var(--bg-color)]">
      <p class="font-semibold text-[color:var(--bg-color)] text-lg">John!</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
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
    }
  });
  health.value--;
  if (health.value < 1) {
    code.value = new Array(6).fill('0');
    frozen.value = new Array(6).fill(-1);
    health.value = 100;
  }
  regen.value = -3;
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

<style lang="scss" scoped></style>
