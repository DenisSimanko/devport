import { useAuthStore } from "@/stores/auth.js";
import VueRouter from "vue-router";
import LoginView from "@/views/login-view/index.vue";
import IndexView from "@/views/index-view/index.vue";

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "index",
      component: IndexView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
