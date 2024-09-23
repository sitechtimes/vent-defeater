<template>
  <div class="flex w-[100vw] h-[100vh] justify-center items-center">
    <div class="flex-col gap-2 w-40">
      <h1>damn you bogdan</h1>
      <label>
        name
        <input type="text" />
      </label>
      <label>
        ssn
        <input type="number" />
      </label>
      <button>save</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
label {
  @apply flex flex-row gap-1;
}

input,
button {
  border: solid 2px black;
  border-radius: 8px;
}
</style>
