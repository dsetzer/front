<template>
  <mdb-modal v-if="showModal" class="modal-container" @close="$emit('close')">
    <mdb-modal-header class="text-center">
      <mdb-modal-title>Select Asset</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <mdb-row>
        <mdb-col v-for="(asset, index) in sortedAssets" :key="index" md="4">
          <div class="asset" @click="$emit('select', asset)">
            <img :src="`/icons/${asset}.png`" />
            {{ asset }}
          </div>
        </mdb-col>
      </mdb-row>
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
  mdbRow,
  mdbCol
} from 'mdbvue'

export default {
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbRow,
    mdbCol
  },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    assets: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedAssets() {
      // Slice to make a copy
      return this.assets.slice(0).sort()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';
.modal {
  .modal-content {
    background-color: theme-color('coincube-white') !important;
  }
}
.asset {
  text-align: left;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 2px 5px;

  &:hover {
    background: $coincube-sky;
    border-radius: 5px;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
}
</style>
