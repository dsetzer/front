<template>
  <div class="icon">
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
    href() {
      return `https://coinmarketcap.com/currencies/${this.row.asset}`
    },
    src() {
      return `/icons/${this.row.asset}.png`
    },
    text() {
      return this.column.getRepresentation(this.row)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.icon {
  width: 80px;
}
.asset-image {
  width: 20px;
  text-align: left;
  margin-right: 0.5rem;
}

.asset-link {
  color: $light;
}
</style>
