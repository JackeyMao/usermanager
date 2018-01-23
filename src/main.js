// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import App from './App'
import Customers from './components/Customers'
import AddUser from './components/AddUser'
import About from './components/About'
import UserDetail from './components/UserDetail'
import EditUser from './components/EditUser'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode:"history",
  base:"/vue/",
  routes:[
    {path:"/",component:Customers},
    {path:"/about",component:About},
    {path:"/adduser",component:AddUser},
    {path:"/customerDetail/:id",component:UserDetail},
    {path:"/edituser/:id",component:EditUser}
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
