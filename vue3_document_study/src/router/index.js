import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const ReactiveView = () => import("../views/ReactiveView.vue");
const LifeCycleView = () => import("../views/LifeCycleView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/reactive",
      name: "reactive",
      component: ReactiveView,
    },
    {
      path: "/lifecycle",
      name: "lifecycle",
      component: LifeCycleView,
    },
  ],
});

export default router;
