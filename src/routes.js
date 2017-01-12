import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexRoutes from './views/Index/routes'
import LoginRoutes from './views/Login/routes'
import ClientRoutes from './views/Client/routes'

Vue.use(VueRouter)

const routes = []

routes.push(IndexRoutes)
routes.push(LoginRoutes)
routes.push(ClientRoutes)

export default routes
