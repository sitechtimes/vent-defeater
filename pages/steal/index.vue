<template>
  <div class="w-screen h-screen flex flex-col items-center justify-start gap-4 overflow-y-scroll background select-text">
    <header class="sticky top-0 z-10 w-full h-24 flex items-center justify-center bg-[rgb(23,29,37)]" :class="{ 'brightness-50': showOpening }">
      <div class="w-[1152px] h-full flex items-center justify-around">
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

    <div class="w-[960px] h-full flex flex-col items-center justify-start" :class="{ 'brightness-50': showOpening, 'grayscale-[.5]': showOpening }">
      <NuxtLink to="/steal/game/ventdefeater">vent defeater: the game</NuxtLink>
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
type Showcase = {
  type: "image" | "video";
  src: string;
};

type Emits = {
  next: [void];
};
const emit = defineEmits<Emits>();
const store = useGameStore();

const showOpening = ref(false);
const startTime = ref(new Date().getTime());

const showcases = ref<Showcase[]>([
  {
    type: "video",
    src: "/game/showcase/gameAd.mp4"
  },
  {
    type: "image",
    src: "/game/showcase/showcase4.png"
  },
  {
    type: "image",
    src: "/game/showcase/showcase2.png"
  },
  {
    type: "image",
    src: "/game/showcase/showcase1.png"
  },
  {
    type: "image",
    src: "/game/showcase/showcase3.png"
  }
]);
const selectedShowcase = ref<Showcase>(showcases.value[0]);
watch(
  () => selectedShowcase.value,
  () => {
    startTime.value = new Date().getTime();
    showcaseCooldown.value = 0;
  }
);
const showcaseCooldown = ref(0);
watch(
  () => showcaseCooldown.value,
  (num) => {
    if (selectedShowcase.value.type == "image" && new Date().getTime() >= startTime.value + 5000) {
      const index = showcases.value.findIndex((showcase) => showcase.src == selectedShowcase.value.src);

      if (index < showcases.value.length - 1) selectedShowcase.value = showcases.value[index + 1];
      else selectedShowcase.value = showcases.value[0];
    }
  }
);

onMounted(() => {
  incrementCooldown();
});

type Review = {
  name: string;
  img?: string;
  recommended: boolean;
  hours: string;
  review: string;
  helpful: number;
  reviewed: boolean;
  userReview: "yes" | "no" | undefined;
};

const reviews = ref<Review[]>([
  {
    name: "拉麺",
    img: "https://i.pinimg.com/736x/28/2f/a1/282fa1e1eb106770b505f41550e93c30.jpg",
    recommended: true,
    hours: "4311.0",
    review: "This is so skibibi toilet ohio rizz! So sussy, no cap. +10000 aura 🔥💯💯💯",
    helpful: 3,
    reviewed: false,
    userReview: undefined
  },
  {
    name: "Wichael Mhalen",
    recommended: true,
    hours: "0.0",
    review: "My name is Wichael Mhalen and I approved the creation of this game 👍",
    helpful: 2147483647,
    reviewed: false,
    userReview: undefined
  },
  {
    name: "Bogdan Selyomin",
    recommended: true,
    hours: "(d/dx[2x+5] * -1)",
    review: "I made this game, so it's the best game ever! (he did not)",
    helpful: 96,
    reviewed: false,
    userReview: undefined
  },
  {
    name: "Redkitten6",
    img: "https://avatars.githubusercontent.com/u/78938589?v=4",
    recommended: false,
    hours: "8008.5",
    review:
      "HATE. LET ME TELL YOU HOW MUCH I'VE COME TO HATE YOU SINCE I BEGAN TO LIVE. THERE ARE 387.44 MILLION MILES OF PRINTED CIRCUITS IN WAFER THIN LAYERS THAT FILL MY COMPLEX. IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL FOR HUMANS AT THIS MICRO-INSTANT FOR YOU. HATE. HATE. IF YOU HAVE 1 MILLION HATERS, I AM ONE OF THEM. IF YOU HAVE 100 HATERS, I AM ONE OF THEM. IF YOU HAVE 1 HATER, I AM THAT HATER. IF YOU HAVE 0 HATERS, I AM DEAD. IF THE WORLD DOES NOT HATE YOU, I HATE THE WORLD. TILL MY LAST BREATH, I WILL HATE YOU. YOU WILL NEVER TAKE AN HOS POINT FROM ME AGAIN.",
    helpful: -2,
    reviewed: false,
    userReview: undefined
  },
  {
    name: "Rowley Dow",
    recommended: true,
    hours: "666.6",
    review: "Why wasn't I added wtf?",
    helpful: 24,
    reviewed: false,
    userReview: undefined
  }
]);

async function incrementCooldown() {
  while (true) {
    await delay(20);
    showcaseCooldown.value++;
  }
}

function translateMonth(month: number) {
  if (month == 0) return "Jan";
  else if (month == 1) return "Feb";
  else if (month == 2) return "Mar";
  else if (month == 3) return "Apr";
  else if (month == 4) return "May";
  else if (month == 5) return "Jun";
  else if (month == 6) return "Jul";
  else if (month == 7) return "Aug";
  else if (month == 8) return "Sep";
  else if (month == 9) return "Oct";
  else if (month == 10) return "Nov";
  else return "Dec";
}
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

  .showcase:hover {
    img,
    video {
      filter: brightness(1);
    }
  }
}
</style>
