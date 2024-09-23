<template>
  <div class="w-screen flex flex-col items-center justify-center p-8 mt-50 gap-3">
    <img class="logo transition duration-500 rounded-md items-center w-80 justify-center mt-20" src="/logo/logoWithWords.svg" />
    <h2 class="text-3xl">Enter the code to join</h2>
    <h3>It’s on the screen in front of you.</h3>

    <code>{{ code }}</code>
    <div class="flex gap-2">
      <input type="number" v-for="(char, index) in code" :id="'join-index-' + String(index)" @input="(event) => update(event, index)" class="bg-gray-200 w-[2ch] rounded-md text-4xl text-center" />
    </div>

    <button class="flex items-center justify-center rounded-full bg-[color:var(--text-color)] px-10 border-r border-[color:var(--bg-color)]">
      <p class="font-semibold text-[color:var(--bg-color)] text-lg">John!</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const code = ref('      ');
function update(event: InputEvent, index: number) {
  if (!event.target) return;
  const char = event.target.value;
  if (isNaN(Number(char))) return;
  code.value = code.value.substring(0, index) + char + code.value.substring(index + 1);
  console.log(code.value);
}
</script>

<style lang="scss" scoped></style>
