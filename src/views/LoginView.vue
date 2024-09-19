<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-[color:var(--faded-bg-color)] py-12">
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

      <form class="login flex items-center justify-center flex-col gap-7 w-full" @submit="loginWithEmail" @submit.prevent>
        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="email">Your email address <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-[color:var(--faded-bg-color)] px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="email"
            type="email"
            required
            v-model="email"
          />
          <p class="absolute error font-medium text-red-500" v-show="emailErr.length > 0">{{ emailErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1" v-if="!showLogin">
          <label class="font-medium" for="name">Your name <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-[color:var(--faded-bg-color)] px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="name"
            type="text"
            required
            v-model="name"
            autocomplete="name"
          />
          <p class="absolute error font-medium text-red-500" v-show="nameErr.length > 0">{{ nameErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1">
          <label class="font-medium" for="password">{{ showLogin ? 'Your' : 'Choose a' }} password <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-[color:var(--faded-bg-color)] px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="password"
            type="password"
            required
            v-model="password"
            :autocomplete="showLogin ? 'current-password' : 'new-password'"
          />
          <p class="absolute error font-medium text-red-500" v-show="passwordErr.length > 0">{{ passwordErr }}</p>
        </div>

        <div class="relative flex items-start justify-center flex-col gap-1" v-if="!showLogin">
          <label class="font-medium" for="password">Confirm password <span title="Required" class="text-red-500 font-2xl">*</span></label>
          <input
            class="w-96 h-12 rounded-lg border-0 bg-[color:var(--faded-bg-color)] px-4 transition duration-500 focus:outline focus:outline-2 focus:outline-[color:var(--primary)] focus:bg-[color:var(--bg-color)]"
            id="password"
            type="password"
            required
            v-model="confirmPassword"
            autocomplete="new-password"
          />
          <p class="absolute error font-medium text-red-500" v-show="confirmPasswordErr.length > 0">{{ confirmPasswordErr }}</p>
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
      <h3 class="m-0 font-medium cursor-pointer">{{ showLogin ? 'Sign up now' : 'Log in' }}</h3>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const showLogin = ref(true);

const email = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');

const emailErr = ref('');
const nameErr = ref('');
const passwordErr = ref('');
const confirmPasswordErr = ref('');

watch(
  () => route.query.signup,
  (value) => {
    if (value) showLogin.value = false;
    else showLogin.value = true;
  }
);

watch(
  () => email.value,
  (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (value.length != 0 && !emailRegex.test(value)) emailErr.value = 'Invalid email.';
    else emailErr.value = '';
  }
);

watch(
  () => password.value,
  (value) => {
    if (value != confirmPassword.value) confirmPasswordErr.value = "Passwords do not match.";
    else confirmPasswordErr.value = "";

    if (value.length < 8) passwordErr.value = "Password must be at least 8 characters.";
    else if (value.length > 50) passwordErr.value = "Password must be less than 50 characters.";
    else passwordErr.value = "";
  }
);

watch(
  () => name.value,
  (value) => {
    if (value.length < 2) nameErr.value = 'Name must be at least 2 characters.';
    else if (value.length > 40) nameErr.value = 'name must be less than 40 characters.';
    else nameErr.value = '';
  }
);

watch(
  () => confirmPassword.value,
  (value) => {
    if (value != password.value) confirmPasswordErr.value = 'Passwords do not match.';
    else confirmPasswordErr.value = '';
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
  if (emailErr.value || passwordErr.value || nameErr.value) return;

  if (showLogin.value) {
    await userStore.logIn(email.value, password.value);
    return;
  } else {
    if (password.value != confirmPassword.value) {
      passwordErr.value = 'Passwords do not match.';
      return;
    }
    await userStore.signUp(email.value, password.value, name.value);
  }
  if (userStore.isAuth) router.push('/app/dashboard');
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
.login {
  input:focus {
    box-shadow: 0 0 0 0.375rem var(--primary-shade-translucent);
  }
}

.error {
  bottom: -1.5rem;
}

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
      outline: 0.125rem solid var(--primary);
    }
    button:hover {
      background-color: var(--text-color);
    }
  }
}
</style>
