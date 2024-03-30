/*
 * @Description:
 * @Version: 1.0
 * @Author:
 * @Date: 2024-03-10 09:39:13
 * @LastEditors:
 * @LastEditTime: 2024-03-25 23:19:55
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Recommend from "@/views/recommend";
import Singer from "@/views/singer";
import TopList from "@/views/top-list";
import Search from "@/views/search";
import SingerDetail from "@/views/singer-detail";

const routes = [
  {
    path: "/",
    redirect: "/singer/0025NhlN2yWrP4",
  },
  {
    path: "/recommend",
    component: Recommend,
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  {
    path: "/top-list",
    component: TopList,
  },
  {
    path: "/search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
