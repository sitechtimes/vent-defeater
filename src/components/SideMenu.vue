<template>
  <div class="menu flex items-start justify-start flex-col w-72 min-h-screen p-8 gap-8 transition duration-500">
    <img class="logo w-full transition duration-300 rounded-lg cursor-pointer p-2" src="/logo/logoWithWords.svg" aria-hidden="true" @click="router.push('/app/dashboard')" />
    <div class="flex items-center justify-center flex-col w-full gap-px">
      <RouterLink
        class="h-9 transition duration-300 navButton flex items-center justify-start gap-3 no-underline text-[color:var(--text-color)] w-full rounded-md"
        v-for="button in navButtons"
        :key="button.name"
        :to="button.route"
      >
        <div class="w-1 h-6 rounded-full" :class="{ 'bg-[color:var(--secondary)]': router.currentRoute.value.path == button.route }"></div>
        <div class="flex align-center justify-center gap-1">
          <img class="transition duration-300 h-7 dark:invert" :src="button.img" aria-hidden="true" />
          {{ button.name }}
        </div>
      </RouterLink>
    </div>
    <div class=""></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navButtons = [
  {
    name: 'Dashboard',
    img: '/ui/home.svg',
    route: '/app/dashboard'
  },
  {
    name: 'My presentations',
    img: '/ui/user.svg',
    route: '/app/presentations'
  }
];
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .menu {
    .logo:hover {
      background-color: var(--faded-bg-color);
    }
  }

  .navButton:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
