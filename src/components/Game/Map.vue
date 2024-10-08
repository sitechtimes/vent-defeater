<template>
  <div class="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
    <div class="relative">
      <img class="w-[80vw]" src="/game/map/map.png" aria-hidden="true" />
      <button
        class="mapLevel absolute w-10 h-10 flex items-center justify-center rounded-md"
        @click="selectLevel(level)"
        :class="{ grayscale: level.completed, 'brightness-50': level.completed, 'pointer-events-none': level.completed }"
        :style="{ left: store.smallScreen ? level.leftPercent + '%' : level.x * 0.8 + 'px', top: store.smallScreen ? level.topPercent + '%' : level.y * 0.8 + 'px', backgroundColor: level.color }"
        v-for="level in levels"
      >
        <img class="w-8 h-8" :src="level.mapImg" aria-hidden="true" />
        <div v-if="!store.levels.filter((lvl) => lvl.completed).map((lvl) => lvl.id).includes(level.id)" class="description shadow-black shadow-sm pointer-events-none hidden absolute top-0 left-12 bg-white rounded-lg z-10 p-2 flex-col gap-2 items-center justify-center whitespace-nowrap">
          <h4 class="text-xl font-semibold">{{ level.mystery ? "Unknown" : (level.type[0].toUpperCase() + level.type.slice(1)).replace("Harder", "Elite ") }}</h4>
        </div>
      </button>
    </div>
    <Transition name="up" appear>
      <h1 class="text-5xl font-bold text-white absolute top-4 left-4">Select a level!</h1>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import type { Level } from "@/utils/elements";
import { onBeforeMount, ref } from "vue";

type Props = {
  currentLevel: Level | undefined;
};

type Emits = {
  select: [level: Level];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const store = useGameStore();

const levels = ref<Level[]>([]);

onBeforeMount(() => {
  if (!props.currentLevel || !props.currentLevel.nextLevels) return;
  for (let id of props.currentLevel.nextLevels) {
    levels.value.push(store.levels.find((level) => level.id == id) as Level);
  }
  for (let level of store.levels.filter((level) => level.completed)) {
    levels.value.push(level);
  }
});

function selectLevel(level: Level) {
  emit("select", level);
}
</script>

<style lang="scss" scoped>
.up-enter-active,
.up-leave-active {
  transition: all 0.75s ease;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translateY(-10vh);
}

.map {
  background-image: url("/game/map/map.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

@media (hover: none) and (pointer: coarse) {
  .mapLevel {
    .description {
      display: flex;
    }
  }
}

@media (hover: hover) and (pointer: fine) {
  .mapLevel:hover {
    .description {
      display: flex;
    }
  }
}
</style>
