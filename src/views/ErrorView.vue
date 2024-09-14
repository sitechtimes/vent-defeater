<template>
  <NavBar />
  <div class="w-full flex items-center justify-center flex-col gap-4">
    <img class="logo w-96 h-96 gradient" src="/logo/logoWithQuestionMarks.svg" aria-hidden="true" />
    <h1 class="font-bold text-5xl text-center">You’ve found our {{ errorCode }} Vent</h1>
    <p class="font-medium text-2xl text-center">{{ errorMessage }}</p>
    <div class="flex items-center justify-center gap-4 mt-7">
      <button class="transition report py-2 px-6 bg-transparent rounded-full" @click="goBack"><p class="text-[color:var(--text-color)] font-semibold text-lg">Go back</p></button>
      <RouterLink class="py-2 px-6 no-underline bg-[color:var(--text-color)] rounded-full" to="/"><p class="text-[color:var(--bg-color)] font-semibold text-lg">Home</p></RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const errorCode = ref(404);
const errorMessage = ref("Unfortunately, we couldn't find the vent you're looking for. Our crewmates will keep venting to find it!");

onMounted(() => {
  if (route.query.code && typeof route.query.code == 'string') {
    errorCode.value = Number(route.query.code);
  }

  if (route.query.msg && typeof route.query.msg == 'string') {
    errorMessage.value = String(route.query.msg);
  }
});

function goBack() {
  window.history.back();
}
</script>

<style lang="scss" scoped>
.logo {
  background: radial-gradient(var(--faded-blue), transparent 66%);
}

@media (hover: hover) and (pointer: fine) {
  .report:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
