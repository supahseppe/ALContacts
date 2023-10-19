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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contacts',
      redirect: '/contacts/browse',
      children: [
        {
          path: 'add',
          name: 'add_contact',
          component: () => import('../views/Contacts/Add.vue')
        },
        {
          path: 'browse',
          name: 'contacts',
          component: () => import('../views/Contacts/Browse.vue')
        },
        {
          path: ':id',
          children: [
            {
              path: 'read',
              component: () => import('../views/Contacts/Read.vue'),
            },
            {
              path: 'edit',
              component: () => import('../views/Contacts/Edit.vue'),
            },
          ],
        }
      ]
    },
  ]
})

export default router
