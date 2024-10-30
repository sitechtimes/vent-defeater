<template>
  <img class="logo w-full transition duration-300 rounded-lg cursor-pointer p-2" src="/logo/logoWithWords.svg" aria-hidden="true" @click="$router.push('/app/dashboard')" />
  <h1 style="font-family: 'Comic Sans MS'" class="text-8xl text-center relative bottom-40 left-80">settings</h1>
  <DashboardHeader />
  <div class="flex flex-row justify-center w-screen h-full overflow-hidden">
    <div class="menu flex items-center justify-start flex-col w-80 min-h-screen p-8 gap-8 transition duration-500 fixed left-0 top-0">
      <div class="flex items-center justify-center flex-col w-full gap-px">
        <a
          class="h-9 transition duration-300 navButton flex items-center justify-start gap-3 no-underline text-[color:var(--text-color)] w-full rounded-md"
          v-for="settings in options"
          :key="settings.name"
          :href="'#' + settings.anchor"
        >
          <div class="w-1 h-6 rounded-full" :class="'bg-[color:var(--secondary)]'"></div>
          <div class="flex align-center justify-center gap-1">
            {{ settings.name }}
            <!-- name length = 32 -->
          </div>
        </a>
        <button>Save</button>
      </div>
    </div>

    <div class="w-10/12 flex flex-col gap-10 pt-40">
      <fieldset>
        <legend class="font-bold">General Options</legend>
        <div>
          <label for="name">Name</label>
          <input id="name" type="text" class="rounded-md bg-[color:var(--bg-color)]" />
        </div>
      </fieldset>
      <fieldset>
        <legend class="font-bold">Personal Info</legend>
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" class="rounded-md bg-[color:var(--bg-color)]" />
        </div>
        <div>
          <label for="user">User</label>
          <input id="user" type="text" class="rounded-md bg-[color:var(--bg-color)]" />
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" type="text" class="rounded-md bg-[color:var(--bg-color)]" />
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
type Category = {
  name: string;
  anchor: string;
  settings?: { name: string; anchor: string }[];
};

const options: Category[] = [
  {
    name: "General Options",
    anchor: "general-options",
    settings: [{ name: "name", anchor: "" }]
  },
  {
    name: "Personal Info",
    anchor: "personal-info",
    settings: [
      { name: "Email", anchor: "" },
      { name: "User", anchor: "" },
      { name: "Password", anchor: "" }
    ]
  },
  {
    name: "Privacy",
    anchor: "privacy",
    settings: [{ name: "Affiliated Accounts", anchor: "" }]
  }
];
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .menu {
    .logo:hover {
      background-color: var(--faded-bg-color);
    }
  }

  .navButton:hover {
    background-color: var(--faded-bg-color);
  }
}

legend {
  background-color: var(--faded-bg-color-light);
  @apply rounded-md p-2 text-2xl;
}

fieldset {
  @apply w-11/12 no-underline text-[color:var(--text-color)] bg-[color:var(--faded-bg-color-light)] rounded-md p-4 flex flex-col gap-2;
}

fieldset div {
  @apply flex flex-col gap-2;
}

fieldset input {
  width: 40ch;
}
</style>
