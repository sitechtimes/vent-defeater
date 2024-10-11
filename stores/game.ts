export const useGameStore = defineStore("gameStore", () => {
  const smallScreen = ref(false);

  const energy = ref(100);
  const currentElement = ref<GameElement>();
  const elementGrid = ref<number[][]>([]);
  const levels = ref<Level[]>([]);
  const isDead = ref(false);

  const relicOfDeath = ref(false);
  const showBrainrot = ref(false);
  const noCombust = ref(false);
  const heartAttack = ref(false);

  return { smallScreen, energy, currentElement, elementGrid, levels, isDead, relicOfDeath, showBrainrot, noCombust, heartAttack };
});
