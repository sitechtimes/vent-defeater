<template>
      <div class=" w-screen	 flex flex-col items-center justify-center p-8 mt-50">
        <img class="logo transition duration-500 rounded-md items-center w-80 justify-center mt-20" src="/logo/logoWithWords.svg" />
        <h2 class="text-3xl mb-3">enter the code to join</h2>
        <h3 class="mb-3">It’s on the screen in front of you.</h3>
        
        <EnterBar class="izzy"/>
        <button class="flex items-center justify-center rounded-full bg-[color:var(--text-color)] px-10 border-r border-[color:var(--bg-color)]">
                <p class="font-semibold text-[color:var(--bg-color)] text-lg">join!</p>
              </button>

      </div>
  </template>
  
  <script setup lang="ts">
   import EnterBar from '../../components/EnterBar.vue';


  </script>
  
  <style lang="scss" scoped>
  .izzy{
    width:20vw;
    margin-top:10vh;
    margin-bottom:5vh;
  }
  </style>
  