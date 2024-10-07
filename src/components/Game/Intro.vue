<template>
  <div class="w-screen h-screen flex flex-col items-center justify-start gap-4 overflow-hidden background">
    <header class="w-full h-24 flex items-center justify-center bg-[rgb(23,29,37)]" :class="{ 'brightness-50': showOpening }">
      <div class="w-[60%] h-full flex items-center justify-around">
        <div class="flex items-center justify-center gap-2">
          <img class="h-20" src="/logo/steal.svg" aria-hidden="true" />
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
          <button class="underline text-[rgb(26,159,255)] text-xl font-bold">PLAY</button>
          <button class="text-[#c5c3c0] text-xl font-semibold cursor-not-allowed">VENT</button>
          <button class="text-[#c5c3c0] text-xl font-semibold cursor-not-allowed">DEFEATER</button>
          <button class="text-[#c5c3c0] text-xl font-semibold cursor-not-allowed">NOW</button>
          <button class="text-[#c5c3c0] text-md font-semibold cursor-not-allowed">or else...</button>
        </div>

        <div class="h-full flex items-start justify-center gap-4 py-2">
          <button @click="start" class="play flex items-center justify-center gap-1 bg-[rgb(39,45,55)] p-2 rounded-sm">
            <img class="w-4 h-4" src="/game/play.svg" aria-hidden="true" />
            <p class="text-white text-xs">Play Vent Defeater</p>
          </button>
        </div>
      </div>
    </header>

    <div class="w-[50%] h-full flex flex-col items-center justify-start" :class="{ 'brightness-50': showOpening, 'grayscale-[.5]': showOpening }">
      <div class="w-full flex items-center justify-start text-[rgb(126,152,160)] text-md">All Games > Strategy Games > Rougelites > Vent Defeater</div>
      <div class="w-full flex items-center justify-start text-white text-3xl">Vent Defeater: The Game</div>
      <div class="flex items-center justify-center w-full gap-3 bg-[rgba(0,0,0,0.25)] p-2 rounded-md mt-3">
        <div class="flex items-center justify-center flex-col gap-2 w-[62.5%]">
          <video v-if="selectedShowcase.type == 'video'" :src="selectedShowcase.src" autoplay muted controls @ended="selectedShowcase = showcases[1]"></video>
          <img v-else :src="selectedShowcase.src" />
          <div class="flex items-center justify-between gap-1">
            <button @click="selectedShowcase = showcase" :class="{ relative: showcase.type == 'video' }" v-for="showcase in showcases" class="showcase w-[20%] flex items-center justify-center">
              <video :class="{ 'brightness-50': showcase.src != selectedShowcase.src }" v-if="showcase.type == 'video'" :src="showcase.src" muted></video>
              <img class="absolute w-10 h-10" v-if="showcase.type == 'video'" src="/game/play.svg" aria-hidden="true" />
              <img :class="{ 'brightness-50': showcase.src != selectedShowcase.src }" v-else :src="showcase.src" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-start flex-col w-[37.5%] h-full gap-4">
          <img class="bg-lime-200 p-3" src="/logo/logoTheGame.svg" aria-hidden="true" />
          <p class="text-white text-sm">The vents are fighting back, corrupting any crewmates that hop in! It's up to you to put a stop to their sussy antics. Can you be the sussiest one among us?</p>

          <div class="w-full flex flex-col items-start justify-center">
            <p>
              <span class="text-gray-400 text-xs">RECENT REVIEWS:</span> <span class="text-blue-400 text-md font-bold">Overwhelmingly Sussy</span> <span class="text-gray-400 text-xs">(6,900)</span>
            </p>
            <p>
              <span class="text-gray-400 text-xs">ALL REVIEWS:</span> <span class="text-blue-400 text-md font-bold">Overwhelmingly Sussy</span> <span class="text-gray-400 text-xs">(420,000)</span>
            </p>
          </div>

          <p class="text-left w-full">
            <span class="text-gray-400 text-xs">RELEASE DATE: </span>
            <span class="text-gray-300 text-md">{{ translateMonth(new Date().getMonth()) }} {{ new Date().getDate() }}, {{ new Date().getFullYear() }}</span>
          </p>

          <div class="w-full flex flex-col items-start justify-center">
            <p><span class="text-gray-400 text-xs">DEVELOPER:</span> <span class="text-blue-400 text-md font-bold">Guy 2 & Guy 1.5</span></p>
            <p><span class="text-gray-400 text-xs">PUBLISHER:</span> <span class="text-blue-400 text-md font-bold">Bogdan Sussyomin, Robber of Barons</span></p>
          </div>
        </div>
      </div>

      <button :disabled="showOpening" @click="start" class="w-1/2 py-4 bg-lime-300 border-8 border-lime-500 text-black text-5xl font-extrabold mt-20 rounded-2xl playButton">Play Now</button>
    </div>

    <div
      class="absolute bg-[rgb(37,40,46)] w-[40rem] h-[20rem] top-[30%] pointer-events-none flex items-center justify-center shaodw-lg shadow-black border-t-4 border-blue-400 p-7 gap-7"
      :class="{ 'opacity-0': !showOpening }"
    >
      <img class="bg-lime-200 h-full w-1/4" src="/logo/logo.svg" aria-hidden="true" />
      <div class="h-full w-3/4 flex flex-col items-start justify-center">
        <p class="text-gray-400 text-lg">Starting game</p>
        <h3 class="text-white text-4xl">Vent Defeater: The Game</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { delay } from '@/utils/functions';
import { onMounted, ref, watch } from 'vue';

type Showcase = {
  type: 'image' | 'video';
  src: string;
};

type Emits = {
  next: [void];
};
const emit = defineEmits<Emits>();

const showOpening = ref(false);

async function start() {
  const page = document.documentElement;
  page.requestFullscreen({ navigationUI: 'hide' });
  showOpening.value = true;
  await delay(2000);
  emit('next');
}

const showcases = ref<Showcase[]>([
  {
    type: 'video',
    src: '/game/showcase/gameAd.mp4'
  },
  {
    type: 'image',
    src: '/game/showcase/showcase4.png'
  },
  {
    type: 'image',
    src: '/game/showcase/showcase2.png'
  },
  {
    type: 'image',
    src: '/game/showcase/showcase1.png'
  },
  {
    type: 'image',
    src: '/game/showcase/showcase3.png'
  }
]);
const selectedShowcase = ref<Showcase>(showcases.value[0]);
watch(
  () => selectedShowcase.value,
  () => {
    showcaseCooldown.value = 0;
  }
);
const showcaseCooldown = ref(0);
watch(
  () => showcaseCooldown.value,
  (num) => {
    if (selectedShowcase.value.type == 'image' && num > 6) {
      const index = showcases.value.findIndex((showcase) => showcase.src == selectedShowcase.value.src);

      if (index < showcases.value.length - 1) selectedShowcase.value = showcases.value[index + 1];
      else selectedShowcase.value = showcases.value[0];
    }
  }
);

onMounted(() => {
  incrementCooldown();
});

async function incrementCooldown() {
  while (true) {
    await delay(1000);
    showcaseCooldown.value++;
  }
}

function translateMonth(month: number) {
  if (month == 0) return 'Jan';
  else if (month == 1) return 'Feb';
  else if (month == 2) return 'Mar';
  else if (month == 3) return 'Apr';
  else if (month == 4) return 'May';
  else if (month == 5) return 'Jun';
  else if (month == 6) return 'Jul';
  else if (month == 7) return 'Aug';
  else if (month == 8) return 'Sep';
  else if (month == 9) return 'Oct';
  else if (month == 10) return 'Nov';
  else return 'Dec';
}
</script>

<style lang="scss" scoped>
.background {
  background: radial-gradient(circle at 50% 0%, rgb(30, 67, 86), rgb(27, 40, 56) 60%);
}

@media (hover: hover) and (pointer: fine) {
  .play:hover {
    background-color: rgb(80, 80, 80);
  }

  .playButton:hover {
    background-color: greenyellow;
  }

  .showcase:hover {
    img,
    video {
      filter: brightness(1);
    }
  }
}
</style>
