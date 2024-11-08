<template>
  <div class="w-screen h-screen flex items-center justify-between bg-lime-900">
    <div class="h-full w-1/3 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.25)]">
      <h2>{{ formatNumber(Number(currentYodas)) }} yodas</h2>
      <p>per second: {{ formatNumber(Number(currentIncome)) }}</p>
      <button @click="click" class="yoda w-2/3 p-2 flex items-center justify-center rounded-full">
        <img class="w-full select-none" src="/yodaclicker/yoda.png" alt="Click to produce a yoda" />
      </button>
    </div>

    <div class="h-full w-1/4 flex flex-col items-center justify-center">
      <button v-for="(clicker, index) in clickers" :key="clicker.name" @click="upgradeClicker(index)">{{ clicker.name }} - {{ clicker.price }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentYodas = ref(BigInt(0));
watch(currentYodas, (yodas) => {
  if (yodas >= BigInt(1.7e308)) currentYodas.value = BigInt(-1.7e308);
});
const currentIncome = ref(0n);

const config = useRuntimeConfig();
useSeoMeta({
  title: () => Number(currentYodas.value) + " Yodas - Yoda Clicker 2 on Steal",
  ogTitle: "Play Yoda Clicker 2",
  ogImage: () => config.public.url + "/yodaclicker/yoda.png",
  description:
    "Following the escapades of the brilliant Yoda Clicker 1, Yoda Clicker 2 brings forth new yodas, new clickers, and ew OOPs. It's up to you to contaminate the yodas with as much radioactivity as possible!",
  ogDescription:
    "Following the escapades of the brilliant Yoda Clicker 1, Yoda Clicker 2 brings forth new yodas, new clickers, and ew OOPs. It's up to you to contaminate the yodas with as much radioactivity as possible!",
  ogSiteName: "Steal",
  ogUrl: () => config.public.url + "/game"
});

const route = useRoute();
const router = useRouter();
const store = useGameStore();
const userStore = useUserStore();

onBeforeMount(() => {
  document.body.classList.remove("dark");
  userStore.theme = "light";
});

onMounted(() => {
  store.smallScreen = window.innerWidth < 1920;
  window.addEventListener("resize", () => {
    store.smallScreen = window.innerWidth < 1920;
  });
  clickerClicks();
});

function click() {
  currentYodas.value += 1n;
}

async function clickerClicks() {
  let startTime = new Date().getTime();

  while (currentIncome.value < 10) {
    const newTime = new Date().getTime();
    if (newTime - startTime > 1000 / Number(currentIncome.value)) {
      currentYodas.value += 1n;
      startTime = new Date().getTime();
    }
    await delay(50);
  }

  while (currentIncome.value >= 10 && currentIncome.value < 100) {
    const newTime = new Date().getTime();
    if (newTime - startTime > 100) {
      currentYodas.value += currentIncome.value / 10n;
      startTime = new Date().getTime();
    }
    await delay(10);
  }

  while (currentIncome.value >= 100) {
    const newTime = new Date().getTime();
    if (newTime - startTime > 10) {
      currentYodas.value += currentIncome.value / 100n;
      startTime = new Date().getTime();
    }
    await delay(2);
  }
}

type Clicker = {
  name: string;
  price: number;
  currentLevel: number;
  unlocked: boolean;
  img: string;
  clicksPerLevel: number;
  description: string;
  upgradePrice: (price: number) => number;
};

const clickers = ref<Clicker[]>([
  {
    name: "Banana",
    price: 10,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 1,
    description: "Did you know: bananas contain potassium, which is very slightly radioactive?",
    upgradePrice: (price) => price ** 1.01 + 5
  },
  {
    name: "Cosmic Background Radiation",
    price: 110,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 9,
    description: "",
    upgradePrice: (price) => price ** 1.01025 + 25
  },
  {
    name: "Natural Gas",
    price: 1200,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 75,
    description: "",
    upgradePrice: (price) => price ** 1.0105 + 70
  },
  {
    name: "Fossil Fuel",
    price: 13500,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 650,
    description: "",
    upgradePrice: (price) => price ** 1.01075 + 600
  },
  {
    name: "Raw Uranium",
    price: 14e4,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 5450,
    description: "",
    upgradePrice: (price) => price ** 1.02 + 5000
  },
  {
    name: "Radium-226",
    price: 15e5,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 46000,
    description: "",
    upgradePrice: (price) => price ** 1.02025 + 4e4
  },
  {
    name: "Medical X-Ray",
    price: 16e6,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 39e4,
    description: "",
    upgradePrice: (price) => price ** 1.0205 + 3e5
  },
  {
    name: "Plutonium-238",
    price: 17e7,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 32e5,
    description: "",
    upgradePrice: (price) => price ** 1.02075 + 2e6
  },
  {
    name: "Nuclear Reactor",
    price: 18e8,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 28e6,
    description: "",
    upgradePrice: (price) => price ** 1.021 + 1e7
  },
  {
    name: "Spent Nuclear Fuel Rod",
    price: 19e9,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 24e7,
    description: "",
    upgradePrice: (price) => price ** 1.02025 + 7e7
  },
  {
    name: "Little Boy",
    price: 20e10,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 21e8,
    description: "Japan better get ready for round 2",
    upgradePrice: (price) => price ** 1.0205 + 1e8
  },
  {
    name: "Intercontinental Ballistic Missile",
    price: 21e11,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 18e9,
    description: "",
    upgradePrice: (price) => price ** 1.02075 + 8e8
  },
  {
    name: "The Sun",
    price: 22e12,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 15e10,
    description: "",
    upgradePrice: (price) => price ** 1.03 + 8e8
  },
  {
    name: "Supernova Explosion",
    price: 23e13,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 12e11,
    description: "",
    upgradePrice: (price) => price ** 1.03025 + 2e9
  },
  {
    name: "Gamma Ray Burst",
    price: 24e14,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 9e12,
    description: "",
    upgradePrice: (price) => price ** 1.0305 + 1e10
  },
  {
    name: "FDA Inspector",
    price: 25e15,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 5e12,
    description: "Your little underground scheme has caught the attention of the FDA. Now you must bribe the inspectors coming your way.",
    upgradePrice: (price) => price ** 1.03075 + 1e11
  },
  {
    name: "God",
    price: 99e19,
    currentLevel: 0,
    unlocked: false,
    img: "",
    clicksPerLevel: 9e14,
    description: "",
    upgradePrice: (price) => price ** 1.04
  }
]);

type Upgrade = {
  name: string;
  price: number;
  description: string;
  unlocked: boolean;
};

const upgrades = ref<Upgrade[]>([
  {
    name: "Efficient UV Rays",
    price: 500,
    unlocked: false,
    description: ""
  },
  {
    name: "",
    price: ""
  }
]);

function upgradeClicker(index: number) {
  const clicker = clickers.value[index];
  if (currentYodas.value < clicker.price) return;

  currentYodas.value -= BigInt(clicker.price);
  clicker.unlocked = true;
  clicker.currentLevel += 1;
  const price = Math.ceil(clicker.upgradePrice(clicker.price));
  clicker.price = clicker.name == "God" ? price : Math.min(price, 1.7e308);

  currentIncome.value = BigInt(clickers.value.map((clicker) => BigInt(clicker.currentLevel * clicker.clicksPerLevel)).reduce((acc, value) => acc + value, 0n));
}

const suffixes: Record<string, string> = {
  1e6: "million",
  1e9: "billion",
  1e12: "trillion"
};
function formatNumber(num: number) {
  for (let value of Object.keys(suffixes)) {
    const numValue = Number(value);
    if (num >= numValue) {
      return `${(num / numValue).toFixed(2)} ${suffixes[value]}`;
    }
  }

  return num.toLocaleString();
}
</script>

<style lang="scss" scoped>
* {
  @apply text-white;
}

@keyframes spin {
  to {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}

.yoda {
  animation: spin 5s infinite linear;
  position: relative;
}
.yoda::before,
.yoda::after {
  animation: spin 1.5s infinite linear;
  background: conic-gradient(greenyellow, transparent 30%);
  @apply absolute w-full h-full rounded-full;
  content: "";
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: -1;
}
.yoda::before {
  @apply blur-2xl opacity-50;
}
</style>
