<template>
  <div class="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen flex items-center justify-center z-50" @click="emit('close')">
    <div class="relative bg-[var(--bg-color)] flex items-center justify-center p-12 rounded-xl flex-col" @click="$event.stopPropagation()">
      <button @click="emit('close')" class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--faded-bg-color-dark)]">
        <img class="w-5 h-5 dark:invert" src="/ui/x.svg" alt="Return to login" />
      </button>
      <h2 class="font-medium text-3xl mb-5">Reset password</h2>
      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="resetPassword" @submit.prevent>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="email">Your email address <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-[var(--faded-bg-color)] px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[var(--primary)] focus:bg-[var(--bg-color)]"
            id="email"
            type="email"
            required
            v-model="email"
          />
          <p class="absolute error font-medium text-red-500" v-show="emailErr.length > 0">{{ emailErr }}</p>
        </div>
        <button class="hover:bg-[var(--text-color)] w-96 h-12 rounded-full border-0 bg-[var(--bg-color-contrast)] mt-4 transition duration-500" type="submit">
          <p class="text-[var(--text-color-contrast)]" v-if="!showLoadingAnimation">Reset password</p>
          <p class="text-[var(--text-color-contrast)] flex items-center justify-center gap-2" v-else><GameVent class="w-10 h-10" /> Loading...</p>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: [void];
}>();

const showLoadingAnimation = ref(false);

const email = ref("");
const emailErr = ref("");

async function resetPassword() {
  // yes
}
</script>

<style lang="scss" scoped>
.login {
  input:focus {
    box-shadow: 0 0 0 0.375rem var(--primary-shade-translucent);
  }
}

.error {
  bottom: -1.5rem;
}

@media (hover: hover) and (pointer: fine) {
  .login {
    input:hover {
      outline: 0.125rem solid var(--primary);
    }
    .submit:hover {
      background-color: var(--text-color);
    }
  }
}
</style>
