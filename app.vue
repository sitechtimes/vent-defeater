<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const route = useRoute();
const config = useRuntimeConfig();

useSeoMeta({
  ogTitle: "Vent Defeater",
  ogImage: config.public.url + "/logo/logoWithWords.svg",
  ogDescription:
    "Featuring features fraught with a few fixes featured in many of your favorite apps and websites, Vent Defeater enables the imagination of anyone looking to build modern, sleek, and top-quality presentations.",
  ogSiteName: "Vent Defeater",
  ogUrl: config.public.url as string
});

onBeforeMount(() => {
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

<style lang="scss" scoped></style>
