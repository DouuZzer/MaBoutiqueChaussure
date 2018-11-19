// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import { store } from './store.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const fb = require('./firebaseConfig.js')

library.add(faBars)
library.add(faAngleDoubleRight)
library.add(faAngleDoubleLeft)
library.add(faShoppingBasket)
library.add(faPowerOff)
library.add(faPlus)
library.add(faHome)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueFire)

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  // pas de credential
  setTimeout(function(){document.getElementById('preloader').style.display = 'block'},0)
   setTimeout(function(){document.getElementById('preloader').style.display = 'none'},2500)
  if (user) {
    console.log("Un utilisateur est connecté.")// User is signed in.
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')
    store.dispatch('fetchUserPanier')
  } else {
    console.log("Il n'y a pas d'utilisateur connecté.")// No user is signed in.

  }

  if(!app){
    new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App),
    })
  }
})
