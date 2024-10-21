<template>
  <div class="flex flex-col items-center justify-start gap-4 w-screen h-screen">
    <h1>personal info</h1>
    <div
      class="outerNavButton no-underline text-[color:var(--text-color)] bg-[color:var(--bg-color)] border-4 border-[color:var(--bg-color-contrast)] shadow-2xl rounded-xl shadow-[color:var(--bg-color-contrast-translucent)] p-4 text-xl m-1"
      v-for="option in options"
      :key="option.name"
    >
      <h3>{{ option.name }}</h3>
      <div
        class="flex pointer-events-none flex-col items-start justify-center gap-1 bg-[color:var(--bg-color)] shadow-2xl shadow-[color:var(--bg-color-contrast-translucent)] p-4 rounded-sm transition"
        v-if="option.settings"
      >
        <RouterLink class="no-underline text-[color:var(--text-color)]" v-for="options in option.settings" :to="options.anchor" :key="options.name">
          <h4 class="font-medium m-1">{{ options.name }}</h4>
        </RouterLink>
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
    name: 'General Options',
    anchor: 'general-options',
    settings: [{ name: 'name', anchor: '' }]
  },
  {
    name: 'Personal Info',
    anchor: 'personal-info',
    settings: [
      { name: 'Email', anchor: '' },
      { name: 'User', anchor: '' },
      { name: 'Password', anchor: '' }
    ]
  },
  {
    name: 'Privacy',
    anchor: 'privacy',
    settings: [{ name: 'Affiliated Accounts', anchor: '' }]
  }
];
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .outerNavButton:hover {
    .navButton {
      img {
        transform: rotate(-180deg);
      }
    }

    .hoverDropdown {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .close:hover {
    background-color: var(--primary-shade-translucent);
  }

  .logins {
    .signup:hover {
      background-color: var(--primary-shade);
    }
  }
}
</style>
