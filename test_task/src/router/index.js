import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/movies'
    },
    {
      path: '/movies',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('../views/TheMovie.vue'),
    },
  ],
})

export default router
