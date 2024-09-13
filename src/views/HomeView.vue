<template>
  <div>
    <NavBar />
    <main class="flex flex-col items-center text-center gap-20">
      <section class="flex flex-col gap-3 items-center">
        <h1 class="text-6xl">What will you ask your audience?</h1>
        <p class="text-2xl">Turn presentations into conversations with interactive polls that engage meetings and classrooms.</p>
        <button
          class="bg-black text-white dark:bg-white dark:text-black capsule"
          @click="
            () => {
              console.log('no');
            }
          "
        >
          Get started, it's free
        </button>
        <p class="text-sm text-gray-600 dark:text-gray-300">No credit card needed</p>
      </section>
      <div class="video-container">
        <video loop autoplay muted src="https://static.mentimeter.com/static/motion/Square.mp4"></video>
      </div>
      <section class="flex flex-col gap-3 items-center">
        <p class="rounded bg-gray-200 dark:bg-gray-800">Audience experience</p>
        <h2 class="text-5xl">From presentations to conversations</h2>
        <p class="text-xl">Vent Defeater ensures all voices are heard, even those who might not usually speak up. Anonymous questions means your audience won't be afraid to ask and engage.</p>
        <div class="flex gap-6">
          <button class="capsule switcher active">one</button>
          <button class="capsule switcher">two</button>
        </div>
      </section>
      <div id="container" style="width: 500px; height: 400px"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<style scoped>
section {
  max-width: 800px;
  overflow-x: hidden;
}

.capsule {
  min-width: 100px;
  padding: 10px;
  width: 25%;
  border-radius: 500px;
  font-weight: 600;
}

.switcher {
  @apply bg-gray-200 dark:bg-gray-700;
}

.switcher.active {
  @apply bg-white dark:bg-black border-black dark:border-white;
  border: 2px solid;
}

.rounded {
  min-width: fit-content;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
}

.video-container {
  display: flex;
  background-image: url(https://static.mentimeter.com/static/images/BKGIMAGENU.svg);
  background-position: center;
  background-size: cover;
  justify-content: center;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

video {
  max-width: 1030px;
  border-radius: 10px;
  border: 4px solid lightgray;
}
</style>
