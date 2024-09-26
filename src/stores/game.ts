import { defineStore } from "pinia";
import { ice, type Element } from "@/utils/elements";
import { ref } from "vue";

export const useGameStore = defineStore('gameStore', () => {
    const currentElement = ref<Element>();

    return { currentElement }
});