<template>
  <div class="flex items-start justify-center w-screen h-full overflow-hidden">
    <LoadingTransition v-show="!loaded" @done="loaded = true" />

    <Transition name="settings">
      <div @click="showSettings = false" class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)]" v-show="showSettings">
        <div @click="$event.stopPropagation()" class="relative bg-[var(--bg-color)] flex items-start justify-between h-[35rem] w-[55rem] p-10 rounded-lg">
          <button @click="showSettings = false" class="absolute top-3 right-3 flex items-center justify-center w-9 h-9 hover:bg-[var(--faded-bg-color)] hover:rotate-90 rounded-full">
            <img class="w-6 h-6 dark:invert" src="/ui/x.svg" aria-hidden="true" />
          </button>

          <div class="flex flex-col items-center justify-between h-full w-1/4 pr-3 font-bold">
            <div class="flex flex-col items-start justify-start gap-10 h-full w-full">
              <button class="mt-12">General Options</button>
              <button>Personal Info</button>
            </div>

            <div class="w-full flex items-center justify-center">
              <button class="flex items-center justify-center w-3/4 bg-[var(--secondary)] hover:bg-[var(--secondary-shade)] py-4 mb-10 rounded-full text-xl">Save</button>
            </div>
          </div>

          <div class="flex flex-col items-center justify-between h-full w-3/4">
            <div class="flex flex-col justify-center items-center gap-12 h-full w-full">
              <input class="bg-[var(--faded-bg-color-light)] w-11/12 rounded-md p-4 text-xl focus:outline-none" type="text" placeholder="Email" />
              <input class="bg-[var(--faded-bg-color-light)] w-11/12 rounded-md p-4 text-xl focus:outline-none" type="text" placeholder="User" />
              <input class="bg-[var(--faded-bg-color-light)] w-11/12 rounded-md p-4 text-xl focus:outline-none" type="text" placeholder="Password" />
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="settings">
      <div @click="showLogOut = false" class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)]" v-show="showLogOut">
        <div @click="$event.stopPropagation()" class="relative bg-[var(--bg-color)] flex items-start justify-between h-[35rem] w-[55rem] p-10 rounded-lg">
          <button @click="showLogOut = false" class="absolute top-3 right-3 flex items-center justify-center w-9 h-9 hover:bg-[var(--faded-bg-color)] hover:rotate-90 rounded-full">
            <img class="w-6 h-6 dark:invert" src="/ui/x.svg" aria-hidden="true" />
          </button>

          <div class="flex flex-col items-center justify-center w-full h-full pr-3 font-bold gap-20 text-7xl mt-12 text-bold">
            <p>We'll miss you D:</p>
            <div class="w-full flex items-center justify-center">
              <button class="flex items-center justify-center w-2/4 bg-[var(--fire)] hover:bg-[var(--fire-secondary)] p-10 mb-10 rounded-full text-3xl">Log Out?</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="sideMenu">
      <SideMenu v-show="loaded" class="fixed top-0 left-0" />
    </Transition>

    <div class="w-72"></div>

    <Transition name="page">
      <div class="w-full min-h-screen flex items-start justify-start flex-col" v-show="loaded">
        <DashboardHeader @open-settings="showSettings = true" @log-out="showLogOut = true" />
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { getPreviousRoute } from "~/middleware/auth";

type Category = {
  name: string;
  anchor: string;
  settings?: Category[];
};

const loaded = ref(false);
const showSettings = ref(false);
const showLogOut = ref(false);

onMounted(async () => {
  const previousRoute = getPreviousRoute();
  if (previousRoute && !["/", "/login"].includes(previousRoute.path)) {
    loaded.value = true;
    return;
  }

  loaded.value = false;
});

const options: Category[] = [
  {
    name: "General Options",
    anchor: "general-options",
    settings: [{ name: "name", anchor: "" }]
  },
  {
    name: "Personal Info",
    anchor: "personal-info",
    settings: [
      { name: "Email", anchor: "" },
      { name: "User", anchor: "" },
      { name: "Password", anchor: "" }
    ]
  }
];
</script>

<style lang="scss" scoped>
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

.settings-enter-active,
.settings-leave-active {
  transition: all 0.25s ease;
}

.settings-enter-from,
.settings-leave-to {
  opacity: 0;
}
</style>
