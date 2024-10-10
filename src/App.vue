<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? content : "" }}</template>
  </metainfo>
  <div>
    <transition :name="'circle-wipe'" mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useUserStore } from "./stores/user";
import { useMeta } from "vue-meta";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

useMeta({
  title: "Vent Defeater",
  description:
    "Featuring features fraught with a few fixes featured in many of your favorite apps and websites, Vent Defeater enables the imagination of anyone looking to build modern, sleek, and top-quality presentations."
});

function transitionName(): string {
  if (route.meta.transition) {
    return route.meta.transition as string;
  } else {
    return "default"; // Default transition if no meta data is provided
  }
}

onBeforeMount(() => {
  userStore.verify();
  sessionStorage.removeItem("previousIsHome");
  // sample shit

  userStore.presentations = [
    {
      id: "fqeghuiaeghiasiug",
      name: "Your Mom's Poll",
      type: "Poll",
      lastOpened: 1726277049
    },
    {
      id: "suafguisaugias",
      name: "Your Mom's Quiz",
      type: "Quiz",
      lastOpened: 1723339449
    },
    {
      id: "ut8903u89052",
      name: "Your Mom's Survey",
      type: "Survey",
      lastOpened: 1707614649
    },
    {
      id: "sadghadshads",
      name: "Your Mom's Poll 2",
      type: "Poll",
      lastOpened: 1626277049
    },
    {
      id: "sahsahsah",
      name: "Your Mom's Quiz 2",
      type: "Quiz",
      lastOpened: 1623339449
    },
    {
      id: "dahsadhdsh",
      name: "Your Mom's Survey 2",
      type: "Survey",
      lastOpened: 1607614649
    }
  ];

  if (localStorage.getItem("authToken")) {
    // do auth shit
    userStore.isAuth = true;
  }

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    userStore.theme = "dark";
  }
  document.body.style.display = "flex";
});
</script>

<style scoped>
@keyframes circle-in-center {
  from {
    clip-path: circle(0% at 50% 50%);
  }
  to {
    clip-path: circle(125% at 50% 50%);
  }
}

@keyframes circle-out-center {
  from {
    clip-path: circle(125% at 50% 50%);
  }
  to {
    clip-path: circle(0% at 50% 50%);
  }
}

.circle-wipe-enter-active,
.circle-wipe-leave-active {
  transition: clip-path 2.5s cubic-bezier(0.25, 1, 0.3, 1);
}

.circle-wipe-enter-from {
  clip-path: circle(0% at 50% 50%);
}

.circle-wipe-enter-to {
  clip-path: circle(125% at 50% 50%);
}

.circle-wipe-leave-from {
  clip-path: circle(125% at 50% 50%);
}

.circle-wipe-leave-to {
  clip-path: circle(0% at 50% 50%);
}

body {
  margin: 0;
  padding: 0;
}

.page {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.usage {
  position: absolute;
  top: 40px;
  line-height: 50px;
  z-index: 1000;
  color: white;
  font-size: 20px;
  width: 100%;
  text-align: center;
  font-family: "Arial Black", Gadget, sans-serif;
  pointer-events: none;
}

h1 {
  color: white;
  font-family: arial;
  font-weight: bold;
  font-size: 3em;
}
</style>
