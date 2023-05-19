import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { getMe } from "@/services/api-request/game-master-manager/game-master-manager-request";

async function verifyUser() {
  if (!localStorage.getItem("user")) {
    return false;
  }
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.access_token) {
    return false;
  } else {
    const userVerified = await getMe(user.access_token);
    if (!userVerified) {
      return false;
    } else {
      return true;
    }
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/list",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
    beforeEnter: async (to, from, next) => {
      const user = await verifyUser();
      if (!user) {
        localStorage.removeItem("user");
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/tabs/",
    component: TabsPage,
    beforeEnter: async (to, from, next) => {
      const user = await verifyUser();
      if (!user) {
        localStorage.removeItem("user");
        next("/login");
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        redirect: "/tabs/list",
      },
      {
        path: "list",
        component: () => import("@/views/BookingList.vue"),
      },
      {
        path: "game-started",
        component: () => import("@/views/GameStarted.vue"),
      },
      {
        path: "game-closed",
        component: () => import("@/views/GameClosed.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
