<template>
  <mdb-navbar color="white" position="top">
    <router-link to="/account">
      <mdb-navbar-brand>COINCUBE</mdb-navbar-brand>
    </router-link>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <mdb-nav-item class="settings-cog" href="/account/settings" aria-label="Settings">
          <i class="fas fa-cog" aria-hidden="true" />
        </mdb-nav-item>
        <router-link to="/account">
          <mdb-btn color="primary">DASHBOARD</mdb-btn>
        </router-link>
        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle slot="toggle" color="primary">CUBES</mdb-dropdown-toggle>
          <mdb-dropdown-menu right>
            <mdb-dropdown-item
              v-for="(item, index) in menu"
              :to="item.route || '#'"
              :tabindex="index"
            >{{ item.label }}</mdb-dropdown-item>
            <mdb-dropdown-item to="/account/cube/add/connection" tabindex="10">+ Add Cube</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
        <mdb-btn color="secondary" @click.native.prevent="$auth.signOut()">SIGN OUT</mdb-btn>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbBtn,
  mdbTooltip,
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbDropdown,
  mdbDropdownToggle,
  mdbDropdownMenu,
  mdbDropdownItem
} from 'mdbvue'

import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import api from '@/utils/api'
import featureFlags from '@/utils/featureFlags'
import CubeNavData from './CubeNavData'

export default {
  components: {
    mdbBtn,
    mdbTooltip,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem,
    mdbTooltip
  },
  extends: StoreSync({
    user: () => Models.USER()
  }),
  data() {
    return {
      featureFlags,
    }
  },
  computed: {
    notifications() {
      // Max of 5 notifications
      return (this.user.notifications || []).slice(0, 5)
    },
    menu() {
      return CubeNavData(this.user, this)
    }
  },
  mounted() {
    document.addEventListener('click', this.onClick)
  },
  destroyed() {
    document.removeEventListener('click', this.onClick)
  },
  methods: {
    deleteNotification(id) {
      api.account.saveSetting({
        name: 'delete_notification',
        value: id
      })
    }
  }
}
</script>

<style lang="scss">
@import 'custom';

.settings-cog {
  padding-top: 4px;
}
.nav-item {
  margin-top: 6px;
  margin-left: 6px;
}
</style>
