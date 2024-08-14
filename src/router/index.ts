import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Past from "../pages/past.vue";
import Cancelled from "../pages/cancelled.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/past",
    component: Past,
  },
  {
    path: "/cancelled",
    component: Cancelled,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
