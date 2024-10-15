<template>
  <div class="flex flex-col items-center justify-start gap-4 w-screen h-screen">
    <h1>personal info</h1>
    <div
      class="no-underline text-[color:var(--text-color)] bg-[color:var(--bg-color)] border-4 border-[color:var(--bg-color-contrast)] shadow-2xl rounded-xl shadow-[color:var(--bg-color-contrast-translucent)] p-4 text-xl m-1"
      v-for="option in options"
      :key="option.name"
    >
      <h3>{{ option.name }}</h3>
      <div
        class="hoverDropdown absolute flex pointer-events-none opacity-0 flex-col items-start justify-center gap-1 bg-[color:var(--bg-color)] shadow-2xl shadow-[color:var(--bg-color-contrast-translucent)] p-4 rounded-sm transition"
        v-if="option.dropdown"
      >
        <RouterLink class="no-underline text-[color:var(--text-color)]" v-for="options in option.dropdown" :to="options.path" :key="options.name">
          <h4 class="font-medium m-1">{{ options.name }}</h4></RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Options = {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
};

const options: Options[] = [
  {
    name: 'General Options',
    path: 'general-options',
    dropdown: [
      { name: 'Profile Picture', path: '' },
      { name: 'name', path: '' }
    ]
  },
  {
    name: 'Personal Info',
    path: 'personal-info',
    dropdown: [
      { name: 'Email', path: '' },
      { name: 'Password', path: '' }
    ]
  },
  {
    name: 'Privacy',
    path: 'privacy',
    dropdown: [{ name: 'Affiliated Accounts', path: '' }]
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
