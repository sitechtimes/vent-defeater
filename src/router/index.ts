import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/app/',
      name: 'app',
      redirect: '/app/dashboard',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/app/DashboardView.vue'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/physics',
      name: 'physics',
      component: () => import('../views/PhysicsView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/ErrorView.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
});

let previousRoute: RouteLocationNormalizedGeneric;

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if (
    !userStore.isAuthenticated &&
    router
      .getRoutes()
      .filter((route) => route.meta.requiresAuth == true)
      .map((route) => route.path)
      .includes(to.path)
  )
    return { name: 'login' };
  previousRoute = from;
});

export function getPreviousRoute() {
  return previousRoute;
}

export default router;
