<template>
  <div class="flex flex-col items-center justify-start gap-4 w-screen h-screen">
    <h1>personal info</h1>
    <div class="flex-col items-start justify-center">
      <div
        class="no-underline text-[color:var(--text-color)] bg-[color:var(--bg-color)] border-4 border-[color:var(--bg-color-contrast)] shadow-2xl rounded-xl shadow-[color:var(--bg-color-contrast-translucent)] p-4"
      >
        <h4 class="text-xl m-1">name</h4>
      </div>
    </div>
    <div>reset password</div>
    <div>a few more</div>
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
      { name: 'Profile Picture', path: 'profile-picture' },
      { name: 'name', path: 'name' }
    ]
  },
  {
    name: 'Personal Info',
    path: 'personal-info',
    dropdown: [
      { name: 'Email', path: 'email' },
      { name: 'password', path: 'password' }
    ]
  }
];
</script>

<style scoped></style>
