<template>
  <div class="w-screen min-h-screen h-full flex flex-col items-center justify-start gap-4 background select-text">
    <header class="sticky top-0 z-10 w-full h-20 py-1 flex items-center justify-center bg-[rgb(23,29,37)]" :class="{ 'brightness-50': showOpening }">
      <div class="w-[1152px] h-full flex items-center justify-around">
        <div class="flex items-center justify-center gap-2">
          <img @click="router.push('/steal')" class="h-20 cursor-pointer" src="/logo/steal.svg" aria-hidden="true" />
          <div class="flex items-center justify-center flex-col">
            <h3 class="flex items-center justify-center gap-[2px]">
              <span class="text-[#c5c3c0] font-bold text-3xl comic-sans">S</span><span class="text-[#c5c3c0] font-bold text-3xl comic-sans">T</span
              ><span class="text-[#c5c3c0] font-bold text-3xl comic-sans">E</span><span class="text-[#c5c3c0] font-bold text-3xl comic-sans">A</span
              ><span class="text-[#c5c3c0] font-bold text-3xl comic-sans">L</span>
            </h3>
            <p class="text-[#c5c3c0] text-xs">(not steam)</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4">
          <NuxtLink to="/steal" class="underline text-[rgb(26,159,255)] text-xl font-bold">STOLE</NuxtLink>
          <button class="text-[#c5c3c0] text-xl font-semibold cursor-not-allowed">COMMUNINITY</button>
          <button class="text-[#c5c3c0] text-xl font-semibold cursor-not-allowed">ABOUT</button>
          <button class="text-[#c5c3c0] text-xl font-semibold cursor-not-allowed">SUPPORT</button>
        </div>

        <div class="h-full flex items-start justify-center gap-4 py-2">
          <button disabled class="cursor-not-allowed flex items-center justify-center gap-1 bg-lime-700 px-3 py-1.5 rounded-sm">
            <img class="w-4 h-4" src="/game/play.svg" aria-hidden="true" />
            <p class="text-white text-xs">Install Steal</p>
          </button>
        </div>
      </div>
    </header>

    <div class="fixed top-0 left-0 w-screen h-screen disclaimer z-[300] border-8 border-orange-600 bg-orange-400 p-4 rounded-lg flex-col items-center justify-center gap-1">
      <h3 class="text-4xl font-bold text-center">Slow down!</h3>
      <p class="text-2xl text-center">Steal hasn't developed the technology to make it work on smaller devices as of now.</p>
      <p class="text-2xl font-semibold text-center">Try using a tablet, laptop, or computer.</p>
      <p class="text-5xl font-extrabold text-center mt-5">Sorry!</p>
      <NuxtLink to="/" class="bg-green-400 rounded-full p-2 text-3xl font-medium mt-5">Go back</NuxtLink>
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const store = useGameStore();

const { showOpening } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.disclaimer {
  display: none;
}

.background {
  background: radial-gradient(circle at 50% 0%, rgb(30, 67, 86), rgb(27, 40, 56) 60%);
}

@media (max-width: 975px) {
  .disclaimer {
    display: flex;
  }
}

@media (hover: hover) and (pointer: fine) {
  .play:hover {
    background-color: rgb(80, 80, 80);
  }

  .playButton:hover {
    background-color: greenyellow;
  }
}
</style>
