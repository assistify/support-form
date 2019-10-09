import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Support from '@/components/Support'
import Configuration from '@/components/Configuration'

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
    name: 'Configuration',
    component: Configuration
  }]
})
