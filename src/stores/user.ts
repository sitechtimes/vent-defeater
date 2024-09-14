import type { Presentation } from '@/utils/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const theme = ref<'light' | 'dark'>('light');
  const presentations = ref<Presentation[]>([]);

  return { theme, presentations };
});
