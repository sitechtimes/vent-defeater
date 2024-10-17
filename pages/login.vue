<template>
  <div class="flex items-center justify-center flex-col w-screen min-h-screen bg-[color:var(--faded-bg-color)] py-12">
    <Transition name="opacity">
      <ResetPassword v-if="resetPassword" @close="resetPassword = false" />
    </Transition>

    <a href="/"><img class="logo h-32 transition duration-500" src="/logo/logoWithWords.svg" aria-hidden="true" /></a>
    <h1 class="text-5xl font-bold mb-8">Welcome{{ showLogin ? " back" : "" }}!</h1>

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
          <p class="my-2 font-bold">{{ showLogin ? "Log in" : "Sign up" }} with {{ button.name }}</p>
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
          <label class="font-medium" for="password">{{ showLogin ? "Your" : "Choose a" }} password <span title="Required" class="text-red-500 font-2xl">*</span></label>
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

        <button class="submit w-96 h-12 rounded-full border-0 bg-[color:var(--bg-color-contrast)] mt-4 transition duration-500" type="submit">
          <p class="text-[color:var(--text-color-contrast)]" v-if="!showLoginAnimation">{{ showLogin ? "Log in" : "Sign up" }}</p>
          <p class="text-[color:var(--text-color-contrast)] flex items-center justify-center gap-2" v-else><GameVent class="w-10 h-10" /> Loading...</p>
        </button>
        <button type="button" @click="resetPassword = true" class="no-underline font-medium" v-if="showLogin">Forgot password?</button>
      </form>
    </div>
    <span class="mb-4" v-show="!showLogin">By signing up, you accept our <a href="/">terms of use</a> and <a href="/">privacy policy</a>.</span>

    <h3 v-show="showLogin">New to Vent Defeater?</h3>
    <h3 v-show="!showLogin">Already have an account?</h3>
    <button class="bg-transparent border-0" @click="showLogin ? router.push('?signup=1') : router.push('')">
      <h3 class="m-0 font-medium cursor-pointer">{{ showLogin ? "Sign up now" : "Log in" }}</h3>
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

useSeoMeta({
  title: () => (route.query["reset-password"] ? "Reset your password" : route.query.signup ? "Create an account" : "Vent into your account") + " - Vent Defeater",
  ogTitle: () => (route.query["reset-password"] ? "Reset password" : route.query.signup ? "Create an account" : "Login"),
  description: () => (route.query.signup ? "Create a free Vent Defeater account in just a few clicks." : "Login to your Vent Defeater account and start venting into presentations right away."),
  ogDescription: () => (route.query.signup ? "Create a free Vent Defeater account in just a few clicks." : "Login to your Vent Defeater account and start venting into presentations right away.")
});

const userStore = useUserStore();

const showLoginAnimation = ref(false);
const showLogin = ref(true);
const resetPassword = ref(false);
watch(resetPassword, (value) => {
  if (value) router.push("?reset-password=1");
  else router.push("");
});

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");

const emailErr = ref("");
const nameErr = ref("");
const passwordErr = ref("");
const confirmPasswordErr = ref("");

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
    if (value.length != 0 && !emailRegex.test(value)) emailErr.value = "Invalid email.";
    else emailErr.value = "";
  }
);

watch(
  () => password.value,
  (value) => {
    if (value != confirmPassword.value) confirmPasswordErr.value = "Passwords do not match.";

    if (value.length < 8) passwordErr.value = "Password must be at least 8 characters.";
    else if (value.length > 50) passwordErr.value = "Password must be less than 50 characters.";
    else passwordErr.value = "";
  }
);

watch(
  () => name.value,
  (value) => {
    if (value.length < 2) nameErr.value = "Name must be at least 2 characters.";
    else if (value.length > 40) nameErr.value = "name must be less than 40 characters.";
    else nameErr.value = "";
  }
);

watch(
  () => confirmPassword.value,
  (value) => {
    if (value != password.value) confirmPasswordErr.value = "Passwords do not match.";
    else confirmPasswordErr.value = "";
  }
);

onMounted(() => {
  if (route.query["reset-password"]) resetPassword.value = true;

  if (route.query.signup) showLogin.value = false;
  else showLogin.value = true;
});

const loginButtons = [
  {
    name: "Google",
    img: "/logo/google.svg",
    function: loginWithGoogle
  },
  {
    name: "Microsoft",
    img: "/logo/microsoft.svg",
    function: loginWithMicrosoft
  },
  {
    name: "Facebook",
    img: "/logo/facebook.svg",
    function: loginWithFacebook
  }
];

async function loginWithEmail() {
  userStore.isAuth = true;
  router.push("/app/dashboard");
  return;
  /*if (emailErr.value || passwordErr.value || nameErr.value) return;

  if (!showLogin.value) return signupWithEmail();

  try {
    showLoginAnimation.value = true;
    await userStore.logIn(email.value, password.value);
  } catch (error) {
    if (error instanceof Error) {
      passwordErr.value = error.message;
      if (!error.message) passwordErr.value = "Something went wrong. Please try again.";
    }
    return;
  } finally {
    showLoginAnimation.value = false;
  }

  if (userStore.isAuth) router.push("/app/dashboard");
  else passwordErr.value = "Something went wrong. Please try again.";*/
}

async function signupWithEmail() {
  if (password.value != confirmPassword.value) {
    passwordErr.value = "Passwords do not match.";
    return;
  }

  try {
    showLoginAnimation.value = true;
    await userStore.signUp(email.value, password.value, name.value);
  } catch (error) {
    if (error instanceof Error) passwordErr.value = error.message;
    return;
  } finally {
    showLoginAnimation.value = false;
  }

  if (userStore.isAuth) router.push("/app/dashboard");
  else passwordErr.value = "Something went wrong. Please try again.";
}

async function loginWithGoogle() {
  window.location.href = "https://www.youtube.com/watch?v=uHgt8giw1LY";
}

async function loginWithMicrosoft() {
  loginWithGoogle();
}

async function loginWithFacebook() {
  loginWithGoogle();
}
</script>

<style lang="scss" scoped>
.login {
  input:focus {
    box-shadow: 0 0 0 0.375rem var(--primary-shade-translucent);
  }
}
.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.75s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

.error {
  bottom: -1.5rem;
}

@media (hover: hover) and (pointer: fine) {
  .logo:hover {
    filter: saturate(50%);
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
    .submit:hover {
      background-color: var(--text-color);
    }
  }
}
</style>
