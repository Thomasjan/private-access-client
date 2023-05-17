import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'

//views
import GestimumERP from './components/views/GestimumERP.vue'
import Support from './components/views/Support.vue'
import Formation from './components/views/Formation.vue'
import G_News from './components/views/G-News.vue'
import Contacts from './components/views/Contacts.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: HelloWorld },

  //views
  { path: '/gestimum-erp', component: GestimumERP },
  { path: '/support', component: Support },
  { path: '/formation', component: Formation },
  { path: '/g-news', component: G_News },
  { path: '/contacts', component: Contacts },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
