<template>
  <mdb-modal
    v-if="showModal"
    full-height
    position="left"
    class="mdb-modal-container"
    @close="toggleModal"
  >
    <mdb-modal-header>
      <mdb-modal-title>Cube Settings</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>
      <div class="d-flex align-items-center justify-content-between pt-4">
        <mdb-btn
          class="nw-cube-settings-delete"
          size="lg"
          color="default"
          @click.native="confirmDeleteCube"
        >Delete Cube</mdb-btn>
      </div>
      <div class="d-flex align-items-center justify-content-between pt-4">
        <mdb-btn
          v-show="deleteThisCube"
          class="nw-cube-settings-delete"
          size="lg"
          color="danger"
          @click.native="deleteCube"
        >Confirm Delete Cube</mdb-btn>
      </div>
    </mdb-modal-body>
  </mdb-modal>
</template>

<script>
import {
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody
} from 'mdbvue'

import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import api from '@/utils/api'

export default {
  name: 'CubeSettingsModal',
  components: {
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody
  },
  extends: StoreSync({
    cube: route => Models.CUBE_INFO(route.params.cubeID)
  }),
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    toggleModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      deleteThisCube: false
    }
  },
  methods: {
    saveChange({ name, value }) {
      return api.cube.saveSetting({
        name: name.toString(),
        value: value.toString(),
        cube_id: this.cube.id
      })
    },
    confirmDeleteCube() {
      this.deleteThisCube = true
    },
    async deleteCube() {
      let toast = this.$toasted.info('Deleting Cube...')
      try {
        await this.saveChange({
          name: 'delete',
          value: ''
        })
        toast.goAway()
        toast = this.$toasted.info('Cube deleted')
        this.clearCacheWithSpinner(Models.USER())
        this.$router.push('/account')
      } catch (error) {
        toast.goAway()
        toast = this.$toasted.error('Failed to delete Cube')
      }
    }
  }
}
</script>

<style lang="scss">
@import 'custom';

p {
  margin-top: 5px;
}

h5 span {
  color: $coincube-green;
}

.nw-cube-settings-delete {
  width: 100%;
}
</style>
