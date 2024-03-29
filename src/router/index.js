import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeriesView from "@/views/SeriesView.vue";
import SingleItemView from "@/views/SingleItemView.vue";
import SingleSeriesView from "@/views/SingleSeriesView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/series',
      children: [
        { path: '', name: 'series', component: SeriesView },
        { path: ':id', name: 'single-serie', component: SingleSeriesView },
      ]
    },
    {
      path: '/item/:id',
      name: 'single-item',
      component: SingleItemView
    }
  ]
})

export default router
