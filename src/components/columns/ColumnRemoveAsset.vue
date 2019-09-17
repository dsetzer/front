<template>
  <mdb-btn
    :disabled="disabled"
    size="sm"
    color="secondary"
    class="mt-0 xs"
    aria-label="Remove Asset"
    @click.native="deleteAsset"
  >
    <i class="fa fa-times" aria-hidden="true" />
  </mdb-btn>
</template>

<script>
import { mdbBtn } from 'mdbvue'

export default {
  name: 'ColumnRemoveAsset',
  components: {
    mdbBtn
  },
  props: {
    column: {
      type: [Object, Array],
      required: true
    },
    row: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    deleteAsset() {
      return this.column.getRepresentation(this.row).deleteAsset
    },
    disabled() {
      return this.column.getRepresentation(this.row).disabled
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.xs {
  padding: 0.2rem 0.8rem;
}
</style>
