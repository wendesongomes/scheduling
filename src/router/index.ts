import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Past from "../pages/past.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/past",
    component: Past,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
