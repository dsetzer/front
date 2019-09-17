<template>
  <div>
    <img :src="src" class="asset-image" />
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'AssetColumn',
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
    src() {
      return `/static/img/icons/${this.column.getRepresentation(this.row)}.png`
    },
    text() {
      return this.column.getRepresentation(this.row)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.asset-image {
  max-width: 20px;
  margin-right: 0.5rem;
}

.asset-link {
  color: $light;
}
</style>
