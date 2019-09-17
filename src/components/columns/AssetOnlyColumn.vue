<template>
  <div class="icon">{{ text }}</div>
</template>

<script>
export default {
  name: 'AssetOnlyColumn',
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
    text() {
      return this.column.getRepresentation(this.row)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
