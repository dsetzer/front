<template>
  <div class="exchange-card">
    <img :src="`/img/exchanges/${exchange.name}.png`" />
    <div class="button-group">
      <mdb-btn size="sm" color="info" block @click.native.prevent="showConnectModal = true">CONNECT</mdb-btn>
      <mdb-btn
        :href="exchange.signup_url"
        target="_blank"
        size="sm"
        tag="a"
        color="info"
        block
      >SIGNUP</mdb-btn>
    </div>

    <connect-modal
      :show-modal="showConnectModal"
      :exchange="exchange"
      @close="showConnectModal = false"
    />
  </div>
</template>

<script>
import { mdbBtn } from 'mdbvue'

import ConnectModal from '@/components/modals/ConnectModal'

export default {
  components: {
    mdbBtn,
    ConnectModal
  },
  props: {
    exchange: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showConnectModal: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.exchange-card {
  width: 290px;
  height: 240px;
  padding: 20px 30px 0px 30px;
  display: inline-block;
  border-radius: 4px;
  text-align: center;
  margin-top: 15px;
  background-color: $coincube-purple;

  @media (min-width: 768px) {
    width: 240px;
    height: 240px;
    padding: 0px 30px 30px 30px;
  }

  img {
    height: 22px;
    display: block;
    margin: 2.5em auto;
  }

  .button-group {
    margin-top: inherit;
  }
}
</style>
