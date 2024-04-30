import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeriesView from "@/views/SeriesView.vue";
import SingleItemView from "@/views/SingleItemView.vue";
import SingleSeriesView from "@/views/SingleSeriesView.vue";
import YouView from "@/views/YouView.vue";
import SinglePlaylistView from "@/views/SinglePlaylistView.vue";
import MoveView from "@/views/MoveView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/move'
    },
    // {
    //   path: '/series',
    //   children: [
    //     { path: '', name: 'series', component: SeriesView },
    //     { path: ':id', name: 'single-serie', component: SingleSeriesView },
    //   ]
    // },
    // {
    //   path: '/you',
    //   children: [
    //     { path: '', name: 'you', component: YouView},
    //     { path: 'playlist/:title', name: 'single-playlist', component: SinglePlaylistView},
    //   ]
    // },
    // {
    //   path: '/item/:id',
    //   name: 'single-item',
    //   component: SingleItemView
    // },
    {
      path: '/move',
      name: 'move',
      component: MoveView
    },
    { path: "/:pathMatch(.*)*", redirect: '/move' }
  ]
})

export default router
