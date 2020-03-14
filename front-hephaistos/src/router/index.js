import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Module from '../views/Module.vue'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}
const routes = [
  {
    path: '/home',
    name: 'home',
    component: import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    // component: Home,
    beforeEnter // notice this new property
  },
  {
    path: '/exercise',
    name: 'Exercise',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "exercise" */ '../views/CreateUpdateexercise.vue'),
    beforeEnter
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/listmodules',
    name: 'ListModules',
    component: () => import('../views/ListModules.vue'),
    beforeEnter
  },
  {
    path: '/module/:id',
    name: 'Module',
    component: Module,
    beforeEnter
  },
  {
    path: '/listexercises',
    name: 'ListExercises',
    component: () => import('../views/ListExercises.vue'),
    beforeEnter
  },
  {
    path: '/session/:id',
    name: 'Exercises',
    component: () => import('../views/DoExercises.vue'),
    beforeEnter
  },
  {
    path: '/session/:sid/do/:eid',
    name: 'Exercise',
    component: () => import('../views/DoExercise.vue'),
    beforeEnter
  }
]

export default new VueRouter({
  routes
})
