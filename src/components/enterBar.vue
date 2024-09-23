<template>
  <div class="box flex gap-4 relative">
    <div class="w-10 h-10 text-center text-lg rounded-md border-2 border-[color:var(--faded-bg-color)] flex items-center justify-center transition-none"
    :class="{ current: index == displayedDigits.findIndex((digit) => digit == '') }"
    v-for="(digit, index) in displayedDigits"
    :key="index"
    >
      {{ digit }}
    </div>
    <input class="absolute top-0 left-0 w-full h-full text-2xl opacity-0 bg-none border-none outline-none" v-model="code" type="text" maxlength="6" >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const code = ref("");
watch(() => code.value, (input) => {
  code.value = [...input].filter((char) => !isNaN(Number(char))).join("");
  displayedDigits.value = String(input).split("").concat(new Array(6).fill("")).slice(0, 6);
});

const displayedDigits = ref(new Array(6).fill(""));

</script>

<style lang="scss" scoped>
.box:focus-within {
  .current {
    border-color: var(--primary);
  }
}
</style>