<template>
  <NavBar />
  <div class="w-full flex items-center justify-center flex-col gap-4 overflow-hidden">
    <Transition :name="['up', 'down', 'left', 'right'][getRandomInt(0, 3)]" v-if="showImg" appear>
      <RouterLink to="/"><img class="logo w-96 h-96" src="/logo/logoWithQuestionMarks.svg" aria-hidden="true" /></RouterLink>
    </Transition>
    <h1 class="font-bold text-5xl text-center">You've found our {{ errorCode }} Vent</h1>
    <p class="font-medium text-2xl text-center">{{ errorMessage }}</p>
    <div class="flex items-center justify-center gap-4 mt-7 font-semibold text-lg">
      <RouterLink class="transition report py-2 px-6 bg-transparent rounded-full border-black border-2" :to="back">
        <p class="text-[color:var(--text-color)]">Go back</p>
      </RouterLink>
      <RouterLink class="py-2 px-6 no-underline bg-[color:var(--text-color)] rounded-full border-black border-2" to="/">
        <p class="text-[color:var(--bg-color)]">Home</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Vent not found - Vent Defeater",
  ogTitle: "Vent not found",
  description: "We couldn't find the vent you were looking for. We'll keep looking!",
  ogDescription: "We couldn't find the vent you were looking for. We'll keep looking!"
});

const back = ref<string>("/");
const showImg = ref(false);

const route = useRoute();
const router = useRouter();
const errorCode = ref(404);
const errorMessage = ref("Unfortunately, we couldn't find the vent you're looking for. Our crewmates will keep venting to find it!");

onMounted(() => {
  back.value = String(router.options.history.state.back ?? "/");
  showImg.value = true;

  if (route.query.code && typeof route.query.code == "string") {
    errorCode.value = Number(route.query.code);
  }

  if (route.query.msg && typeof route.query.msg == "string") {
    errorMessage.value = String(route.query.msg);
  }
});
</script>

<style lang="scss" scoped>
.logo {
  background: radial-gradient(var(--faded-blue), transparent 66%);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translateY(-50vh);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translateY(50vh);
}

.left-enter-from,
.left-leave-to {
  opacity: 0;
  transform: translateX(50vw);
}

.right-enter-from,
.right-leave-to {
  opacity: 0;
  transform: translateX(-50vw);
}

.left-enter-active,
.up-enter-active,
.down-enter-active,
.right-enter-active,
.left-leave-active,
.up-leave-active,
.down-leave-active,
.right-leave-active {
  transition: all 0.85s ease;
}

.up-enter-to,
.down-enter-to,
.right-enter-to,
.left-enter-to {
  transform: none;
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .report:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
