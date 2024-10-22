<template>
  <div class="flex items-start justify-center w-screen h-full overflow-hidden">
    <LoadingTransition v-show="!loaded" @done="loaded = true" />

    <Transition name="sideMenu">
      <SideMenu v-show="loaded" class="fixed top-0 left-0" />
    </Transition>

    <!-- damn you kenf <- mr trump man -->
    <div class="w-72"></div>

    <Transition name="page">
      <div class="w-full min-h-screen flex items-start justify-start flex-col" v-show="loaded">
        <DashboardHeader />
        <div class="w-full h-full px-16 flex items-start justify-center flex-col gap-8">
          <h1 class="text-4xl mt-10">Welcome, poopybutt</h1>

          <div class="flex align-start justify-center flex-col gap-5 bg-[color:var(--faded-bg-color-light)] p-8 rounded-2xl">
            <p class="font-semibold">Popular features</p>
            <div class="flex items-start justify-center gap-1 w-full">
              <div class="flex items-center justify-center flex-col gap-2 cursor-pointer" v-for="feature in popularFeatures" :key="feature.name">
                <img class="flex items-center justify-center p-8 bg-[color:var(--bg-color)] rounded-2xl w-3/4 h-3/4" :src="feature.img" aria-hidden="true" />
                <p>{{ feature.name }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <div class="newProjectButton relative flex items-center justify-center border-solid border border-[color:var(--text-color)] rounded-full bg-[color:var(--text-color)]">
              <button class="flex items-center justify-center no-underline rounded-l-full bg-[color:var(--text-color)] px-5 border-r border-[color:var(--bg-color)]" @click="createPresentation()">
                <p class="font-semibold text-[color:var(--bg-color)]">New Vent</p>
              </button>
              <button class="flex items-center justify-center rounded-r-full bg-[color:var(--text-color)] px-3 h-9">
                <img class="w-6 h-6 invert dark:invert-0" src="/ui/dropdownArrow.svg" alt="Click for more options" />
              </button>
              <div class="newProject opacity-0 pointer-events-none absolute top-11 flex items-center justify-center flex-col gap-1 p-2 bg-[color:var(--bg-color)] rounded-lg transition duration-300">
                <button class="new flex items-center justify-start gap-1 w-full p-1 pl-2 pr-7 rounded-lg">
                  <img class="w-4 h-4 dark:invert" src="/ui/search.svg" aria-hidden="true" />
                  <p class="text-[color:var(--text-color)]">New quiz</p>
                </button>
                <button class="new flex items-center justify-start gap-1 w-full p-1 pl-2 pr-7 rounded-lg">
                  <img class="w-4 h-4 dark:invert" src="/ui/x.svg" aria-hidden="true" />
                  <p class="text-[color:var(--text-color)]">New survey</p>
                </button>
              </div>
            </div>

            <button class="flex items-center justify-center gap-1 h-10 px-5 border-solid border-2 border-[color:var(--text-color)] rounded-full">
              <img class="w-6 h-6 dark:invert" src="/ui/download.svg" aria-hidden="true" />
              <p class="text-[color:var(--text-color)] font-semibold">Import presentation</p>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '@/components/DashboardHeader.vue';
import LoadingTransition from '@/components/LoadingTransition.vue';
import SideMenu from '@/components/SideMenu.vue';
import { getPreviousRoute } from '@/router';
import { useUserStore } from '@/stores/user';
import type { Template } from '@/utils/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const loaded = ref(false);

const popularFeatures = [
  {
    name: 'Word cloud',
    img: '/ui/home.svg'
  },
  {
    name: 'Poll',
    img: '/ui/x.svg'
  },
  {
    name: 'Open ended',
    img: '/ui/search.svg'
  },
  {
    name: 'Scales',
    img: '/ui/star.svg'
  },
  {
    name: 'Ranking',
    img: '/ui/sun.svg'
  },
  {
    name: 'Pin it',
    img: '/ui/user.svg'
  }
];

onMounted(async () => {
  const previousRoute = getPreviousRoute();
  if (previousRoute && !['/', '/login'].includes(previousRoute.path)) {
    loaded.value = true;
    return;
  }

  loaded.value = false;
});

async function createPresentation(preset?: Template) {
  // load sample presentation into pinia
  userStore.currentPres = {
    id: 'sdbhugu89wdgh89weghwn9g',
    name: 'its joever bidone',
    type: 'Presentation',
    lastOpened: new Date().getTime() / 1000,
    slides: [
      {
        id: 'nweui9gh9wqehg80',
        type: 'Slide',
        elements: [
          {
            type: 'Text Field',
            id: 'ahgauioghioag',
            position: {
              top: 50,
              left: 100,
              bottom: 50,
              right: 100
            },
            background: {
              color: '#ffff00',
              image: null
            },
            text: {
              font: 'Arial',
              color: '#000000',
              size: 37.5,
              styles: {
                bold: false,
                italics: false,
                underline: false,
                strikethrough: false,
                align: 'center',
                wrap: true
              }
            },
            content: "it's joever bidone",
            flex: {
              items: 'center',
              justify: 'center',
              align: 'center',
              wrap: false
            },
            zIndex: 0
          }
        ],
        speakerNotes: null,
        dimensions: {
          width: 640,
          height: 360
        },
        background: {
          color: '#ffffff',
          image: null
        },
        settings: {
          showCode: true,
          template: null
        }
      }
    ]
  };
  router.push('/app/presentation?prs=sdbhugu89wdgh89weghwn9g&sld=nweui9gh9wqehg80?view=1');
}
</script>

<style lang="scss" scoped>
.newProjectButton:focus-within {
  .newProject {
    opacity: 1;
    pointer-events: all;
  }
}

.newProject {
  box-shadow: 0 0 0 0.05rem var(--bg-color-contrast-translucent);
}

.sideMenu-enter-active,
.sideMenu-leave-active {
  transition: all 0.5s ease;
}

.sideMenu-enter-from,
.sideMenu-leave-to {
  opacity: 0;
  transform: translate(-12rem);
}

.page-enter-active,
.page-leave-active {
  transition: all 1.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(50vh);
}

@media (hover: hover) and (pointer: fine) {
  .new:hover {
    background-color: var(--faded-bg-color);
  }
}
</style>
