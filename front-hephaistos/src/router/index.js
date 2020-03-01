import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import config from '../config'

Vue.use(VueRouter)

function createRouter (state) {
  async function beforeEnter (to, from, next) {
    try {
      const { data: user } = await axios.get(config.host + '/api/v1/me')
      state.user = user
      next()
    } catch (err) {
      console.log('err', err)
      next('/login')
    }
  }
  // the function continues in the second panel, not enough space here
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }
    // the rest of what was already there
  ]

  return new VueRouter({
    routes
  })
}

export default createRouter
