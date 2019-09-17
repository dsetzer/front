<template>
  <div>
    <AccountHeader class="fixed-top" />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import AccountHeader from '@/components/navigation/AccountHeader'
import Footer from '@/components/navigation/Footer'

export default {
  name: 'AccountPageLayout',
  components: {
    AccountHeader,
    Footer
  }
}
</script>

<style lang="scss" scoped>
h1 {
  width: 100%;
}

.main-content {
  padding-top: 9em;
  min-height: 600px;

  @media (min-width: 375px) {
    padding-top: 7em;
  }

  @media (min-width: 1024px) {
    padding-right: 1em;
    padding-left: 1em;
  }
}
</style>
