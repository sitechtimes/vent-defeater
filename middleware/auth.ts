import type { RouteLocationNormalizedGeneric } from "vue-router";

let previousRoute: RouteLocationNormalizedGeneric | undefined = undefined;

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const router = useRouter();

  if (
    !userStore.isAuth &&
    router
      .getRoutes()
      .filter((route) => route.meta.requiresAuth == true)
      .flatMap((route) => route.path)
      .includes(to.path)
  )
    return navigateTo("/login");

  previousRoute = from;
});

export function getPreviousRoute() {
  return previousRoute;
}
