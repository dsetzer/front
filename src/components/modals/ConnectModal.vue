<template>
  <mdb-modal v-if="showModal" class="modal-container nw-modal" @close="$emit('close')">
    <mdb-modal-header class="text-center">
      <mdb-modal-title>{{ exchange.name }} API Connection</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <spinner v-if="isLoading" />
      <form v-else>
        <mdb-input
          v-validate="'required'"
          v-model="apiKey"
          :placeholder="exchange.key"
          class="nw-api-key"
          size="sm"
          name="key"
          type="text"
        />
        <mdb-input
          v-validate="'required'"
          v-model="apiSecret"
          :placeholder="exchange.secret"
          class="nw-api-secret"
          size="sm"
          name="secret"
          type="text"
        />
        <mdb-input
          v-if="exchange.passphrase !== null"
          v-model="passphrase"
          :placeholder="exchange.passphrase"
          class="nw-api-passphrase"
          size="sm"
          name="passphrase"
          type="text"
        />
      </form>
      <mdb-btn
        :disabled="isLoading"
        class="nw-submit"
        color="info"
        block
        @click.native.prevent="handleConnectExchange"
      >Connect {{ exchange.name }}</mdb-btn>
    </mdb-modal-body>
  </mdb-modal>
</template>

<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbBtn,
  mdbInput
} from 'mdbvue'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import Spinner from '@/components/Spinner'
import api from '@/utils/api'

const removeSpaces = text => text.replace(/ /g, '') // Remove spaces from all parts of the string

export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbBtn,
    mdbInput,
    Spinner
  },
  extends: StoreSync({}),
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    exchange: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      apiKey: '',
      apiSecret: '',
      passphrase: '',
      isLoading: false
    }
  },
  methods: {
    async handleConnectExchange() {
      let toast = this.$toasted.info('Adding exchange API connection...')
      const body = {
        exchange_name: this.exchange.name,
        key: removeSpaces(this.apiKey),
        secret: removeSpaces(this.apiSecret),
        passphrase: removeSpaces(this.passphrase)
      }

      this.isLoading = true
      /*
       * If everything is successful dismiss modal and redirect else display error
       */
      try {
        const { data } = await api.cube.addConnection(body)
        toast.goAway()
        toast = this.$toasted.success('Exchange connection added!')
        this.$emit('close')
        this.isLoading = false
        toast.goAway()
        this.clearCache(Models.USER())
        this.$router.push(`/account/cube/${data.cube_id}`)
      } catch (error) {
        console.log(error)
        this.isLoading = false
        toast.goAway()
        toast = this.$toasted.error('Failed to add exchange connection.')
      }
    }
  }
}
</script>

<style lang="scss">
</style>
