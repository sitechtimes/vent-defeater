<template>
<!--   <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-[color:var(--faded-bg-color)]">
    <a href="/"><img class="h-32 transition duration-500" src="/logo/logoWithWords.svg" aria-hidden="true" /></a>
    <h1 class="text-5xl font-bold mb-8">Welcome{{ showLogin ? ' back' : '' }}!</h1>

    <div class="flex items-center justify-center flex-col bg-[color:var(--bg-color)] p-4 rounded-3xl mb-4">
      <h3 class="mb-4" v-show="showLogin">Log in to your Vent Defeater account</h3>
      <h3 class="mb-4" v-show="!showLogin">Create a free account</h3>

      <div class="loginButtons flex items-center justify-center flex-col gap-2 w-96">
        <button
          class="flex items-center justify-center gap-2 w-full bg-transparent rounded-full transition duration-500 border-solid border-2 border-[color:var(--text-color)]"
          v-for="button in loginButtons"
          :key="button.name"
          @click="button.function"
        >
          <img class="w-4" :src="button.img" aria-hidden="true" />
          <p class="my-2 font-bold">{{ showLogin ? 'Log in' : 'Sign up' }} with {{ button.name }}</p>
        </button>
      </div>

      <span class="m-4">or using email</span>

      <form class="login flex items-center justify-center flex-col gap-6 w-full" @submit="loginWithEmail">
        <div class="flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="email">Your email address</label>
          <input class="w-96 h-12 rounded-lg border-0 bg-[color:var(--faded-bg-color)] px-4 transition duration-500" id="email" type="email" required v-model="email" />
        </div>

        <div class="flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="password">{{ showLogin ? 'Your' : 'Choose a' }} password</label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-[color:var(--faded-bg-color)] px-4 transition duration-500"
            id="password"
            type="password"
            required
            v-model="password"
            autocomplete="current-password"
          />
        </div>

        <button class="w-96 h-12 rounded-full border-0 bg-[color:var(--bg-color-contrast)] text-[color:var(--text-color-contrast)] mt-4 transition duration-500" type="submit">
          {{ showLogin ? 'Log in' : 'Sign up' }}
        </button>
        <RouterLink to="/reset-password" class="no-underline font-medium" v-if="showLogin">Forgot password?</RouterLink>
      </form>
    </div>
    <span class="mb-4" v-show="!showLogin">By signing up, you accept our <a href="/">terms of use</a> and <a href="/">privacy policy</a>.</span>

    <h3 v-show="showLogin">New to Vent Defeater?</h3>
    <h3 v-show="!showLogin">Already have an account?</h3>
    <button class="bg-transparent border-0" @click="showLogin ? router.push('?signup=1') : router.push('')">
      <a href="#" class="no-underline"
        ><h3 class="m-0 font-medium">{{ showLogin ? 'Sign up now' : 'Log in' }}</h3></a
      >
    </button>
  </div> -->
  <enterBar />

  
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import enterBar from '../components/enterBar.vue'

const route = useRoute();
const router = useRouter();

const showLogin = ref(true);

const email = ref('');
const password = ref('');

watch(
  () => route.query.signup,
  (value) => {
    if (value) showLogin.value = false;
    else showLogin.value = true;
  }
);

onMounted(() => {
  if (route.query.signup) showLogin.value = false;
  else showLogin.value = true;
});

const loginButtons = [
  {
    name: 'Google',
    img: '/logo/google.svg',
    function: loginWithGoogle
  },
  {
    name: 'Microsoft',
    img: '/logo/microsoft.svg',
    function: loginWithMicrosoft
  },
  {
    name: 'Facebook',
    img: '/logo/facebook.svg',
    function: loginWithFacebook
  }
];

async function loginWithEmail() {
  console.log('email');
}

async function loginWithGoogle() {
  console.log('google');
}

async function loginWithMicrosoft() {
  console.log('microsoft');
}

async function loginWithFacebook() {
  console.log('facebook');
}
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .logo:hover {
    filter: contrast(200%);
  }

  .loginButtons {
    button:hover {
      background-color: var(--faded-bg-color);
    }
  }

  .login {
    input:hover {
      outline: 0.15em solid var(--primary);
    }
    button:hover {
      background-color: var(--text-color);
    }
  }
}
</style>
