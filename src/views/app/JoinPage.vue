<template>
  <div class=" w-screen flex flex-col items-center justify-center gap-5">
    <img class="logo transition duration-500 rounded-md items-center w-80 justify-center mt-20" src="/logo/logoWithWords.svg" />
    <h2 class="text-3xl">Enter the code to join!</h2>
    <h3 class="">The code is on the screen.</h3>
    
    <EnterBar />

    <div class="flex items-center justify-center gap-2">
      <button class="flex items-center justify-center rounded-lg bg-transparent px-10 py-2 border-2 border-[color:var(--text-color)]">
        <p class="font-semibold text-[color:var(--text-color)] text-lg">Cancel</p>
      </button>
      <button class="flex items-center justify-center rounded-lg bg-[color:var(--text-color)] px-10 py-2 border-2 border-[color:var(--text-color)]">
        <p class="font-semibold text-[color:var(--bg-color)] text-lg">Join</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import EnterBar from '../../components/EnterBar.vue';


</script>

<style lang="scss" scoped>
</style>
