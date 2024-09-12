<script setup lang="ts">
import { defineProps } from 'vue';

const checkDigit = (event: KeyboardEvent) => {
  if (event.key.length === 1 && isNaN(Number(event.key))) {
    event.preventDefault();
  }
};
</script>

<template>
<div class="searchBox-container">
  <div class="searchBox">
    Enter access code to join a Menti presentation
    <input type="text" class="searchInput"  @keydown="checkDigit" maxlength="8" placeholder="1234 5678">
    <button class="searchButton" disabled>Join</button>
  </div>
</div>
</template>

<style scoped>
.searchBox-container{
  outline: solid;
  size: 10 rem;
  background-color: #FFFFFF;
}

.searchBox-container{
  padding: 2%;
  
}
</style>
