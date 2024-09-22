<script setup lang="ts">
const checkDigit = (event: KeyboardEvent) => {
  if (event.key.length === 1 && isNaN(Number(event.key))) event.preventDefault();
};
</script>

<template>
  <div class="joe flex justify-center align-center rounded-lg bg-gray-200 outline outline-[color:var(--text-color)] focus:outline-indigo-400">
    <input type="text" class="bg-transparent text-center" @hover="" @keydown="checkDigit" maxlength="8" placeholder="12345678" />
  </div>
</template>

<style scoped>
.joe {
  width: 10rem;
  height: 5rem;
}

*:focus {
  outline: none;
}
</style>
