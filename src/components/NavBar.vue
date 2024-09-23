<template>
  <header
    class="transition duration-500 sticky bg-[color:var(--bg-color)] mb-12 top-0 h-16 w-screen flex items-center justify-evenly border-b-2 border-solid border-[color:var(--faded-bg-color)] z-10 py-9"
  >
    <RouterLink class="flex items-center justify-center gap- no-underline text-[color:var(--text-color)]" to="/">
      <img class="h-16" src="/logo/logoWithWords.svg" alt="Vent Defeater logo" />
    </RouterLink>
    <nav class="flex items-center justify-center gap-3">
      <div class="outerNavButton" v-for="button in navButtons" :key="button.name">
        <RouterLink :to="button.path" class="navButton relative no-underline text-[color:var(--text-color)] font-bold flex items-center justify-center">
          {{ button.name }}
          <img src="/ui/dropdownArrow.svg" class="transition duration-500 h-4 w-4 dark:invert" v-if="button.dropdown" />
        </RouterLink>
        <div
          class="hoverDropdown absolute flex pointer-events-none opacity-0 flex-col items-start justify-center gap-1 bg-[color:var(--bg-color)] shadow-2xl shadow-[color:var(--bg-color-contrast-translucent)] p-4 rounded-sm transition"
          v-if="button.dropdown"
        >
          <RouterLink class="no-underline text-[color:var(--text-color)]" v-for="option in button.dropdown" :to="option.path" :key="option.name">
            <h4 class="font-medium m-1">{{ option.name }}</h4></RouterLink
          >
        </div>
      </div>
    </nav>
    <div class="logins flex items-center justify-center gap-3">
      <ThemeToggle />
      <RouterLink class="no-underline" to="/login" v-if="!userStore.isAuth"><h3 class="font-bold m-0">Log in</h3></RouterLink>
      <RouterLink class="signup no-underline bg-[color:var(--primary)] px-5 py-2 transition rounded-full" to="/login?signup=1" v-if="!userStore.isAuth"
        ><h3 class="font-bold m-0 text-[color:var(--text-color-contrast)] dark:text-white">Sign up</h3></RouterLink
      >
      <RouterLink class="signup no-underline bg-[color:var(--primary)] px-5 py-2 transition rounded-full" to="/app" v-if="userStore.isAuth"
        ><h3 class="font-bold m-0 text-[color:var(--text-color-contrast)] dark:text-white">Go to dashboard</h3></RouterLink
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import ThemeToggle from './ThemeToggle.vue';

type NavButtons = {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
};

const userStore = useUserStore();

const navButtons: NavButtons[] = [
  {
    name: 'Work',
    path: '/',
    dropdown: [
      {
        name: 'Overview',
        path: '/'
      },
      {
        name: 'Employee Training',
        path: '/'
      },
      {
        name: 'Team Meetings',
        path: '/'
      },
      {
        name: 'Team Buildng',
        path: '/'
      },
      {
        name: 'Workshops',
        path: '/'
      },
      {
        name: 'Events & Conferences',
        path: '/'
      },
      {
        name: 'Evaluations & Retros',
        path: '/'
      },
      {
        name: 'Stage Presentations',
        path: '/'
      },
      {
        name: 'All Hands Meeting',
        path: '/'
      },
      {
        name: 'Hybrid Work',
        path: '/'
      },
      {
        name: 'Brainstorming',
        path: '/'
      }
    ]
  },
  {
    name: 'Education',
    path: '/',
    dropdown: [
      {
        name: 'Overview',
        path: '/'
      },
      {
        name: 'Lectures',
        path: '/'
      },
      {
        name: 'Assessments',
        path: '/'
      },
      {
        name: 'Seminars',
        path: '/'
      },
      {
        name: 'Student Events',
        path: '/'
      },
      {
        name: 'Classroom Lessons',
        path: '/'
      },
      {
        name: 'Hybrid Learning',
        path: '/'
      }
    ]
  },
  {
    name: 'Features',
    path: '/',
    dropdown: [
      {
        name: 'Overview',
        path: '/'
      },
      {
        name: 'AI Menti Builder',
        path: '/'
      },
      {
        name: 'Live Polling',
        path: '/'
      },
      {
        name: 'Word Cloud',
        path: '/'
      },
      {
        name: 'Quiz',
        path: '/'
      },
      {
        name: 'Q&A',
        path: '/'
      },
      {
        name: 'Survey',
        path: '/'
      },
      {
        name: 'Presentation',
        path: '/'
      }
    ]
  },
  {
    name: 'Resources',
    path: '/',
    dropdown: [
      {
        name: 'How To',
        path: '/'
      },
      {
        name: 'MentiAcademy',
        path: '/'
      },
      {
        name: 'Templates',
        path: '/'
      },
      {
        name: 'Webinars',
        path: '/'
      },
      {
        name: 'Blog',
        path: '/'
      },
      {
        name: 'Integrations',
        path: '/'
      },
      {
        name: 'Stories',
        path: '/'
      },
      {
        name: 'Help Center',
        path: '/'
      }
    ]
  },
  {
    name: 'Pricing',
    path: '/'
  },
  {
    name: 'Talk to Sales',
    path: '/'
  }
];
</script>

<style scoped lang="scss">
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

  .logins {
    .signup:hover {
      background-color: var(--primary-shade);
    }
  }
}
</style>
