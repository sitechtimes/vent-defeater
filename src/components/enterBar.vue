<script setup lang="ts">
const checkDigit = (event: KeyboardEvent) => {
  if (event.key.length === 1 && isNaN(Number(event.key))) event.preventDefault();
};
</script>

<template>
  <div class="joe flex rounded-lg bg-gray-200 focus:outline-indigo-400">
    <input type="text" class="bg-transparent text-left ml-5 text-xl" @hover="" @keydown="checkDigit" maxlength="8" placeholder="1234 5678" />
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
