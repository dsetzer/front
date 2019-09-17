import Vue from 'vue'
import Router from 'vue-router'
import LandingPageLayout from './components/layouts/LandingPageLayout'
import AccountPageLayout from './components/layouts/AccountPageLayout'
import Home from './views/Home'
import LogIn from './views/LogIn'
import Assets from './views/Assets'
import Account from './views/Account'
import Settings from './views/Settings'
import Cube from './views/Cube'
import Connection from './views/Connection'
import CreateAccount from './views/CreateAccount'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: LandingPageLayout,
      meta: { title: 'COINCUBE | Blockchain Wealth Management' },
      children: [
        {
          name: 'Home',
          path: '',
          component: Home,
          meta: { title: 'COINCUBE | Blockchain Wealth Management' }
        },
        {
          name: 'Asset',
          path: '/assets',
          component: Assets,
          meta: { title: 'COINCUBE | Supported Assets' }
        },
        {
          name: 'LogIn',
          path: '/login',
          component: LogIn,
          meta: { title: 'COINCUBE | Log In' }
        },
        {
          name: 'CreateAccount',
          path: '/create',
          component: CreateAccount,
          meta: { title: 'COINCUBE | Create Account' }
        }
      ]
    },
    {
      path: '/account',
      component: AccountPageLayout,
      meta: {
        auth: true,
        title: 'COINCUBE | Account'
      },
      children: [
        {
          path: '',
          name: 'Account',
          component: Account,
          meta: { title: 'COINCUBE | Account' }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
          meta: { title: 'COINCUBE | Settings' }
        },
        {
          path: 'cube/:cubeID',
          name: 'Cube',
          component: Cube,
          meta: { title: 'COINCUBE | Cube' }
        },
        {
          path: 'cube/add/connection',
          name: 'Connection',
          component: Connection,
          meta: { title: 'COINCUBE | Connection' }
        }
      ]
    }
  ]
})
