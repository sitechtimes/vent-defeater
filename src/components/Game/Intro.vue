<template>
  <div class="w-screen h-screen flex flex-col items-center justify-start gap-4 py-10 overflow-hidden">
    <Transition name="cutscene">
      <div class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-10 overflow-hidden" v-if="delayedShowAnimation">
        <div class="portal-norotate absolute w-screen h-screen no-underline border-[color:#5900ff] border-4"></div>
      </div>
    </Transition>
    <Transition name="up">
      <div class="flex flex-col items-center justify-center gap-4" v-show="onmountTransitions[0]">
        <img class="logo" src="/logo/logoTheGame.svg" aria-hidden="true" />
        <h1 class="text-3xl font-medium">Built upon the pillars of creativity and originality.</h1>
      </div>
    </Transition>

    <Transition name="up">
      <button class="flex items-center justify-center" :class="{ 'cursor-none': delayedShowAnimation }" @click="showAnimation = true" v-show="onmountTransitions[1]">
        <div class="start border-[color:#5900ff] duration-250 border-4 text-3xl font-bold rounded-l-full py-6 pl-12 pr-8" :class="{ move: showAnimation }">Start</div>
        <div class="portal right-[1.5rem] w-32 h-32 no-underline rounded-full border-[color:#5900ff] border-4"></div>
      </button>
    </Transition>

    <Transition name="up">
      <div class="flex flex-col items-center justify-center gap-3" v-show="onmountTransitions[2]">
        <h2 class="text-2xl font-bold">How to play</h2>

        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center flex-col gap-4 border-2 border-[color:var(--text-color)] rounded-lg py-4 px-2">
            <img class="w-72" src="/logo/logoTheGame.svg" aria-hidden="true" />
            <p>Replace img with img from gameplay</p>
          </div>

          <div class="w-16 h-16 overflow-hidden">
            <img class="arrow w-16 h-16 dark:invert" src="/ui/rightArrow.svg" aria-hidden="true" />
          </div>

          <div class="flex items-center justify-center flex-col gap-4 border-2 border-[color:var(--text-color)] rounded-lg py-4 px-2">
            <img class="w-72" src="/logo/logoTheGame.svg" aria-hidden="true" />
            <p>Replace img with img from gameplay</p>
          </div>

          <div class="w-16 h-16 overflow-hidden">
            <img class="arrow w-16 h-16 dark:invert" src="/ui/rightArrow.svg" aria-hidden="true" />
          </div>

          <div class="flex items-center justify-center flex-col gap-4 border-2 border-[color:var(--text-color)] rounded-lg py-4 px-2">
            <img class="w-72" src="/logo/logoTheGame.svg" aria-hidden="true" />
            <p>Replace img with img from gameplay</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { delay } from '@/utils/functions';
import { onMounted, ref, watch } from 'vue';

type Emits = {
  next: [void];
};
const emit = defineEmits<Emits>();

const showAnimation = ref(false);
watch(
  () => showAnimation.value,
  async () => {
    await delay(1500);
    delayedShowAnimation.value = true;
    await delay(3000);
    emit('next');
  }
);
const delayedShowAnimation = ref(false);

const onmountTransitions = ref([false, false, false]);
onMounted(async () => {
  await delay(200);
  for (let i = 0; i < onmountTransitions.value.length; i++) {
    onmountTransitions.value[i] = true;
    await delay(700);
  }
});
</script>

<style lang="scss" scoped>
@keyframes move-right {
  0% {
    transform: translate(-4rem);
  }

  100% {
    transform: translate(4rem);
  }
}

@keyframes growGradient {
  0% {
    transform: rotate(0deg);
    background-size: 3% 3%;
  }
  70% {
    background-size: 125% 125%;
  }
  100% {
    transform: rotate(1040deg);
    background-size: 500% 500%;
  }
}

@keyframes growGradientNoRotate {
  0% {
    background-size: 1% 1%;
  }
  5% {
    background-size: 1% 1%;
  }
  50% {
    background-size: 50% 50%;
  }
  100% {
    background-size: 1% 1%;
  }
}

.logo {
  width: 40rem;
}

.portal {
  position: relative;
  background-image: repeating-radial-gradient(circle, #5900ff 0, #5900ff 10%, #d15cff 20%, #d15cff 30%); /* Initial radial gradient */
  background-size: cover;
  transition: none;
  animation: growGradient 3s infinite linear; /* Apply the infinite animation */
  background-position: center;
}

.portal-norotate {
  position: relative;
  background-image: repeating-radial-gradient(circle, #5900ff 0, #5900ff 10%, #d15cff 20%, #d15cff 30%); /* Initial radial gradient */
  background-size: cover;
  transition: none;
  animation: growGradientNoRotate 3s; /* Apply the infinite animation */
  background-position: center;
}

.arrow {
  animation: move-right 0.9s ease-in-out infinite;
}

.move {
  transform: scale(0) translate(20rem);
  transition: all 1.5s;
  padding: 0;
  color: transparent;
}

.cutscene-enter-active,
.cutscene-leave-active {
  transition: all 0.5s;
}

.cutscene-enter-from,
.cutscene-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 1.25s ease;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translateY(50vh);
}

@media (hover: hover) and (pointer: fine) {
  .start:hover {
    background-color: #d15cff;
  }
}
</style>
