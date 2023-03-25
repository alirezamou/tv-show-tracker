import { createRouter, createWebHistory } from "vue-router";
import Subscriptions from "@/components/Subscriptions.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Subscriptions",
      path: "/",
      component: Subscriptions,
    },
    {
      name: "ShowDetails",
      path: "/shows/:id",
      component: () => import("@/components/ShowDetails.vue"),
    },
  ],
});

export default router;
