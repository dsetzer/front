<template>
  <mdb-navbar light>
    <router-link to="/">
      <mdb-navbar-brand href="/">COINCUBE</mdb-navbar-brand>
    </router-link>
    <mdb-navbar-toggler>
      <mdb-navbar-nav v-if="!$auth.check()" right>
        <mdb-nav-item class="navbar-item" href="/assets">ASSETS</mdb-nav-item>
        <router-link to="/login">
          <mdb-btn color="primary">LOG IN</mdb-btn>
        </router-link>
      </mdb-navbar-nav>
      <mdb-navbar-nav v-if="$auth.check()" right>
        <router-link to="/account">
          <mdb-btn color="primary">Account</mdb-btn>
        </router-link>
        <mdb-btn color="secondary" @click.native.prevent="$auth.signOut()">SIGN OUT</mdb-btn>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import {
  mdbBtn,
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbDropdown,
  mdbDropdownToggle,
  mdbDropdownMenu,
  mdbDropdownItem,
  mdbTooltip,
  mdbInput
} from 'mdbvue'

export default {
  components: {
    mdbBtn,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem,
    mdbTooltip,
    mdbInput
  },
  extends: StoreSync({
    user: () => Models.USER()
  })
}
</script>

<style lang="scss">
@import 'custom';

.navbar-item {
  padding-top: 4px;
  padding-right: 6px;
}
</style>
