<template>
  <div>
    <NavBar />
    <main class="flex flex-col items-center text-center">
      <section class="flex flex-col gap-3 items-center">
        <h1 class="text-6xl">What will you ask your audience?</h1>
        <p class="text-2xl">
          Turn presentations into conversations with interactive polls that engage meetings and
          classrooms.
        </p>
        <button class="start capsule" @click="alert('no')">Get started, it's free</button>
        <p class="text-sm text-gray-600">No credit card needed</p>
      </section>
      <div class="video-container-container">
        <div class="video-container">
          <video
            loop
            autoplay
            muted
            src="https://static.mentimeter.com/static/motion/Square.mp4"
            width="100%"
            height="100%"
          ></video>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
section {
  max-width: 800px;
}

.start {
  background-color: black;
  color: white;
}

.capsule {
  min-width: 100px;
  padding: 10px;
  width: 25%;
  border-radius: 500px;
  font-weight: 600;
}

.video-container-container {
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
}

.video-container {
  transform: scale(1.25);
  background-image: url(https://static.mentimeter.com/static/images/BKGIMAGENU.svg);
  background-position: center;
  background-size: cover;
  width: 120vw;
  height: 100%;
}

video {
  max-width: 800px;
  margin: 0 auto;
}
</style>
