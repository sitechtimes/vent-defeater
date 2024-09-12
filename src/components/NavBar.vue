<template>
  <header>
    <RouterLink class="logo" to="/">
      <img src="/logo/logoWithWords.svg" alt="Vent Defeater logo" />
    </RouterLink>
    <nav>
      <div class="outerNavButton" v-for="button in navButtons" :key="button.name">
        <RouterLink :to="button.path" class="navButton">
          {{ button.name }}
          <svg
            v-if="button.dropdown"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
              fill="var(--text-color)"
            />
          </svg>
        </RouterLink>
        <div class="hoverDropdown" v-if="button.dropdown">
          <RouterLink
            class="dropdownButton"
            v-for="option in button.dropdown"
            :to="option.path"
            :key="option.name"
          >
            <h4>{{ option.name }}</h4></RouterLink
          >
        </div>
      </div>
    </nav>
    <div class="logins">
      <button @click="toggleTheme" class="theme">
        <a href="#">
          <img v-if="user.theme == 'light'" src="/ui/sun.svg" aria-hidden="true" />
          <img v-else src="/ui/moon.svg" aria-hidden="true" />
        </a>
      </button>
      <RouterLink class="loginButton" to="/"><h3>Log in</h3></RouterLink>
      <RouterLink class="loginButton signup" to="/"><h3>Sign up</h3></RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/user.js'

const user = userStore()

type NavButtons = {
  name: string
  path: string
  dropdown?: { name: string; path: string }[]
}

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
]

function toggleTheme() {
  if (user.theme == 'light') {
    document.body.classList.add('dark')
    user.theme = 'dark'
    localStorage.setItem('theme', 'dark')
    return
  }

  document.body.classList.remove('dark')
  user.theme = 'light'
  localStorage.removeItem('theme')
}
</script>

<style scoped lang="scss">
header {
  position: fixed;
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

  .theme {
    background-color: transparent;
    border: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      display: flex;
    }

    img {
      height: 2em;
    }
  }

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
}

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
