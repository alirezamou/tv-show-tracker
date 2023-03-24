import { createRouter, createWebHistory } from "vue-router";
import Subscriptions from "@/components/Subscriptions.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Subscriptions,
    },
  ],
});

export default router;
