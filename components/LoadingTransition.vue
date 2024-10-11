<template>
  <Transition name="loading">
    <div class="absolute top-0 left-0 w-full h-screen flex items-center justify-center flex-col bg-[color:var(--bg-color)]" v-if="show || showTransition">
      <img src="/logo/logoWithWords.svg" aria-hidden="true" />
      <div class="flex items-center justify-center gap-1 mt-12">
        <img class="cog w-12 h-12 dark:invert" src="/ui/cog.svg" aria-hidden="true" />
        <h1 class="text-3xl">{{ loadingMessage }}</h1>
      </div>
      <div class="w-96 h-8 bg-[color:var(--faded-bg-color)] rounded-full">
        <div class="h-full bg-[color:var(--primary)] transition-all duration-500 rounded-full" :style="{ width: percent ?? barPercent + '%' }"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
type Props = {
  /** When to show the transition.
   *
   * Only passed if custom loading duration is needed.
   */
  show?: boolean;
  /** Percentage of the bar to fill.
   *
   * Only passed if custom loading duration is needed. */
  percent?: number;
};

const props = defineProps<Props>();
const emit = defineEmits(["done"]);

const showTransition = ref(false);
const barPercent = ref(10);
const loadingMessage = ref("Searching vents...");
watch(
  () => barPercent.value,
  (value) => {
    if (value >= 100) loadingMessage.value = "Done!";
    else if (value >= 80) loadingMessage.value = "Calling emergency meeting...";
    else if (value >= 50) loadingMessage.value = "Finding impostors...";
    else if (value >= 30) loadingMessage.value = "Doing tasks...";
  }
);
watch(
  () => props.percent,
  async (value) => {
    if (!value) return;

    if (value >= 100) {
      loadingMessage.value = "Done!";
      await delay(400);
      emit("done");
    } else if (value >= 80) loadingMessage.value = "Calling emergency meeting...";
    else if (value >= 50) loadingMessage.value = "Finding impostors...";
    else if (value >= 30) loadingMessage.value = "Doing tasks...";
  }
);

onMounted(async () => {
  if (props.show || props.percent) return;

  showTransition.value = true;
  barPercent.value = 10;
  while (barPercent.value < 100) {
    await delay(150);
    barPercent.value += 10;
  }

  await delay(400);
  showTransition.value = false;
  emit("done");
});
</script>

<style lang="scss" scoped>
.loading-enter-active,
.loading-leave-active {
  transition: all 0.25s ease;
}

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
</style>
