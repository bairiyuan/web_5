import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import Questions from '../views/Questions.vue'
Vue.use(VueRouter)
export default new VueRouter({ routes: [
  { path: '/', redirect: '/users' },
  { path: '/users', component: Users },
  { path: '/questions', component: Questions },
  { path: '*', redirect: '/users' }
] })
