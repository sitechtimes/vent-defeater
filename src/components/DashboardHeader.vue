<template>
  <header class="w-full h-24 flex items-start justify-between px-16 pt-7">
    <div class="search z-10 duration-0 flex items-start jusitfy-start flex-col h-fit w-fit gap-4 bg-[color:var(--faded-bg-color)] rounded-md py-2">
      <div class="flex items-center jusitfy-center gap-2 px-3">
        <img class="w-4 h-4 dark:invert" src="/ui/search.svg" aria-hidden="true" />
        <input
          class="bg-transparent text-[color:var(--text-color)] placeholder:text-[color:var(--faded-text-color)] w-96 focus:outline-none"
          type="text"
          placeholder="Search vents, cameras, and electrical"
          v-model="searchInput"
        />
        <img class="w-4 h-4 dark:invert cursor-pointer" v-show="searchInput.length != 0" src="/ui/x.svg" aria-hidden="true" @click="searchInput = ''" />
      </div>

      <div class="results hidden items-start justify-center w-full h-fit flex-col gap-1 px-3">
        <p class="text-[color:var(--faded-text-color)] px-3" v-show="searchInput.length == 0">Recently visited</p>
        <p class="m-0 px-3" v-show="searchInput.length != 0 && presentations.length == 0">
          No search results for <strong>{{ searchInput }}</strong>
        </p>
        <div class="presentation flex items-center justify-between w-full transition duration-300 px-3 py-1 rounded-md" v-for="presentation in presentations" :key="presentation.id">
          <p class="m-0">{{ presentation.name }}</p>
          <p class="m-0 text-[color:var(--faded-text-color)]">{{ presentation.type }}</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center gap-2">
      <ThemeToggle />

      <button class="upgrade transition duration-300 flex items-center justify-center gap-1 bg-[color:var(--bg-color)] rounded-full py-2 px-7 border-2 border-[color:var(--text-color)]">
        <img class="transition duration-300 w-4 h-4 dark:invert" src="/ui/star.svg" aria-hidden="true" />
        <p class="m-0 text-[color:var(--text-color)] font-semibold">Upgrade</p>
      </button>

      <div class="notificationsButton relative">
        <button class="rounded-full w-11 h-11 transition duration-300 flex items-center justify-center bg-[color:var(--faded-bg-color)]">
          <img class="transition duration-300 w-1/2 h-1/2 dark:invert" src="/ui/bell.svg" aria-hidden="true" />
        </button>
        <div
          class="notifications opacity-0 pointer-events-none absolute right-0 flex items-center justify-center flex-col gap-2 w-96 p-4 mt-6 bg-[color:var(--bg-color)] rounded-lg transition duration-300"
        >
          <h1 class="text-lg text-left w-full mt-4">Notifications</h1>
          <div class="flex items-center justify-center flex-col w-80 bg-[color:var(--faded-bg-color)] p-6 rounded-lg">
            <p class="m-0 font-bold">Nothing to catch up on for now</p>
            <p class="m-0">You don't have any notifications</p>
          </div>
        </div>
      </div>

      <button class="rounded-full w-11 h-11 transition duration-300 flex items-center justify-center bg-[color:var(--secondary)]">
        <img class="transition duration-300 w-1/2 h-1/2 dark:invert" src="/ui/user.svg" aria-hidden="true" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import type { Presentation } from '@/utils/types';
import { onBeforeMount, ref, watch } from 'vue';
import ThemeToggle from './ThemeToggle.vue';

const userStore = useUserStore();
const presentations = ref<Presentation[]>([]);

const searchInput = ref('');
watch(
  () => searchInput.value,
  (input) => search(input)
);

onBeforeMount(() => {
  presentations.value = [...userStore.presentations].sort((a, b) => b.lastOpened - a.lastOpened).slice(0, 3);
});

function search(input: string) {
  if (!input) {
    presentations.value = [...userStore.presentations].sort((a, b) => b.lastOpened - a.lastOpened).slice(0, 3);
    return;
  }

  const lowercaseInput = input.toLowerCase();
  presentations.value = [...userStore.presentations].filter((presentation) => presentation.name.toLowerCase().includes(lowercaseInput)).slice(0, 5);
}
</script>

<style lang="scss" scoped>
.search {
  transition:
    outline 0.075s,
    box-shadow 0.5s;
}

.search:focus-within {
  outline: 0.125rem solid var(--primary);
  background-color: var(--bg-color);
  box-shadow: 0 0 0 0.375rem var(--primary-shade-translucent);

  .results {
    display: flex;
  }
}

.notificationsButton:focus-within {
  .notifications {
    opacity: 1;
    pointer-events: all;
  }
}

.notifications {
  box-shadow: 0 0 0 0.05rem var(--bg-color-contrast-translucent);
}

@media (hover: hover) and (pointer: fine) {
  .search:hover {
    outline: 0.125rem solid var(--primary);
  }

  .presentation:hover {
    background-color: var(--faded-bg-color);
  }

  .upgrade:hover {
    background-color: var(--faded-bg-color);
  }

  .notificationsButton {
    button:hover {
      background-color: var(--faded-bg-color-light);
    }
  }
}
</style>
