<template>
  <div id="app">
    <div v-if="error" class="error-bar">Something went wrong. Please give the page a refresh.</div>
    <div>
      <spinner v-if="!ready" />
      <router-view v-else />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'

export default {
  name: 'App',
  components: { Spinner },
  computed: {
    error() {
      // This usually only ever happens if the server is down
      return this.$store.getters.errorOccured
    },
    ready() {
      return (
        this.$store.getters.isDataLoaded && !this.$store.getters.showSpinner
      )
    }
  },
  mounted() {
    this.$auth.signOut = () => {
      this.$router.push('/')
      this.$auth.logout({
        isAccessLogout: true,
        isRefreshLogout: false,
        makeRequest: true,
        redirect: false
      })
      this.$auth.logout({
        isAccessLogout: false,
        isRefreshLogout: true,
        makeRequest: true,
        redirect: false
      })
      this.$store.commit('logout')
    }
  },
  methods: {
    loggedIn() {
      return this.$auth.check()
    }
  }
}
</script>

<style lang="scss">
@import 'custom';

.error-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: $coincube-red;
  color: #fff;
  text-align: center;
  z-index: 4;
}

h1 {
  width: 100%;
}

h5 {
  width: 100%;
}
</style>
