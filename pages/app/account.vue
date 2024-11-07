<template>
  <DashboardHeader class="fixed" />
  <div class="flex justify-center w-screen min-h-screen">
    <div class="flex flex-row mt-28 w-min mx-auto">
      <div class="flex flex-col min-w-40 h-full w-fit flex-grow sticky top-0">
        <a
          class="h-9 transition duration-300 navButton flex items-center justify-start gap-3 no-underline text-[color:var(--text-color)] w-full rounded-md"
          v-for="settings in options"
          :key="settings.name"
          :href="'#' + settings.anchor"
        >
          <div class="w-1 h-6 rounded-full" :class="'bg-[color:var(--secondary)]'"></div>
          <p class="flex align-center justify-center gap-1">
            {{ settings.name }}
          </p>
        </a>
        <button class="bg-[color:var(--faded-bg-color)] p-2 px-4 w-fit mx-auto rounded-xl font-bold mt-8">Save</button>
      </div>

      <div class="flex flex-col gap-10">
        <fieldset>
          <legend class="font-bold">General Options</legend>
          <div>
            <label for="name">Name</label>
            <input id="name" max-length="32" type="text" class="rounded-md bg-[color:var(--bg-color)]" />
          </div>
        </fieldset>
        <fieldset>
          <legend class="font-bold">Personal Info</legend>
          <div>
            <label for="email">Email</label>
            <input id="email" max-length="40" type="email" class="rounded-md bg-[color:var(--bg-color)]" />
          </div>
          <div>
            <label for="user">User</label>
            <input id="user" max-length="32" type="text" class="rounded-md bg-[color:var(--bg-color)]" />
          </div>
          <div>
            <label for="password">Reset password</label>
            <input id="password" type="button" class="rounded-md bg-[color:var(--secondary-shade)] cursor-pointer py-2" value="skibidi" />
          </div>
        </fieldset>
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

fieldset {
  @apply w-4/12 no-underline text-[color:var(--text-color)] bg-[color:var(--faded-bg-color-light)] rounded-3xl p-4 flex flex-col gap-2;
}

legend {
  background-color: var(--faded-bg-color-light);
  @apply rounded-2xl p-2 px-4 text-4xl;
}

fieldset div {
  @apply flex flex-col gap-2;
}

fieldset label {
  @apply text-2xl;
}

fieldset input {
  width: 40ch;
  @apply text-3xl;
}
</style>
