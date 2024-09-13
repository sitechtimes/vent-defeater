<template>
  <header class="transition duration-700 sticky bg-[color:var(--bg-color)] mb-8 top-0 h-16 w-screen flex items-center justify-evenly border-b-2 border-solid border-[color:var(--faded-bg-color)] z-10">
    <RouterLink class="flex items-center justify-center gap- no-underline text-[color:var(--text-color)]" to="/">
      <img class="h-16" src="/logo/logoWithWords.svg" alt="Vent Defeater logo" />
    </RouterLink>
    <nav class="flex items-center justify-center gap-3">
      <div class="outerNavButton" v-for="button in navButtons" :key="button.name">
        <RouterLink :to="button.path" class="navButton relative no-underline text-[color:var(--text-color)] font-bold flex items-center justify-center">
          {{ button.name }}
          <svg class="transition duration-300 h-4 w-4" v-if="button.dropdown" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
              fill="var(--text-color)"
            />
          </svg>
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
      <RouterLink class="no-underline" to="/login"><h3 class="font-bold m-0">Log in</h3></RouterLink>
      <RouterLink class="signup no-underline bg-[color:var(--primary)] px-5 py-2 transition rounded-full" to="/login?signup=1"
        ><h3 class="font-bold m-0 text-[color:var(--text-color-contrast)]">Sign up</h3></RouterLink
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue';

type NavButtons = {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
};

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
/*header {
  position: sticky;
  background-color: white;
  margin-bottom: 2rem;
  top: 0;
  height: 4em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 0.125em solid var(--faded-bg-color);
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  text-decoration: none;
  color: black;

  img {
    height: 4em;
  }

  h1 {
    margin: 0;
  }
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75em;
}

.navButton {
  position: relative;
  text-decoration: none;
  color: var(--text-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: all 0.5s;
    height: 1em;
    width: 1em;
  }
}

.hoverDropdown {
  position: absolute;
  display: flex;
  pointer-events: none;
  opacity: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25em;
  background-color: var(--bg-color);
  box-shadow: 0 0 1em var(--bg-color-contrast-translucent);
  padding: 1em;
  border-radius: 0.25em;
  transition: all 0.5s;
  background-color: white;
  box-shadow: 0 0 2px black;

  .dropdownButton {
    text-decoration: none;
    color: var(--text-color);

    h4 {
      font-weight: 500;
      margin: 0.25em;
    }
  }
}

.logins {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75em;

  .loginButton {
    text-decoration: none;

    h3 {
      font-weight: bold;
      margin: 0;
    }
  }

  .signup {
    background-color: var(--primary);
    padding: 0.5em 1.25em;
    border-radius: 5em;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.3s;

    h3 {
      color: var(--text-color-contrast);
    }
  }
}*/

@media (hover: hover) and (pointer: fine) {
  .outerNavButton:hover {
    .navButton {
      svg {
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
