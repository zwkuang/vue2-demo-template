import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexRoutes from './views/Index/routes'

import WebIndex from './views/Index/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WebIndex }
]

routes.push(IndexRoutes)

export default routes
