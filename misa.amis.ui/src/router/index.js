import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterOvertime from '@/views/RegisterOvertime';

Vue.use(VueRouter)

const routes = [
  {
    path: '/management-request/register-overtime',
    component: RegisterOvertime
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
