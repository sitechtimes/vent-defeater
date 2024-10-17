<template>
  <div class="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-screen h-screen flex items-center justify-center z-50" @click="emit('close')">
    <div class="bg-[color:var(--bg-color)] flex items-center justify-center p-6 rounded-xl flex-col" @click="$event.stopPropagation()">
      <h1>Reset password</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: [void];
}>();
</script>

<style lang="scss" scoped></style>
