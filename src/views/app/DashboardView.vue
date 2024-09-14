<template>
  <div class="flex items-center justify-center w-screen h-full">
    <SideMenu />
    <div class="w-full min-h-screen flex items-start justify-start flex-col">
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
  </div>
  <WordCloud></WordCloud>
</template>

<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue';
import SideMenu from '@/components/SideMenu.vue';
import { onMounted } from 'vue';
</script>

<style lang="scss" scoped></style>
