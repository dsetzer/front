import Vue from 'vue'
import axios from 'axios'
import DatatableFactory from 'vuejs-datatable'
import VeeValidate from 'vee-validate'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VueAuthAxiosDriver from '@websanova/vue-auth/drivers/http/axios.1.x'
import VueAuthRouterDriver from '@websanova/vue-auth/drivers/router/vue-router.2.x'
import Toasted from 'vue-toasted'
import VueQriously from 'vue-qriously'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import ToggleButton from 'vue-js-toggle-button'
import Multiselect from 'vue-multiselect'

import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import '../custom.scss'

import App from './App.vue'
import router from './router'
import store from './store/store'
import VueAuthJwtDriver from './drivers/jwt'

Chartkick.options = {
  colors: [
    '#30A6D6',
    '#30d5b2',
    '#3154D7',
    '#D530A8',
    '#6ec0e2',
    '#6e87e3',
    '#6ee1c9',
    '#e16ec2',
    '#acdbee',
    '#ACEEE0',
    '#acbaef',
    '#eeacdc',
    '#30A6D6',
    '#30d5b2',
    '#3154D7',
    '#D530A8',
    '#6ec0e2',
    '#6e87e3',
    '#6ee1c9',
    '#e16ec2',
    '#acdbee',
    '#ACEEE0',
    '#acbaef',
    '#eeacdc',
    '#30A6D6',
    '#30d5b2',
    '#3154D7',
    '#D530A8',
    '#6ec0e2',
    '#6e87e3',
    '#6ee1c9',
    '#e16ec2',
    '#acdbee',
    '#ACEEE0',
    '#acbaef',
    '#eeacdc',
    '#30A6D6',
    '#30d5b2',
    '#3154D7',
    '#D530A8',
    '#6ec0e2',
    '#6e87e3',
    '#6ee1c9',
    '#e16ec2',
    '#acdbee',
    '#ACEEE0',
    '#acbaef',
    '#eeacdc'
  ]
}

Vue.config.productionTip = false
Vue.router = router
// Necessary to add Vue to the window due to DatatableFactory requirements
window.Vue = Vue

Vue.component('multiselect', Multiselect)
Vue.use(ToggleButton)
Vue.use(DatatableFactory)
Vue.use(Chartkick.use(Chart))
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
Vue.use(VueQriously)
Vue.use(Toasted, {
  duration: 5000,
  position: 'bottom-right',
  router
})

const root = `${window.env ? window.env.config.apiServer : ''}/api`

Vue.use(VueAuth, {
  auth: VueAuthJwtDriver,
  http: VueAuthAxiosDriver,
  router: VueAuthRouterDriver,
  authType: 'jwt',
  parseUserData: data => data,
  // https://github.com/websanova/vue-auth/blob/master/docs/Options.md
  authRedirect: {
    path: '/login'
  },
  forbiddenRedirect: {
    // path: '/403',
    path: '/login'
  },
  notFoundRedirect: {
    path: '/404'
  },
  registerData: {
    url: `${root}/auth/register`,
    method: 'POST',
    redirect: null,
    fetchUser: false
  },
  loginData: {
    url: `${root}/auth/login`,
    method: 'POST',
    redirect: null,
    fetchUser: false,
    rememberMe: false
  },
  logoutData: {
    url: `${root}/auth/logout`,
    method: 'POST',
    redirect: '/',
    makeRequest: false
  },
  fetchData: {
    url: `${root}/account/user`,
    method: 'GET',
    enabled: false
  },
  refreshData: {
    url: `${root}/auth/refresh`,
    method: 'GET',
    enabled: false,
    interval: 30, // minutes
    isRefresh: true
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.toasted.register('error', message => message || 'null error message', {
  type: 'error'
})

Vue.toasted.register('info', message => message || 'null info message', {
  type: 'info'
})

Vue.toasted.register('success', message => message || 'null success message', {
  type: 'success'
})
