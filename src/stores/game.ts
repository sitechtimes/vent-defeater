import { defineStore } from 'pinia';
import { ice, type Element, type Level } from '@/utils/elements';
import { ref } from 'vue';

export const useGameStore = defineStore('gameStore', () => {
  const energy = ref(100);
  const currentElement = ref<Element>();
  const elementGrid = ref<number[][]>([]);
  const levels = ref<Level[]> ([]);

  return { energy, currentElement, elementGrid, levels };
});
