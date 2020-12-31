import Vue from 'vue'
import VueRouter from 'vue-router'
import Nodes from '../views/Nodes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Nodes',
    component: Nodes
  },
]

const router = new VueRouter({
  routes
})

export default router
