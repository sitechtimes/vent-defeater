<template>
  <div class="flex flex-col items-center justify-center"></div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onMounted(() => {
  router.push("/steal");
});
</script>

<style scoped></style>
