<template>
  <div class="flex items-start justify-center w-screen h-full overflow-hidden">
    <div class="menu flex items-center justify-start flex-col w-72 min-h-screen p-8 gap-8 fixed top-0 left-0 transition duration-500">
      <img class="logo w-full transition duration-300 rounded-lg cursor-pointer p-2" src="/logo/logoWithWords.svg" aria-hidden="true" @click="$router.push('/app/dashboard')" />
      <div class="flex items-center justify-center flex-col w-full gap-px">
        <RouterLink
          class="h-9 transition duration-300 navButton flex items-center justify-start gap-3 no-underline text-[color:var(--text-color)] w-full rounded-md"
          v-for="settings in options"
          :key="settings.name"
          :to="settings.anchor"
        >
          <div class="w-1 h-6 rounded-full" :class="'bg-[color:var(--secondary)]'"></div>
          <div class="flex align-center justify-center gap-1">
            {{ settings.name }}
          </div>
        </RouterLink>
      </div>
    </div>
    <div
      class="outerNavButton no-underline text-[color:var(--text-color)] bg-[color:var(--bg-color)] border-4 border-[color:var(--bg-color-contrast)] shadow-2xl rounded-xl shadow-[color:var(--bg-color-contrast-translucent)] p-4 text-xl m-1"
      v-for="option in options"
      :key="option.name"
    >
      <h3>{{ option.name }}</h3>
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
