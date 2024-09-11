<script setup>

</script>

<template>
<div class="biggerSearchBox">
  <div class="searchBox">
    Enter access code to join a Menti presentation
    <input type="number" class="searchInput" placeholder="1234 5678">
    <button class="searchButton" disabled>Join</button>
  </div>
</div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>
