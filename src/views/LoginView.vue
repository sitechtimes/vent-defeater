<template>
  <div class="page">
    <a href="/"><img class="logo" src="/logo/logoWithWords.svg" aria-hidden="true" /></a>
    <h1>Welcome{{ showLogin ? ' back' : '' }}!</h1>

    <div class="card">
      <h3 v-if="showLogin">Log in to your Vent Defeater account</h3>
      <h3 v-else>Create a free account</h3>

      <div class="loginButtons">
        <button v-for="button in loginButtons" :key="button.name" @click="button.function">
          <img :src="button.img" aria-hidden="true" />
          <p>{{ showLogin ? 'Log in' : 'Sign up' }} with {{ button.name }}</p>
        </button>
      </div>

      <span class="or">or using email</span>

      <form class="login" @submit="loginWithEmail">
        <div>
          <label for="email">Your email address</label>
          <input id="email" type="email" required v-model="email" />
        </div>

        <div>
          <label for="password">{{ showLogin ? 'Your' : 'Choose a' }} password</label>
          <input id="password" type="password" required v-model="password" autocomplete="current-password" />
        </div>

        <button type="submit">{{ showLogin ? 'Log in' : 'Sign up' }}</button>
        <RouterLink to="/reset-password" class="reset" v-if="showLogin">Forgot password?</RouterLink>
      </form>
    </div>
    <span v-if="!showLogin">By signing up, you accept our <a href="/">terms of use</a> and <a href="/">privacy policy</a>.</span>

    <h3 v-if="showLogin">New to Vent Defeater?</h3>
    <h3 v-else>Already have an account?</h3>
    <button class="signup" @click="showLogin ? router.push('?signup=1') : router.push('')">
      <a href="#"
        ><h3>{{ showLogin ? 'Sign up now' : 'Log in' }}</h3></a
      >
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: var(--faded-bg-color);
}

.logo {
  height: 8.5em;
  transition: all 0.25s;
}

h1 {
  font-size: 3em;
  font-weight: bold;
  margin: 0 0 0.5em 0;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--bg-color);
  padding: 1em;
  border-radius: 0.5em;
}

.loginButtons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5em;
  width: 25em;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: 100%;
    background-color: transparent;
    border-radius: 10em;
    transition: all 0.25s;
    border: 0.1em solid var(--text-color);

    p {
      margin: 0.75em;
      font-weight: bold;
    }

    img {
      width: 2em;
    }
  }
}

.or {
  margin: 1em;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5em;
  width: 100%;

  div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 0.25em;
  }

  label {
    font-weight: 500;
  }

  input {
    width: 30em;
    height: 3em;
    border-radius: 0.5em;
    border: 0;
    background-color: var(--faded-bg-color);
    padding: 0 1em;
    transition: box-shadow 0.25s;
  }

  input:focus {
    outline: 0.15em solid var(--primary);
    box-shadow: var(--primary-shade-translucent) 0 0 0 0.5em;
    background-color: var(--bg-color);
  }

  button {
    width: 30em;
    height: 3em;
    border-radius: 10em;
    border: 0;
    background-color: var(--bg-color-contrast);
    color: var(--text-color-contrast);
    margin-top: 1em;
    transition: all 0.25s;
  }

  .reset {
    text-decoration: none;
    font-weight: 500;
  }
}

.signup {
  background-color: transparent;
  border: 0;

  a {
    text-decoration: none;

    h3 {
      margin: 0;
      font-weight: 500;
    }
  }
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
      outline: 0.15em solid var(--primary);
    }
    button:hover {
      background-color: var(--text-color);
    }
  }
}
</style>
