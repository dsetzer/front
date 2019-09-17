<template>
  <mdb-row>
    <mdb-col class="select">
      <select-square
        :allowed="true"
        :title="'+ Add Cube'"
        :sub-title="'exchange connection'"
        :on-click="cubePage"
        class="select-square-card"
      />
      <h3>+ Add Cube</h3>
    </mdb-col>
  </mdb-row>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'
import SelectSquare from './SelectSquare'

export default {
  name: 'CubeSelect',
  components: {
    mdbRow,
    mdbCol,
    SelectSquare
  },
  methods: {
    cubePage() {
      this.$router.push('/account/cube/add/connection')
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  padding-top: 1em;
  text-align: center;
  margin-bottom: 0.5em;
}
.select-square-card {
  margin: 1em;
}
</style>
