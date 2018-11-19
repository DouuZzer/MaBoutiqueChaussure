import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import VueMq from 'vue-mq'

import Content from '@/components/Content'
import Login from '@/components/Login'
import signUp from '@/components/SignUp'
import ShoppingBasket from '@/components/ShoppingBasket'

Vue.use( VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Content',
      component: Content,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/shopping-basket',
      name: 'ShoppingBasket',
      component: ShoppingBasket,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/login'
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router


