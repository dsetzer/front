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
        @click.native.prevent="handleUpdateExchange"
      >Update {{ exchange.name }}</mdb-btn>
    </mdb-modal-body>
  </mdb-modal>
</template>

<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbInput
} from 'mdbvue'
import Models from '@/store/models'
import Spinner from '@/components/Spinner'
import api from '@/utils/api'

const removeSpaces = text => text.replace(/ /g, '') // Remove spaces from all parts of the string

export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput,
    Spinner
  },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    exchange: {
      type: Object,
      required: true
    },
    cubeId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      apiKey: '',
      apiSecret: '',
      passphrase: '',
      videoId: '',
      isLoading: false
    }
  },
  methods: {
    async handleUpdateExchange() {
      let toast = this.$toasted.info('Updating exchange API connection...')
      const body = {
        cube_id: this.cubeId,
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
        await api.cube.updateConnection(body)
        toast.goAway()
        toast = this.$toasted.success('Exchange connection updated.')
        this.$emit('close')
        toast.goAway()
        this.clearCache(Models.CUBE_INFO())
        this.clearCache(Models.USER())
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        toast.goAway()
        toast = this.$toasted.error('Failed to update exchange connection.')
      }
    }
  }
}
</script>

<style lang="scss">
</style>
