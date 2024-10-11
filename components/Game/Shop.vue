<template>
  <div class="w-full h-full gap-8 py-10 flex flex-col items-center justify-center">
    <div class="relative w-[85%] h-[80%] flex items-center justify-start flex-col z-10 p-4 rounded-2xl bg-[rgba(0,0,0,0.6)]">
      <Amogus color="#ff0000" class="absolute bottom-[-8.75rem] left-[-1.5rem] z-[1] scale-y-[-1]" />
      <h1 class="text-white text-5xl text-center title">The Sussiest Shop in the {{ direction }}</h1>
      <p v-if="!choice" class="text-white text-xl mt-1">Pick one:</p>
      <div class="buttonHolder relative flex items-center justify-center w-full h-full mt-6">
        <button
          v-if="!choice || choice == 'element'"
          @click="choice = 'element'"
          :class="{ 'brightness-[.4]': !choice }"
          class="select bg-red-400 flex items-center justify-center flex-col gap-2 rounded-2xl"
        >
          <p class="text-3xl text-center font-semibold w-[70%]">Bargain with the shopkeeper</p>
          <p class="text-lg text-center font-medium w-[70%]">Use those social skills you totally have</p>
        </button>

        <button
          v-if="!choice || choice == 'relic'"
          @click="choice = 'relic'"
          :class="{ 'brightness-[.4]': !choice }"
          class="select bg-green-400 flex items-center justify-center flex-col gap-2 rounded-2xl"
        >
          <p class="text-3xl text-center font-semibold w-[70%]">Talk with the blacksmith</p>
          <p class="text-lg text-center font-medium w-[70%]">Because talking with people is so fun</p>
        </button>

        <button
          v-if="!choice || choice == 'regen'"
          @click="choice = 'regen'"
          :class="{ 'brightness-[.4]': !choice }"
          class="select bg-blue-400 flex items-center justify-center flex-col gap-2 rounded-2xl"
        >
          <p class="text-3xl text-center font-semibold w-[70%]">Find the nearest cardboard box</p>
          <p class="text-lg text-center font-medium w-[70%]">Ain't nobody got money for rent in this economy</p>
        </button>

        <div class="w-2/3 h-full flex items-center justify-center flex-col gap-4" v-if="choice">
          <p v-if="choice != 'regen'" class="text-white text-2xl font-semibold">Choose an option:</p>
          <GameReward only-elements v-if="choice == 'element'" @select="(reward) => (selectedReward = reward)" />
          <GameReward only-relics v-if="choice == 'relic'" @select="(reward) => (selectedReward = reward)" />
          <p v-if="choice == 'regen'" class="text-5xl font-bold text-white">You healed {{ regenAmount }} HP.</p>
        </div>
      </div>
    </div>

    <button
      v-if="!choice || choice == 'regen'"
      @click="
        selectedReward = { type: 'Bypass' };
        next();
      "
      class="bg-white py-3 px-10 rounded-full text-2xl font-medium"
    >
      {{ choice ? "Continue" : "Skip" }}
    </button>
    <button
      v-else
      @click="next"
      :disabled="!selectedReward"
      :class="{ 'cursor-not-allowed': !selectedReward, 'brightness-50': !selectedReward }"
      class="bg-white py-3 px-10 rounded-full text-2xl font-medium"
    >
      Continue
    </button>
  </div>
</template>

<script setup lang="ts">
type Emits = {
  next: [void];
  regen: [health: number, energy: number];
  select: [reward: GameElement | Relic | Powerup | { type: "Bypass" }];
};

const store = useGameStore();
const emit = defineEmits<Emits>();
const direction = ref(getRandomItemFromArray(["North", "East", "South", "West"]));

const selectedReward = ref<GameElement | Relic | Powerup | { type: "Bypass" }>();
const regenAmount = ref(getRandomInt(20, 50));
const choice = ref<"element" | "relic" | "regen">();
watch(
  () => choice.value,
  (val) => {
    if (val == "regen") emit("regen", regenAmount.value, 0);
  }
);

onBeforeMount(() => {
  choice.value = undefined;
});

function next() {
  if (!selectedReward.value) return;
  if (selectedReward.value.type == "Relic" && selectedReward.value.id == 16) store.relicOfDeath = true;
  if (selectedReward.value.type == "Relic" && selectedReward.value.id == 17) store.showBrainrot = true;
  if (selectedReward.value.type == "Relic" && selectedReward.value.id == 18) store.noCombust = true;
  if (selectedReward.value.type == "Relic" && selectedReward.value.id == 19) store.heartAttack = true;
  emit("select", selectedReward.value);
  emit("next");
}
</script>

<style lang="scss" scoped>
.select {
  width: 33.3333333%;
  height: 100%;
}

.buttonHolder {
  gap: 2.5rem;
}

@media (max-width: 1700px) {
  .title {
    display: none;
  }

  .buttonHolder {
    flex-direction: column;
    gap: 0.5rem;
  }

  .select {
    width: 100%;
    height: 33.3333333%;
  }
}

@media (hover: hover) and (pointer: fine) {
  .select:hover {
    filter: brightness(1);
  }
}
</style>
