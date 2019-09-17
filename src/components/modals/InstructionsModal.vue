<template>
  <mdb-modal v-if="showModal" class="modal-container" @close="toggleModal">
    <mdb-modal-header class="text-center">
      <mdb-modal-title>{{ modalContent.title }}</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <ol>
        <li v-for="(item, index) in modalContent.items" :key="index" v-html="item.item" />
      </ol>
    </mdb-modal-body>
  </mdb-modal>
</template>

<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody } from 'mdbvue'

export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody
  },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    toggleModal: {
      type: Function,
      required: true
    },
    modalContent: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
