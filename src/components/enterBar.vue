<script setup lang="ts">

const checkDigit = (event: KeyboardEvent) => {
  if (event.key.length === 1 && isNaN(Number(event.key))) {
    event.preventDefault();
  }
};

</script>

<template>
<div class="joe	bg-gray-200 outline	outline-[color:var(--text-color)]" >
    <input type="text" class="bg-transparent text-center"  @keydown="checkDigit" maxlength="8" placeholder="12345678">
</div>
</template>

<style scoped>
  .joe {
    display:flex;
    justify-content: center;
    align-items: center;
    width:10rem;
    height:5rem;
  }

  *:focus {
  outline: none;
  }

</style>
