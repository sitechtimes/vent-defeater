<template>
  <div class="flex items-start justify-center w-screen h-full overflow-hidden">
    <Transition name="loading">
      <div class="absolute top-0 left-0 w-full h-screen flex items-center justify-center flex-col" v-if="!loaded">
        <img src="/logo/logoWithWords.svg" aria-hidden="true" />
        <div class="flex items-center justify-center gap-1 mt-12">
          <img class="cog w-12 h-12 dark:invert" src="/ui/cog.svg" aria-hidden="true" />
          <h1 class="text-3xl">{{ loadingMessage }}</h1>
        </div>
        <div class="w-96 h-8 bg-[color:var(--faded-bg-color)] rounded-full">
          <div class="h-full bg-[color:var(--primary)] transition-all duration-500 rounded-full" :style="{ width: barPercent + '%' }"></div>
        </div>
      </div>
    </Transition>

    <Transition name="sideMenu">
      <SideMenu v-show="loaded" class="fixed top-0 left-0" />
    </Transition>

    <div class="w-72"></div>

    <Transition name="page">
      <div class="w-full min-h-screen flex items-start justify-start flex-col" v-show="loaded">
        <DashboardHeader />
        <div class="w-full h-full px-16 flex items-start justify-center flex-col gap-8">
          <h1 class="text-4xl mt-10">Welcome, dumbass</h1>

          <div class="flex align-start justify-center flex-col gap-5 bg-[color:var(--faded-bg-color-light)] p-8 rounded-2xl">
            <p class="font-semibold">Popular features</p>
            <div class="flex items-start justify-center gap-1 w-full">
              <div class="flex items-center justify-center flex-col gap-2 cursor-pointer" v-for="feature in popularFeatures" :key="feature.name">
                <img class="flex items-center justify-center p-8 bg-[color:var(--bg-color)] rounded-2xl w-3/4 h-3/4" :src="feature.img" aria-hidden="true" />
                <p>{{ feature.name }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <div class="newProjectButton relative flex items-center justify-center border-solid border border-[color:var(--text-color)] rounded-full bg-[color:var(--text-color)]">
              <RouterLink class="flex items-center justify-center no-underline rounded-l-full bg-[color:var(--text-color)] px-5 border-r border-[color:var(--bg-color)]" to="/app/new">
                <p class="font-semibold text-[color:var(--bg-color)]">New Vent</p>
              </RouterLink>
              <button class="flex items-center justify-center rounded-r-full bg-[color:var(--text-color)] px-3 h-9">
                <img class="w-6 h-6 invert dark:invert-0" src="/ui/dropdownArrow.svg" alt="Click for more options" />
              </button>
              <div class="newProject opacity-0 pointer-events-none absolute top-11 flex items-center justify-center flex-col gap-1 p-2 bg-[color:var(--bg-color)] rounded-lg transition duration-300">
                <button class="new flex items-center justify-start gap-1 w-full p-1 pl-2 pr-7 rounded-lg">
                  <img class="w-4 h-4 dark:invert" src="/ui/search.svg" aria-hidden="true" />
                  <p class="text-[color:var(--text-color)]">New quiz</p>
                </button>
                <button class="new flex items-center justify-start gap-1 w-full p-1 pl-2 pr-7 rounded-lg">
                  <img class="w-4 h-4 dark:invert" src="/ui/x.svg" aria-hidden="true" />
                  <p class="text-[color:var(--text-color)]">New survey</p>
                </button>
              </div>
            </div>

            <button class="flex items-center justify-center gap-1 h-10 px-5 border-solid border-2 border-[color:var(--text-color)] rounded-full">
              <img class="w-6 h-6 dark:invert" src="/ui/download.svg" aria-hidden="true" />
              <p class="text-[color:var(--text-color)] font-semibold">Import presentation</p>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue';
import SideMenu from '@/components/SideMenu.vue';
import { getPreviousRoute } from '@/router';
import { delay } from '@/utils/functions';
import { onMounted, ref, watch } from 'vue';

const loaded = ref(false);
const barPercent = ref(15);
const loadingMessage = ref('Searching vents...');
watch(
  () => barPercent.value,
  (value) => {
    if (value >= 100) loadingMessage.value = 'Done!';
    else if (value >= 80) loadingMessage.value = 'Calling emergency meeting...';
    else if (value >= 50) loadingMessage.value = 'Finding impostors...';
    else if (value >= 30) loadingMessage.value = 'Doing tasks...';
  }
);

const popularFeatures = [
  {
    name: 'Word cloud',
    img: '/ui/home.svg'
  },
  {
    name: 'Poll',
    img: '/ui/x.svg'
  },
  {
    name: 'Open ended',
    img: '/ui/search.svg'
  },
  {
    name: 'Scales',
    img: '/ui/star.svg'
  },
  {
    name: 'Ranking',
    img: '/ui/sun.svg'
  },
  {
    name: 'Pin it',
    img: '/ui/user.svg'
  }
];

onMounted(async () => {
  const previousRoute = getPreviousRoute();
  if (previousRoute && !['/', '/login'].includes(previousRoute.path)) {
    loaded.value = true;
    return;
  }

  loaded.value = false;
  barPercent.value = 10;
  while (barPercent.value < 100) {
    await delay(150);
    barPercent.value += 10;
  }

  await delay(400);
  loaded.value = true;
});
</script>

<style lang="scss" scoped>
.newProjectButton:focus-within {
  .newProject {
    opacity: 1;
    pointer-events: all;
  }
}

.newProject {
  box-shadow: 0 0 0 0.05rem var(--bg-color-contrast-translucent);
}

.sideMenu-enter-active,
.sideMenu-leave-active {
  transition: all 0.5s ease;
}

.sideMenu-enter-from,
.sideMenu-leave-to {
  opacity: 0;
  transform: translate(-12rem);
}

.page-enter-active,
.page-leave-active {
  transition: all 1.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(50vh);
}

.loading-enter-active,
.loading-leave-active {
  transition: all 0.25s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

@keyframes turn {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.cog {
  animation: turn 1.5s infinite;
}

@media (hover: hover) and (pointer: fine) {
  .new:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
