<template>
  <div class="w-full h-full gap-8 py-10 flex flex-col items-center justify-center">
    <p class="text-white text-2xl font-semibold">Choose an option:</p>
    <div class="w-[80%] flex items-center justify-start flex-col z-10 p-4 py-10 rounded-2xl bg-[rgba(0,0,0,0.33)]">
      <Reward only-relics @select="(reward) => (selectedReward = reward)" />
    </div>

    <button @click="next" class="bg-white py-3 px-10 rounded-full text-2xl font-medium">
      {{ selectedReward.type == 'Bypass' ? 'Skip' : 'Continue' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Reward from './Reward.vue';
import type { Element, Powerup, Relic } from '@/utils/elements';
import { useGameStore } from '@/stores/game';

type Emits = {
  next: [void];
  regen: [health: number, energy: number];
  select: [reward: Element | Relic | Powerup | { type: 'Bypass' }];
};

const store = useGameStore();
const emit = defineEmits<Emits>();

const selectedReward = ref<Element | Relic | Powerup | { type: 'Bypass' }>({ type: 'Bypass' });

function next() {
  if (!selectedReward.value) return;
  if (selectedReward.value.type == 'Relic' && selectedReward.value.id == 16) store.relicOfDeath = true;
  if (selectedReward.value.type == 'Relic' && selectedReward.value.id == 17) store.showBrainrot = true;
  if (selectedReward.value.type == 'Relic' && selectedReward.value.id == 18) store.noCombust = true;
  if (selectedReward.value.type == 'Relic' && selectedReward.value.id == 19) store.heartAttack = true;
  emit('select', selectedReward.value);
  emit('next');
}
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .select:hover {
    filter: brightness(1);
  }
}
</style>
