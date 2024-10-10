import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/join",
      name: "join",
      component: () => import("../views/JoinPage.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/app/",
      name: "app",
      redirect: "/app/dashboard",
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("../views/app/DashboardView.vue"),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "presentation",
          name: "presentation",
          component: () => import("../views/app/presentation/EditView.vue"),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/physics",
      name: "physics",
      component: () => import("../views/PhysicsView.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/game/HomeView.vue"),
      meta: {
        requiresAuth: false,
        transition: "circle-wipe"
      }
    }
  ]
});

let previousRoute: RouteLocationNormalizedGeneric;

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  if (
    !userStore.isAuth &&
    router
      .getRoutes()
      .filter((route) => route.meta.requiresAuth == true)
      .flatMap((route) => route.path)
      .includes(to.path)
  )
    if (userStore.isAuth) return { name: "login" };
  previousRoute = from;
});

export function getPreviousRoute() {
  return previousRoute;
}

export default router;
