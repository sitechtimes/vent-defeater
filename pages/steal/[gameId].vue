<template>
  <div class="w-screen flex flex-col items-center justify-start gap-4 background select-text">
    <div class="w-[960px] h-full flex flex-col items-center justify-start" :class="{ 'brightness-50': showOpening, 'grayscale-[.5]': showOpening }">
      <div class="w-full flex items-center justify-start text-[rgb(126,152,160)] text-md">All Games > Strategy Games > Rougelites > Vent Defeater</div>
      <div class="w-full flex items-center justify-start text-white text-3xl">Vent Defeater: The Game</div>
      <div class="flex items-center justify-center w-full gap-3 bg-[rgba(0,0,0,0.25)] p-2 rounded-md mt-3">
        <div class="flex items-center justify-center flex-col gap-2 w-[62.5%]">
          <div class="flex flex-col items-center justify-center w-full">
            <video v-if="selectedShowcase.type == 'video'" :src="selectedShowcase.src" autoplay muted @load="showcaseCooldown = 0" @ended="selectedShowcase = showcases[1]"></video>
            <img v-else :src="selectedShowcase.src" @load="showcaseCooldown = 0" />
            <div class="w-full bg-gray-900 h-2">
              <div v-if="showcaseCooldown > 0" class="h-full bg-yellow-300" :style="{ animation: `move-steal-bar ${selectedShowcase.type == 'video' ? 19.5 : 5}s linear` }"></div>
            </div>
          </div>
          <div class="flex items-center justify-between gap-1">
            <button @click="selectedShowcase = showcase" :class="{ relative: showcase.type == 'video' }" v-for="showcase in showcases" class="showcase w-[20%] flex items-center justify-center">
              <video :class="{ 'brightness-50': showcase.src != selectedShowcase.src }" v-if="showcase.type == 'video'" :src="showcase.src" muted></video>
              <img class="absolute w-10 h-10" v-if="showcase.type == 'video'" src="/game/play.svg" aria-hidden="true" />
              <img :class="{ 'brightness-50': showcase.src != selectedShowcase.src }" v-else :src="showcase.src" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-start flex-col w-[37.5%] h-full gap-3">
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
            <span class="text-gray-300 text-md">{{ translateMonth(new Date()) }} {{ new Date().getDate() + 1 }}, {{ new Date().getFullYear() }}</span>
          </p>

          <div class="w-full flex flex-col items-start justify-center">
            <p><span class="text-gray-400 text-xs">DEVELOPER:</span> <span class="text-blue-400 text-md font-bold">Kenf & Lorenz</span></p>
            <p><span class="text-gray-400 text-xs">PUBLISHER:</span> <span class="text-blue-400 text-md font-bold">Bogdan Sussyomin, Robber of Barons</span></p>
          </div>

          <p class="text-left w-full"><span class="text-gray-400 text-xs">PLATFORMS:</span> <span class="text-blue-400 text-md font-bold">PC, Tablet</span></p>
        </div>
      </div>

      <button :disabled="showOpening" @click="start" class="w-1/2 py-4 bg-lime-300 border-8 border-lime-500 text-black text-5xl font-extrabold my-10 rounded-2xl playButton">Play Now</button>

      <p class="text-left w-full mb-2"><span class="text-white text-xl">MOST HELPFUL REVIEWS </span> <span class="text-gray-500 text-xl">IN THE PAST 5 SECONDS</span></p>
      <div class="w-full flex items-center justify-center flex-col gap-8">
        <div class="bg-[rgb(22,32,45)] w-full flex items-start justify-center gap-12 p-2 border-t-2 border-blue-800" v-for="review in reviews">
          <div class="w-1/4 flex items-center justify-start gap-2">
            <img class="w-12 h-12 border-2 border-gray-600" :src="review.img ? review.img : 'https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg'" aria-hidden="true" />
            <p class="text-[rgb(110,148,190)] text-xl font-bold">{{ review.name }}</p>
          </div>

          <div class="w-3/4 flex items-start justify-center flex-col gap-4">
            <div class="bg-[rgb(18,26,36)] w-full flex items-center justify-start gap-2">
              <img
                class="w-12 h-12"
                :src="
                  review.recommended
                    ? 'https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png'
                    : 'https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png'
                "
                aria-hidden="true"
              />
              <div class="flex flex-col items-start justify-center">
                <p class="text-white text-xl">{{ review.recommended ? "Recommended" : "Not Recommended" }}</p>
                <p class="text-gray-500 text-sm">{{ review.hours }} hrs on record</p>
              </div>
            </div>

            <p class="flex items-center justify-center gap-px">
              <span class="text-gray-500 text-sm" v-for="char in `POSTED: ${translateMonth(new Date()).toUpperCase()} ${new Date().getDate()}`">{{ char }}</span>
            </p>

            <p class="text-white text-md">{{ review.review }}</p>

            <div class="w-full bg-gray-700 h-[2px] rounded-full"></div>

            <p class="text-gray-500 text-sm">Was this review helpful?</p>
            <div class="flex items-center justify-center gap-2">
              <button
                @click="
                  review.helpful++;
                  review.reviewed = true;
                  review.userReview = 'yes';
                "
                :disabled="review.reviewed"
                :class="{
                  'cursor-not-allowed': review.reviewed,
                  'bg-[rgb(33,44,61)]': !review.reviewed,
                  'bg-[rgb(22,30,41)]': review.reviewed && review.userReview == 'no',
                  'bg-[rgb(71,95,131)]': review.reviewed && review.userReview == 'yes'
                }"
                :title="review.reviewed ? 'Already reviewed' : ''"
                class="px-[2px] flex items-center justify-center gap-2"
              >
                <img class="w-4 h-4 brightness-75" src="https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png" aria-hidden="true" />
                <p class="text-blue-400 text-md">Yes</p>
              </button>
              <button
                @click="
                  review.helpful--;
                  review.reviewed = true;
                  review.userReview = 'no';
                "
                :disabled="review.reviewed"
                :class="{
                  'cursor-not-allowed': review.reviewed,
                  'bg-[rgb(33,44,61)]': !review.reviewed,
                  'bg-[rgb(22,30,41)]': review.reviewed && review.userReview == 'yes',
                  'bg-[rgb(71,95,131)]': review.reviewed && review.userReview == 'no'
                }"
                :title="review.reviewed ? 'Already reviewed' : ''"
                class="bg-[rgb(33,44,61)] px-[2px] flex items-center justify-center gap-2"
              >
                <img class="w-4 h-4 brightness-75 scale-y-[-1]" src="https://store.akamai.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png" aria-hidden="true" />
                <p class="text-blue-400 text-md">No</p>
              </button>
            </div>

            <p class="text-gray-500 text-sm">{{ (review.helpful >= 2147483648 ? -2147483648 : review.helpful).toLocaleString() }} people found this review helpful</p>
          </div>
        </div>
      </div>

      <p class="text-gray-500 text-md mt-20">No more reviews for now...</p>
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
const router = useRouter();

definePageMeta({
  layout: "steal"
});

const config = useRuntimeConfig();
useSeoMeta({
  title: "Vent Defeater on Steal",
  ogTitle: "Vent Defeater: The Game",
  ogImage: () => config.public.url + "/logo/logoTheGame.png",
  description: "The vents are fighting back, corrupting any crewmates that hop in! It's up to you to put a stop to their sussy antics. Can you be the sussiest one among us?",
  ogDescription: "The vents are fighting back, corrupting any crewmates that hop in! It's up to you to put a stop to their sussy antics. Can you be the sussiest one among us?",
  ogSiteName: "Steal",
  ogUrl: () => config.public.url + "/game"
});

useHead({
  meta: [
    { property: "product:price:amount", content: "0.00" },
    { property: "product:price:currency", content: "USD" },
    { property: "product:recommendations", content: "5" }
  ]
});

type Showcase = {
  type: "image" | "video";
  src: string;
};
const route = useRoute();
const gameId = ref<number>(games.map((game) => game.id).includes(Number(route.query.gameId)) ? Number(route.query.gameId) : 0);
const store = useGameStore();

const { showOpening } = storeToRefs(store);
const startTime = ref(new Date().getTime());

onMounted(() => {
  if (gameId.value == 0) return router.push("/steal");
  incrementCooldown();
});

async function start() {
  if (!store.smallScreen) {
    const page = document.documentElement;
    page.requestFullscreen({ navigationUI: "hide" });
  }
  showOpening.value = true;
  await delay(2000);
  router.push("/steal/games/vent-defeater");
}

const showcases = ref<Showcase[]>(games.find((game) => game.id == gameId.value)?.showcases ?? []);
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

const reviews = ref<Review[]>(games.find((game) => game.id == gameId.value)?.stats.reviews ?? []);

async function incrementCooldown() {
  while (true) {
    await delay(20);
    showcaseCooldown.value++;
  }
}

function translateMonth(date: Date) {
  return date.toLocaleDateString("default", { month: "short" });
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
