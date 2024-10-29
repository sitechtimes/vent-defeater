<template>
  <div class="flex flex-rpw items-center justify-center w-screen h-full overflow-hidden">
    <div class="menu flex items-center justify-start flex-col w-80 min-h-screen p-8 gap-8 transition duration-500">
      <img class="logo w-full transition duration-300 rounded-lg cursor-pointer p-2" src="/logo/logoWithWords.svg" aria-hidden="true" @click="$router.push('/app/dashboard')" />
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
      </div>
    </div>

    <div class="w-full flex flex-col">
      <div>
        <button
          class="fixed right-2 top-2 hover:bg-[var(--text-color)] w-36 h-12 rounded-full border-0 bg-[color:var(--bg-color-contrast)] text-lg transition duration-500 text-[color:var(--text-color-contrast)]"
        >
          Save
        </button>
      </div>
      <div class="gap-10">
        <div class="w-11/12 no-underline text-[color:var(--text-color)] bg-[color:var(--faded-bg-color-light)] rounded-md p-4 text-xl">
          <h2 class="font-bold">General Options</h2>
          <h3>Name</h3>
          <input type="text" class="rounded-md bg-[color:var(--bg-color)]" />
        </div>
        <div class="w-11/12 no-underline text-[color:var(--text-color)] bg-[color:var(--faded-bg-color-light)] rounded-md p-4 text-xl">
          <h2 class="font-bold">Personal Info</h2>
          <h3>Email</h3>
          <input type="text" class="rounded-md bg-[color:var(--bg-color)]" />
          <h3>User</h3>
          <input type="text" class="rounded-md bg-[color:var(--bg-color)]" />
          <h3>Password</h3>
          <input type="text" class="rounded-md bg-[color:var(--bg-color)]" />
        </div>
        <div class="w-11/12 no-underline text-[color:var(--text-color)] bg-[color:var(--faded-bg-color-light)] rounded-md p-4 text-xl">
          <h2 class="font-bold">Privacy</h2>
          <h3>Affiliated Accounts</h3>
          <input type="text" class="rounded-md bg-[color:var(--bg-color)]" />
        </div>
      </div>
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

<style lang="scss" scoped>
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
</style>
