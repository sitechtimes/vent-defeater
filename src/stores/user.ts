import type { Presentation } from '@/utils/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const isAuthenticated = ref(false);

  const theme = ref<'light' | 'dark'>('light');
  const presentations = ref<Presentation[]>([]);
  const currentPres = ref<Presentation>();

  async function signIn(email, password) {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
    }

  return { isAuthenticated, theme, presentations, currentPres, signIn };
});
