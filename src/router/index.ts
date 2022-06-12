import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create-note',
      component: () => import('@/views/CreateNote.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit-note',
      component: () => import('@/views/EditNote.vue')
    },
    {
      path: '/:notFound(.*)',
      redirect: '/'
    }
  ]
})

export default router
