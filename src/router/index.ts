import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }, {
      path: "/app/",
      name: "app",
      redirect: "/app/dashboard",
      children: [{
        path: "dashboard",
        name: "dashboard",
        component: () => import('../views/app/DashboardView.vue')
      }]
    },
    {
      path: "/join/",
      name: "join",
      component: () => import('../views/app/JoinPage.vue')
    }
  ]
});

export default router;
