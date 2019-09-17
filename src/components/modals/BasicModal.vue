<template>
  <mdb-modal v-if="showModal" class="modal-container" @close="toggleModal">
    <mdb-modal-header class="text-center">
      <mdb-modal-title>{{ modalTitle }}</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <slot />
    </mdb-modal-body>
    <mdb-modal-footer class="text-right">
      <mdb-btn class="btn btn-primary" @click="toggleModal">CLOSE</mdb-btn>
    </mdb-modal-footer>
  </mdb-modal>
</template>

<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn
} from 'mdbvue'

export default {
  name: 'LegalModal',
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn
  },
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    },
    toggleModal: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.modal-title {
  color: $coincube-text;
}

.modal-header {
  color: $coincube-text;
}
</style>