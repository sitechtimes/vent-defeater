import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userStore = defineStore('userStore', () => {
  const theme = ref<'light' | 'dark'>('light');

export const userStore = defineStore('user', {
  state: () => ({
    theme: 'light'
  })
})();
