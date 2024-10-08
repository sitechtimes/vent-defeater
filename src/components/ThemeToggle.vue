<template>
  <button
    @click="toggleTheme"
    class="bg-[color:var(--bg-color)] w-14 h-8 px-8 border-solid border-2 border-[color:var(--text-color)] rounded-full relative transition duration-300"
    :id="big ? 'big' : ''"
  >
    <img
      class="absolute top-0.5 left-1 h-6 transition duration-500"
      :class="{ 'translate-x-8': dark, 'translate-x-10': dark && big }"
      :style="{ left: dark && big ? '1rem' : '0.25rem' }"
      :src="dark ? '/ui/moon.svg' : '/ui/sun.svg'"
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

type Props = {
  big?: boolean;
};

defineProps<Props>();

const userStore = useUserStore();
const dark = ref(userStore.theme == "dark");

function toggleTheme() {
  const wasLight = userStore.theme === "light";
  userStore.theme = wasLight ? "dark" : "light";
  dark.value = wasLight;
  document.body.classList[wasLight ? "add" : "remove"]("dark");
  localStorage.setItem("theme", userStore.theme);
}
</script>

<style lang="scss" scoped>
#big {
  height: 2.75rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;

  img {
    top: 0.3125rem;
    height: 1.875rem;
    left: 0.375rem;
  }
}

@media (hover: hover) and (pointer: fine) {
  button:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
