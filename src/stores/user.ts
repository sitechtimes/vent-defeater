import type { Presentation } from '@/utils/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const user = ref(false);
  const isAuth = ref(false);
  const authToken = ref('');
  const refreshToken = ref('');

  const theme = ref<'light' | 'dark'>('light');
  const presentations = ref<Presentation[]>([]);
  const currentPres = ref<Presentation>();

  async function logIn(email: string, password: string) {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return await res.json();
    const data = await res.json();

    isAuth.value = true;
    user.value = data.user;
    authToken.value = data.token;
    refreshToken.value = data.refresh;
  }

  async function signUp(email: string, password: string, name: string) {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) return await res.json();
    return 'Success';
  }

  async function verify() {
    const match = document.cookie.match(/csrftoken=(\w+)/);
    if (!match) return false;
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/token/verify/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: match[1] })
      });
      console.log(await res.json());
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  return { user, isAuth, verify, theme, presentations, currentPres, logIn, signUp };
});
