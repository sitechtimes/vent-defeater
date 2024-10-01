import { defineStore } from 'pinia';
import { ice, type Element } from '@/utils/elements';
import { ref } from 'vue';

export const useGameStore = defineStore('gameStore', () => {
  const energy = ref(100);
  const currentElement = ref<Element>();
  const elementGrid = ref<number[][]>([]);

  return { energy, currentElement, elementGrid };
});
