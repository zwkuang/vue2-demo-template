// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './routes'
import store from './store'
import Element from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

import Layout from './components/Layout'
import ClientEdit from './components/ClientEdit'

Vue.use(Element)
Vue.use(VueResource)

Vue.component(Layout.name, Layout)
Vue.component(ClientEdit.name, ClientEdit)

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
})

export default app
