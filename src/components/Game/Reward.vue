<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="flex items-stretch justify-center gap-10">
      <button
        @click="select(reward)"
        class="reward relative w-80 h-[28rem] py-4 rounded-2xl flex items-center justify-center flex-col gap-2 border-8 border-transparent"
        :class="{ 'brightness-[.4]': reward.name != selectedReward?.name }"
        :style="{ backgroundColor: 'var(--' + reward.name + '-secondary)', borderColor: reward.name == selectedReward?.name ? 'var(--' + reward.name + ')' : '' }"
        v-for="reward in rewards"
      >
        <img class="w-16 h-16 absolute top-2 left-2" :src="reward.img" aria-hidden="true" />
        <img class="w-16 h-16 absolute bottom-2 right-2" :src="reward.img" aria-hidden="true" />
  
        <h3 class="text-sm">{{ reward.name[0].toUpperCase() + reward.name.slice(1) }}</h3>
        <p class="text-2xl">{{ reward.currentLevel == 0 ? 'Unlock' : 'Upgrade to' }} Level {{ reward.currentLevel + 1 }}</p>
        <h3 class="text-xl font-bold">{{ reward.levels[reward.currentLevel].name }}</h3>
        <p class="text-wrap w-3/4 text-center transition-none">
          <span :class="{ 'font-bold': part.bold }" v-for="part in formatDescription(reward.levels[reward.currentLevel].description)">{{ part.text }}</span>
        </p>
      </button>
    </div>

    <div class="flex items-center justify-center gap-4" v-if="level.id == 0">
      <h2 class="text-3xl font-semibold italic">Bonus!</h2>
      <div class="h-12 px-6 rounded-full bg-orange-300 flex items-center justify-center" v-if="level.id == 0">
        <p class="text-lg font-medium">+1 grid size</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { air, earth, fire, formatDescription, ice, type Element, type Level } from '@/utils/elements';
import { getRandomItemFromArray } from '@/utils/functions';
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';

type Props = {
  level: Level;
}

type Emits = {
  select: [reward: Element];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const rewards = ref<Element[]>([]);
const selectedReward = ref<Element>();

onBeforeMount(() => {
  while (rewards.value.length < 3) {
    if (getNewReward()) break;
  }
});

onBeforeUnmount(() => (rewards.value.length = 0));

function select(reward: Element) {
  selectedReward.value = reward;
  emit('select', reward);
}

function getNewReward() {
  let reward: Element | undefined;
  let tries = 0;
  while (!reward && tries < 20) {
    tries++;
    const newReward = getRandomItemFromArray([air, earth, fire, ice]) as Element;
    if (newReward.currentLevel == 4) continue;
    if (rewards.value.map((element) => element.name).includes(newReward.name)) continue;
    reward = newReward;
  }
  if (reward) {
    rewards.value.push(reward);
    return false;
  }
  return true;
}
</script>

<style lang="scss" scoped>
@media (hover: hover) and (pointer: fine) {
  .reward:hover {
    filter: brightness(1);
  }
}
</style>
