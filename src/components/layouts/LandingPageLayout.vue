<template>
  <div>
    <div>
      <Header />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/navigation/Footer'
import Header from '@/components/navigation/Header'

export default {
  name: 'LandingPageLayout',
  components: {
    Footer,
    Header
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  min-height: 600px;
}
</style>