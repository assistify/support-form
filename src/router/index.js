import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Support from '@/components/Support'
import Configure from '@/components/Configure'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/support',
    name: 'Support',
    component: Support
  },
  {
    path: '/config',
    name: 'Configure',
    component: Configure
  }]
})
