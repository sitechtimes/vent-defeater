<template>
  <div class="flex flex-col items-center justify-start gap-4 w-screen h-screen">
    <NavBar :show-join-banner="showBanner" />
    <button @click="counter++"><img class="logo h-32 transition duration-500" src="/logo/logoWithWords.svg" aria-hidden="true" /></button>

    <div class="flex flex-col items-center justify-center gap-2">
      <h1 class="text-3xl">Enter the code to join</h1>
      <p class="text-lg text-[color:var(--faded-text-color)]">It's on the screen in front of you</p>
    </div>

    <div class="box flex gap-3 relative">
      <div
        class="w-14 h-14 text-center text-2xl rounded-md border-2 border-[color:var(--faded-bg-color)] bg-[color:var(--faded-bg-color-light)] flex items-center justify-center transition-none"
        :class="{ current: index == displayedDigits.findIndex((digit) => digit == ''), filled: digit != '', 'ml-3': index == 3 }"
        v-for="(digit, index) in displayedDigits"
        :key="index"
      >
        {{ digit }}
      </div>
      <input ref="inputRef" class="absolute top-0 left-0 w-full h-full text-2xl opacity-0 bg-none border-none outline-none" v-model="code" type="number" @click="selectEverything" />
    </div>

    <div class="flex items-center justify-center gap-4">
      <RouterLink to="/" class="back transition px-10 py-2.5 rounded-full border-2 border-[color:var(--text-color)] bg-transparent text-[color:var(--text-color)] text-lg font-semibold mt-6"
        >Back</RouterLink
      >
      <button
        @click="join(code)"
        :disabled="code.length != 6"
        :class="{ 'cursor-not-allowed': code.length != 6 }"
        :style="{ 'background-color': code.length == 6 ? 'var(--text-color)' : 'var(--faded-text-color)' }"
        class="px-10 py-2.5 rounded-full border-2 border-[color:var(--text-color)] text-[color:var(--bg-color)] text-lg font-semibold mt-6"
      >
        Join
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { delay } from '@/utils/functions';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const counter = ref(0);
watch(
  () => counter.value,
  (value) => {
    if (value % 5 == 0) router.push('/game');
  }
);

const showBanner = ref(JSON.parse(sessionStorage.getItem('previousIsHome') ?? 'false') as boolean);

const inputRef = ref<HTMLInputElement>();
const displayedDigits = ref(new Array(6).fill(''));
const code = ref('');
watch(
  () => code.value,
  (input) => {
    if (input.length > 6) {
      code.value = String(input).slice(0, 6);
      return;
    }
    code.value = [...String(input)].filter((char) => !isNaN(Number(char))).join('');
    displayedDigits.value = String(input).split('').concat(new Array(6).fill('')).slice(0, 6);

    if (input.length == 6) join(code.value);
  }
);

onMounted(() => {
  showBanner.value = false;
});

function selectEverything() {
  if (!inputRef.value) return;
  inputRef.value.select();
}

function join(code: string) {
  console.log('join');
}
</script>

<style lang="scss" scoped>
.filled {
  border-color: var(--primary-shade-translucent);
  background-color: transparent;
}

.box:focus-within {
  .current {
    border-color: var(--primary);
    background-color: transparent;
  }
}

.timer {
  color: transparent;
  background: linear-gradient(to bottom, var(--secondary), var(--secondary-shade));
  background-clip: text;
  width: fit-content;
}

.worse {
  color: transparent;
  background: linear-gradient(to bottom, var(--primary-light), var(--primary-shade));
  background-clip: text;
  width: fit-content;
}

@media (hover: hover) and (pointer: fine) {
  .logo:hover {
    filter: saturate(50%);
  }

  .back:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
