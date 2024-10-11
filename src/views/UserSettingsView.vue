<template>
  <div class="flex flex-col items-center justify-start gap-4 w-screen h-screen">
    <h1>personal info</h1>
    <div
      class="no-underline text-[color:var(--text-color)] bg-[color:var(--bg-color)] border-4 border-[color:var(--bg-color-contrast)] shadow-2xl rounded-xl shadow-[color:var(--bg-color-contrast-translucent)] p-4 text-xl m-1"
      v-for="option in options"
      :key="option.name"
    >
      {{ option.name }}
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

<style scoped></style>
