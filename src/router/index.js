import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  // base: import.meta.env.BASE_URL,
  routes: [
    // { path:  '/', component: Login },
    { path:  '/login', component: Login },
    { path: '/', component: Home },
    {
      path: '/404',
      name: '404',
      component: PageNotFound,
      props: true
    },    
    // { path: "/:pathMatch(.*)*", redirect: {
    //     name: '404',
    //     params: { resource: 'page' }
    //   }
    // },
    { path: '/register', component: Register },
  ]
})

export default router
