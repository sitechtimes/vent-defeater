<script setup lang="ts">
import { defineProps } from 'vue';

const checkDigit = (event: KeyboardEvent) => {
  if (event.key.length === 1 && isNaN(Number(event.key))) {
    event.preventDefault();
  }
};
</script>

<template>
<div class="size-40	p-8	focus:outline-none focus:ring-0		h-40 w-40" >
    <input type="text" class="bg-gray-200"  @keydown="checkDigit" maxlength="8" placeholder="12345678">
</div>
</template>

<style scoped>
  *:focus {
  outline: none;
  }
</style>
