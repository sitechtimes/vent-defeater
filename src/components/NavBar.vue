<template>
  <div class="mb-24 flex flex-col items-center justify-center sticky top-0">
    <header class="transition duration-500 bg-[color:var(--bg-color)] h-16 w-screen">
      <div class="w-screen flex items-center justify-evenly border-b-2 border-solid border-[color:var(--faded-bg-color)] bg-[color:var(--bg-color)] relative z-20">
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
      </div>

      <Transition name="goToJoin">
        <div class="w-screen flex items-center justify-center gap-3 bg-[color:var(--primary-light)] rounded-b-3xl py-3 relative bottom-0 z-10" v-show="showJoinBanner">
          <p class="text-lg font-medium">Trying to join a live Vent?</p>
          <RouterLink to="/join" class="flex items-center justify-center gap-1 rounded-full bg-[color:var(--bg-color)] text-[color:var(--text-color)] font-semibold px-4 py-2"
            >Join <img class="w-5 h-5 dark:invert" src="/ui/rightArrow.svg" aria-hidden="true"
          /></RouterLink>
          <button class="close absolute right-12 rounded-full w-8 h-8 flex items-center justify-center" @click="emit('toggleBanner')">
            <img class="w-5 h-5 dark:invert" src="/ui/x.svg" aria-hidden="true" />
          </button>
        </div>
      </Transition>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import ThemeToggle from './ThemeToggle.vue';

type NavButtons = {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
};

type Props = {
  showJoinBanner?: boolean;
};

type Emits = {
  toggleBanner: [void];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
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
.goToJoin-enter-active,
.goToJoin-leave-active {
  transition: all 0.5s ease;
}

.goToJoin-enter-from,
.goToJoin-leave-to {
  opacity: 0;
  transform: translateY(-10vh);
}

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
