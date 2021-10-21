import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../views/Todos.vue')
  },
  {
    path: '/completed-todos',
    name: 'CompletedTodos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/CompletedTodos.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
