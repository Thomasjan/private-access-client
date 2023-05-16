import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/home', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
